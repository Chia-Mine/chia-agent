import {ProofOfSpace} from "./proof_of_space";
import {VDFInfo} from "./vdf";
import {bool, G2Element, Optional, uint128, uint32, uint8} from "../_python_types_";
import {bytes32} from "./sized_bytes";

export type RewardChainBlockUnfinished = {
  total_iters: uint128
  signage_point_index: uint8
  pos_ss_cc_challenge_hash: bytes32
  proof_of_space: ProofOfSpace
  challenge_chain_sp_vdf: Optional<VDFInfo>; // Optional[VDFInfo]  # Not present for first sp in slot
  challenge_chain_sp_signature: G2Element
  reward_chain_sp_vdf: Optional<VDFInfo>; // Optional[VDFInfo]  # Not present for first sp in slot
  reward_chain_sp_signature: G2Element
};

export type RewardChainBlock = {
  weight: uint128; // uint128
  height: uint32; // uint32
  total_iters: uint128; // uint128
  signage_point_index: uint8; // uint8
  pos_ss_cc_challenge_hash: bytes32; // bytes32
  proof_of_space: ProofOfSpace; // ProofOfSpace
  challenge_chain_sp_vdf: Optional<VDFInfo>; // Optional[VDFInfo]  # Not present for first sp in slot
  challenge_chain_sp_signature: G2Element; // G2Element
  challenge_chain_ip_vdf: VDFInfo; // VDFInfo
  reward_chain_sp_vdf: Optional<VDFInfo>; // Optional[VDFInfo]  # Not present for first sp in slot
  reward_chain_sp_signature: G2Element; // G2Element
  reward_chain_ip_vdf: VDFInfo; // VDFInfo
  infused_challenge_chain_ip_vdf: Optional<VDFInfo>; // Optional[VDFInfo]  # Iff deficit < 16
  is_transaction_block: bool; // bool
};