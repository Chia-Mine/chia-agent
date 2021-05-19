import { bytes32 } from "./sized_bytes";
import { Optional, uint64, uint8 } from "../_python_types_";
export declare type SubEpochSummary = {
    prev_subepoch_summary_hash: bytes32;
    reward_chain_hash: bytes32;
    num_blocks_overflow: uint8;
    new_difficulty: Optional<uint64>;
    new_sub_slot_iters: Optional<uint64>;
};
