import { bool, Optional } from "../types/_python_types_";
import { G2Element } from "../../chia_rs/chia-bls/lib";
import { uint32, uint64, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { ProofOfSpace } from "../types/blockchain_format/proof_of_space";
import { PoolTarget } from "../../chia_rs/chia-protocol/pool_target";
import { ClassgroupElement } from "../types/blockchain_format/classgroup";
import {
  ChallengeChainSubSlot,
  RewardChainSubSlot,
} from "../types/blockchain_format/slots";
import {
  FoliageBlockData,
  FoliageTransactionBlock,
} from "../../chia_rs/chia-protocol/foliage";
import { RewardChainBlockUnfinished } from "../../chia_rs/chia-protocol/reward_chain_block";

export type SPSubSlotSourceData = {
  cc_sub_slot: ChallengeChainSubSlot;
  rc_sub_slot: RewardChainSubSlot;
};

export type SPVDFSourceData = {
  cc_vdf: ClassgroupElement;
  rc_vdf: ClassgroupElement;
};

export type SignagePointSourceData = {
  sub_slot_data: Optional<SPSubSlotSourceData>;
  vdf_data: Optional<SPVDFSourceData>;
};

export type NewSignagePoint = {
  challenge_hash: bytes32;
  challenge_chain_sp: bytes32;
  reward_chain_sp: bytes32;
  difficulty: uint64;
  sub_slot_iters: uint64;
  signage_point_index: uint8;
  peak_height: uint32;
  sp_source_data: Optional<SignagePointSourceData>;
};

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
  include_signature_source_data: bool;
};

export type RequestSignedValues = {
  quality_string: bytes32;
  foliage_block_data_hash: bytes32;
  foliage_transaction_block_hash: bytes32;
  foliage_block_data: Optional<FoliageBlockData>;
  foliage_transaction_block_data: Optional<FoliageTransactionBlock>;
  rc_block_unfinished: Optional<RewardChainBlockUnfinished>;
};

export type FarmingInfo = {
  challenge_hash: bytes32;
  sp_hash: bytes32;
  timestamp: uint64;
  passed: uint32;
  proofs: uint32;
  total_plots: uint32;
  lookup_time: uint64;
};

export type SignedValues = {
  quality_string: bytes32;
  foliage_block_data_signature: G2Element;
  foliage_transaction_block_signature: G2Element;
};
