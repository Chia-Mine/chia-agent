import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";

export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

export const state_changed_command = "state_changed";
export type state_changed_command = typeof state_changed_command;
export type TStateChangedBroadCast = {
  state: unknown;
  wallet_id?: unknown;
  additional_data?: unknown;
};
export async function on_state_changed(daemon: TDaemon, callback: (e: GetMessageType<chia_wallet_service, state_changed_command, TStateChangedBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_wallet_service && e.command === state_changed_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(state_changed_command, messageListener);
}