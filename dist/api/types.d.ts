export declare type GetMessageType<O extends string, C extends string, D> = {
    origin: O;
    command: C;
    ack: boolean;
    data: D;
    request_id: string;
    destination: string;
};
export declare const wallet_ui_service = "wallet_ui";
