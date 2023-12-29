import {float, int, str, uint32, uint64, uint8} from "../types/_python_types_";
import {PoolWalletConfig} from "../pools/pool_config";
import {ErrorResponse} from "../protocols/pool_protocol";

// dependency: self.pool_state, by: get_pool_state of Farmer RPC API
/*
if p2_singleton_puzzle_hash not in self.pool_state:
    self.authentication_keys[bytes(pool_config.authentication_public_key)] = authentication_sk
    self.pool_state[p2_singleton_puzzle_hash] = {
        "points_found_since_start": 0,
        "points_found_24h": [],
        "points_acknowledged_since_start": 0,
        "points_acknowledged_24h": [],
        "current_points_balance": 0,
        "current_difficulty": 10,
        "pool_errors_24h": [],
        "pool_info": {},
    }
    self.log.info(f"Added pool: {pool_config}")
self.pool_state[p2_singleton_puzzle_hash]["pool_config"] = pool_config

# Makes a GET request to the pool to get the updated information
async with aiohttp.ClientSession() as session:
    async with session.get(f"http://{pool_config.pool_url}/pool_info") as resp:
        if resp.ok:
            self.pool_state[p2_singleton_puzzle_hash]["pool_info"] = json.loads(await resp.text())
        else:
            self.log.error(f"Error fetching pool info from {pool_config.pool_url}, {resp.status}")
 */
export type PoolState = {
  points_found_since_start: int;
  points_found_24h: Array<[uint32, uint64]>;
  points_acknowledged_since_start: int;
  points_acknowledged_24h: Array<[uint32, uint64]>;
  valid_partials_since_start: int;
  valid_partials_24h: Array<[uint32, uint64]>;
  invalid_partials_since_start: int;
  invalid_partials_24h: Array<[uint32, uint64]>;
  insufficient_partials_since_start: int;
  insufficient_partials_24h: Array<[uint32, uint64]>;
  stale_partials_since_start: int;
  stale_partials_24h: Array<[uint32, uint64]>;
  missing_partials_since_start: int;
  missing_partials_24h: Array<[uint32, uint64]>;
  next_farmer_update: float;
  next_pool_info_update: float;
  current_points: uint64;
  current_difficulty: uint64;
  pool_errors_24h: Array<[uint32, ErrorResponse]>;
  authentication_token_timeout: uint8;
  pool_config: PoolWalletConfig;
  p2_singleton_puzzle_hash: str; // This property is added at `get_pool_state()` in chia/rpc/farmer_rpc_api.py
  plot_count: int; // This property is added at `get_pool_state()` in chia/rpc/farmer_rpc_api.py
};

// depends: rpc_response in get_plots, by: get_plots of Farmer API
