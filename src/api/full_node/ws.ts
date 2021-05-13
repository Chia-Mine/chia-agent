import {BlockRecord} from "../chia/consensus/block_record";
import {uint128, uint32, uint64} from "../chia/types/_python_types_";

export const get_blockchain_state = "get_blockchain_state";
export type TGetBlockchainState = {
  blockchain_state: {
    peak: BlockRecord;
    genesis_challenge_initialized: boolean;
    sync: {
      sync_mode: boolean;
      synced: boolean;
      sync_tip_height: uint32;
      sync_progress_height: uint32;
    };
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: number;
  };
};
