import type { CloseEvent, ErrorEvent, MessageEvent, OpenEvent } from "ws";
import * as WS from "ws";
export declare type EventType = "open" | "message" | "error" | "close";
export declare type Event = OpenEvent | MessageEvent | ErrorEvent | CloseEvent;
export declare type EventListener<T = Event> = (ev: T) => unknown;
declare type EventListenerOf<T> = T extends "open" ? EventListener<OpenEvent> : T extends "message" ? EventListener<MessageEvent> : T extends "error" ? EventListener<ErrorEvent> : T extends "close" ? EventListener<CloseEvent> : never;
export declare type MessageData = {
    command: string;
    ack: boolean;
    data: any;
    request_id: string;
    destination: string;
    origin: string;
};
export declare type MessageListener = (data: MessageData) => unknown;
export declare function getDaemon(): Daemon;
declare class Daemon {
    protected _socket: WS | null;
    protected _connectedUrl: string;
    protected _responseQueue: {
        [request_id: string]: (value: unknown) => void;
    };
    protected _openEventListeners: Array<(e: OpenEvent) => unknown>;
    protected _messageEventListeners: Array<(e: MessageEvent) => unknown>;
    protected _errorEventListeners: Array<(e: ErrorEvent) => unknown>;
    protected _closeEventListeners: Array<(e: CloseEvent) => unknown>;
    protected _messageListeners: Record<string, Array<(e: MessageData) => unknown>>;
    get connected(): boolean;
    constructor();
    /**
     * Connect to local daemon via websocket.
     * @param url
     */
    connect(url?: string): Promise<void>;
    close(): Promise<void>;
    sendMessage(destination: string, command: string, data?: Record<string, unknown>): Promise<unknown>;
    createMessageTemplate(command: string, destination: string, data: Record<string, unknown>): {
        command: string;
        data: Record<string, unknown>;
        ack: boolean;
        origin: string;
        destination: string;
        request_id: string;
    };
    subscribe(service: string): Promise<unknown>;
    addEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    removeEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    clearAllEventListeners(): void;
    /**
     * Add listener for message
     * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
     * @param listener - Triggered when a message arrives.
     */
    addMessageListener(origin: string | undefined, listener: MessageListener): void;
    removeMessageListener(origin: string, listener: MessageListener): void;
    clearAllMessageListeners(): void;
    protected onOpen(event: OpenEvent, url: string): void;
    protected onError(error: ErrorEvent): void;
    protected onMessage(event: MessageEvent): void;
    protected onClose(event: CloseEvent): void;
}
export {};
