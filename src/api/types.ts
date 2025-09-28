import { NodeType } from "./chia/protocols/outbound_message";
import { float, str } from "./chia/types/_python_types_";
import { int, uint16 } from "./chia_rs/wheel/python/sized_ints";
import { bytes32 } from "./chia_rs/wheel/python/sized_bytes";
import { TRPCAgent } from "../rpc/index";
import { TDaemon } from "../daemon/index";

export type GetMessageType<O extends string, C extends string, D> = {
  origin: O;
  command: C;
  ack: boolean;
  data: D;
  request_id: string;
  destination: string;
};

export type ResType<T extends TRPCAgent | TDaemon, A, D> = T extends TDaemon
  ? D
  : A;

export const wallet_ui_service = "wallet_ui";
export const metrics_service = "metrics";
export const unfinished_block_info_service = "unfinished_block_info";

export type TConnectionGeneral = {
  type: NodeType;
  local_port: int;
  peer_host: str;
  peer_port: uint16;
  peer_server_port?: uint16;
  node_id: bytes32;
  creation_time: float;
  bytes_read: int;
  bytes_written: int;
  last_message_time: float;
};
