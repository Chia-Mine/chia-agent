import {FullBlock} from "../chia/types/full_block";
import {BlockRecord} from "../chia/consensus/block_record";
import {bool, int, Optional, str, uint128, uint32, uint64} from "../chia/types/_python_types_";
import {UnfinishedHeaderBlock} from "../chia/types/unfinished_header_block";
import {CoinRecord} from "../chia/types/coin_record";
import {SpendBundle} from "../chia/types/spend_bundle";
import {bytes32} from "../chia/types/blockchain_format/sized_bytes";
import {MempoolItem} from "../chia/types/mempool_item";

export const serviceName = "chia_full_node";

export const get_blockchain_state = "get_blockchain_state";
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



export const get_block = "get_block";
export type TGetBlockRequest = {
  header_hash: str;
};
export type TGetBlockResponse = {
  block: FullBlock;
}



export const get_blocks = "get_blocks";
export type TGetBlocksRequest = {
  start: int;
  end: int;
  exclude_header_hash?: bool;
};
export type TGetBlocksResponse = {
  blocks: FullBlock[] | Array<FullBlock & {header_hash: str}>;
}



export const get_block_record_by_height = "get_block_record_by_height";
export type TGetBlockRecordByHeightRequest = {
  height: int;
};
export type TGetBlockRecordByHeightResponse = {
  block_record: Optional<BlockRecord>;
};



export const get_block_record = "get_block_record";
export type TGetBlockRecordRequest = {
  header_hash: str;
};
export type TGetBlockRecordResponse = {
  block_record: BlockRecord;
};



export const get_block_records = "get_block_records";
export type TGetBlockRecordsRequest = {
  start: int;
  end: int;
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
  newer_block_header_hash: str;
  older_block_header_hash: str;
};
export type TGetNetworkSpaceResponse = {
  space: uint128;
};



export const get_additions_and_removals = "get_additions_and_removals";
export type TGetAdditionsAndRemovalsRequest = {
  header_hash: str;
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
  network_name: str;
  network_prefix: str;
};



export const get_coin_records_by_puzzle_hash = "get_coin_records_by_puzzle_hash";
export type TGetCoinRecordsByPuzzleHashRequest = {
  puzzle_hash: str;
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
};
export type TGetCoinRecordsByPuzzleHashResponse = {
  coin_records: CoinRecord[];
};



export const get_coin_records_by_puzzle_hashes = "get_coin_records_by_puzzle_hashes";
export type TGetCoinRecordsByPuzzleHashesRequest = {
  puzzle_hashes: str[];
  start_height: uint32;
  end_height: uint32;
  include_spent_coins: bool;
};
export type TGetCoinRecordsByPuzzleHashesResponse = {
  coin_records: CoinRecord[];
};



export const get_coin_record_by_name = "get_coin_record_by_name";
export type TGetCoinRecordByNameRequest = {
  name: str;
};
export type TGetCoinRecordByNameResponse = {
  coin_record: CoinRecord;
};



export const push_tx = "push_tx";
export type TPushTxRequest = {
  spend_bundle: SpendBundle;
};
export type TPushTxResponse = {
  status: str; // Enum.name
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
  tx_id: str;
};
export type TGetMempoolItemByTxIdResponse = {
  mempool_item: MempoolItem;
};
