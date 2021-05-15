import {FullBlock} from "../../chia/types/full_block";
import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, int, Optional, str, uint128, uint32, uint64} from "../../chia/types/_python_types_";
import {UnfinishedHeaderBlock} from "../../chia/types/unfinished_header_block";
import {CoinRecord} from "../../chia/types/coin_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {MempoolItem} from "../../chia/types/mempool_item";
import {IAgent} from "../../../agent.type";

export const serviceName = "chia_full_node";

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
  const command = "get_blockchain_state";
  return agent.sendMessage<TGetBlockchainStateResponse>(serviceName, command, {});
}



export type TGetBlockRequest = {
  header_hash: str;
};
export type TGetBlockResponse = {
  block: FullBlock;
}
export async function get_block(agent: IAgent, data: TGetBlockRequest) {
  const command = "get_block";
  return agent.sendMessage<TGetBlockResponse>(serviceName, command, data);
}



export type TGetBlocksRequest = {
  start: int;
  end: int;
  exclude_header_hash?: bool;
};
export type TGetBlocksResponse = {
  blocks: FullBlock[] | Array<FullBlock & {header_hash: str}>;
}
export async function get_blocks(agent: IAgent, data: TGetBlocksRequest) {
  const command = "get_blocks";
  return agent.sendMessage<TGetBlocksResponse>(serviceName, command, data);
}



export type TGetBlockRecordByHeightRequest = {
  height: int;
};
export type TGetBlockRecordByHeightResponse = {
  block_record: Optional<BlockRecord>;
};
export async function get_block_record_by_height(agent: IAgent, data: TGetBlockRecordByHeightRequest) {
  const command = "get_block_record_by_height";
  return agent.sendMessage<TGetBlockRecordByHeightResponse>(serviceName, command, data);
}



export type TGetBlockRecordRequest = {
  header_hash: str;
};
export type TGetBlockRecordResponse = {
  block_record: BlockRecord;
};
export async function get_block_record(agent: IAgent, data: TGetBlockRecordRequest) {
  const command = "get_block_record";
  return agent.sendMessage<TGetBlockRecordResponse>(serviceName, command, data);
}



export type TGetBlockRecordsRequest = {
  start: int;
  end: int;
};
export type TGetBlockRecordsResponse = {
  block_records: BlockRecord[];
};
export async function get_block_records(agent: IAgent, data: TGetBlockRecordsRequest) {
  const command = "get_block_records";
  return agent.sendMessage<TGetBlockRecordsResponse>(serviceName, command, data);
}



export type TGetUnfinishedBlockHeadersRequest = {
};
export type TGetUnfinishedBlockHeadersResponse = {
  headers: UnfinishedHeaderBlock[];
};
export async function get_unfinished_block_headers(agent: IAgent) {
  const command = "get_unfinished_block_headers";
  return agent.sendMessage<TGetUnfinishedBlockHeadersResponse>(serviceName, command, {});
}



export type TGetNetworkSpaceRequest = {
  newer_block_header_hash: str;
  older_block_header_hash: str;
};
export type TGetNetworkSpaceResponse = {
  space: uint128;
};
export async function get_network_space(agent: IAgent, data: TGetNetworkSpaceRequest) {
  const command = "get_network_space";
  return agent.sendMessage<TGetNetworkSpaceResponse>(serviceName, command, data);
}



export type TGetAdditionsAndRemovalsRequest = {
  header_hash: str;
};
export type TGetAdditionsAndRemovalsResponse = {
  additions: CoinRecord[];
  removals: CoinRecord[];
};
export async function get_additions_and_removals(agent: IAgent, data: TGetAdditionsAndRemovalsRequest) {
  const command = "get_additions_and_removals";
  return agent.sendMessage<TGetAdditionsAndRemovalsResponse>(serviceName, command, data);
}



export type TGetInitialFreezePeriodRequest = {
};
export type TGetInitialFreezePeriodResponse = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export async function get_initial_freeze_period(agent: IAgent, data: TGetInitialFreezePeriodRequest) {
  const command = "get_initial_freeze_period";
  return agent.sendMessage<TGetInitialFreezePeriodResponse>(serviceName, command, data);
}



export type TGetNetworkInfoRequest = {
};
export type TGetNetworkInfoResponse = {
  network_name: str;
  network_prefix: str;
};
export async function get_network_info(agent: IAgent, data: TGetNetworkInfoRequest) {
  const command = "get_network_info";
  return agent.sendMessage<TGetNetworkInfoResponse>(serviceName, command, data);
}



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
  const command = "get_coin_records_by_puzzle_hash";
  return agent.sendMessage<TGetCoinRecordsByPuzzleHashResponse>(serviceName, command, data);
}



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
  const command = "get_coin_records_by_puzzle_hashes";
  return agent.sendMessage<TGetCoinRecordsByPuzzleHashesResponse>(serviceName, command, data);
}



export type TGetCoinRecordByNameRequest = {
  name: str;
};
export type TGetCoinRecordByNameResponse = {
  coin_record: CoinRecord;
};
export async function get_coin_record_by_name(agent: IAgent, data: TGetCoinRecordByNameRequest) {
  const command = "get_coin_record_by_name";
  return agent.sendMessage<TGetCoinRecordByNameResponse>(serviceName, command, data);
}



export type TPushTxRequest = {
  spend_bundle: SpendBundle;
};
export type TPushTxResponse = {
  status: str; // Enum.name
};
export async function push_tx(agent: IAgent, data: TPushTxRequest) {
  const command = "push_tx";
  return agent.sendMessage<TPushTxResponse>(serviceName, command, data);
}



export type TGetAllMempoolTxIdsRequest = {
};
export type TGetAllMempoolTxIdsResponse = {
  tx_ids: bytes32[];
};
export async function get_all_mempool_tx_ids(agent: IAgent, data: TGetAllMempoolTxIdsRequest) {
  const command = "get_all_mempool_tx_ids";
  return agent.sendMessage<TGetAllMempoolTxIdsResponse>(serviceName, command, data);
}



export type TGetAllMempoolItemsRequest = {
};
export type TGetAllMempoolItemsResponse = {
  mempool_items: Record<string, MempoolItem>;
};
export async function get_all_mempool_items(agent: IAgent) {
  const command = "get_all_mempool_items";
  return agent.sendMessage<TGetAllMempoolItemsResponse>(serviceName, command, {});
}



export type TGetMempoolItemByTxIdRequest = {
  tx_id: str;
};
export type TGetMempoolItemByTxIdResponse = {
  mempool_item: MempoolItem;
};
export async function get_mempool_item_by_tx_id(agent: IAgent, data: TGetMempoolItemByTxIdRequest) {
  const command = "get_mempool_item_by_tx_id";
  return agent.sendMessage<TGetMempoolItemByTxIdResponse>(serviceName, command, data);
}
