import {str} from "../../chia/types/_python_types_";
import {IAgent} from "../../../agent.type";
import {AsyncMessage} from "../types";
import {Plot} from "../../chia/harvester/harvester";

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
export async function get_plots(agent: IAgent) {
  return agent.sendMessage(chia_harvester_service, get_plots_command) as
    AsyncMessage<chia_harvester_service, get_plots_command, TGetPlotsResponse>;
}




export const refresh_plots_command = "refresh_plots";
export type refresh_plots_command = typeof refresh_plots_command;
export type TRefreshPlotsRequest = {
};
export type TRefreshPlotsResponse = {
};
export async function refresh_plots(agent: IAgent) {
  return agent.sendMessage(chia_harvester_service, refresh_plots_command) as
    AsyncMessage<chia_harvester_service, refresh_plots_command, TRefreshPlotsResponse>;
}




export const delete_plot_command = "delete_plot";
export type delete_plot_command = typeof delete_plot_command;
export type TDeletePlotRequest = {
  filename: str;
};
export type TDeletePlotResponse = {
};
export async function delete_plot(agent: IAgent, data: TDeletePlotRequest) {
  return agent.sendMessage(chia_harvester_service, delete_plot_command, data) as
    AsyncMessage<chia_harvester_service, delete_plot_command, TDeletePlotResponse>;
}




export const add_plot_directory_command = "add_plot_directory";
export type add_plot_directory_command = typeof add_plot_directory_command;
export type TAddPlotDirectoryRequest = {
  dirname: str;
};
export type TAddPlotDirectoryResponse = {
};
export async function add_plot_directory(agent: IAgent, data: TAddPlotDirectoryRequest) {
  return agent.sendMessage(chia_harvester_service, add_plot_directory_command, data) as
    AsyncMessage<chia_harvester_service, add_plot_directory_command, TAddPlotDirectoryResponse>;
}




export const get_plot_directories_command = "get_plot_directories";
export type get_plot_directories_command = typeof get_plot_directories_command;
export type TGetPlotDirectoriesRequest = {
};
export type TGetPlotDirectoriesResponse = {
  directories: str[];
};
export async function get_plot_directories(agent: IAgent) {
  return agent.sendMessage(chia_harvester_service, get_plot_directories_command) as
    AsyncMessage<chia_harvester_service, get_plot_directories_command, TGetPlotDirectoriesResponse>;
}




export const remove_plot_directory_command = "remove_plot_directory";
export type remove_plot_directory_command = typeof remove_plot_directory_command;
export type TRemovePlotDirectoryRequest = {
  dirname: str;
};
export type TRemovePlotDirectoryResponse = {
};
export async function remove_plot_directory(agent: IAgent, data: TRemovePlotDirectoryRequest) {
  return agent.sendMessage(chia_harvester_service, remove_plot_directory_command, data) as
    AsyncMessage<chia_harvester_service, remove_plot_directory_command, TRemovePlotDirectoryResponse>;
}
