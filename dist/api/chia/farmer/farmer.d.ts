import { float, int, str, uint64 } from "../types/_python_types_";
import { TPartialsErrorResponse, TPoolInfoResponse } from "../../rpc/pool/index";
import { PoolWalletConfig } from "../pools/pool_config";
export declare type PoolState = {
    points_found_since_start: int;
    points_found_24h: Array<[float, uint64]>;
    points_acknowledged_since_start: int;
    points_acknowledged_24h: Array<[float, uint64]>;
    current_points_balance: int;
    current_difficulty: int;
    pool_errors_24h: TPartialsErrorResponse[];
    pool_info: TPoolInfoResponse;
    pool_config: PoolWalletConfig;
    p2_singleton_puzzle_hash: str;
};
