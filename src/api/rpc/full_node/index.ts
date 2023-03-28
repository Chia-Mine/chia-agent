import {FullBlock} from "../../chia/types/full_block";
import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, float, int, Optional, str, uint128, uint32, uint64} from "../../chia/types/_python_types_";
import {UnfinishedHeaderBlock} from "../../chia/types/unfinished_header_block";
import {CoinRecord, CoinRecordBackwardCompatible} from "../../chia/types/coin_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {MempoolItem} from "../../chia/types/mempool_item";
import {TRPCAgent} from "../../../rpc";
import {EndOfSubSlotBundle} from "../../chia/types/end_of_slot_bundle";
import {SignagePoint} from "../../chia/full_node/signage_point";
import {CoinSpend} from "../../chia/types/coin_spend";
import {CLVMCost} from "../../chia/types/clvm_cost";
import {GetMessageType, ResType} from "../../types";
import {TDaemon} from "../../../daemon/index";
import {Mojos} from "../../chia/types/mojos";

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
      sync_tip_height: uint32; // full_node_rpc_api.py declares Optional<uint32> but it seems `None` would never be set
      sync_progress_height: uint32;
    },
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
    mempool_cost: CLVMCost;
    mempool_fees: Mojos;
    mempool_min_fees: {
      cost_5000000: float,
    },
    mempool_max_total_cost: int,
    block_max_cost: int,
    node_id: str,
  };
};
export type WsGetBlockchainStateMessage = GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateResponse>;
export async function get_blockchain_state<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetBlockchainStateResponse, WsGetBlockchainStateMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_blockchain_state_command);
}



export const get_block_command = "get_block";
export type get_block_command = typeof get_block_command;
export type TGetBlockRequest = {
  header_hash: str;
};
export type TGetBlockResponse = {
  block: FullBlock;
}
export type WsGetBlockMessage = GetMessageType<chia_full_node_service, get_block_command, TGetBlockResponse>;
export async function get_block<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlockRequest) {
  type R = ResType<T, TGetBlockResponse, WsGetBlockMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_command, data);
}



export const get_blocks_command = "get_blocks";
export type get_blocks_command = typeof get_blocks_command;
export type TGetBlocksRequest = {
  start: int;
  end: int;
  exclude_header_hash?: bool;
  exclude_reorged?: bool;
};
export type TGetBlocksResponse = {
  blocks: FullBlock[] | Array<FullBlock & {header_hash: str}>;
}
export type WsGetBlocksMessage = GetMessageType<chia_full_node_service, get_blocks_command, TGetBlocksResponse>;
export async function get_blocks<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlocksRequest) {
  type R = ResType<T, TGetBlocksResponse, WsGetBlocksMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_blocks_command, data);
}



export const get_block_count_metrics_command = "get_block_count_metrics";
export type get_block_count_metrics_command = typeof get_block_count_metrics_command;
export type TGetBlockCountMetricsResponse = {
  metrics: {
    "compact_blocks": int,
    "uncompact_blocks": int,
    "hint_count": int,
  };
}
export type WsGetBlockCountMetricsMessage = GetMessageType<chia_full_node_service, get_block_count_metrics_command, TGetBlockCountMetricsResponse>;
export async function get_block_count_metrics<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetBlockCountMetricsResponse, WsGetBlockCountMetricsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_count_metrics_command);
}



export const get_block_record_by_height_command = "get_block_record_by_height";
export type get_block_record_by_height_command = typeof get_block_record_by_height_command;
export type TGetBlockRecordByHeightRequest = {
  height: int;
};
export type TGetBlockRecordByHeightResponse = {
  block_record: Optional<BlockRecord>;
};
export type WsGetBlockRecordByHeightMessage = GetMessageType<chia_full_node_service, get_block_record_by_height_command, TGetBlockRecordByHeightResponse>;
export async function get_block_record_by_height<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlockRecordByHeightRequest) {
  type R = ResType<T, TGetBlockRecordByHeightResponse, WsGetBlockRecordByHeightMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_record_by_height_command, data);
}



export const get_block_record_command = "get_block_record";
export type get_block_record_command = typeof get_block_record_command;
export type TGetBlockRecordRequest = {
  header_hash: str;
};
export type TGetBlockRecordResponse = {
  block_record: BlockRecord;
};
export type WsGetBlockRecordMessage = GetMessageType<chia_full_node_service, get_block_record_command, TGetBlockRecordResponse>;
export async function get_block_record<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlockRecordRequest) {
  type R = ResType<T, TGetBlockRecordResponse, WsGetBlockRecordMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_record_command, data);
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
export type WsGetBlockRecordsMessage = GetMessageType<chia_full_node_service, get_block_records_command, TGetBlockRecordsResponse>;
export async function get_block_records<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlockRecordsRequest) {
  type R = ResType<T, TGetBlockRecordsResponse, WsGetBlockRecordsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_records_command, data);
}



export const get_block_spends_command = "get_block_spends";
export type get_block_spends_command = typeof get_block_spends_command;
export type TGetBlockSpendsRequest = {
  header_hash: str;
};
export type TGetBlockSpendsResponse = {
  block_spends: CoinSpend[];
};
export type WsGetBlockSpendsMessage = GetMessageType<chia_full_node_service, get_block_spends_command, TGetBlockSpendsResponse>;
export async function get_block_spends<T extends TRPCAgent | TDaemon>(agent: T, data: TGetBlockSpendsRequest) {
  type R = ResType<T, TGetBlockSpendsResponse, WsGetBlockSpendsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_block_spends_command, data);
}



export const get_unfinished_block_headers_command = "get_unfinished_block_headers";
export type get_unfinished_block_headers_command = typeof get_unfinished_block_headers_command;
export type TGetUnfinishedBlockHeadersRequest = {
};
export type TGetUnfinishedBlockHeadersResponse = {
  headers: UnfinishedHeaderBlock[];
};
export type WsGetUnfinishedBlockHeadersMessage = GetMessageType<chia_full_node_service, get_unfinished_block_headers_command, TGetUnfinishedBlockHeadersResponse>;
export async function get_unfinished_block_headers<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetUnfinishedBlockHeadersResponse, WsGetUnfinishedBlockHeadersMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_unfinished_block_headers_command);
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
export type WsGetNetworkSpaceMessage = GetMessageType<chia_full_node_service, get_network_space_command, TGetNetworkSpaceResponse>;
export async function get_network_space<T extends TRPCAgent | TDaemon>(agent: T, data: TGetNetworkSpaceRequest) {
  type R = ResType<T, TGetNetworkSpaceResponse, WsGetNetworkSpaceMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_network_space_command, data);
}



export const get_additions_and_removals_command = "get_additions_and_removals";
export type get_additions_and_removals_command = typeof get_additions_and_removals_command;
export type TGetAdditionsAndRemovalsRequest = {
  header_hash: str;
};
export type TGetAdditionsAndRemovalsResponse = {
  additions: CoinRecordBackwardCompatible[];
  removals: CoinRecordBackwardCompatible[];
};
export type WsGetAdditionsAndRemovalsMessage = GetMessageType<chia_full_node_service, get_additions_and_removals_command, TGetAdditionsAndRemovalsResponse>;
export async function get_additions_and_removals<T extends TRPCAgent | TDaemon>(agent: T, data: TGetAdditionsAndRemovalsRequest) {
  type R = ResType<T, TGetAdditionsAndRemovalsResponse, WsGetAdditionsAndRemovalsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_additions_and_removals_command, data);
}



export const get_initial_freeze_period_command_of_full_node = "get_initial_freeze_period";
export type get_initial_freeze_period_command_of_full_node = typeof get_initial_freeze_period_command_of_full_node;
export type TGetInitialFreezePeriodRequestOfFullNode = {
};
export type TGetInitialFreezePeriodResponseOfFullNode = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export type WsGetInitialFreezePeriodMessageOfFullNode = GetMessageType<chia_full_node_service, get_initial_freeze_period_command_of_full_node, TGetInitialFreezePeriodResponseOfFullNode>;
export async function get_initial_freeze_period_of_full_node<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetInitialFreezePeriodResponseOfFullNode, WsGetInitialFreezePeriodMessageOfFullNode>;
  return agent.sendMessage<R>(chia_full_node_service, get_initial_freeze_period_command_of_full_node);
}



export const get_network_info_command_of_full_node = "get_network_info";
export type get_network_info_command_of_full_node = typeof get_network_info_command_of_full_node;
export type TGetNetworkInfoRequestOfFullNode = {
};
export type TGetNetworkInfoResponseOfFullNode = {
  network_name: str;
  network_prefix: str;
};
export type WsGetNetworkInfoMessageOfFullNode = GetMessageType<chia_full_node_service, get_network_info_command_of_full_node, TGetNetworkInfoResponseOfFullNode>;
export async function get_network_info_of_full_node<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetNetworkInfoResponseOfFullNode, WsGetNetworkInfoMessageOfFullNode>;
  return agent.sendMessage<R>(chia_full_node_service, get_network_info_command_of_full_node);
}



export const get_recent_signage_point_or_eos_command = "get_recent_signage_point_or_eos";
export type get_recent_signage_point_or_eos_command = typeof get_recent_signage_point_or_eos_command;
export type TGetRecentSignagePointOrEOSCommandRequest = {
  challenge_hash: str;
} | {
  sp_hash: str;
};
export type TGetRecentSignagePointOrEOSCommandResponse = {
  eos: EndOfSubSlotBundle;
  time_received: float;
  reverted: bool;
} | {
  signage_point: SignagePoint;
  time_received: float;
  reverted: bool;
};
export type WsGetRecentSignagePointOrEOSCommandMessage = GetMessageType<chia_full_node_service, get_recent_signage_point_or_eos_command, TGetRecentSignagePointOrEOSCommandResponse>;
export async function get_recent_signage_point_or_eos<T extends TRPCAgent | TDaemon>(agent: T, data: TGetRecentSignagePointOrEOSCommandRequest) {
  type R = ResType<T, TGetRecentSignagePointOrEOSCommandResponse, WsGetRecentSignagePointOrEOSCommandMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_recent_signage_point_or_eos_command, data);
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
  coin_records: CoinRecordBackwardCompatible[];
};
export type WsGetCoinRecordsByPuzzleHashMessage = GetMessageType<chia_full_node_service, get_coin_records_by_puzzle_hash_command, TGetCoinRecordsByPuzzleHashResponse>;
export async function get_coin_records_by_puzzle_hash<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByPuzzleHashRequest) {
  type R = ResType<T, TGetCoinRecordsByPuzzleHashResponse, WsGetCoinRecordsByPuzzleHashMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_records_by_puzzle_hash_command, data);
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
  coin_records: CoinRecordBackwardCompatible[];
};
export type WsGetCoinRecordsByPuzzleHashesMessage = GetMessageType<chia_full_node_service, get_coin_records_by_puzzle_hashes_command, TGetCoinRecordsByPuzzleHashesResponse>;
export async function get_coin_records_by_puzzle_hashes<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByPuzzleHashesRequest) {
  type R = ResType<T, TGetCoinRecordsByPuzzleHashesResponse, WsGetCoinRecordsByPuzzleHashesMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_records_by_puzzle_hashes_command, data);
}



export const get_coin_record_by_name_command = "get_coin_record_by_name";
export type get_coin_record_by_name_command = typeof get_coin_record_by_name_command;
export type TGetCoinRecordByNameRequest = {
  name: str;
};
export type TGetCoinRecordByNameResponse = {
  coin_record: CoinRecordBackwardCompatible;
};
export type WsGetCoinRecordByNameMessage = GetMessageType<chia_full_node_service, get_coin_record_by_name_command, TGetCoinRecordByNameResponse>;
export async function get_coin_record_by_name<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordByNameRequest) {
  type R = ResType<T, TGetCoinRecordByNameResponse, WsGetCoinRecordByNameMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_record_by_name_command, data);
}



export const get_coin_records_by_names_command = "get_coin_records_by_names";
export type get_coin_records_by_names_command = typeof get_coin_records_by_names_command;
export type TGetCoinRecordsByNamesRequest = {
  names: str[];
  start_height?: uint32;
  end_height?: uint32;
  include_spent_coins?: bool;
};
export type TGetCoinRecordsByNamesResponse = {
  coin_records: CoinRecordBackwardCompatible[];
};
export type WsGetCoinRecordsByNamesMessage = GetMessageType<chia_full_node_service, get_coin_records_by_names_command, TGetCoinRecordsByNamesResponse>;
export async function get_coin_records_by_names<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByNamesRequest) {
  type R = ResType<T, TGetCoinRecordsByNamesResponse, WsGetCoinRecordsByNamesMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_records_by_names_command, data);
}




export const get_coin_records_by_parent_ids_command = "get_coin_records_by_parent_ids";
export type get_coin_records_by_parent_ids_command = typeof get_coin_records_by_parent_ids_command;
export type TGetCoinRecordsByParentIdsRequest = {
  parent_ids: str[];
  start_height?: uint32;
  end_height?: uint32;
  include_spent_coins?: bool;
};
export type TGetCoinRecordsByParentIdsResponse = {
  coin_records: CoinRecordBackwardCompatible[];
};
export type WsGetCoinRecordsByParentIdsMessage = GetMessageType<chia_full_node_service, get_coin_records_by_parent_ids_command, TGetCoinRecordsByParentIdsResponse>;
export async function get_coin_records_by_parent_ids<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByParentIdsRequest) {
  type R = ResType<T, TGetCoinRecordsByParentIdsResponse, WsGetCoinRecordsByParentIdsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_records_by_parent_ids_command, data);
}





export const get_coin_records_by_hint_command = "get_coin_records_by_hint";
export type get_coin_records_by_hint_command = typeof get_coin_records_by_hint_command;
export type TGetCoinRecordsByHintRequest = {
  hint: str;
  start_height?: uint32;
  end_height?: uint32;
  include_spent_coins?: bool;
};
export type TGetCoinRecordsByHintResponse = {
  coin_records: CoinRecordBackwardCompatible[];
};
export type WsGetCoinRecordsByHintMessage = GetMessageType<chia_full_node_service, get_coin_records_by_hint_command, TGetCoinRecordsByHintResponse>;
export async function get_coin_records_by_hint<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByHintRequest) {
  type R = ResType<T, TGetCoinRecordsByHintResponse, WsGetCoinRecordsByHintMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_coin_records_by_hint_command, data);
}




export const push_tx_command = "push_tx";
export type push_tx_command = typeof push_tx_command;
export type TPushTxRequest = {
  spend_bundle: SpendBundle;
};
export type TPushTxResponse = {
  status: str; // Enum.name
};
export type WsPushTxMessage = GetMessageType<chia_full_node_service, push_tx_command, TPushTxResponse>;
export async function push_tx<T extends TRPCAgent | TDaemon>(agent: T, data: TPushTxRequest) {
  type R = ResType<T, TPushTxResponse, WsPushTxMessage>;
  return agent.sendMessage<R>(chia_full_node_service, push_tx_command, data);
}



export const get_puzzle_and_solution_command = "get_puzzle_and_solution";
export type get_puzzle_and_solution_command = typeof get_puzzle_and_solution_command;
export type TGetPuzzleAndSolutionRequest = {
  coin_id: str;
  height: uint32;
};
export type TGetPuzzleAndSolutionResponse = {
  coin_solution: CoinSpend;
};
export type WsGetPuzzleAndSolutionMessage = GetMessageType<chia_full_node_service, get_puzzle_and_solution_command, TGetPuzzleAndSolutionResponse>;
export async function get_puzzle_and_solution<T extends TRPCAgent | TDaemon>(agent: T, data: TGetPuzzleAndSolutionRequest) {
  type R = ResType<T, TGetPuzzleAndSolutionResponse, WsGetPuzzleAndSolutionMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_puzzle_and_solution_command, data);
}



export const get_all_mempool_tx_ids_command = "get_all_mempool_tx_ids";
export type get_all_mempool_tx_ids_command = typeof get_all_mempool_tx_ids_command;
export type TGetAllMempoolTxIdsRequest = {
};
export type TGetAllMempoolTxIdsResponse = {
  tx_ids: bytes32[];
};
export type WsGetAllMempoolTxIdsMessage = GetMessageType<chia_full_node_service, get_all_mempool_tx_ids_command, TGetAllMempoolTxIdsResponse>;
export async function get_all_mempool_tx_ids<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetAllMempoolTxIdsResponse, WsGetAllMempoolTxIdsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_all_mempool_tx_ids_command);
}



export const get_all_mempool_items_command = "get_all_mempool_items";
export type get_all_mempool_items_command = typeof get_all_mempool_items_command;
export type TGetAllMempoolItemsRequest = {
};
export type TGetAllMempoolItemsResponse = {
  mempool_items: Record<string, MempoolItem>;
};
export type WsGetAllMempoolItemsMessage = GetMessageType<chia_full_node_service, get_all_mempool_items_command, TGetAllMempoolItemsResponse>;
export async function get_all_mempool_items<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetAllMempoolItemsResponse, WsGetAllMempoolItemsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_all_mempool_items_command);
}



export const get_mempool_item_by_tx_id_command = "get_mempool_item_by_tx_id";
export type get_mempool_item_by_tx_id_command = typeof get_mempool_item_by_tx_id_command;
export type TGetMempoolItemByTxIdRequest = {
  tx_id: str;
  include_pending?: bool;
};
export type TGetMempoolItemByTxIdResponse = {
  mempool_item: MempoolItem;
};
export type WsGetMempoolItemByTxIdMessage = GetMessageType<chia_full_node_service, get_mempool_item_by_tx_id_command, TGetMempoolItemByTxIdResponse>;
export async function get_mempool_item_by_tx_id<T extends TRPCAgent | TDaemon>(agent: T, data: TGetMempoolItemByTxIdRequest) {
  type R = ResType<T, TGetMempoolItemByTxIdResponse, WsGetMempoolItemByTxIdMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_mempool_item_by_tx_id_command, data);
}



export const get_fee_estimate_command = "get_fee_estimate";
export type get_fee_estimate_command = typeof get_fee_estimate_command;
export type TGetFeeEstimateRequest = {
  spend_bundle?: SpendBundle;
  cost?: uint64;
  spend_type?: "send_xch_transaction" | "cat_spend" | "take_offer" | "cancel_offer" | "nft_set_nft_did"
    | "nft_transfer_nft" | "create_new_pool_wallet" | "pw_absorb_rewards" | "create_new_did_wallet";
  spend_count?: uint64;
  target_times: int[];
};
export type TGetFeeEstimateResponse = {
  estimates: uint64[];
  target_times: int[];
  current_fee_rate: uint64;
  mempool_size: CLVMCost
  mempool_fees: Mojos;
  num_spends: int;
  mempool_max_size: CLVMCost;
  full_node_synced: bool;
  peak_height: uint32;
  last_peak_timestamp: uint64;
  node_time_utc: int;
  last_block_cost: int;
  fees_last_block: uint64;
  fee_rate_last_block: float;
  last_tx_block_height: int;
};
export type WsGetFeeEstimateMessage = GetMessageType<chia_full_node_service, get_fee_estimate_command, TGetFeeEstimateResponse>;
export async function get_fee_estimate<T extends TRPCAgent | TDaemon>(agent: T, data: TGetFeeEstimateRequest) {
  type R = ResType<T, TGetFeeEstimateResponse, WsGetFeeEstimateMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_fee_estimate_command, data);
}



// simulator RPCs
export const get_all_blocks_command = "get_all_blocks";
export type get_all_blocks_command = typeof get_all_blocks_command;
export type TGetAllBlocksResponse = {
  blocks: FullBlock[];
  success: bool;
};
export type WsGetAllBlocksMessage = GetMessageType<chia_full_node_service, get_all_blocks_command, TGetAllBlocksResponse>;
export async function get_all_blocks<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetAllBlocksResponse, WsGetAllBlocksMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_all_blocks_command);
}



export const farm_block_command = "farm_block";
export type farm_block_command = typeof farm_block_command;
export type TFarmBlockRequest = {
  address: str;
  guarantee_tx_block?: bool;
  blocks?: int;
};
export type TFarmBlockResponse = {
  new_peak_height: int;
  success: bool;
};
export type WsFarmBlockMessage = GetMessageType<chia_full_node_service, farm_block_command, TFarmBlockResponse>;
export async function farm_block<T extends TRPCAgent | TDaemon>(agent: T, data: TFarmBlockRequest){
  type R = ResType<T, TFarmBlockResponse, WsFarmBlockMessage>;
  return agent.sendMessage<R>(chia_full_node_service, farm_block_command, data);
}



export const set_auto_farming_command = "set_auto_farming";
export type set_auto_farming_command = typeof set_auto_farming_command;
export type TSetAutoFarmingRequest = {
  auto_farm: bool;
};
export type TSetAutoFarmingResponse = {
  auto_farm_enabled: bool;
  success: bool;
};
export type WsSetAutoFarmingMessage = GetMessageType<chia_full_node_service, set_auto_farming_command, TSetAutoFarmingResponse>;
export async function set_auto_farming<T extends TRPCAgent | TDaemon>(agent: T, data: TSetAutoFarmingRequest){
  type R = ResType<T, TSetAutoFarmingResponse, WsSetAutoFarmingMessage>;
  return agent.sendMessage<R>(chia_full_node_service, set_auto_farming_command, data);
}



export const get_auto_farming_command = "get_auto_farming";
export type get_auto_farming_command = typeof get_auto_farming_command;
export type TGetAutoFarmingResponse = {
  new_peak_height: uint64;
  success: bool;
};
export type WsGetAutoFarmingMessage = GetMessageType<chia_full_node_service, get_auto_farming_command, TGetAutoFarmingResponse>;
export async function get_auto_farming<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetAutoFarmingResponse, WsGetAutoFarmingMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_auto_farming_command);
}



export const get_farming_ph_command = "get_farming_ph";
export type get_farming_ph_command = typeof get_farming_ph_command;
export type TGetFarmingPhResponse = {
  puzzle_hash: str;
  success: bool;
};
export type WsGetFarmingPhMessage = GetMessageType<chia_full_node_service, get_farming_ph_command, TGetFarmingPhResponse>;
export async function get_farming_ph<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetFarmingPhResponse, WsGetFarmingPhMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_farming_ph_command);
}



export const get_all_coins_command = "get_all_coins";
export type get_all_coins_command = typeof get_all_coins_command;
export type TGetAllCoinsRequest = {
  include_spent_coins?: bool;
};
export type TGetAllCoinsResponse = {
  coin_records: CoinRecord[];
  success: bool;
};
export type WsGetAllCoinsMessage = GetMessageType<chia_full_node_service, get_all_coins_command, TGetAllCoinsResponse>;
export async function get_all_coins<T extends TRPCAgent | TDaemon>(agent: T, data: TGetAllCoinsRequest){
  type R = ResType<T, TGetAllCoinsResponse, WsGetAllCoinsMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_all_coins_command, data);
}



export const get_all_puzzle_hashes_command = "get_all_puzzle_hashes";
export type get_all_puzzle_hashes_command = typeof get_all_puzzle_hashes_command;
export type TGetAllPuzzleHashesResponse = {
  puzzle_hashes: Record<bytes32, Array<[uint128, int]>>;
  success: bool;
};
export type WsGetAllPuzzleHashesMessage = GetMessageType<chia_full_node_service, get_all_puzzle_hashes_command, TGetAllPuzzleHashesResponse>;
export async function get_all_puzzle_hashes<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetAllPuzzleHashesResponse, WsGetAllPuzzleHashesMessage>;
  return agent.sendMessage<R>(chia_full_node_service, get_all_puzzle_hashes_command);
}



export const revert_blocks_command = "revert_blocks";
export type revert_blocks_command = typeof revert_blocks_command;
export type TRevertBlocksRequest = {
  num_of_blocks?: int;
  delete_all_blocks?: bool;
};
export type TRevertBlocksResponse = {
  new_peak_height: int;
  success: bool;
};
export type WsRevertBlocksMessage = GetMessageType<chia_full_node_service, revert_blocks_command, TRevertBlocksResponse>;
export async function revert_blocks<T extends TRPCAgent | TDaemon>(agent: T, data: TRevertBlocksRequest){
  type R = ResType<T, TRevertBlocksResponse, WsRevertBlocksMessage>;
  return agent.sendMessage<R>(chia_full_node_service, revert_blocks_command, data);
}



export const reorg_blocks_command = "reorg_blocks";
export type reorg_blocks_command = typeof reorg_blocks_command;
export type TReorgBlocksRequest = {
  num_of_blocks_to_rev?: int;
  num_of_new_blocks?: int;
  revert_all_blocks?: bool;
  random_seed?: str;
};
export type TReorgBlocksResponse = {
  new_peak_height: int;
  success: bool;
};
export type WsReorgBlocksMessage = GetMessageType<chia_full_node_service, reorg_blocks_command, TReorgBlocksResponse>;
export async function reorg_blocks<T extends TRPCAgent | TDaemon>(agent: T, data: TReorgBlocksRequest){
  type R = ResType<T, TReorgBlocksResponse, WsReorgBlocksMessage>;
  return agent.sendMessage<R>(chia_full_node_service, reorg_blocks_command, data);
}

export type RpcFullNodeMessage =
  TGetAdditionsAndRemovalsResponse
  | TGetAllMempoolItemsResponse
  | TGetAllMempoolTxIdsResponse
  | TGetBlockResponse
  | TGetBlockRecordByHeightResponse
  | TGetBlockRecordResponse
  | TGetBlockRecordsResponse
  | TGetBlockSpendsResponse
  | TGetBlockchainStateResponse
  | TGetBlocksResponse
  | TGetBlockCountMetricsResponse
  | TGetRecentSignagePointOrEOSCommandResponse
  | TGetCoinRecordByNameResponse
  | TGetCoinRecordsByNamesResponse
  | TGetCoinRecordsByPuzzleHashResponse
  | TGetCoinRecordsByPuzzleHashesResponse
  | TGetCoinRecordsByParentIdsResponse
  | TGetCoinRecordsByHintResponse
  | TGetInitialFreezePeriodResponseOfFullNode
  | TGetMempoolItemByTxIdResponse
  | TGetNetworkInfoResponseOfFullNode
  | TGetNetworkSpaceResponse
  | TGetUnfinishedBlockHeadersResponse
  | TPushTxResponse
  | TGetPuzzleAndSolutionResponse
  | TGetFeeEstimateResponse
  | TGetAllBlocksResponse
  | TFarmBlockResponse
  | TSetAutoFarmingResponse
  | TGetAutoFarmingResponse
  | TGetFarmingPhResponse
  | TGetAllCoinsResponse
  | TGetAllPuzzleHashesResponse
  | TRevertBlocksResponse
  | TReorgBlocksResponse
;

export type RpcFullNodeMessageOnWs =
  WsGetAdditionsAndRemovalsMessage
  | WsGetAllMempoolItemsMessage
  | WsGetAllMempoolTxIdsMessage
  | WsGetBlockMessage
  | WsGetBlockRecordByHeightMessage
  | WsGetBlockRecordMessage
  | WsGetBlockRecordsMessage
  | WsGetBlockSpendsMessage
  | WsGetBlockchainStateMessage
  | WsGetBlocksMessage
  | WsGetBlockCountMetricsMessage
  | WsGetRecentSignagePointOrEOSCommandMessage
  | WsGetCoinRecordByNameMessage
  | WsGetCoinRecordsByNamesMessage
  | WsGetCoinRecordsByPuzzleHashMessage
  | WsGetCoinRecordsByPuzzleHashesMessage
  | WsGetCoinRecordsByParentIdsMessage
  | WsGetCoinRecordsByHintMessage
  | WsGetInitialFreezePeriodMessageOfFullNode
  | WsGetMempoolItemByTxIdMessage
  | WsGetNetworkInfoMessageOfFullNode
  | WsGetNetworkSpaceMessage
  | WsGetUnfinishedBlockHeadersMessage
  | WsPushTxMessage
  | WsGetPuzzleAndSolutionMessage
  | WsGetFeeEstimateMessage
  | WsGetAllBlocksMessage
  | WsFarmBlockMessage
  | WsSetAutoFarmingMessage
  | WsGetAutoFarmingMessage
  | WsGetFarmingPhMessage
  | WsGetAllCoinsMessage
  | WsGetAllPuzzleHashesMessage
  | WsRevertBlocksMessage
  | WsReorgBlocksMessage
;
