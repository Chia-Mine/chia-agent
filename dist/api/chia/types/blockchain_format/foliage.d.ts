import { PoolTarget } from "./pool_target";
import { G2Element, Optional, uint64 } from "../_python_types_";
import { Coin } from "./coin";
import { bytes32 } from "./sized_bytes";
export declare type Foliage = {
    prev_block_hash: bytes32;
    reward_block_hash: bytes32;
    foliage_block_data: FoliageBlockData;
    foliage_block_data_signature: G2Element;
    foliage_transaction_block_hash: Optional<bytes32>;
    foliage_transaction_block_signature: Optional<G2Element>;
};
export declare type FoliageBlockData = {
    unfinished_reward_block_hash: bytes32;
    pool_target: PoolTarget;
    pool_signature: Optional<G2Element>;
    farmer_reward_puzzle_hash: bytes32;
    extension_data: bytes32;
};
export declare type FoliageTransactionBlock = {
    prev_transaction_block_hash: bytes32;
    timestamp: uint64;
    filter_hash: bytes32;
    additions_root: bytes32;
    removals_root: bytes32;
    transactions_info_hash: bytes32;
};
export declare type TransactionsInfo = {
    generator_root: bytes32;
    generator_refs_root: bytes32;
    aggregated_signature: G2Element;
    fees: uint64;
    cost: uint64;
    reward_claims_incorporated: Coin[];
};
