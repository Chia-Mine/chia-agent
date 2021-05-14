import {ProofOfSpace} from "../chia/types/blockchain_format/proof_of_space";
import {None, str, uint64, uint8} from "../chia/types/_python_types_";
import {bytes32} from "../chia/types/blockchain_format/sized_bytes";

export const serviceName = "chia_farmer";

export const get_signage_point = "get_signage_point";
export type TGetSignagePointRequest = {
  sp_hash: str;
};
export type TGetSignagePointResponse = {
  signage_point: {
    challenge_hash: bytes32,
    challenge_chain_sp: bytes32,
    reward_chain_sp: bytes32,
    difficulty: uint64,
    sub_slot_iters: uint64,
    signage_point_index: uint8,
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
  farmer_target: str;
  pool_target: str;
  have_farmer_sk: boolean;
  have_pool_sk: boolean;
} | {
  farmer_target: str;
  pool_target: str;
};



export const set_reward_targets = "set_reward_targets";
export type TSetRewardTargetRequest = {
  farmer_target: str|None;
  pool_target: str|None;
};
export type TSetRewardTargetResponse = {
};
