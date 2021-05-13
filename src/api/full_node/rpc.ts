import {FullBlock} from "../types/full_block";
import {BlockRecord} from "../types/consensus/block_record";
import {uint128, uint32, uint64} from "../types/blockchain_format/ints";
import {UnfinishedHeaderBlock} from "../types/unfinished_header_block";
import {CoinRecord} from "../types/coin_record";
import {SpendBundle} from "../types/spend_bundle";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {MempoolItem} from "../types/mempool_item";

export const serviceName = "chia_full_node";

export const get_blockchain_state = "get_blockchain_state";
export type TGetBlockchainStateRequest = {
};
export type TGetBlockchainStateResponse = {
  blockchain_state: {
    peak?: BlockRecord;
    genesis_challenge_initialized: boolean;
    sync: {
      sync_mode: boolean;
      synced: boolean;
      sync_tip_height?: uint32;
      sync_progress_height: uint32;
    },
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: number; // built-in int
  };
};



export const get_block = "get_block";
export type TGetBlockRequest = {
  header_hash: string;
};
export type TGetBlockResponse = {
  block: FullBlock;
}



export const get_blocks = "get_blocks";
export type TGetBlocksRequest = {
  start: number;
  end: number;
  exclude_header_hash?: boolean;
};
export type TGetBlocksResponse = {
  blocks: Array<FullBlock & {header_hash?: string;}>;
}



export const get_block_record_by_height = "get_block_record_by_height";
export type TGetBlockRecordByHeightRequest = {
  height: number;
};
export type TGetBlockRecordByHeightResponse = {
  block_record?: BlockRecord;
};



export const get_block_record = "get_block_record";
export type TGetBlockRecordRequest = {
  header_hash: string;
};
export type TGetBlockRecordResponse = {
  block_record: BlockRecord;
};



export const get_block_records = "get_block_records";
export type TGetBlockRecordsRequest = {
  start: number;
  end: number;
};
export type TGetBlockRecordsResponse = {
  block_records: BlockRecord[];
};




export const get_unfinished_block_headers = "get_unfinished_block_headers";
export type TGetUnfinishedBlockHeadersRequest = {
};
export type TGetUnfinishedBlockHeadersResponse = {
  headers: UnfinishedHeaderBlock[];
};



export const get_network_space = "get_network_space";
export type TGetNetworkSpaceRequest = {
  newer_block_header_hash: string;
  older_block_header_hash: string;
};
export type TGetNetworkSpaceResponse = {
  space: uint128;
};



export const get_additions_and_removals = "get_additions_and_removals";
export type TGetAdditionsAndRemovalsRequest = {
  header_hash: string;
};
export type TGetAdditionsAndRemovalsResponse = {
  additions: CoinRecord[];
  removals: CoinRecord[];
};



export const get_initial_freeze_period = "get_initial_freeze_period";
export type TGetInitialFreezePeriodRequest = {
};
export type TGetInitialFreezePeriodResponse = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};



export const get_network_info = "get_network_info";
export type TGetNetworkInfoRequest = {
};
export type TGetNetworkInfoResponse = {
  network_name: string;
  network_prefix: string;
};



export const get_coin_records_by_puzzle_hash = "get_coin_records_by_puzzle_hash";
export type TGetCoinRecordsByPuzzleHashRequest = {
  puzzle_hash: string;
  start_height: number;
  end_height: number;
  include_spent_coins: number;
};
export type TGetCoinRecordsByPuzzleHashResponse = {
  coin_records: CoinRecord[];
};



export const get_coin_records_by_puzzle_hashes = "get_coin_records_by_puzzle_hashes";
export type TGetCoinRecordsByPuzzleHashesRequest = {
  puzzle_hashes: string;
  start_height: number;
  end_height: number;
  include_spent_coins: number;
};
export type TGetCoinRecordsByPuzzleHashesResponse = {
  coin_records: CoinRecord[];
};



export const get_coin_record_by_name = "get_coin_record_by_name";
export type TGetCoinRecordByNameRequest = {
  name: string;
};
export type TGetCoinRecordByNameResponse = {
  coin_record: CoinRecord;
};



export const push_tx = "push_tx";
export type TPushTxRequest = {
  spend_bundle: SpendBundle;
};
export type TPushTxResponse = {
  status: string;
};



export const get_all_mempool_tx_ids = "get_all_mempool_tx_ids";
export type TGetAllMempoolTxIdsRequest = {
};
export type TGetAllMempoolTxIdsResponse = {
  tx_ids: bytes32[];
};



export const get_all_mempool_items = "get_all_mempool_items";
export type TGetAllMempoolItemsRequest = {
};
export type TGetAllMempoolItemsResponse = {
  mempool_items: Record<string, MempoolItem>;
};



export const get_mempool_item_by_tx_id = "get_mempool_item_by_tx_id";
export type TGetMempoolItemByTxIdRequest = {
  tx_id: string;
};
export type TGetMempoolItemByTxIdResponse = {
  mempool_item: MempoolItem;
};
