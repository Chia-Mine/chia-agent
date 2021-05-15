import type { CloseEvent, ErrorEvent, MessageEvent, OpenEvent } from "ws";
import * as WS from "ws";
import { IAgent, TMessage } from "../agent.type";
export declare type EventType = "open" | "message" | "error" | "close";
export declare type Event = OpenEvent | MessageEvent | ErrorEvent | CloseEvent;
export declare type EventListener<T = Event> = (ev: T) => unknown;
declare type EventListenerOf<T> = T extends "open" ? EventListener<OpenEvent> : T extends "message" ? EventListener<MessageEvent> : T extends "error" ? EventListener<ErrorEvent> : T extends "close" ? EventListener<CloseEvent> : never;
export declare type MessageListener<D = unknown> = (msg: TMessage<D>) => unknown;
export declare function getDaemon(): Daemon;
declare class Daemon implements IAgent {
    protected _socket: WS | null;
    protected _connectedUrl: string;
    protected _responseQueue: {
        [request_id: string]: (value: (TMessage<any> | PromiseLike<TMessage<any>>)) => void;
    };
    protected _openEventListeners: Array<(e: OpenEvent) => unknown>;
    protected _messageEventListeners: Array<(e: MessageEvent) => unknown>;
    protected _errorEventListeners: Array<(e: ErrorEvent) => unknown>;
    protected _closeEventListeners: Array<(e: CloseEvent) => unknown>;
    protected _messageListeners: Record<string, Array<(e: TMessage) => unknown>>;
    protected _closing: boolean;
    get connected(): boolean;
    constructor();
    /**
     * Connect to local daemon via websocket.
     * @param url
     */
    connect(url?: string): Promise<boolean>;
    close(): Promise<void>;
    sendMessage<D = unknown>(destination: string, command: string, data?: Record<string, unknown>): Promise<TMessage<D>>;
    createMessageTemplate(command: string, destination: string, data: Record<string, unknown>): {
        command: string;
        data: Record<string, unknown>;
        ack: boolean;
        origin: string;
        destination: string;
        request_id: string;
    };
    subscribe(service: string): Promise<TMessage<unknown> | null>;
    addEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    removeEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>): void;
    clearAllEventListeners(): void;
    /**
     * Add listener for message
     * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
     * @param listener - Triggered when a message arrives.
     */
    addMessageListener<D = unknown>(origin: string | undefined, listener: MessageListener<D>): void;
    removeMessageListener(origin: string, listener: MessageListener): void;
    clearAllMessageListeners(): void;
    protected onOpen(event: OpenEvent, url: string): Promise<TMessage<unknown> | null>;
    protected onError(error: ErrorEvent): void;
    protected onMessage(event: MessageEvent): void;
    protected onClose(event: CloseEvent): void;
}
export {};
