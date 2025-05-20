import { EndOfSubSlotBundle } from "./end_of_slot_bundle";
import { VDFProof } from "./blockchain_format/vdf";
import { bytes, Optional } from "./_python_types_";
import {
  Foliage,
  FoliageTransactionBlock,
} from "../../chia_rs/chia-protocol/foliage";
import { RewardChainBlockUnfinished } from "../../chia_rs/chia-protocol/reward_chain_block";

export type UnfinishedHeaderBlock = {
  // # Same as a FullBlock but without TransactionInfo and Generator, used by light clients
  finished_sub_slots: EndOfSubSlotBundle[]; // List[EndOfSubSlotBundle]  # If first sb
  reward_chain_block: RewardChainBlockUnfinished; // RewardChainBlockUnfinished  # Reward chain trunk data
  challenge_chain_sp_proof: Optional<VDFProof>; // Optional[VDFProof]  # If not first sp in sub-slot
  reward_chain_sp_proof: Optional<VDFProof>; // Optional[VDFProof]  # If not first sp in sub-slot
  foliage: Foliage; // Foliage  # Reward chain foliage data
  foliage_transaction_block: Optional<FoliageTransactionBlock>; // Optional[FoliageTransactionBlock]  # Reward chain foliage data (tx block)
  transactions_filter: bytes; // bytes  # Filter for block transactions
};
