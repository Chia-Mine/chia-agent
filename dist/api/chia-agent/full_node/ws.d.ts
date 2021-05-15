import { BlockRecord } from "../../chia/consensus/block_record";
import { bool, int, uint128, uint32, uint64 } from "../../chia/types/_python_types_";
export declare const get_blockchain_state = "get_blockchain_state";
export declare type TGetBlockchainState = {
    blockchain_state: {
        peak: BlockRecord;
        genesis_challenge_initialized: bool;
        sync: {
            sync_mode: bool;
            synced: bool;
            sync_tip_height: uint32;
            sync_progress_height: uint32;
        };
        difficulty: uint64;
        sub_slot_iters: uint64;
        space: uint128;
        mempool_size: int;
    };
};
