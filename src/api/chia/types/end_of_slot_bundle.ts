import {
  ChallengeChainSubSlot,
  InfusedChallengeChainSubSlot,
  RewardChainSubSlot,
  SubSlotProofs
} from "./blockchain_format/slots";

export type EndOfSubSlotBundle = {
  challenge_chain: ChallengeChainSubSlot;
  infused_challenge_chain: Optional<InfusedChallengeChainSubSlot>;
  reward_chain: RewardChainSubSlot;
  proofs: SubSlotProofs;
};
