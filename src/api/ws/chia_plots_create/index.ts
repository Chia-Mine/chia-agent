import {TPlotQueue} from "../daemon/index";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType} from "../../types";
import {WsMessage} from "../index";

export const chia_plots_create_service = "chia plots create";
export type chia_plots_create_service = typeof chia_plots_create_service;

export const state_changed_command = "state_changed";
export type state_changed_command = typeof state_changed_command;
export type TStateChangedBroadCast = {
  state: "log_changed"|"state_changed";
  queue: TPlotQueue[];
};
export async function on_state_changed(daemon: TDaemon, callback: (e: GetMessageType<chia_plots_create_service, state_changed_command, TStateChangedBroadCast>) => unknown){
  await daemon.subscribe(chia_plots_create_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_plots_create_service && e.command === state_changed_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_plots_create_service, messageListener);
}
