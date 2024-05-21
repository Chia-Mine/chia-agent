import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {bool, int, Optional, str, uint32, uint64, uint8} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TRPCAgent} from "../../../rpc/index";
import {PoolState} from "../../chia/farmer/farmer";
import {Receiver} from "../../chia/plot-sync/receiver";
import {Plot} from "../../chia/protocols/harvester_protocol";
import {GetMessageType, ResType} from "../../types";
import {TDaemon} from "../../../daemon/index";

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
export type WsGetSignagePointMessage = GetMessageType<chia_farmer_service, get_signage_point_command, TGetSignagePointResponse>;
export async function get_signage_point<T extends TRPCAgent|TDaemon>(agent: T, params: TGetSignagePointRequest) {
  type R = ResType<T, TGetSignagePointResponse, WsGetSignagePointMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_signage_point_command, params);
}


export const get_signage_points_command = "get_signage_points";
export type get_signage_points_command = typeof get_signage_points_command;
export type TGetSignagePointsResponse = {
  signage_points: TGetSignagePointResponse[];
};
export type WsGetSignagePointsMessage = GetMessageType<chia_farmer_service, get_signage_points_command, TGetSignagePointsResponse>;
export async function get_signage_points<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetSignagePointsResponse, WsGetSignagePointsMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_signage_points_command);
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
export type WsGetRewardTargetsMessage = GetMessageType<chia_farmer_service, get_reward_targets_command, TGetRewardTargetResponse>;
export async function get_reward_targets<T extends TRPCAgent | TDaemon>(agent: T, params: TGetRewardTargetRequest){
  type R = ResType<T, TGetRewardTargetResponse, WsGetRewardTargetsMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_reward_targets_command, params);
}



export const set_reward_targets_command = "set_reward_targets";
export type set_reward_targets_command = typeof set_reward_targets_command;
export type TSetRewardTargetRequest = {
  farmer_target?: str;
  pool_target?: str;
};
export type TSetRewardTargetResponse = Record<string, never>;
export type WsSetRewardTargetsMessage = GetMessageType<chia_farmer_service, set_reward_targets_command, TSetRewardTargetResponse>;
export async function set_reward_targets<T extends TRPCAgent | TDaemon>(agent: T, params: TSetRewardTargetRequest){
  type R = ResType<T, TSetRewardTargetResponse, WsSetRewardTargetsMessage>;
  return agent.sendMessage<R>(chia_farmer_service, set_reward_targets_command, params);
}



export const get_pool_state_command = "get_pool_state";
export type get_pool_state_command = typeof get_pool_state_command;
export type TGetPoolStateResponse = {
  pool_state: PoolState[];
};
export type WsGetPoolStateMessage = GetMessageType<chia_farmer_service, get_pool_state_command, TGetPoolStateResponse>;
export async function get_pool_state<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetPoolStateResponse, WsGetPoolStateMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_pool_state_command);
}



export const set_payout_instructions_command = "set_payout_instructions";
export type set_payout_instructions_command = typeof set_payout_instructions_command;
export type TSetPayoutInstructionsRequest = {
  launcher_id: str;
  payout_instructions: str;
};
export type TSetPayoutInstructionsResponse = Record<string, never>;
export type WsSetPayoutInstructionsMessage = GetMessageType<chia_farmer_service, set_payout_instructions_command, TSetPayoutInstructionsResponse>;
export async function set_pool_payout_instructions<T extends TRPCAgent | TDaemon>(agent: T, params: TSetPayoutInstructionsRequest){
  type R = ResType<T, TSetPayoutInstructionsResponse, WsSetPayoutInstructionsMessage>;
  return agent.sendMessage<R>(chia_farmer_service, set_payout_instructions_command, params);
}


export const get_harvesters_command = "get_harvesters";
export type get_harvesters_command = typeof get_harvesters_command;
export type TGetHarvestersResponse = {
  harvesters: Receiver[];
};
export type WsGetHarvestersMessage = GetMessageType<chia_farmer_service, get_harvesters_command, TGetHarvestersResponse>;
export async function get_harvesters<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetHarvestersResponse, WsGetHarvestersMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvesters_command);
}



export const get_harvesters_summary_command = "get_harvesters_summary";
export type get_harvesters_summary_command = typeof get_harvesters_summary_command;
export type TGetHarvestersSummaryResponse = {
  harvesters: Array<Receiver<true>>;
};
export type WsGetHarvestersSummaryMessage = GetMessageType<chia_farmer_service, get_harvesters_summary_command, TGetHarvestersSummaryResponse>;
export async function get_harvesters_summary<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetHarvestersSummaryResponse, WsGetHarvestersSummaryMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvesters_summary_command);
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
export type WsGetHarvesterPlotsValidMessage = GetMessageType<chia_farmer_service, get_harvester_plots_valid_command, TGetHarvesterPlotsValidResponse>;
export async function get_harvester_plots_valid<T extends TRPCAgent | TDaemon>(agent: T, param: TGetHarvesterPlotsValidRequest){
  type R = ResType<T, TGetHarvesterPlotsValidResponse, WsGetHarvesterPlotsValidMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvester_plots_valid_command, param);
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
export type WsGetHarvesterPlotsInvalidMessage = GetMessageType<chia_farmer_service, get_harvester_plots_invalid_command, TGetHarvesterPlotsInvalidResponse>;
export async function get_harvester_plots_invalid<T extends TRPCAgent | TDaemon>(agent: T, param: TGetHarvesterPlotsInvalidRequest){
  type R = ResType<T, TGetHarvesterPlotsInvalidResponse, WsGetHarvesterPlotsInvalidMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvester_plots_invalid_command, param);
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
export type WsGetHarvesterPlotsKeysMissingMessage = GetMessageType<chia_farmer_service, get_harvester_plots_keys_missing_command, TGetHarvesterPlotsKeysMissingResponse>;
export async function get_harvester_plots_keys_missing<T extends TRPCAgent | TDaemon>(agent: T, param: TGetHarvesterPlotsKeysMissingRequest){
  type R = ResType<T, TGetHarvesterPlotsKeysMissingResponse, WsGetHarvesterPlotsKeysMissingMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvester_plots_keys_missing_command, param);
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
export type WsGetHarvesterPlotsDuplicatesMessage = GetMessageType<chia_farmer_service, get_harvester_plots_duplicates_command, TGetHarvesterPlotsDuplicatesResponse>;
export async function get_harvester_plots_duplicates<T extends TRPCAgent | TDaemon>(agent: T, param: TGetHarvesterPlotsDuplicatesRequest){
  type R = ResType<T, TGetHarvesterPlotsDuplicatesResponse, WsGetHarvesterPlotsDuplicatesMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_harvester_plots_duplicates_command, param);
}



export const get_pool_login_link_command = "get_pool_login_link";
export type get_pool_login_link_command = typeof get_pool_login_link_command;
export type TGetPoolLinkRequest = {
  launcher_id: str;
};
export type TGetPoolLinkResponse = {
  login_link: str;
};
export type WsGetPoolLinkMessage = GetMessageType<chia_farmer_service, get_pool_login_link_command, TGetPoolLinkResponse>;
export async function get_pool_login_link<T extends TRPCAgent | TDaemon>(agent: T, params: TGetPoolLinkRequest){
  type R = ResType<T, TGetPoolLinkResponse, WsGetPoolLinkMessage>;
  return agent.sendMessage<R>(chia_farmer_service, get_pool_login_link_command, params);
}

export type RpcFarmerMessage =
  TGetRewardTargetResponse
  | TGetSignagePointResponse
  | TGetSignagePointsResponse
  | TSetRewardTargetResponse
  | TGetHarvestersResponse
  | TGetHarvestersSummaryResponse
  | TGetHarvesterPlotsValidResponse
  | TGetHarvesterPlotsInvalidResponse
  | TGetHarvesterPlotsKeysMissingResponse
  | TGetHarvesterPlotsDuplicatesResponse
  | TSetPayoutInstructionsResponse
  | TGetPoolStateResponse
  | TGetPoolLinkResponse
;

export type RpcFarmerMessageOnWs =
  WsGetRewardTargetsMessage
  | WsGetSignagePointMessage
  | WsGetSignagePointsMessage
  | WsSetRewardTargetsMessage
  | WsGetHarvestersMessage
  | WsGetHarvestersSummaryMessage
  | WsGetHarvesterPlotsValidMessage
  | WsGetHarvesterPlotsInvalidMessage
  | WsGetHarvesterPlotsKeysMissingMessage
  | WsGetHarvesterPlotsDuplicatesMessage
  | WsSetPayoutInstructionsMessage
  | WsGetPoolStateMessage
  | WsGetPoolLinkMessage
  ;
