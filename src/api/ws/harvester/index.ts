import {Plot} from "../../chia/harvester/harvester";

export const chia_harvester_service = "chia_harvester";
export type chia_harvester_service = typeof chia_harvester_service;

export const get_plots_command = "get_plots";
export type get_plots_command = typeof get_plots_command;
export type TGetPlotsBroadCast = {
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
};
