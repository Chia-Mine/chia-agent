import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { int, str, uint64 } from "../../chia/types/_python_types_";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType, metrics_service } from "../../types";

export const chia_crawler_service = "chia_crawler";
export type chia_crawler_service = typeof chia_crawler_service;

export type TPeerCounts = {
  total_last_5_days: int;
  reliable_nodes: int;
  ipv4_last_5_days: bytes32;
  ipv6_last_5_days: uint64;
  versions: Record<str, int>;
};

export const loaded_initial_peers_command = "loaded_initial_peers";
export type loaded_initial_peers_command = typeof loaded_initial_peers_command;
export type TLoadedInitialPeersBroadCast = {
  peer_counts: TPeerCounts;
};
export type WsLoadedInitialPeersMessage = GetMessageType<
  chia_crawler_service,
  loaded_initial_peers_command,
  TLoadedInitialPeersBroadCast
>;
export async function on_loaded_initial_peers(
  daemon: TDaemon,
  callback: (e: WsLoadedInitialPeersMessage) => unknown,
) {
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsCrawlerMessage) => {
    if (
      e.origin === chia_crawler_service &&
      e.command === loaded_initial_peers_command
    ) {
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_crawler_service, messageListener);
}

export const crawl_batch_completed_command = "crawl_batch_completed";
export type crawl_batch_completed_command =
  typeof crawl_batch_completed_command;
export type TCrawlBatchCompletedBroadCast = {
  peer_counts: TPeerCounts;
};
export type WsCrawlBatchCompletedMessage = GetMessageType<
  chia_crawler_service,
  crawl_batch_completed_command,
  TCrawlBatchCompletedBroadCast
>;
export async function on_crawl_batch_completed(
  daemon: TDaemon,
  callback: (e: WsCrawlBatchCompletedMessage) => unknown,
) {
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsCrawlerMessage) => {
    if (
      e.origin === chia_crawler_service &&
      e.command === crawl_batch_completed_command
    ) {
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_crawler_service, messageListener);
}

export type WsCrawlerMessage =
  | WsLoadedInitialPeersMessage
  | WsCrawlBatchCompletedMessage;
