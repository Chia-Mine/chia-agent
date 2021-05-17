import { str } from "../../chia/types/_python_types_";
import { IAgent } from "../../../agent.type";
import { Plot } from "../../chia/harvester/harvester";
export declare const chia_harvester_service = "chia_harvester";
export declare type chia_harvester_service = typeof chia_harvester_service;
export declare const get_plots_command = "get_plots";
export declare type get_plots_command = typeof get_plots_command;
export declare type TGetPlotsRequest = {};
export declare type TGetPlotsResponse = {
    plots: Plot[];
    failed_to_open_filenames: str[];
    not_found_filenames: str[];
};
export declare function get_plots(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_harvester", "get_plots", TGetPlotsResponse>>;
export declare const refresh_plots_command = "refresh_plots";
export declare type refresh_plots_command = typeof refresh_plots_command;
export declare type TRefreshPlotsRequest = {};
export declare type TRefreshPlotsResponse = {};
export declare function refresh_plots(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_harvester", "refresh_plots", TRefreshPlotsResponse>>;
export declare const delete_plot_command = "delete_plot";
export declare type delete_plot_command = typeof delete_plot_command;
export declare type TDeletePlotRequest = {
    filename: str;
};
export declare type TDeletePlotResponse = {};
export declare function delete_plot(agent: IAgent, data: TDeletePlotRequest): Promise<import("../../types").GetMessageType<"chia_harvester", "delete_plot", TDeletePlotResponse>>;
export declare const add_plot_directory_command = "add_plot_directory";
export declare type add_plot_directory_command = typeof add_plot_directory_command;
export declare type TAddPlotDirectoryRequest = {
    dirname: str;
};
export declare type TAddPlotDirectoryResponse = {};
export declare function add_plot_directory(agent: IAgent, data: TAddPlotDirectoryRequest): Promise<import("../../types").GetMessageType<"chia_harvester", "add_plot_directory", TAddPlotDirectoryResponse>>;
export declare const get_plot_directories_command = "get_plot_directories";
export declare type get_plot_directories_command = typeof get_plot_directories_command;
export declare type TGetPlotDirectoriesRequest = {};
export declare type TGetPlotDirectoriesResponse = {
    directories: str[];
};
export declare function get_plot_directories(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_harvester", "get_plot_directories", TGetPlotDirectoriesResponse>>;
export declare const remove_plot_directory_command = "remove_plot_directory";
export declare type remove_plot_directory_command = typeof remove_plot_directory_command;
export declare type TRemovePlotDirectoryRequest = {
    dirname: str;
};
export declare type TRemovePlotDirectoryResponse = {};
export declare function remove_plot_directory(agent: IAgent, data: TRemovePlotDirectoryRequest): Promise<import("../../types").GetMessageType<"chia_harvester", "remove_plot_directory", TRemovePlotDirectoryResponse>>;