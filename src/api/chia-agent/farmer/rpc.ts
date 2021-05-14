import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {bool, str, uint64, uint8} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {IAgent} from "../../../agent.type";

export const serviceName = "chia_farmer";

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
export async function get_signage_point(agent: IAgent<TGetSignagePointResponse>, data: TGetSignagePointRequest){
  const command = "get_signage_point";
  return agent.sendMessage(serviceName, command, data);
}


export type TGetSignagePointsRequest = {
};
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};
export async function get_signage_points(agent: IAgent<TGetSignagePointsResponse>, data: TGetSignagePointsRequest){
  const command = "get_signage_points";
  return agent.sendMessage(serviceName, command, data);
}



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
export async function get_reward_targets(agent: IAgent<TGetRewardTargetResponse>, data: TGetRewardTargetRequest){
  const command = "get_reward_targets";
  return agent.sendMessage(serviceName, command, data);
}



export type TSetRewardTargetRequest = {
  farmer_target?: str;
  pool_target?: str;
};
export type TSetRewardTargetResponse = {
};
export async function set_reward_targets(agent: IAgent<TSetRewardTargetResponse>, data: TSetRewardTargetRequest){
  const command = "set_reward_targets";
  return agent.sendMessage(serviceName, command, data);
}
