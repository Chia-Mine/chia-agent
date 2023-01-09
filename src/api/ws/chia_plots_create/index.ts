import {TPlotQueue} from "../daemon/index";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType} from "../../types";

export const chia_plotter_service = "chia_plotter";
export type chia_plotter_service = typeof chia_plotter_service;

export const state_changed_command_of_plots = "state_changed";
export type state_changed_command_of_plots = typeof state_changed_command_of_plots;
export type TStateChangedBroadCastOfPlots = {
  state: "log_changed"|"state_changed";
  queue: TPlotQueue[];
};
export type WsStateChangedPlotsMessage = GetMessageType<chia_plotter_service, state_changed_command_of_plots, TStateChangedBroadCastOfPlots>;
export async function on_state_changed_of_plots(daemon: TDaemon, callback: (e: WsStateChangedPlotsMessage) => unknown){
  await daemon.subscribe(chia_plotter_service);
  const messageListener = (e: WsPlotsMessage) => {
    if(e.origin === chia_plotter_service && e.command === state_changed_command_of_plots){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_plotter_service, messageListener);
}

export type WsPlotsMessage = WsStateChangedPlotsMessage;
// Whole commands for the service
export type chia_plots_create_commands = state_changed_command_of_plots;
export type TChiaPlotsCreateBroadcast = TStateChangedBroadCastOfPlots;
export async function on_message_from_chia_plots_create(daemon: TDaemon, callback: (e: WsPlotsMessage) => unknown){
  await daemon.subscribe(chia_plotter_service);
  const messageListener = (e: WsPlotsMessage) => {
    if(e.origin === chia_plotter_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_plotter_service, messageListener);
}

