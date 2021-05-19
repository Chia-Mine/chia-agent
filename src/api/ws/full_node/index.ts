import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, int, uint128, uint32, uint64} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";

export const chia_full_node_service = "chia_full_node";
export type chia_full_node_service = typeof chia_full_node_service;

export const get_blockchain_state_command = "get_blockchain_state";
export type get_blockchain_state_command = typeof get_blockchain_state_command;
export type TGetBlockchainStateBroadCast = {
  blockchain_state: {
    peak: BlockRecord;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: uint32;
      sync_progress_height: uint32;
    };
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
  };
};
export async function on_get_blockchain_state(daemon: TDaemon, callback: (e: GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_full_node_service && e.command === get_blockchain_state_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}

// Whole commands for the service
export type chia_full_node_commands = get_blockchain_state_command;
export type TChiaFullNodeBroadcast = TGetBlockchainStateBroadCast;
export async function on_message_from_full_node(daemon: TDaemon, callback: (e: GetMessageType<chia_full_node_service, chia_full_node_commands, TChiaFullNodeBroadcast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_full_node_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}