import { str } from "../../chia/types/_python_types_";
import { TRPCAgent } from "../../../rpc";
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
export declare function get_plots(agent: TRPCAgent): Promise<TGetPlotsResponse>;
export declare const refresh_plots_command = "refresh_plots";
export declare type refresh_plots_command = typeof refresh_plots_command;
export declare type TRefreshPlotsRequest = {};
export declare type TRefreshPlotsResponse = {};
export declare function refresh_plots(agent: TRPCAgent): Promise<TRefreshPlotsResponse>;
export declare const delete_plot_command = "delete_plot";
export declare type delete_plot_command = typeof delete_plot_command;
export declare type TDeletePlotRequest = {
    filename: str;
};
export declare type TDeletePlotResponse = {};
export declare function delete_plot(agent: TRPCAgent, data: TDeletePlotRequest): Promise<TDeletePlotResponse>;
export declare const add_plot_directory_command = "add_plot_directory";
export declare type add_plot_directory_command = typeof add_plot_directory_command;
export declare type TAddPlotDirectoryRequest = {
    dirname: str;
};
export declare type TAddPlotDirectoryResponse = {};
export declare function add_plot_directory(agent: TRPCAgent, data: TAddPlotDirectoryRequest): Promise<TAddPlotDirectoryResponse>;
export declare const get_plot_directories_command = "get_plot_directories";
export declare type get_plot_directories_command = typeof get_plot_directories_command;
export declare type TGetPlotDirectoriesRequest = {};
export declare type TGetPlotDirectoriesResponse = {
    directories: str[];
};
export declare function get_plot_directories(agent: TRPCAgent): Promise<TGetPlotDirectoriesResponse>;
export declare const remove_plot_directory_command = "remove_plot_directory";
export declare type remove_plot_directory_command = typeof remove_plot_directory_command;
export declare type TRemovePlotDirectoryRequest = {
    dirname: str;
};
export declare type TRemovePlotDirectoryResponse = {};
export declare function remove_plot_directory(agent: TRPCAgent, data: TRemovePlotDirectoryRequest): Promise<TRemovePlotDirectoryResponse>;
