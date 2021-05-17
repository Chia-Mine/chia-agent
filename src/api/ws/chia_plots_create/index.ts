import {TPlotQueue} from "../daemon/index";

export const chia_plots_create_service = "chia plots create";
export type chia_plots_create_service = typeof chia_plots_create_service;

export const state_changed_command = "state_changed";
export type state_changed_command = typeof state_changed_command;
export type TStateChangedBroadCast = {
  state: "log_changed"|"state_changed";
  queue: TPlotQueue[];
};
