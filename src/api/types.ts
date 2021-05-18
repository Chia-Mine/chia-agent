export type GetMessageType<O extends string, C extends string, D> = {
  origin: O;
  command: C;
  ack: boolean;
  data: D;
  request_id: string;
  destination: string;
};

export type AsyncMessage<O extends string, C extends string, D> = Promise<GetMessageType<O, C, D>>;

export const wallet_ui_service = "wallet_ui";
