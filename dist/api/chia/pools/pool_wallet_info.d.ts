import { G1Element, Optional, str, uint32, uint8 } from "../types/_python_types_";
import { bytes32 } from "../types/blockchain_format/sized_bytes";
import { Coin } from "../types/blockchain_format/coin";
import { Program } from "../types/blockchain_format/program";
export declare type PoolState = {
    version: uint8;
    state: uint8;
    target_puzzle_hash: bytes32;
    owner_pubkey: G1Element;
    pool_url: Optional<str>;
    relative_lock_height: uint32;
};
export declare type PoolWalletInfo = {
    current: PoolState;
    target: Optional<PoolState>;
    launcher_coin: Coin;
    launcher_id: bytes32;
    p2_singleton_puzzle_hash: bytes32;
    current_inner: Program;
    tip_singleton_coin_id: bytes32;
};
