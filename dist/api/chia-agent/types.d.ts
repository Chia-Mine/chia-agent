export declare type GetMessageType<O extends string, C extends string, D> = {
    origin: O;
    command: C;
    ack: boolean;
    data: D;
    request_id: string;
    destination: string;
};
export declare type AsyncMessage<O extends string, C extends string, D> = Promise<GetMessageType<O, C, D>>;
