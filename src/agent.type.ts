import {serviceName} from "./api/chia-agent/farmer/rpc";
import {
  new_farming_info,
  new_signage_point,
  TNewFarmingInfoBroadCast,
  TNewSignagePointBroadCast
} from "./api/chia-agent/farmer/ws";

export type GetMessageType<O extends string, C extends string, D> = {
  origin: O;
  command: C;
  ack: boolean;
  data: D;
  request_id: string;
  destination: string;
};

export type TMessage<D = unknown> =
  GetMessageType<typeof serviceName, typeof new_farming_info, TNewFarmingInfoBroadCast>
  | GetMessageType<typeof serviceName, typeof new_signage_point, TNewSignagePointBroadCast>
  ;

export interface IAgent {
  sendMessage: <D>(destination: string, command: string, data?: Record<string, unknown>) => Promise<TMessage<D>>;
}
