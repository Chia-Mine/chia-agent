import { float, int, str, uint64, uint8 } from "../types/_python_types_";
import { PoolWalletConfig } from "../pools/pool_config";
import { ErrorResponse } from "../protocols/pool_protocol";
export declare type PoolState = {
    points_found_since_start: int;
    points_found_24h: Array<[float, uint64]>;
    points_acknowledged_since_start: int;
    points_acknowledged_24h: Array<[float, uint64]>;
    next_farmer_update: float;
    next_pool_info_update: float;
    current_points: uint64;
    current_difficulty: uint64;
    pool_errors_24h: ErrorResponse[];
    authentication_token_timeout: uint8;
    pool_config: PoolWalletConfig;
    p2_singleton_puzzle_hash: str;
};
