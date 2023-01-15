import {TDaemon} from "../../../daemon/index";
import {GetMessageType, metrics_service, TConnectionGeneral, wallet_ui_service} from "../../types";
import {uint32} from "../../chia/types/_python_types_";
import {TransactionRecord} from "../../chia/wallet/transaction_record";

export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsBroadCast = {
  connections: TConnectionGeneral[];
};
export type WsGetConnectionsWalletMessage = GetMessageType<chia_wallet_service, get_connections_command, TGetConnectionsBroadCast>;
export async function on_get_connections(daemon: TDaemon, callback: (e: WsGetConnectionsWalletMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsWalletMessage) => {
    if(e.origin === chia_wallet_service && e.command === get_connections_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_wallet_service, messageListener);
}

export const state_changed_command_of_wallet = "state_changed";
export type state_changed_command_of_wallet = typeof state_changed_command_of_wallet;
export type TStateChangedBroadCastOfWallet = {
  state: "add_connection" | "new_block" | "wallet_created"
    | "added_stray_cat" | "offer_added" | "offer_cancelled" | "new_on_chain_notification";
} | {
  state: "coin_removed" | "coin_added" | "pending_transaction" | "did_coin_added" | "nft_coin_added"
    | "nft_coin_removed" | "nft_coin_updated" | "nft_coin_did_set";
  wallet_id: uint32;
} | {
  state: "tx_update";
  wallet_id: uint32;
  additional_data: {transaction: TransactionRecord};
} | {
  state: "new_derivation_index",
  additional_data: {index: uint32};
};
export type WsStateChangedWalletMessage = GetMessageType<chia_wallet_service, state_changed_command_of_wallet, TStateChangedBroadCastOfWallet>;
export async function on_state_changed_of_wallet(daemon: TDaemon, callback: (e: WsStateChangedWalletMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsWalletMessage) => {
    if(e.origin === chia_wallet_service && e.command === state_changed_command_of_wallet){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_wallet_service, messageListener);
}

// "sync_changed" and "coin_added" below are for metrics services.

export const sync_changed_command_of_wallet = "sync_changed";
export type sync_changed_command_of_wallet = typeof sync_changed_command_of_wallet;
export type TSyncChangedBroadCastOfWallet = {};
export type WsSyncChangedWalletMessage = GetMessageType<chia_wallet_service, sync_changed_command_of_wallet, TSyncChangedBroadCastOfWallet>;
export async function on_sync_changed_of_wallet(daemon: TDaemon, callback: (e: WsSyncChangedWalletMessage) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsWalletMessage) => {
    if(e.origin === chia_wallet_service && e.command === sync_changed_command_of_wallet){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_wallet_service, messageListener);
}

export const coin_added_command_of_wallet = "coin_added";
export type coin_added_command_of_wallet = typeof coin_added_command_of_wallet;
export type TCoinAddedBroadCastOfWallet = {
  state: "coin_added";
  wallet_id: uint32;
};
export type WsCoindAddedMessage = GetMessageType<chia_wallet_service, coin_added_command_of_wallet, TCoinAddedBroadCastOfWallet>;
export async function on_coin_added_of_wallet(daemon: TDaemon, callback: (e: WsCoindAddedMessage) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsWalletMessage) => {
    if(e.origin === chia_wallet_service && e.command === coin_added_command_of_wallet){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_wallet_service, messageListener);
}

export type WsWalletMessage = WsGetConnectionsWalletMessage
  | WsSyncChangedWalletMessage
  | WsStateChangedWalletMessage
  | WsCoindAddedMessage
;
// Whole commands for the service
export type chia_wallet_commands =
  get_connections_command
  | sync_changed_command_of_wallet
  | state_changed_command_of_wallet
  | coin_added_command_of_wallet
;
export type TChiaWalletBroadcast =
  TGetConnectionsBroadCast
  | TSyncChangedBroadCastOfWallet
  | TStateChangedBroadCastOfWallet
  | TCoinAddedBroadCastOfWallet
;
export async function on_message_from_wallet(daemon: TDaemon, callback: (e: WsWalletMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsWalletMessage) => {
    if(e.origin === chia_wallet_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_wallet_service, messageListener);
}
