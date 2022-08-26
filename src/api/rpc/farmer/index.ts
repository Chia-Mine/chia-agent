import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {bool, int, Optional, str, uint32, uint64, uint8} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TRPCAgent} from "../../../rpc/index";
import {PoolState} from "../../chia/farmer/farmer";
import {Receiver} from "../../chia/plot-sync/receiver";
import {Plot} from "../../chia/protocols/harvester_protocol";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

export const get_signage_point_command = "get_signage_point";
export type get_signage_point_command = typeof get_signage_point_command;
export type TGetSignagePointRequest = {
  sp_hash: str;
};
export type TGetSignagePointResponse = {
  signage_point: {
    challenge_hash: bytes32;
    challenge_chain_sp: bytes32;
    reward_chain_sp: bytes32;
    difficulty: uint64;
    sub_slot_iters: uint64;
    signage_point_index: uint8;
  };
  proofs: [string, ProofOfSpace];
};
export async function get_signage_point(agent: TRPCAgent, params: TGetSignagePointRequest) {
  return agent.sendMessage<TGetSignagePointResponse>(chia_farmer_service, get_signage_point_command, params);
}


export const get_signage_points_command = "get_signage_points";
export type get_signage_points_command = typeof get_signage_points_command;
export type TGetSignagePointsRequest = {
};
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};
export async function get_signage_points(agent: TRPCAgent){
  return agent.sendMessage<TGetSignagePointsResponse>(chia_farmer_service, get_signage_points_command);
}



export const get_reward_targets_command = "get_reward_targets";
export type get_reward_targets_command = typeof get_reward_targets_command;
export type TGetRewardTargetRequest = {
  search_for_private_key: bool;
  max_ph_to_search?: int;
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
export async function get_reward_targets(agent: TRPCAgent, params: TGetRewardTargetRequest){
  return agent.sendMessage<TGetRewardTargetResponse>(chia_farmer_service, get_reward_targets_command, params);
}



export const set_reward_targets_command = "set_reward_targets";
export type set_reward_targets_command = typeof set_reward_targets_command;
export type TSetRewardTargetRequest = {
  farmer_target?: str;
  pool_target?: str;
};
export type TSetRewardTargetResponse = {
};
export async function set_reward_targets(agent: TRPCAgent, params: TSetRewardTargetRequest){
  return agent.sendMessage<TSetRewardTargetResponse>(chia_farmer_service, set_reward_targets_command, params);
}



export const get_pool_state_command = "get_pool_state";
export type get_pool_state_command = typeof get_pool_state_command;
export type TGetPoolStateRequest = {
};
export type TGetPoolStateResponse = {
  pool_state: PoolState[];
};
export async function get_pool_state(agent: TRPCAgent){
  return agent.sendMessage<TSetRewardTargetResponse>(chia_farmer_service, get_pool_state_command);
}



export const set_payout_instructions_command = "set_payout_instructions";
export type set_payout_instructions_command = typeof set_payout_instructions_command;
export type TSetPayoutInstructionsRequest = {
  launcher_id: str;
  payout_instructions: str;
};
export type TSetPayoutInstructionsResponse = {
};
export async function set_pool_payout_instructions(agent: TRPCAgent, params: TSetPayoutInstructionsRequest){
  return agent.sendMessage<TSetPayoutInstructionsResponse>(chia_farmer_service, set_payout_instructions_command, params);
}


export const get_harvesters_command = "get_harvesters";
export type get_harvesters_command = typeof get_harvesters_command;
export type TGetHarvestersRequest = {
};
export type TGetHarvestersResponse = {
  harvesters: Receiver[];
};
export async function get_harvesters(agent: TRPCAgent){
  return agent.sendMessage<TGetHarvestersResponse>(chia_farmer_service, get_harvesters_command);
}



export const get_harvesters_summary_command = "get_harvesters_summary";
export type get_harvesters_summary_command = typeof get_harvesters_summary_command;
export type TGetHarvestersSummaryResponse = {
  harvesters: Receiver<true>[];
};
export async function get_harvesters_summary(agent: TRPCAgent){
  return agent.sendMessage<TGetHarvestersSummaryResponse>(chia_farmer_service, get_harvesters_summary_command);
}



export const get_harvester_plots_valid_command = "get_harvester_plots_valid";
export type get_harvester_plots_valid_command = typeof get_harvester_plots_valid_command;
export type TGetHarvesterPlotsValidRequest = {
  node_id: bytes32;
  page: uint32;
  page_size: uint32;
  filter: Array<{key: str; value: Optional<str>}>;
  sort_key: str;
  reverse: bool;
};
export type TGetHarvesterPlotsValidResponse = {
  node_id: str;
  page: uint32;
  page_count: uint32;
  total_count: int;
  plots: Plot[];
};
export async function get_harvester_plots_valid(agent: TRPCAgent, param: TGetHarvesterPlotsValidRequest){
  return agent.sendMessage<TGetHarvesterPlotsValidResponse>(chia_farmer_service, get_harvester_plots_valid_command, param);
}



export const get_harvester_plots_invalid_command = "get_harvester_plots_invalid";
export type get_harvester_plots_invalid_command = typeof get_harvester_plots_invalid_command;
export type TGetHarvesterPlotsInvalidRequest = {
  node_id: bytes32
  page: uint32;
  page_count: uint32;
  filter: str[];
  reverse: bool;
};
export type TGetHarvesterPlotsInvalidResponse = {
  node_id: str;
  page: uint32;
  page_count: uint32;
  total_count: int;
  plots: str[];
};
export async function get_harvester_plots_invalid(agent: TRPCAgent, param: TGetHarvesterPlotsInvalidRequest){
  return agent.sendMessage<TGetHarvesterPlotsInvalidResponse>(chia_farmer_service, get_harvester_plots_invalid_command, param);
}



export const get_harvester_plots_keys_missing_command = "get_harvester_plots_keys_missing";
export type get_harvester_plots_keys_missing_command = typeof get_harvester_plots_keys_missing_command;
export type TGetHarvesterPlotsKeysMissingRequest = {
  node_id: bytes32
  page: uint32;
  page_count: uint32;
  filter: str[];
  reverse: bool;
};
export type TGetHarvesterPlotsKeysMissingResponse = {
  node_id: str;
  page: uint32;
  page_count: uint32;
  total_count: int;
  plots: str[];
};
export async function get_harvester_plots_keys_missing(agent: TRPCAgent, param: TGetHarvesterPlotsKeysMissingRequest){
  return agent.sendMessage<TGetHarvesterPlotsKeysMissingResponse>(chia_farmer_service, get_harvester_plots_keys_missing_command, param);
}



export const get_harvester_plots_duplicates_command = "get_harvester_plots_duplicates";
export type get_harvester_plots_duplicates_command = typeof get_harvester_plots_duplicates_command;
export type TGetHarvesterPlotsDuplicatesRequest = {
  node_id: bytes32
  page: uint32;
  page_count: uint32;
  filter: str[];
  reverse: bool;
};
export type TGetHarvesterPlotsDuplicatesResponse = {
  node_id: str;
  page: uint32;
  page_count: uint32;
  total_count: int;
  plots: str[];
};
export async function get_harvester_plots_duplicates(agent: TRPCAgent, param: TGetHarvesterPlotsDuplicatesRequest){
  return agent.sendMessage<TGetHarvesterPlotsDuplicatesResponse>(chia_farmer_service, get_harvester_plots_duplicates_command, param);
}



export const get_pool_login_link_command = "get_pool_login_link";
export type get_pool_login_link_command = typeof get_pool_login_link_command;
export type TGetPoolLinkRequest = {
  launcher_id: str;
};
export type TGetPoolLinkResponse = {
  login_link: str;
};
export async function get_pool_login_link(agent: TRPCAgent, params: TGetPoolLinkRequest){
  return agent.sendMessage<TGetPoolLinkResponse>(chia_farmer_service, get_pool_login_link_command, params);
}
