import {VDFInfo, VDFProof} from "./vdf";
import {bytes32} from "./sized_bytes";
import {Optional, uint64, uint8} from "../_python_types_";

export type ChallengeChainSubSlot = {
  challenge_chain_end_of_slot_vdf: VDFInfo;
  infused_challenge_chain_sub_slot_hash: Optional<bytes32>; // Optional[bytes32]  # Only at the end of a slot
  subepoch_summary_hash: Optional<bytes32>; // Optional[bytes32]  # Only once per sub-epoch, and one sub-epoch delayed
  new_sub_slot_iters: Optional<uint64>; // # Only at the end of epoch, sub-epoch, and slot
  new_difficulty: Optional<uint64>; // # Only at the end of epoch, sub-epoch, and slot
};

export type InfusedChallengeChainSubSlot = {
  infused_challenge_chain_end_of_slot_vdf: VDFInfo;
};

export type RewardChainSubSlot = {
  end_of_slot_vdf: VDFInfo;
  challenge_chain_sub_slot_hash: bytes32; // bytes32
  infused_challenge_chain_sub_slot_hash: Optional<bytes32>; // Optional[bytes32]
  deficit: uint8; // uint8  # 16 or less. usually zero
};

export type SubSlotProofs = {
  challenge_chain_slot_proof: VDFProof;
  infused_challenge_chain_slot_proof: Optional<VDFProof>;
  reward_chain_slot_proof: VDFProof;
};
