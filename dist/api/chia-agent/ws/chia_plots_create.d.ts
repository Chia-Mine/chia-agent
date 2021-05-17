import { TPlotQueue } from "./daemon";
export declare const chia_plots_create_service = "chia plots create";
export declare type chia_plots_create_service = typeof chia_plots_create_service;
export declare const state_changed_command = "state_changed";
export declare type state_changed_command = typeof state_changed_command;
export declare type TStateChangedBroadCast = {
    state: "log_changed" | "state_changed";
    queue: TPlotQueue[];
};
