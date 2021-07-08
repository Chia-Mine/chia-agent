import { bytes32 } from "../types/blockchain_format/sized_bytes";
import { bool, G1Element, str, uint64 } from "../types/_python_types_";
import { CoinSolution } from "../types/coin_solution";
import { PoolState } from "../pools/pool_wallet_info";
export declare type FarmerRecord = {
    launcher_id: bytes32;
    p2_singleton_puzzle_hash: bytes32;
    delay_time: uint64;
    delay_puzzle_hash: bytes32;
    authentication_public_key: G1Element;
    singleton_tip: CoinSolution;
    singleton_tip_state: PoolState;
    points: uint64;
    difficulty: uint64;
    payout_instructions: str;
    is_pool_member: bool;
};
