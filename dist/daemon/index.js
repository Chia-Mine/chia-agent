"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaemon = void 0;
const crypto_1 = require("crypto");
const logger_1 = require("../logger");
const connection_1 = require("./connection");
const index_1 = require("../config/index");
const chia_agent_service = "chia_agent";
let daemon = null;
function getDaemon() {
    if (daemon) {
        return daemon;
    }
    return daemon = new Daemon();
}
exports.getDaemon = getDaemon;
class Daemon {
    constructor() {
        this._socket = null;
        this._connectedUrl = "";
        this._responseQueue = {};
        this._openEventListeners = [];
        this._messageEventListeners = [];
        this._errorEventListeners = [];
        this._closeEventListeners = [];
        this._messageListeners = {};
        this._closing = false;
        this._subscriptions = [];
        this.onOpen = this.onOpen.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    get connected() {
        return Boolean(this._connectedUrl);
    }
    /**
     * Connect to local daemon via websocket.
     * @param daemonServerURL
     */
    connect(daemonServerURL) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!daemonServerURL) {
                const config = index_1.getConfig();
                const daemonHost = config["/ui/daemon_host"];
                const daemonPort = config["/ui/daemon_port"];
                daemonServerURL = `wss://${daemonHost}:${daemonPort}`;
            }
            if (this._connectedUrl === daemonServerURL) {
                return true;
            }
            else if (this._connectedUrl) {
                logger_1.getLogger().error(`Connection is still active. Please close living connection first`);
                return false;
            }
            logger_1.getLogger().debug(`Opening websocket connection to ${daemonServerURL}`);
            const result = yield connection_1.open(daemonServerURL);
            this._socket = result.ws;
            this._socket.onerror = this.onError;
            this._socket.onmessage = this.onMessage;
            this._socket.onclose = this.onClose;
            yield this.onOpen(result.openEvent, daemonServerURL);
            return true;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._closing || !this._socket) {
                return;
            }
            logger_1.getLogger().debug("Closing web socket connection");
            this._socket.close();
            this._closing = true;
        });
    }
    sendMessage(destination, command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this.connected || !this._socket) {
                    logger_1.getLogger().error("Tried to send message without active connection");
                    reject("Not connected");
                    return;
                }
                let timer = null;
                const message = this.createMessageTemplate(command, destination, data || {});
                const reqId = message.request_id;
                this._responseQueue[reqId] = resolve;
                logger_1.getLogger().debug(`Sending message. dest=${destination} command=${command} reqId=${reqId}`);
                this._socket.send(JSON.stringify(message));
            });
        });
    }
    createMessageTemplate(command, destination, data) {
        return {
            command,
            data,
            ack: false,
            origin: chia_agent_service,
            destination,
            request_id: crypto_1.randomBytes(32).toString("hex"),
        };
    }
    subscribe(service) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._subscriptions.findIndex(s => s === service) > -1) {
                // return dummy successful response
                return {
                    command: "register_service",
                    data: { success: true },
                    ack: true,
                    origin: "daemon",
                    destination: chia_agent_service,
                    request_id: "",
                };
            }
            let error;
            const result = yield this.sendMessage("daemon", "register_service", { service }).catch(e => {
                error = e;
                return null;
            });
            if (error || !result) {
                logger_1.getLogger().error("Failed to register agent service to daemon");
                throw new Error("Subscribe failed");
            }
            this._subscriptions.push(service);
            return result;
        });
    }
    addEventListener(type, listener) {
        if (type === "open") {
            this._openEventListeners.push(listener);
        }
        else if (type === "message") {
            this._messageEventListeners.push(listener);
        }
        else if (type === "error") {
            this._errorEventListeners.push(listener);
        }
        else if (type === "close") {
            this._closeEventListeners.push(listener);
        }
    }
    removeEventListener(type, listener) {
        let listeners;
        if (type === "open") {
            listeners = this._openEventListeners;
        }
        else if (type === "message") {
            listeners = this._messageEventListeners;
        }
        else if (type === "error") {
            listeners = this._errorEventListeners;
        }
        else if (type === "close") {
            listeners = this._closeEventListeners;
        }
        else {
            return;
        }
        const index = listeners.findIndex((l) => l === listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    clearAllEventListeners() {
        this._openEventListeners = [];
        this._messageEventListeners = [];
        this._errorEventListeners = [];
        this._closeEventListeners = [];
    }
    /**
     * Add listener for message
     * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
     * @param listener - Triggered when a message arrives.
     */
    addMessageListener(origin, listener) {
        const o = origin || "all";
        if (!this._messageListeners[o]) {
            this._messageListeners[o] = [];
        }
        this._messageListeners[o].push(listener);
    }
    removeMessageListener(origin, listener) {
        const listeners = this._messageListeners[origin];
        if (!listeners) {
            return;
        }
        const index = listeners.findIndex(l => l === listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    clearAllMessageListeners() {
        this._messageListeners = {};
    }
    onOpen(event, url) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.getLogger().info("ws connection opened");
            this._connectedUrl = url;
            this._openEventListeners.forEach(l => l(event));
            return this.subscribe(chia_agent_service);
        });
    }
    onError(error) {
        logger_1.getLogger().error(`ws connection error: ${error.message}`);
        this._errorEventListeners.forEach(l => l(error));
    }
    onMessage(event) {
        const payload = JSON.parse(event.data);
        const { request_id, origin, command } = payload;
        logger_1.getLogger().debug(`Arrived message. origin=${origin} command=${command} reqId=${request_id}`);
        const resolver = this._responseQueue[request_id];
        if (resolver) {
            delete this._responseQueue[request_id];
            resolver(payload);
        }
        this._messageEventListeners.forEach(l => l(event));
        for (const o in this._messageListeners) {
            if (!this._messageListeners.hasOwnProperty(o)) {
                continue;
            }
            const listeners = this._messageListeners[o];
            if (origin === o || o === "all") {
                listeners.forEach(l => l(payload));
            }
        }
    }
    onClose(event) {
        if (this._socket) {
            this._socket.removeEventListener("error", this.onError);
            this._socket.removeEventListener("message", this.onMessage);
            this._socket.removeEventListener("close", this.onClose);
            this._socket = null;
        }
        this._closing = false;
        this._connectedUrl = "";
        this._closeEventListeners.forEach(l => l(event));
        logger_1.getLogger().info(`Closed ws connection`);
    }
}
