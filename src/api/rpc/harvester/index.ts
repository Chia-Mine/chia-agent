import {str} from "../../chia/types/_python_types_";
import {TRPCAgent} from "../../../rpc";
import {Plot} from "../../chia/harvester/harvester";
import {GetMessageType, ResType} from "../../types";
import {TDaemon} from "../../../daemon/index";

export const chia_harvester_service = "chia_harvester";
export type chia_harvester_service = typeof chia_harvester_service;

export const get_plots_command = "get_plots";
export type get_plots_command = typeof get_plots_command;
export type TGetPlotsRequest = {
};
export type TGetPlotsResponse = {
  plots: Plot[];
  failed_to_open_filenames: str[];
  not_found_filenames: str[];
};
export type WsGetPlotsMessage = GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsResponse>;
export async function get_plots<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetPlotsResponse, WsGetPlotsMessage>;
  return agent.sendMessage<R>(chia_harvester_service, get_plots_command);
}




export const refresh_plots_command = "refresh_plots";
export type refresh_plots_command = typeof refresh_plots_command;
export type TRefreshPlotsRequest = {
};
export type TRefreshPlotsResponse = {
};
export type WsRefreshPlotsMessage = GetMessageType<chia_harvester_service, refresh_plots_command, TRefreshPlotsResponse>;
export async function refresh_plots<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TRefreshPlotsResponse, WsRefreshPlotsMessage>;
  return agent.sendMessage<R>(chia_harvester_service, refresh_plots_command);
}




export const delete_plot_command = "delete_plot";
export type delete_plot_command = typeof delete_plot_command;
export type TDeletePlotRequest = {
  filename: str;
};
export type TDeletePlotResponse = {
};
export type WsDeletePlotMessage = GetMessageType<chia_harvester_service, delete_plot_command, TDeletePlotResponse>;
export async function delete_plot<T extends TRPCAgent | TDaemon>(agent: T, data: TDeletePlotRequest) {
  type R = ResType<T, TDeletePlotResponse, WsDeletePlotMessage>;
  return agent.sendMessage<R>(chia_harvester_service, delete_plot_command, data);
}




export const add_plot_directory_command = "add_plot_directory";
export type add_plot_directory_command = typeof add_plot_directory_command;
export type TAddPlotDirectoryRequest = {
  dirname: str;
};
export type TAddPlotDirectoryResponse = {
};
export type WsAddPlotDirectoryMessage = GetMessageType<chia_harvester_service, add_plot_directory_command, TAddPlotDirectoryResponse>;
export async function add_plot_directory<T extends TRPCAgent | TDaemon>(agent: T, data: TAddPlotDirectoryRequest) {
  type R = ResType<T, TAddPlotDirectoryResponse, WsAddPlotDirectoryMessage>;
  return agent.sendMessage<R>(chia_harvester_service, add_plot_directory_command, data);
}




export const get_plot_directories_command = "get_plot_directories";
export type get_plot_directories_command = typeof get_plot_directories_command;
export type TGetPlotDirectoriesRequest = {
};
export type TGetPlotDirectoriesResponse = {
  directories: str[];
};
export type WsGetPlotDirectoriesMessage = GetMessageType<chia_harvester_service, get_plot_directories_command, TGetPlotDirectoriesResponse>;
export async function get_plot_directories<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetPlotDirectoriesResponse, WsGetPlotDirectoriesMessage>;
  return agent.sendMessage<R>(chia_harvester_service, get_plot_directories_command);
}




export const remove_plot_directory_command = "remove_plot_directory";
export type remove_plot_directory_command = typeof remove_plot_directory_command;
export type TRemovePlotDirectoryRequest = {
  dirname: str;
};
export type TRemovePlotDirectoryResponse = {
};
export type WsRemovePlotDirectoryMessage = GetMessageType<chia_harvester_service, remove_plot_directory_command, TRemovePlotDirectoryResponse>;
export async function remove_plot_directory<T extends TRPCAgent | TDaemon>(agent: T, data: TRemovePlotDirectoryRequest) {
  type R = ResType<T, TRemovePlotDirectoryResponse, WsRemovePlotDirectoryMessage>;
  return agent.sendMessage<R>(chia_harvester_service, remove_plot_directory_command, data);
}

export type RpcHarvesterMessage =
  TAddPlotDirectoryResponse
  | TDeletePlotResponse
  | TGetPlotDirectoriesResponse
  | TGetPlotsResponse
  | TRefreshPlotsResponse
  | TRemovePlotDirectoryResponse
;

export type RpcHarvesterMessageOnWs =
  WsAddPlotDirectoryMessage
  | WsDeletePlotMessage
  | WsGetPlotDirectoriesMessage
  | WsGetPlotsMessage
  | WsRefreshPlotsMessage
  | WsRemovePlotDirectoryMessage
;
