import { int, str, uint64 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { TRPCAgent } from "../../../rpc/index";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType, ResType } from "../../types";

export const chia_crawler_service = "chia_crawler";
export type chia_crawler_service = typeof chia_crawler_service;

export const get_peer_counts_command = "get_peer_counts";
export type get_peer_counts_command = typeof get_peer_counts_command;
export type TGetPeerCountsResponse = {
  peer_counts: {
    total_last_5_days: int;
    reliable_nodes: int;
    ipv4_last_5_days: bytes32;
    ipv6_last_5_days: uint64;
    versions: Record<str, int>;
  };
};
export type WsGetPeerCountsMessage = GetMessageType<
  chia_crawler_service,
  get_peer_counts_command,
  TGetPeerCountsResponse
>;
export async function get_peer_counts<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetPeerCountsResponse, WsGetPeerCountsMessage>;
  return agent.sendMessage<R>(chia_crawler_service, get_peer_counts_command);
}

export const get_ips_after_timestamp_command = "get_ips_after_timestamp";
export type get_ips_after_timestamp_command =
  typeof get_ips_after_timestamp_command;
export type TGetIpsAfterTimestampRequest = {
  after: int;
  offset?: int;
  limit?: int;
};
export type TGetIpsAfterTimestampResponse = {
  ips: str[];
  total: int;
};
export type WsGetIpsAfterTimestampMessage = GetMessageType<
  chia_crawler_service,
  get_ips_after_timestamp_command,
  TGetIpsAfterTimestampResponse
>;
export async function get_ips_after_timestamp<T extends TRPCAgent | TDaemon>(
  agent: T,
  params: TGetIpsAfterTimestampRequest,
) {
  type R = ResType<
    T,
    TGetIpsAfterTimestampResponse,
    WsGetIpsAfterTimestampMessage
  >;
  return agent.sendMessage<R>(
    chia_crawler_service,
    get_ips_after_timestamp_command,
    params,
  );
}

export type RpcCrawlerMessage =
  | TGetIpsAfterTimestampResponse
  | TGetPeerCountsResponse;

export type RpcCrawlerMessageOnWs =
  | WsGetIpsAfterTimestampMessage
  | WsGetPeerCountsMessage;
