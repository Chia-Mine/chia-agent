import {Plot} from "../../chia/harvester/harvester";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";

export const chia_harvester_service = "chia_harvester";
export type chia_harvester_service = typeof chia_harvester_service;

export const get_plots_command = "get_plots";
export type get_plots_command = typeof get_plots_command;
export type TGetPlotsBroadCast = {
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
};
export async function on_get_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_harvester_service && e.command === get_plots_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_harvester_service, messageListener);
}
