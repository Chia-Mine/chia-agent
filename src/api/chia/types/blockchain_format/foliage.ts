import {PoolTarget} from "./pool_target";
import {G2Element, Optional, uint64} from "../_python_types_";
import {Coin} from "./coin";
import {bytes32} from "./sized_bytes";

export type Foliage = {
  prev_block_hash: bytes32; // bytes32
  reward_block_hash: bytes32; // bytes32
  foliage_block_data: FoliageBlockData; // FoliageBlockData
  foliage_block_data_signature: G2Element; // G2Element
  foliage_transaction_block_hash: Optional<bytes32>; // Optional[bytes32]
  foliage_transaction_block_signature: Optional<G2Element>; // Optional[G2Element]
};

export type FoliageBlockData = {
  unfinished_reward_block_hash: bytes32; // bytes32
  pool_target: PoolTarget; // PoolTarget
  pool_signature: Optional<G2Element>; // Optional[G2Element]  # Iff ProofOfSpace has a pool pk
  farmer_reward_puzzle_hash: bytes32; // bytes32
  extension_data: bytes32; // bytes32  # Used for future updates. Can be any 32 byte value initially
};

export type FoliageTransactionBlock = {
  prev_transaction_block_hash: bytes32; // bytes32
  timestamp: uint64; // uint64
  filter_hash: bytes32; // bytes32
  additions_root: bytes32; // bytes32
  removals_root: bytes32; // bytes32
  transactions_info_hash: bytes32; // bytes32
};

export type TransactionsInfo = {
  generator_root: bytes32; // bytes32  # sha256 of the block generator in this block
  generator_refs_root: bytes32; // bytes32  # sha256 of the concatenation of the generator ref list entries
  aggregated_signature: G2Element; // G2Element
  fees: uint64; // uint64  # This only includes user fees, not block rewards
  cost: uint64; // uint64  # This is the total cost of running this block in the CLVM
  reward_claims_incorporated: Coin[]; // List[Coin]  # These can be in any order
};