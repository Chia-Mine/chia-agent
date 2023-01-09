import {NodeType} from "./chia/server/outbound_message";
import {float, int, str, uint16} from "./chia/types/_python_types_";
import {bytes32} from "./chia/types/blockchain_format/sized_bytes";
import {TRPCAgent} from "../rpc/index";
import {TDaemon} from "../daemon/index";

export type GetMessageType<O extends string, C extends string, D> = {
  origin: O;
  command: C;
  ack: boolean;
  data: D;
  request_id: string;
  destination: string;
};

export type ResType<T extends TRPCAgent | TDaemon, A, D> = T extends TRPCAgent ? A : D;

export const wallet_ui_service = "wallet_ui";
export const metrics_service = "metrics";

export type TConnectionGeneral = {
  type: NodeType,
  local_port: int,
  peer_host: str,
  peer_port: uint16,
  peer_server_port?: uint16,
  node_id: bytes32,
  creation_time: float,
  bytes_read: int,
  bytes_written: int,
  last_message_time: float,
};