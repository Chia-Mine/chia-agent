import {GetMessageType} from "../types";
import type {
  chia_farmer_service,
  new_farming_info_command,
  new_signage_point_command,
  TNewFarmingInfoBroadCast,
  TNewSignagePointBroadCast,
} from "./farmer/index";
export * from "./farmer/index";

import type {
  chia_full_node_service,
  get_blockchain_state_command,
  TGetBlockchainStateBroadCast,
} from "./full_node/index";
export * from "./full_node/index";

import type {
  chia_harvester_service,
  get_plots_command,
  TGetPlotsBroadCast,
} from "./harvester/index";
export * from "./harvester/index";

import type {
  chia_wallet_service,
  state_changed_command_of_wallet,
  TStateChangedBroadCastOfWallet,
} from "./wallet/index";
export {
  chia_wallet_service,
  on_state_changed_of_wallet,
  state_changed_command_of_wallet,
  TStateChangedBroadCastOfWallet,
} from "./wallet/index";

import type {
  chia_plots_create_service,
  state_changed_command_of_plots,
  TStateChangedBroadCastOfPlots,
} from "./chia_plots_create/index";
export {
  chia_plots_create_service,
  state_changed_command_of_plots,
  TStateChangedBroadCastOfPlots,
  on_state_changed_of_plots,
} from "./chia_plots_create/index";

import type {
  daemon_service,
  exit_command,
  get_status_command,
  is_running_command,
  ping_command,
  register_service_command,
  start_plotting_command,
  start_service_command,
  stop_plotting_command,
  stop_service_command,
  TExitResponse,
  TGetStatusResponse,
  TIsRunningResponse,
  TPingResponse,
  TRegisterServiceResponse,
  TStartPlottingResponse,
  TStartServiceResponse,
  TStopPlottingResponse,
  TStopServiceResponse,
} from "./daemon/index";
export * from "./daemon/index";


export type WsFarmerMessage =
  GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>
  | GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>
  ;

export type WsFullNodeMessage =
  GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>;

export type WsHarvesterMessage =
  GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>;

export type WsWalletMessage =
  GetMessageType<chia_wallet_service, state_changed_command_of_wallet, TStateChangedBroadCastOfWallet>;

export type WsPlotsMessage =
  GetMessageType<chia_plots_create_service, state_changed_command_of_plots, TStateChangedBroadCastOfPlots>;

export type WsDaemonMessage =
  GetMessageType<daemon_service, exit_command, TExitResponse>
  | GetMessageType<daemon_service, get_status_command, TGetStatusResponse>
  | GetMessageType<daemon_service, is_running_command, TIsRunningResponse>
  | GetMessageType<daemon_service, ping_command, TPingResponse>
  | GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse>
  | GetMessageType<daemon_service, start_plotting_command, TStartPlottingResponse>
  | GetMessageType<daemon_service, start_service_command, TStartServiceResponse>
  | GetMessageType<daemon_service, stop_plotting_command, TStopPlottingResponse>
  | GetMessageType<daemon_service, stop_service_command, TStopServiceResponse>;



export type WsMessage = WsFarmerMessage | WsFullNodeMessage | WsHarvesterMessage | WsWalletMessage | WsPlotsMessage
  | WsDaemonMessage;
