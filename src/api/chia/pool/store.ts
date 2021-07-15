import {bytes32} from "../types/blockchain_format/sized_bytes";
import {bool, G1Element, str, uint64} from "../types/_python_types_";
import {CoinSpend} from "../types/coin_spend";
import {PoolState} from "../pools/pool_wallet_info";

export type FarmerRecord = {
  launcher_id: bytes32; // # This uniquely identifies the singleton on the blockchain (ID for this farmer)
  p2_singleton_puzzle_hash: bytes32; // # Derived from the launcher id, delay_time and delay_puzzle_hash
  delay_time: uint64; // # Backup time after which farmer can claim rewards directly, if pool unresponsive
  delay_puzzle_hash: bytes32; // # Backup puzzlehash to claim rewards
  authentication_public_key: G1Element; // # This is the latest public key of the farmer (signs all partials)
  singleton_tip: CoinSpend; // # Last coin solution that is buried in the blockchain, for this singleton
  singleton_tip_state: PoolState; // # Current state of the singleton
  points: uint64; // # Total points accumulated since last rest (or payout)
  difficulty: uint64; // # Current difficulty for this farmer
  payout_instructions: str; // # This is where the pool will pay out rewards to the farmer
  is_pool_member: bool; // # If the farmer leaves the pool, this gets set to False
};
