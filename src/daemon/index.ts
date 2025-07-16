import type { CloseEvent, ErrorEvent, MessageEvent, Event } from "ws";
import * as WS from "ws";
import { randomBytes } from "crypto";
import { getLogger, stringify } from "../logger";
import { open } from "./connection";
import { getConfig } from "../config/index";
import { WsMessage } from "../api/ws";
import { WsRegisterServiceMessage } from "../api/ws/daemon";

export type EventType = "open" | "message" | "error" | "close";
export type WsEvent = Event | MessageEvent | ErrorEvent | CloseEvent;
export type EventListener<T = WsEvent> = (ev: T) => unknown;

type EventListenerOf<T> = T extends "open"
  ? EventListener<Event>
  : T extends "message"
    ? EventListener<MessageEvent>
    : T extends "error"
      ? EventListener<ErrorEvent>
      : T extends "close"
        ? EventListener<CloseEvent>
        : never;

export type MessageListener<D extends WsMessage> = (msg: D) => unknown;

export interface RetryOptions {
  maxAttempts?: number;
  initialDelay?: number;
  maxDelay?: number;
  backoffMultiplier?: number;
}

export interface ConnectOptions {
  timeoutMs?: number;
  autoReconnect?: boolean;
  retryOptions?: RetryOptions;
}

const DEFAULT_SERVICE_NAME = "wallet_ui";
const DEFAULT_AUTO_RECONNECT = true;
const DEFAULT_TIMEOUT_MS = 30000;
const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxAttempts: 5,
  initialDelay: 1000,
  maxDelay: 30000,
  backoffMultiplier: 1.5,
};

let daemon: Daemon | null = null;

export function getDaemon(serviceName?: string) {
  if (daemon) {
    return daemon;
  }

  return (daemon = new Daemon(serviceName));
}

// Gracefully disconnect from remote daemon server on Ctrl+C.
const onProcessExit = () => {
  if (!daemon) {
    process.removeListener("SIGINT", onProcessExit);
    process.kill(process.pid, "SIGINT");
    return;
  }

  setTimeout(async () => {
    try {
      if (daemon && daemon.connected && !daemon.closing) {
        getLogger().debug(() => "Detected Ctrl+C. Initiating shutdown...");
        await daemon.close();

        process.removeListener("SIGINT", onProcessExit);
        process.kill(process.pid, "SIGINT");
      }
    } catch (e) {
      process.stderr.write(stringify(e));
      process.exit(1);
    }
  }, 67);
};
process.addListener("SIGINT", onProcessExit);

class Daemon {
  protected _socket: WS | null = null;
  protected _connectedUrl: string = "";
  protected _responseQueue: {
    [request_id: string]: {
      resolver: (value: unknown) => void;
      rejecter: (error: unknown) => void;
      timeout: NodeJS.Timeout;
    };
  } = {};
  protected _openEventListeners: Array<(e: Event) => unknown> = [];
  protected _messageEventListeners: Array<(e: MessageEvent) => unknown> = [];
  protected _errorEventListeners: Array<(e: ErrorEvent) => unknown> = [];
  protected _closeEventListeners: Array<(e: CloseEvent) => unknown> = [];
  protected _messageListeners: Record<
    string,
    Array<(e: WsMessage) => unknown>
  > = {};
  protected _closing: boolean = false;
  protected _onClosePromise: (() => unknown) | undefined;
  protected _subscriptions: string[] = [];
  protected _serviceName: string = DEFAULT_SERVICE_NAME;
  protected _autoReconnect: boolean = DEFAULT_AUTO_RECONNECT;
  protected _retryOptions: Required<RetryOptions> = DEFAULT_RETRY_OPTIONS;
  protected _timeoutMs: number = DEFAULT_TIMEOUT_MS;
  protected _reconnectAttempts: number = 0;
  protected _reconnectTimer: NodeJS.Timeout | null = null;
  protected _lastConnectionUrl: string = "";
  protected _isReconnecting: boolean = false;

  public get connected() {
    return (
      Boolean(this._connectedUrl) &&
      this._socket !== null &&
      this._socket.readyState === WS.OPEN
    );
  }

  public get closing() {
    return this._closing;
  }

  public constructor(serviceName?: string) {
    this.onOpen = this.onOpen.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onPing = this.onPing.bind(this);
    this.onPong = this.onPong.bind(this);
    this.onRejection = this.onRejection.bind(this);

    if (serviceName) {
      this._serviceName = serviceName;
    }
  }

  protected onRejection(e: unknown) {
    if (typeof e === "string") {
      getLogger().error(`Error: ${e}`);
    } else if (e instanceof Error) {
      getLogger().error(`Error ${e.name}: ${e.message}`);
      if (e.stack) {
        getLogger().error(e.stack);
      }
    } else {
      try {
        getLogger().error(() => `Error: ${stringify(e)}`);
      } catch (_e) {
        getLogger().error("Unknown error");
      }
    }

    return null;
  }

  /**
   * Connect to local daemon via websocket.
   * @param daemonServerURL - The websocket URL to connect to. If not provided, uses config values.
   * @param options - Connection options including timeout, reconnect settings, and retry settings
   */
  public async connect(
    daemonServerURL?: string,
    options?: ConnectOptions,
  ): Promise<boolean> {
    if (!daemonServerURL) {
      const config = getConfig();
      const daemonHost = config["/ui/daemon_host"];
      const daemonPort = config["/ui/daemon_port"];
      daemonServerURL = `wss://${daemonHost}:${daemonPort}`;
    }

    // Extract options with defaults
    const timeoutMs = options?.timeoutMs || this._timeoutMs;

    // Store timeout for reconnection attempts
    if (options?.timeoutMs !== undefined) {
      this._timeoutMs = options.timeoutMs;
    }

    // Update settings from options
    if (options?.autoReconnect !== undefined) {
      this._autoReconnect = options.autoReconnect;
    }

    if (options?.retryOptions !== undefined) {
      this._retryOptions = {
        ...DEFAULT_RETRY_OPTIONS,
        ...options.retryOptions,
      };
    }

    if (this._connectedUrl === daemonServerURL) {
      return true;
    } else if (this._connectedUrl) {
      getLogger().error(
        "Connection is still active. Please close living connection first",
      );
      return false;
    }

    // Store URL for reconnection
    this._lastConnectionUrl = daemonServerURL;

    // Attempt connection with retry logic
    let lastError: unknown;
    for (
      let attempt = 1;
      attempt <= this._retryOptions.maxAttempts;
      attempt++
    ) {
      getLogger().debug(
        () => `Opening websocket connection to ${daemonServerURL} (attempt ${attempt}/${this._retryOptions.maxAttempts})`,
      );

      const result = await open(daemonServerURL, timeoutMs).catch((error) => {
        lastError = error;
        return null;
      });

      if (result) {
        this._socket = result.ws;
        this._socket.on("error", this.onError);
        this._socket.addEventListener("message", this.onMessage);
        this._socket.on("close", this.onClose);
        this._socket.on("ping", this.onPing);
        this._socket.on("pong", this.onPong);

        // Call onOpen but don't check result (maintain original behavior)
        await this.onOpen(result.openEvent, daemonServerURL).catch(
          this.onRejection,
        );

        return true;
      }

      // If not the last attempt, wait before retrying
      if (attempt < this._retryOptions.maxAttempts) {
        const delay = Math.min(
          this._retryOptions.initialDelay *
            Math.pow(this._retryOptions.backoffMultiplier, attempt - 1),
          this._retryOptions.maxDelay,
        );

        getLogger().info(
          `Connection attempt ${attempt} failed. Retrying in ${delay}ms...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // All attempts failed
    getLogger().error(
      `Failed to connect after ${this._retryOptions.maxAttempts} attempts`,
    );
    this.onRejection(lastError);
    return false;
  }

  public async close() {
    return new Promise((resolve) => {
      if (this._closing || !this._socket) {
        return;
      }

      // Cancel any pending reconnection
      if (this._reconnectTimer) {
        clearTimeout(this._reconnectTimer);
        this._reconnectTimer = null;
      }

      // Disable reconnection for manual close
      this._autoReconnect = false;
      this._isReconnecting = false;

      getLogger().debug(() => "Closing web socket connection");
      this._socket.close();
      this._closing = true;
      this._connectedUrl = "";
      this._onClosePromise = resolve as () => unknown; // Resolved in onClose function.
    });
  }

  public async sendMessage<M = unknown>(
    destination: string,
    command: string,
    data?: Record<string, unknown>,
    timeoutMs: number = 30000,
  ): Promise<M> {
    return new Promise((resolve, reject) => {
      if (!this.connected || !this._socket) {
        getLogger().error("Tried to send message without active connection");
        reject("Not connected");
        return;
      }

      const message = this.createMessageTemplate(
        command,
        destination,
        data || {},
      );
      const reqId = message.request_id;

      // Set up timeout
      const timeout = setTimeout(() => {
        const entry = this._responseQueue[reqId];
        if (entry) {
          delete this._responseQueue[reqId];
          entry.rejecter(
            new Error(
              `Message timeout after ${timeoutMs}ms. dest=${destination} command=${command} reqId=${reqId}`,
            ),
          );
        }
      }, timeoutMs);

      this._responseQueue[reqId] = {
        resolver: resolve as (v: unknown) => void,
        rejecter: reject,
        timeout,
      };

      getLogger().debug(
        () => `Sending Ws message. dest=${destination} command=${command} reqId=${reqId}`,
      );
      const messageStr = stringify(message);

      this._socket.send(messageStr, (err: Error | undefined) => {
        if (err) {
          getLogger().error(`Error while sending message: ${messageStr}`);
          getLogger().error(() => stringify(err));
          // Clean up on send error
          const entry = this._responseQueue[reqId];
          if (entry) {
            clearTimeout(entry.timeout);
            delete this._responseQueue[reqId];
            reject(err);
          }
        }
      });
    });
  }

  public createMessageTemplate(
    command: string,
    destination: string,
    data: Record<string, unknown>,
  ) {
    return {
      command,
      data,
      ack: false,
      origin: this._serviceName,
      destination,
      request_id: randomBytes(32).toString("hex"),
    };
  }

  public async subscribe<T extends WsRegisterServiceMessage>(
    service: string,
  ): Promise<T> {
    if (!this.connected || !this._socket) {
      getLogger().error(
        `Tried to subscribe '${service}' without active connection`,
      );
      throw new Error("Not connected");
    }

    if (this._subscriptions.findIndex((s) => s === service) > -1) {
      return {
        command: "register_service",
        data: { success: true },
        ack: true,
        origin: "daemon",
        destination: service,
        request_id: "",
      } as T;
    }

    let error: unknown;
    const result = await this.sendMessage("daemon", "register_service", {
      service,
    }).catch((e) => {
      error = e;
      return null;
    });

    if (error || !result) {
      getLogger().error("Failed to register agent service to daemon");
      getLogger().error(
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : stringify(error),
      );
      throw new Error("Subscribe failed");
    }

    this._subscriptions.push(service);

    return result as T;
  }

  public addEventListener<T extends EventType>(
    type: T,
    listener: EventListenerOf<T>,
  ) {
    if (type === "open") {
      this._openEventListeners.push(listener as EventListener<Event>);
    } else if (type === "message") {
      this._messageEventListeners.push(listener as EventListener<MessageEvent>);
    } else if (type === "error") {
      this._errorEventListeners.push(listener as EventListener<ErrorEvent>);
    } else if (type === "close") {
      this._closeEventListeners.push(listener as EventListener<CloseEvent>);
    }
  }

  public removeEventListener<T extends EventType>(
    type: T,
    listener: EventListenerOf<T>,
  ) {
    let listeners;
    if (type === "open") {
      listeners = this._openEventListeners;
    } else if (type === "message") {
      listeners = this._messageEventListeners;
    } else if (type === "error") {
      listeners = this._errorEventListeners;
    } else if (type === "close") {
      listeners = this._closeEventListeners;
    } else {
      return;
    }

    const index = listeners.findIndex((l: unknown) => l === listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  public clearAllEventListeners() {
    this._openEventListeners = [];
    this._messageEventListeners = [];
    this._errorEventListeners = [];
    this._closeEventListeners = [];
    this._messageListeners = {};
  }

  /**
   * Add listener for message
   * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
   * @param listener - Triggered when a message arrives.
   */
  public addMessageListener<D extends WsMessage>(
    origin: string | undefined,
    listener: MessageListener<D>,
  ) {
    const o = origin || "all";
    if (!this._messageListeners[o]) {
      this._messageListeners[o] = [];
    }

    this._messageListeners[o].push(listener as MessageListener<WsMessage>);

    // Returns removeMessageListener function.
    return () => {
      this.removeMessageListener(o, listener);
    };
  }

  public removeMessageListener<D extends WsMessage>(
    origin: string,
    listener: MessageListener<D>,
  ) {
    const listeners = this._messageListeners[origin];
    if (!listeners) {
      return;
    }

    const index = listeners.findIndex((l) => l === listener);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  }

  public clearAllMessageListeners() {
    this._messageListeners = {};
  }

  protected async onOpen(event: Event, url: string) {
    getLogger().info("ws connection opened");
    this._connectedUrl = url;
    this._openEventListeners.forEach((l) => l(event));

    return this.subscribe(this._serviceName);
  }

  protected onError(error: ErrorEvent) {
    getLogger().error(
      `ws connection error: ${error.type} ${error.target} ${error.error} ${error.message}`,
    );
    this._errorEventListeners.forEach((l) => l(error));
  }

  protected onMessage(event: MessageEvent) {
    let payload: WsMessage;
    let request_id: string;
    let origin: WsMessage["origin"];
    let command: WsMessage["command"];

    try {
      payload = JSON.parse(event.data as string) as WsMessage;
      ({ request_id, origin, command } = payload);
    } catch (err: unknown) {
      getLogger().error(
        `Failed to parse ws message data: ${stringify(err)}`,
      );
      getLogger().error(`ws payload: ${event.data}`);
      return;
    }

    const entry = this._responseQueue[request_id];
    if (entry) {
      clearTimeout(entry.timeout);
      delete this._responseQueue[request_id];
      getLogger().debug(
        () => `Ws response received. origin=${origin} command=${command} reqId=${request_id}`,
      );
      entry.resolver(payload);
    } else {
      getLogger().debug(
        () => `Ws message arrived. origin=${origin} command=${command} reqId=${request_id}`,
      );
    }

    getLogger().trace(() => `Ws message: ${stringify(payload)}`);

    this._messageEventListeners.forEach((l) => l(event));
    for (const o in this._messageListeners) {
      if (!Object.prototype.hasOwnProperty.call(this._messageListeners, o)) {
        continue;
      }

      const listeners = this._messageListeners[o];
      if (origin === o || o === "all") {
        listeners.forEach((l) => l(payload));
      }
    }
  }

  protected onClose(event: CloseEvent) {
    const previousSubscriptions = [...this._subscriptions];

    if (this._socket) {
      this._socket.off("error", this.onError);
      this._socket.removeEventListener("message", this.onMessage);
      this._socket.off("close", this.onClose);
      this._socket.off("ping", this.onPing);
      this._socket.off("pong", this.onPong);
      this._socket = null;
    }

    this._closing = false;
    this._connectedUrl = "";
    this._subscriptions = [];
    this._closeEventListeners.forEach((l) => l(event));
    // Don't clear event listeners - preserve them for reconnection
    // this.clearAllEventListeners();

    getLogger().info(
      `Closed ws connection. code:${event.code} wasClean:${event.wasClean} reason:${event.reason}`,
    );

    if (this._onClosePromise) {
      this._onClosePromise();
      this._onClosePromise = undefined;
    }

    // Attempt reconnection if enabled and not manually closed
    if (
      this._autoReconnect &&
      this._lastConnectionUrl &&
      !this._isReconnecting &&
      event.code !== 1000 // 1000 = normal closure
    ) {
      this._isReconnecting = true;
      this._attemptReconnection(previousSubscriptions);
    }
  }

  protected onPing() {
    getLogger().debug(() => "Received ping");
  }

  protected onPong() {
    getLogger().debug(() => "Received pong");
  }

  protected _attemptReconnection(previousSubscriptions: string[]) {
    if (this._reconnectAttempts >= this._retryOptions.maxAttempts) {
      getLogger().error(
        `Max reconnection attempts (${this._retryOptions.maxAttempts}) reached. Giving up.`,
      );
      this._isReconnecting = false;
      this._reconnectAttempts = 0;
      // Emit a custom event for max retries reached
      const errorEvent = {
        type: "error",
        message: "Max reconnection attempts reached",
        error: new Error("Max reconnection attempts reached"),
        target: this._socket,
      } as ErrorEvent;
      this._errorEventListeners.forEach((l) => l(errorEvent));
      return;
    }

    const delay = Math.min(
      this._retryOptions.initialDelay *
        Math.pow(this._retryOptions.backoffMultiplier, this._reconnectAttempts),
      this._retryOptions.maxDelay,
    );

    this._reconnectAttempts++;
    getLogger().info(
      `Attempting reconnection ${this._reconnectAttempts}/${this._retryOptions.maxAttempts} in ${delay}ms...`,
    );

    this._reconnectTimer = setTimeout(async () => {
      this._reconnectTimer = null;

      try {
        const connected = await this.connect(this._lastConnectionUrl, {
          timeoutMs: this._timeoutMs,
          autoReconnect: this._autoReconnect,
          retryOptions: this._retryOptions,
        });
        if (connected) {
          getLogger().info("Reconnection successful");
          this._reconnectAttempts = 0;
          this._isReconnecting = false;

          // Re-establish previous subscriptions
          for (const service of previousSubscriptions) {
            try {
              await this.subscribe(service);
              getLogger().debug(() => `Re-subscribed to ${service}`);
            } catch (e) {
              getLogger().error(`Failed to re-subscribe to ${service}: ${e}`);
            }
          }

          // Emit successful reconnection event
          const reconnectedEvent = {
            type: "reconnected",
            target: this._socket,
          } as Event;
          this._openEventListeners.forEach((l) => l(reconnectedEvent));
        } else {
          // Connection failed, try again
          this._attemptReconnection(previousSubscriptions);
        }
      } catch (error) {
        getLogger().error(`Reconnection attempt failed: ${error}`);
        this._attemptReconnection(previousSubscriptions);
      }
    }, delay);
  }
}

export type TDaemon = InstanceType<typeof Daemon>;