import {
  ChallengeChainSubSlot,
  InfusedChallengeChainSubSlot,
  RewardChainSubSlot,
  SubSlotProofs
} from "./blockchain_format/slots";
import {Optional} from "./_python_types_";

export type EndOfSubSlotBundle = {
  challenge_chain: ChallengeChainSubSlot;
  infused_challenge_chain: Optional<InfusedChallengeChainSubSlot>;
  reward_chain: RewardChainSubSlot;
  proofs: SubSlotProofs;
};
