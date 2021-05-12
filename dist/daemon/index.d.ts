import type { CloseEvent, ErrorEvent, MessageEvent, OpenEvent } from "ws";
import * as WS from "ws";
export declare type EventType = "open" | "message" | "error" | "close";
export declare type Event = OpenEvent | MessageEvent | ErrorEvent | CloseEvent;
export declare type EventListener<T = Event> = (ev: T) => unknown;
declare type EventListenerOf<T> = T extends "open" ? EventListener<OpenEvent> : T extends "message" ? EventListener<MessageEvent> : T extends "error" ? EventListener<ErrorEvent> : T extends "close" ? EventListener<CloseEvent> : never;
export declare type MessageData = any;
export declare type MessageListener = (data: MessageData) => unknown;
export declare function getDaemon(): Daemon;
declare class Daemon {
    protected _socket: WS | null;
    protected _connected: boolean;
    protected _responseQueue: {
        [request_id: string]: (value: unknown) => void;
    };
    protected _openEventListeners: Array<(e: OpenEvent) => unknown>;
    protected _messageEventListeners: Array<(e: MessageEvent) => unknown>;
    protected _errorEventListeners: Array<(e: ErrorEvent) => unknown>;
    protected _closeEventListeners: Array<(e: CloseEvent) => unknown>;
    protected _messageListeners: Array<(e: MessageData) => unknown>;
    get connected(): boolean;
    constructor();
    connect(url?: string): Promise<void>;
    close(): Promise<void>;
    sendMessage(command: string, destination: string, data?: Record<string, unknown>): Promise<unknown>;
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
    addMessageListener(origin: string, listener: MessageListener): void;
    removeMessageListener(origin: string, listener: MessageListener): void;
    clearAllMessageListeners(): void;
    protected onOpen(event: OpenEvent): void;
    protected onError(error: ErrorEvent): void;
    protected onMessage(event: MessageEvent): void;
    protected onClose(event: CloseEvent): void;
}
export {};
