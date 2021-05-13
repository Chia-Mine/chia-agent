import {EndOfSubSlotBundle} from "./end_of_slot_bundle";
import {RewardChainBlock} from "./blockchain_format/reward_chain_block";
import {VDFProof} from "./blockchain_format/vdf";
import {Foliage, FoliageTransactionBlock, TransactionsInfo} from "./blockchain_format/foliage";
import {SerializedProgram} from "./blockchain_format/program";
import {uint32} from "./blockchain_format/ints";

export type FullBlock = {
  finished_sub_slots: EndOfSubSlotBundle[]; // List[EndOfSubSlotBundle]  # If first sb
  reward_chain_block: RewardChainBlock; // RewardChainBlock  # Reward chain trunk data
  challenge_chain_sp_proof?: VDFProof; // Optional[VDFProof]  # If not first sp in sub-slot
  challenge_chain_ip_proof: VDFProof; // VDFProof
  reward_chain_sp_proof?: VDFProof; // Optional[VDFProof]  # If not first sp in sub-slot
  reward_chain_ip_proof: VDFProof; // VDFProof
  infused_challenge_chain_ip_proof?: VDFProof; // Optional[VDFProof]  # Iff deficit < 4
  foliage: Foliage; // Foliage  # Reward chain foliage data
  foliage_transaction_block?: FoliageTransactionBlock; // Optional[FoliageTransactionBlock]  # Reward chain foliage data (tx block)
  transactions_info?: TransactionsInfo; // Optional[TransactionsInfo]  # Reward chain foliage data (tx block additional)
  transactions_generator?: SerializedProgram; // Optional[SerializedProgram]  # Program that generates transactions
  transactions_generator_ref_list: uint32[]; // List[uint32]  # List of block heights of previous generators referenced in this block
};
