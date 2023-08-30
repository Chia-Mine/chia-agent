import {G2Element, Optional, uint32, uint64, uint8} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {ProofOfSpace} from "../types/blockchain_format/proof_of_space";
import {PoolTarget} from "../types/blockchain_format/pool_target";

export type NewSignagePoint = {
  challenge_hash: bytes32;
  challenge_chain_sp: bytes32;
  reward_chain_sp: bytes32;
  difficulty: uint64;
  sub_slot_iters: uint64;
  signage_point_index: uint8;
}

export type DeclareProofOfSpace = {
  challenge_hash: bytes32;
  challenge_chain_sp: bytes32;
  signage_point_index: uint8;
  reward_chain_sp: bytes32;
  proof_of_space: ProofOfSpace;
  challenge_chain_sp_signature: G2Element;
  reward_chain_sp_signature: G2Element;
  farmer_puzzle_hash: bytes32;
  pool_target: Optional<PoolTarget>;
  pool_signature: Optional<G2Element>;
}

export type RequestSignedValues = {
  quality_string: bytes32;
  foliage_block_data_hash: bytes32;
  foliage_transaction_block_hash: bytes32;
}

export type FarmingInfo = {
  challenge_hash: bytes32;
  sp_hash: bytes32;
  timestamp: uint64;
  passed: uint32;
  proofs: uint32;
  total_plots: uint32;
  lookup_time: uint64;
}

export type SignedValues = {
  quality_string: bytes32;
  foliage_block_data_signature: G2Element;
  foliage_transaction_block_signature: G2Element;
}