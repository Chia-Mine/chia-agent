import {EndOfSubSlotBundle} from "./end_of_slot_bundle";
import {RewardChainBlockUnfinished} from "./blockchain_format/reward_chain_block";
import {VDFProof} from "./blockchain_format/vdf";
import {Foliage, FoliageTransactionBlock, TransactionsInfo} from "./blockchain_format/foliage";
import {Program} from "./blockchain_format/program";
import {Optional, uint32} from "./_python_types_";

// Original structure is defined in chia_rs
// chia_rs/crates/chia-protocol/src/unfinished_block.rs
export type UnfinishedBlock = {
  // Full block, without the final VDFs
  finished_sub_slots: EndOfSubSlotBundle[], // If first sb
  reward_chain_block: RewardChainBlockUnfinished, // Reward chain trunk data
  challenge_chain_sp_proof: Optional<VDFProof>,  // If not first sp in sub-slot
  reward_chain_sp_proof: Optional<VDFProof>,     // If not first sp in sub-slot
  foliage: Foliage,                            // Reward chain foliage data
  foliage_transaction_block: Optional<FoliageTransactionBlock>, // Reward chain foliage data (tx block)
  transactions_info: Optional<TransactionsInfo>, // Reward chain foliage data (tx block additional)
  transactions_generator: Optional<Program>,     // Program that generates transactions
  transactions_generator_ref_list: uint32[], // List of block heights of previous generators referenced in this block
};
