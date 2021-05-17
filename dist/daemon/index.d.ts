import type { CloseEvent, ErrorEvent, MessageEvent, OpenEvent } from "ws";
import * as WS from "ws";
import { daemon_service, register_service_command, TRegisterServiceResponse, WsMessage } from "../api/chia-agent/ws";
import { GetMessageType } from "../api/chia-agent/types";
export declare type EventType = "open" | "message" | "error" | "close";
export declare type Event = OpenEvent | MessageEvent | ErrorEvent | CloseEvent;
export declare type EventListener<T = Event> = (ev: T) => unknown;
declare type EventListenerOf<T> = T extends "open" ? EventListener<OpenEvent> : T extends "message" ? EventListener<MessageEvent> : T extends "error" ? EventListener<ErrorEvent> : T extends "close" ? EventListener<CloseEvent> : never;
export declare type MessageListener<D = unknown> = (msg: WsMessage) => unknown;
export declare function getDaemon(): Daemon;
declare class Daemon {
    protected _socket: WS | null;
    protected _connectedUrl: string;
    protected _responseQueue: {
        [request_id: string]: (value: (WsMessage | PromiseLike<WsMessage>)) => void;
    };
    protected _openEventListeners: Array<(e: OpenEvent) => unknown>;
    protected _messageEventListeners: Array<(e: MessageEvent) => unknown>;
    protected _errorEventListeners: Array<(e: ErrorEvent) => unknown>;
    protected _closeEventListeners: Array<(e: CloseEvent) => unknown>;
    protected _messageListeners: Record<string, Array<(e: WsMessage) => unknown>>;
    protected _closing: boolean;
    protected _subscriptions: string[];
    get connected(): boolean;
    constructor();
    /**
     * Connect to local daemon via websocket.
     * @param daemonServerURL
     */
    connect(daemonServerURL?: string): Promise<boolean>;
    close(): Promise<void>;
    sendMessage(destination: string, command: string, data?: Record<string, unknown>): Promise<WsMessage>;
    createMessageTemplate(command: string, destination: string, data: Record<string, unknown>): {
        command: string;
        data: Record<string, unknown>;
        ack: boolean;
        origin: string;
        destination: string;
        request_id: string;
    };
    subscribe(service: string): Promise<GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse>>;
    addEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    removeEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    clearAllEventListeners(): void;
    /**
     * Add listener for message
     * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
     * @param listener - Triggered when a message arrives.
     */
    addMessageListener<D = unknown>(origin: string | undefined, listener: MessageListener<D>): void;
    removeMessageListener<D = unknown>(origin: string, listener: MessageListener<D>): void;
    clearAllMessageListeners(): void;
    protected onOpen(event: OpenEvent, url: string): Promise<GetMessageType<"daemon", "register_service", TRegisterServiceResponse>>;
    protected onError(error: ErrorEvent): void;
    protected onMessage(event: MessageEvent): void;
    protected onClose(event: CloseEvent): void;
}
export declare type TDaemon = InstanceType<typeof Daemon>;
export {};
