import {ProofOfSpace} from "../chia/types/blockchain_format/proof_of_space";

export const new_farming_info = "new_farming_info";
export type TNewFarmingInfo = {
  challenge_hash: string;
  passed_filter: number;
  proofs: number;
  signage_point: string;
  timestamp: number;
  total_plots:number
};

export const new_signage_point = "new_signage_point";
export type TNewSignagePoint = {
  proofs: ProofOfSpace[];
  signage_point: {
    challenge_chain_sp: string;
    challenge_hash: string;
    difficulty: number;
    reward_chain_sp: string;
    signage_point_index: number;
    sub_slot_iters: number;
  };
};
