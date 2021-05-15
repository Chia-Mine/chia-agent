import { EndOfSubSlotBundle } from "./end_of_slot_bundle";
import { VDFProof } from "./blockchain_format/vdf";
import { Foliage, FoliageTransactionBlock } from "./blockchain_format/foliage";
import { bytes, Optional } from "./_python_types_";
import { RewardChainBlockUnfinished } from "./blockchain_format/reward_chain_block";
export declare type UnfinishedHeaderBlock = {
    finished_sub_slots: EndOfSubSlotBundle[];
    reward_chain_block: RewardChainBlockUnfinished;
    challenge_chain_sp_proof: Optional<VDFProof>;
    reward_chain_sp_proof: Optional<VDFProof>;
    foliage: Foliage;
    foliage_transaction_block: Optional<FoliageTransactionBlock>;
    transactions_filter: bytes;
};
