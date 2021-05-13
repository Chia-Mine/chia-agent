import {ProofOfSpace} from "./proof_of_space";
import {VDFInfo} from "./vdf";
import {G2Element} from "../unclassified_type";
import {uint128, uint32, uint8} from "./ints";
import {bytes32} from "./sized_bytes";

export type RewardChainBlock = {
  weight: uint128; // uint128
  height: uint32; // uint32
  total_iters: uint128; // uint128
  signage_point_index: uint8; // uint8
  pos_ss_cc_challenge_hash: bytes32; // bytes32
  proof_of_space: ProofOfSpace; // ProofOfSpace
  challenge_chain_sp_vdf?: VDFInfo; // Optional[VDFInfo]  # Not present for first sp in slot
  challenge_chain_sp_signature: G2Element; // G2Element
  challenge_chain_ip_vdf: VDFInfo; // VDFInfo
  reward_chain_sp_vdf?: VDFInfo; // Optional[VDFInfo]  # Not present for first sp in slot
  reward_chain_sp_signature: G2Element; // G2Element
  reward_chain_ip_vdf: VDFInfo; // VDFInfo
  infused_challenge_chain_ip_vdf?: VDFInfo; // Optional[VDFInfo]  # Iff deficit < 16
  is_transaction_block: boolean; // bool
};