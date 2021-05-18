import {TPlotQueue} from "../daemon/index";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType} from "../../types";
import {WsMessage} from "../index";

export const chia_plots_create_service = "chia plots create";
export type chia_plots_create_service = typeof chia_plots_create_service;

export const state_changed_command_of_plots = "state_changed";
export type state_changed_command_of_plots = typeof state_changed_command_of_plots;
export type TStateChangedBroadCastOfPlots = {
  state: "log_changed"|"state_changed";
  queue: TPlotQueue[];
};
export async function on_state_changed_of_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_plots_create_service, state_changed_command_of_plots, TStateChangedBroadCastOfPlots>) => unknown){
  await daemon.subscribe(chia_plots_create_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_plots_create_service && e.command === state_changed_command_of_plots){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_plots_create_service, messageListener);
}
