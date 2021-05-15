import {FullBlock} from "../../chia/types/full_block";
import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, int, Optional, str, uint128, uint32, uint64} from "../../chia/types/_python_types_";
import {UnfinishedHeaderBlock} from "../../chia/types/unfinished_header_block";
import {CoinRecord} from "../../chia/types/coin_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {MempoolItem} from "../../chia/types/mempool_item";
import {IAgent} from "../../../agent.type";
import {AsyncMessage} from "../types";

export const chia_full_node_service = "chia_full_node";
export type chia_full_node_service = typeof chia_full_node_service;

export const get_blockchain_state_command = "get_blockchain_state";
export type get_blockchain_state_command = typeof get_blockchain_state_command;
export type TGetBlockchainStateRequest = {
};
export type TGetBlockchainStateResponse = {
  blockchain_state: {
    peak: Optional<BlockRecord>;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: Optional<uint32>;
      sync_progress_height: uint32;
    },
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
  };
};
export async function get_blockchain_state(agent: IAgent) {
  return agent.sendMessage(chia_full_node_service, get_blockchain_state_command, {}) as
    AsyncMessage<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateResponse>;
}



export const get_block_command = "get_block";
export type get_block_command = typeof get_block_command;
export type TGetBlockRequest = {
  header_hash: str;
};
export type TGetBlockResponse = {
  block: FullBlock;
}
export async function get_block(agent: IAgent, data: TGetBlockRequest) {
  return agent.sendMessage(chia_full_node_service, get_block_command, data) as
    AsyncMessage<chia_full_node_service, get_block_command, TGetBlockResponse>;
}



export const get_blocks_command = "get_blocks";
export type get_blocks_command = typeof get_blocks_command;
export type TGetBlocksRequest = {
  start: int;
  end: int;
  exclude_header_hash?: bool;
};
export type TGetBlocksResponse = {
  blocks: FullBlock[] | Array<FullBlock & {header_hash: str}>;
}
export async function get_blocks(agent: IAgent, data: TGetBlocksRequest) {
  return agent.sendMessage(chia_full_node_service, get_blocks_command, data) as
    AsyncMessage<chia_full_node_service, get_blocks_command, TGetBlocksResponse>;
}



export const get_block_record_by_height_command = "get_block_record_by_height";
export type get_block_record_by_height_command = typeof get_block_record_by_height_command;
export type TGetBlockRecordByHeightRequest = {
  height: int;
};
export type TGetBlockRecordByHeightResponse = {
  block_record: Optional<BlockRecord>;
};
export async function get_block_record_by_height(agent: IAgent, data: TGetBlockRecordByHeightRequest) {
  return agent.sendMessage(chia_full_node_service, get_block_record_by_height_command, data) as
    AsyncMessage<chia_full_node_service, get_block_record_by_height_command, TGetBlockRecordByHeightResponse>;
}



export const get_block_record_command = "get_block_record";
export type get_block_record_command = typeof get_block_record_command;
export type TGetBlockRecordRequest = {
  header_hash: str;
};
export type TGetBlockRecordResponse = {
  block_record: BlockRecord;
};
export async function get_block_record(agent: IAgent, data: TGetBlockRecordRequest) {
  return agent.sendMessage(chia_full_node_service, get_block_record_command, data) as
    AsyncMessage<chia_full_node_service, get_block_record_command, TGetBlockRecordResponse>;
}



export const get_block_records_command = "get_block_records";
export type get_block_records_command = typeof get_block_records_command;
export type TGetBlockRecordsRequest = {
  start: int;
  end: int;
};
export type TGetBlockRecordsResponse = {
  block_records: BlockRecord[];
};
export async function get_block_records(agent: IAgent, data: TGetBlockRecordsRequest) {
  return agent.sendMessage(chia_full_node_service, get_block_records_command, data) as
    AsyncMessage<chia_full_node_service, get_block_records_command, TGetBlockRecordsResponse>;
}



export const get_unfinished_block_headers_command = "get_unfinished_block_headers";
export type get_unfinished_block_headers_command = typeof get_unfinished_block_headers_command;
export type TGetUnfinishedBlockHeadersRequest = {
};
export type TGetUnfinishedBlockHeadersResponse = {
  headers: UnfinishedHeaderBlock[];
};
export async function get_unfinished_block_headers(agent: IAgent) {
  return agent.sendMessage(chia_full_node_service, get_network_space_command, {}) as
    AsyncMessage<chia_full_node_service, get_unfinished_block_headers_command, TGetUnfinishedBlockHeadersResponse>;
}



export const get_network_space_command = "get_network_space";
export type get_network_space_command = typeof get_network_space_command;
export type TGetNetworkSpaceRequest = {
  newer_block_header_hash: str;
  older_block_header_hash: str;
};
export type TGetNetworkSpaceResponse = {
  space: uint128;
};
export async function get_network_space(agent: IAgent, data: TGetNetworkSpaceRequest) {
  return agent.sendMessage(chia_full_node_service, get_network_space_command, data) as
    AsyncMessage<chia_full_node_service, get_network_space_command, TGetNetworkSpaceResponse>;
}



export const get_additions_and_removals_command = "get_additions_and_removals";
export type get_additions_and_removals_command = typeof get_additions_and_removals_command;
export type TGetAdditionsAndRemovalsRequest = {
  header_hash: str;
};
export type TGetAdditionsAndRemovalsResponse = {
  additions: CoinRecord[];
  removals: CoinRecord[];
};
export async function get_additions_and_removals(agent: IAgent, data: TGetAdditionsAndRemovalsRequest) {
  return agent.sendMessage(chia_full_node_service, get_additions_and_removals_command, data) as
    AsyncMessage<chia_full_node_service, get_additions_and_removals_command, TGetAdditionsAndRemovalsResponse>;
}



export const get_initial_freeze_period_command = "get_initial_freeze_period";
export type get_initial_freeze_period_command = typeof get_initial_freeze_period_command;
export type TGetInitialFreezePeriodRequest = {
};
export type TGetInitialFreezePeriodResponse = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export async function get_initial_freeze_period(agent: IAgent, data: TGetInitialFreezePeriodRequest) {
  return agent.sendMessage(chia_full_node_service, get_initial_freeze_period_command, data) as
    AsyncMessage<chia_full_node_service, get_initial_freeze_period_command, TGetInitialFreezePeriodResponse>;
}



export const get_network_info_command = "get_network_info";
export type get_network_info_command = typeof get_network_info_command;
export type TGetNetworkInfoRequest = {
};
export type TGetNetworkInfoResponse = {
  network_name: str;
  network_prefix: str;
};
export async function get_network_info(agent: IAgent, data: TGetNetworkInfoRequest) {
  return agent.sendMessage(chia_full_node_service, get_network_info_command, data) as
    AsyncMessage<chia_full_node_service, get_network_info_command, TGetNetworkInfoResponse>;
}



export const get_coin_records_by_puzzle_hash_command = "get_coin_records_by_puzzle_hash";
export type get_coin_records_by_puzzle_hash_command = typeof get_coin_records_by_puzzle_hash_command;
export type TGetCoinRecordsByPuzzleHashRequest = {
  puzzle_hash: str;
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
};
export type TGetCoinRecordsByPuzzleHashResponse = {
  coin_records: CoinRecord[];
};
export async function get_coin_records_by_puzzle_hash(agent: IAgent, data: TGetCoinRecordsByPuzzleHashRequest) {
  return agent.sendMessage(chia_full_node_service, get_coin_records_by_puzzle_hash_command, data) as
    AsyncMessage<chia_full_node_service, get_coin_records_by_puzzle_hash_command, TGetCoinRecordsByPuzzleHashResponse>;
}



export const get_coin_records_by_puzzle_hashes_command = "get_coin_records_by_puzzle_hashes";
export type get_coin_records_by_puzzle_hashes_command = typeof get_coin_records_by_puzzle_hashes_command;
export type TGetCoinRecordsByPuzzleHashesRequest = {
  puzzle_hashes: str[];
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
};
export type TGetCoinRecordsByPuzzleHashesResponse = {
  coin_records: CoinRecord[];
};
export async function get_coin_records_by_puzzle_hashes(agent: IAgent, data: TGetCoinRecordsByPuzzleHashesRequest) {
  return agent.sendMessage(chia_full_node_service, get_coin_records_by_puzzle_hashes_command, data) as
    AsyncMessage<chia_full_node_service, get_coin_records_by_puzzle_hashes_command, TGetCoinRecordsByPuzzleHashesResponse>;
}



export const get_coin_record_by_name_command = "get_coin_record_by_name";
export type get_coin_record_by_name_command = typeof get_coin_record_by_name_command;
export type TGetCoinRecordByNameRequest = {
  name: str;
};
export type TGetCoinRecordByNameResponse = {
  coin_record: CoinRecord;
};
export async function get_coin_record_by_name(agent: IAgent, data: TGetCoinRecordByNameRequest) {
  return agent.sendMessage(chia_full_node_service, get_coin_record_by_name_command, data) as
    AsyncMessage<chia_full_node_service, get_coin_record_by_name_command, TGetCoinRecordByNameResponse>;
}



export const push_tx_command = "push_tx";
export type push_tx_command = typeof push_tx_command;
export type TPushTxRequest = {
  spend_bundle: SpendBundle;
};
export type TPushTxResponse = {
  status: str; // Enum.name
};
export async function push_tx(agent: IAgent, data: TPushTxRequest) {
  return agent.sendMessage(chia_full_node_service, push_tx_command, data) as
    AsyncMessage<chia_full_node_service, push_tx_command, TPushTxResponse>;
}



export const get_all_mempool_tx_ids_command = "get_all_mempool_tx_ids";
export type get_all_mempool_tx_ids_command = typeof get_all_mempool_tx_ids_command;
export type TGetAllMempoolTxIdsRequest = {
};
export type TGetAllMempoolTxIdsResponse = {
  tx_ids: bytes32[];
};
export async function get_all_mempool_tx_ids(agent: IAgent, data: TGetAllMempoolTxIdsRequest) {
  return agent.sendMessage(chia_full_node_service, get_all_mempool_tx_ids_command, data) as
    AsyncMessage<chia_full_node_service, get_all_mempool_tx_ids_command, TGetAllMempoolTxIdsResponse>;
}



export const get_all_mempool_items_command = "get_all_mempool_items";
export type get_all_mempool_items_command = typeof get_all_mempool_items_command;
export type TGetAllMempoolItemsRequest = {
};
export type TGetAllMempoolItemsResponse = {
  mempool_items: Record<string, MempoolItem>;
};
export async function get_all_mempool_items(agent: IAgent) {
  return agent.sendMessage(chia_full_node_service, get_all_mempool_items_command, {}) as
    AsyncMessage<chia_full_node_service, get_all_mempool_items_command, TGetAllMempoolItemsResponse>;
}



export const get_mempool_item_by_tx_id_command = "get_mempool_item_by_tx_id";
export type get_mempool_item_by_tx_id_command = typeof get_mempool_item_by_tx_id_command;
export type TGetMempoolItemByTxIdRequest = {
  tx_id: str;
};
export type TGetMempoolItemByTxIdResponse = {
  mempool_item: MempoolItem;
};
export async function get_mempool_item_by_tx_id(agent: IAgent, data: TGetMempoolItemByTxIdRequest) {
  return agent.sendMessage(chia_full_node_service, get_mempool_item_by_tx_id_command, data) as
    AsyncMessage<chia_full_node_service, get_mempool_item_by_tx_id_command, TGetMempoolItemByTxIdResponse>;
}
