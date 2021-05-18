import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";

export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

export const state_changed_command_of_wallet = "state_changed";
export type state_changed_command_of_wallet = typeof state_changed_command_of_wallet;
export type TStateChangedBroadCastOfWallet = {
  state: unknown;
  wallet_id?: unknown;
  additional_data?: unknown;
};
export async function on_state_changed_of_wallet(daemon: TDaemon, callback: (e: GetMessageType<chia_wallet_service, state_changed_command_of_wallet, TStateChangedBroadCastOfWallet>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_wallet_service && e.command === state_changed_command_of_wallet){
      callback(e);
    }
  };
  return daemon.addMessageListener(state_changed_command_of_wallet, messageListener);
}