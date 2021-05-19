import { TPlotQueue } from "../daemon/index";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType } from "../../types";
export declare const chia_plots_create_service = "chia plots create";
export declare type chia_plots_create_service = typeof chia_plots_create_service;
export declare const state_changed_command_of_plots = "state_changed";
export declare type state_changed_command_of_plots = typeof state_changed_command_of_plots;
export declare type TStateChangedBroadCastOfPlots = {
    state: "log_changed" | "state_changed";
    queue: TPlotQueue[];
};
export declare function on_state_changed_of_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_plots_create_service, state_changed_command_of_plots, TStateChangedBroadCastOfPlots>) => unknown): Promise<() => void>;
export declare type chia_plots_create_commands = state_changed_command_of_plots;
export declare type TChiaPlotsCreateBroadcast = TStateChangedBroadCastOfPlots;
export declare function on_message_from_chia_plots_create(daemon: TDaemon, callback: (e: GetMessageType<chia_plots_create_service, chia_plots_create_commands, TChiaPlotsCreateBroadcast>) => unknown): Promise<() => void>;
