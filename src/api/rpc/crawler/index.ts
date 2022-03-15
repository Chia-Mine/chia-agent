import {int, str, uint64} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TRPCAgent} from "../../../rpc/index";

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
export async function get_peer_counts(agent: TRPCAgent) {
  return agent.sendMessage<TGetPeerCountsResponse>(chia_crawler_service, get_peer_counts_command);
}


export const get_ips_after_timestamp_command = "get_ips_after_timestamp";
export type get_ips_after_timestamp_command = typeof get_ips_after_timestamp_command;
export type TGetIpsAfterTimestampRequest = {
  after: int;
  offset?: int;
  limit?: int;
};
export type TGetIpsAfterTimestampResponse = {
  ips: str[];
  total: int;
};
export async function get_ips_after_timestamp(agent: TRPCAgent, params: TGetIpsAfterTimestampRequest){
  return agent.sendMessage<TGetIpsAfterTimestampResponse>(chia_crawler_service, get_ips_after_timestamp_command, params);
}
