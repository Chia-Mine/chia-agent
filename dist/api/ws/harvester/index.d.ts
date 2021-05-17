import { Plot } from "../../chia/harvester/harvester";
export declare const chia_harvester_service = "chia_harvester";
export declare type chia_harvester_service = typeof chia_harvester_service;
export declare const get_plots_command = "get_plots";
export declare type get_plots_command = typeof get_plots_command;
export declare type TGetPlotsBroadCast = {
    plots: Plot[];
    failed_to_open_filenames: string[];
    not_found_filenames: string[];
};
