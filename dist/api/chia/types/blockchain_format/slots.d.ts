import { VDFInfo, VDFProof } from "./vdf";
import { bytes32 } from "./sized_bytes";
import { Optional, uint64, uint8 } from "../_python_types_";
export declare type ChallengeChainSubSlot = {
    challenge_chain_end_of_slot_vdf: VDFInfo;
    infused_challenge_chain_sub_slot_hash: Optional<bytes32>;
    subepoch_summary_hash: Optional<bytes32>;
    new_sub_slot_iters: Optional<uint64>;
    new_difficulty: Optional<uint64>;
};
export declare type InfusedChallengeChainSubSlot = {
    infused_challenge_chain_end_of_slot_vdf: VDFInfo;
};
export declare type RewardChainSubSlot = {
    end_of_slot_vdf: VDFInfo;
    challenge_chain_sub_slot_hash: bytes32;
    infused_challenge_chain_sub_slot_hash: Optional<bytes32>;
    deficit: uint8;
};
export declare type SubSlotProofs = {
    challenge_chain_slot_proof: VDFProof;
    infused_challenge_chain_slot_proof: Optional<VDFProof>;
    reward_chain_slot_proof: VDFProof;
};
