import {Optional} from "../../chia/types/_python_types_";
import {
  ChallengeChainSubSlot,
  InfusedChallengeChainSubSlot,
  RewardChainSubSlot,
  SubSlotProofs,
} from "./slots";

export type EndOfSubSlotBundle = {
  challenge_chain: ChallengeChainSubSlot;
  infused_challenge_chain: Optional<InfusedChallengeChainSubSlot>;
  reward_chain: RewardChainSubSlot;
  proofs: SubSlotProofs;
};
