export declare type TMessage<D = unknown> = {
    command: string;
    ack: boolean;
    data: D;
    request_id: string;
    destination: string;
    origin: string;
};
export interface IAgent {
    sendMessage: <D>(destination: string, command: string, data?: Record<string, unknown>) => Promise<TMessage<D>>;
}
