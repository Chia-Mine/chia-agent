import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {bool, str, uint64, uint8} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {IAgent} from "../../../agent.type";
import {AsyncMessage} from "../types";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

export const get_signage_point_command = "get_signage_point";
export type get_signage_point_command = typeof get_signage_point_command;
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
export async function get_signage_point(agent: IAgent, data: TGetSignagePointRequest) {
  return agent.sendMessage(chia_farmer_service, get_signage_point_command, data) as
    AsyncMessage<chia_farmer_service, get_signage_point_command, TGetSignagePointResponse>;
}


export const get_signage_points_command = "get_signage_points";
export type get_signage_points_command = typeof get_signage_points_command;
export type TGetSignagePointsRequest = {
};
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};
export async function get_signage_points(agent: IAgent){
  return agent.sendMessage(chia_farmer_service, get_signage_points_command) as
    AsyncMessage<chia_farmer_service, get_signage_points_command, TGetSignagePointsResponse>;
}



export const get_reward_targets_command = "get_reward_targets";
export type get_reward_targets_command = typeof get_reward_targets_command;
export type TGetRewardTargetRequest = {
  search_for_private_key: bool;
};
export type TGetRewardTargetResponse = {
  farmer_target: str;
  pool_target: str;
  have_farmer_sk: bool;
  have_pool_sk: bool;
} | {
  farmer_target: str;
  pool_target: str;
};
export async function get_reward_targets(agent: IAgent, data: TGetRewardTargetRequest){
  return agent.sendMessage(chia_farmer_service, get_reward_targets_command, data) as
    AsyncMessage<chia_farmer_service, get_reward_targets_command, TGetRewardTargetResponse>;
}



export const set_reward_targets_command = "set_reward_targets";
export type set_reward_targets_command = typeof set_reward_targets_command;
export type TSetRewardTargetRequest = {
  farmer_target?: str;
  pool_target?: str;
};
export type TSetRewardTargetResponse = {
};
export async function set_reward_targets(agent: IAgent, data: TSetRewardTargetRequest){
  return agent.sendMessage(chia_farmer_service, set_reward_targets_command, data) as
    AsyncMessage<chia_farmer_service, set_reward_targets_command, TSetRewardTargetResponse>;
}
