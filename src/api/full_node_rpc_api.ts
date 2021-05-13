import {FullBlock} from "./types/full_block";
import {BlockRecord} from "./types/consensus/block_record";
import {uint128, uint32, uint64} from "./types/blockchain_format/ints";

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
  start: string;
  end: string;
  exclude_header_hash?: string;
};
export type TGetBlocksResponse = {
  blocks: Array<FullBlock & {header_hash?: string;}>;
}



export const get_block_record_by_height = "get_block_record_by_height";
export const get_block_record = "get_block_record";
export const get_block_records = "get_block_records";
export const get_unfinished_block_headers = "get_unfinished_block_headers";
export const get_network_space = "get_network_space";
export const get_additions_and_removals = "get_additions_and_removals";
export const get_initial_freeze_period = "get_initial_freeze_period";
export const get_network_info = "get_network_info";
export const get_coin_records_by_puzzle_hash = "get_coin_records_by_puzzle_hash";
export const get_coin_records_by_puzzle_hashes = "get_coin_records_by_puzzle_hashes";
export const get_coin_record_by_name = "get_coin_record_by_name";
export const push_tx = "push_tx";
export const get_all_mempool_tx_ids = "get_all_mempool_tx_ids";
export const get_all_mempool_items = "get_all_mempool_items";
export const get_mempool_item_by_tx_id = "get_mempool_item_by_tx_id";
