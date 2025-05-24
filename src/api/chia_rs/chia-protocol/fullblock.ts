import { Optional } from "../../chia/types/_python_types_";
import { uint32 } from "../wheel/python/sized_ints";
import { EndOfSubSlotBundle } from "./end_of_sub_slot_bundle";
import { RewardChainBlock } from "./reward_chain_block";
import { VDFProof } from "./vdf";
import { Foliage, FoliageTransactionBlock, TransactionsInfo } from "./foliage";
import { Program } from "./program";

export type FullBlock = {
  finished_sub_slots: EndOfSubSlotBundle[]; // List[EndOfSubSlotBundle]  # If first sb
  reward_chain_block: RewardChainBlock; // RewardChainBlock  # Reward chain trunk data
  challenge_chain_sp_proof: Optional<VDFProof>; // Optional[VDFProof]  # If not first sp in sub-slot
  challenge_chain_ip_proof: VDFProof; // VDFProof
  reward_chain_sp_proof: Optional<VDFProof>; // Optional[VDFProof]  # If not first sp in sub-slot
  reward_chain_ip_proof: VDFProof; // VDFProof
  infused_challenge_chain_ip_proof: Optional<VDFProof>; // Optional[VDFProof]  # Iff deficit < 4
  foliage: Foliage; // Foliage  # Reward chain foliage data
  foliage_transaction_block: Optional<FoliageTransactionBlock>; // Optional[FoliageTransactionBlock]  # Reward chain foliage data (tx block)
  transactions_info: Optional<TransactionsInfo>; // Optional[TransactionsInfo]  # Reward chain foliage data (tx block additional)
  transactions_generator: Optional<Program>; // Optional[SerializedProgram]  # Program that generates transactions
  transactions_generator_ref_list: uint32[]; // List[uint32]  # List of block heights of previous generators referenced in this block
};
