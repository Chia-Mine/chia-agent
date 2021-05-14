import {ProofOfSpace} from "../chia/types/blockchain_format/proof_of_space";

export const serviceName = "chia_farmer";

export const get_signage_point = "get_signage_point";
export type TGetSignagePointRequest = {
  sp_hash: string;
};
export type TGetSignagePointResponse = {
  signage_point: {
    challenge_hash: string,
    challenge_chain_sp: string,
    reward_chain_sp: string,
    difficulty: number,
    sub_slot_iters: number,
    signage_point_index: number,
  },
  proofs: [string, ProofOfSpace],
};



export const get_signage_points = "get_signage_points";
export type TGetSignagePointsRequest = {
};
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};



export const get_reward_targets = "get_reward_targets";
export type TGetRewardTargetRequest = {
  search_for_private_key: boolean;
};
export type TGetRewardTargetResponse = {
  farmer_target: string;
  pool_target: string;
  have_farmer_sk: boolean;
  have_pool_sk: boolean;
} | {
  farmer_target: string;
  pool_target: string;
};



export const set_reward_targets = "set_reward_targets";
export type TSetRewardTargetRequest = {
  farmer_target?: string;
  pool_target?: string;
};
export type TSetRewardTargetResponse = {
};
