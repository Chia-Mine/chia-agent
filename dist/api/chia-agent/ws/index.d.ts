import { GetMessageType } from "../types";
import type { chia_farmer_service, new_farming_info_command, new_signage_point_command, TNewFarmingInfoBroadCast, TNewSignagePointBroadCast } from "./farmer";
export * from "./farmer";
import type { chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast } from "./full_node";
export * from "./full_node";
import type { chia_harvester_service, get_plots_command, TGetPlotsBroadCast } from "./harvester";
export * from "./harvester";
import type { chia_wallet_service, state_changed_command, TStateChangedBroadCast } from "./wallet";
export * from "./wallet";
import type { chia_plots_create_service, state_changed_command as state_change_command_of_plots, TStateChangedBroadCast as TStateChangedOfPlotsBroadCast } from "./chia_plots_create";
export * from "./wallet";
import type { daemon_service, exit_command, get_status_command, is_running_command, ping_command, register_service_command, start_plotting_command, start_service_command, stop_plotting_command, stop_service_command, TExitResponse, TGetStatusResponse, TIsRunningResponse, TPingResponse, TRegisterServiceResponse, TStartPlottingResponse, TStartServiceResponse, TStopPlottingResponse, TStopServiceResponse } from "./daemon";
export * from "./daemon";
export declare type WsFarmerMessage = GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast> | GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>;
export declare type WsFullNodeMessage = GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>;
export declare type WsHarvesterMessage = GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>;
export declare type WsWalletMessage = GetMessageType<chia_wallet_service, state_changed_command, TStateChangedBroadCast>;
export declare type WsPlotsMessage = GetMessageType<chia_plots_create_service, state_change_command_of_plots, TStateChangedOfPlotsBroadCast>;
export declare type WsDaemonMessage = GetMessageType<daemon_service, exit_command, TExitResponse> | GetMessageType<daemon_service, get_status_command, TGetStatusResponse> | GetMessageType<daemon_service, is_running_command, TIsRunningResponse> | GetMessageType<daemon_service, ping_command, TPingResponse> | GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse> | GetMessageType<daemon_service, start_plotting_command, TStartPlottingResponse> | GetMessageType<daemon_service, start_service_command, TStartServiceResponse> | GetMessageType<daemon_service, stop_plotting_command, TStopPlottingResponse> | GetMessageType<daemon_service, stop_service_command, TStopServiceResponse>;
export declare type WsMessage = WsFarmerMessage | WsFullNodeMessage | WsHarvesterMessage | WsWalletMessage | WsPlotsMessage | WsDaemonMessage;
