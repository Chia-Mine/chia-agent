import { Plot } from "../../chia/harvester/harvester";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType } from "../../types";
export declare const chia_harvester_service = "chia_harvester";
export declare type chia_harvester_service = typeof chia_harvester_service;
export declare const get_plots_command = "get_plots";
export declare type get_plots_command = typeof get_plots_command;
export declare type TGetPlotsBroadCast = {
    plots: Plot[];
    failed_to_open_filenames: string[];
    not_found_filenames: string[];
};
export declare function on_get_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>) => unknown): Promise<() => void>;
export declare type chia_harvester_commands = get_plots_command;
export declare type TChiaHarvesterBroadcast = TGetPlotsBroadCast;
export declare function on_message_from_harvester(daemon: TDaemon, callback: (e: GetMessageType<chia_harvester_service, chia_harvester_commands, TChiaHarvesterBroadcast>) => unknown): Promise<() => void>;
