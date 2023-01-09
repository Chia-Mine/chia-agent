import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, float, int, None, str, uint128, uint32, uint64, uint8} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service, metrics_service, TConnectionGeneral} from "../../types";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {ReceiveBlockResult} from "../../chia/consensus/blockchain";

export const chia_full_node_service = "chia_full_node";
export type chia_full_node_service = typeof chia_full_node_service;

export type TConnectionFullNode = ({
  peak_height: uint32,
  peak_weight: uint128,
  peak_hash: bytes32,
} | {
  peak_height: None,
  peak_weight: None,
  peak_hash: None,
}) & TConnectionGeneral;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsBroadCast = {
  connections: TConnectionFullNode[];
};
export type WsGetConnectionFullNodeMessage = GetMessageType<chia_full_node_service, get_connections_command, TGetConnectionsBroadCast>;
export async function on_get_connections(daemon: TDaemon, callback: (e: WsGetConnectionFullNodeMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFullNodeMessage) => {
    if(e.origin === chia_full_node_service && e.command === get_connections_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}

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
    mempool_cost: int;
    "mempool_min_fees": {
      "cost_5000000": float,
    },
    "mempool_max_total_cost": int,
    "block_max_cost": int,
    "node_id": str,
  };
};
export type WsGetBlockchainStateMessage = GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>;
export async function on_get_blockchain_state(daemon: TDaemon, callback: (e: WsGetBlockchainStateMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFullNodeMessage) => {
    if(e.origin === chia_full_node_service && e.command === get_blockchain_state_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}

export const block_command = "block";
export type block_command = typeof block_command;
export type TBlockBroadCast = {} | {
  transaction_block: bool;
  k_size: uint8;
  header_hash: bytes32;
  height: uint32;
  block_cost?: uint64;
  block_fees?: uint64;
  timestamp?: uint64;
  transaction_generator_size_bytes?: int;
  transaction_generator_ref_list: uint32[];
  receive_block_result?: ReceiveBlockResult;
};
export type WsBlockMessage = GetMessageType<chia_full_node_service, block_command, TBlockBroadCast>;
export async function on_block(daemon: TDaemon, callback: (e: WsBlockMessage) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsFullNodeMessage) => {
    if(e.origin === chia_full_node_service && e.command === block_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}


export const signage_point_command = "signage_point";
export type signage_point_command = typeof signage_point_command;
export type TSignagePointBroadCast = {
  broadcast_farmer: NewSignagePoint;
};
export type WsSignagePointMessage = GetMessageType<chia_full_node_service, signage_point_command, TSignagePointBroadCast>;
export async function on_signage_point(daemon: TDaemon, callback: (e: WsSignagePointMessage) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsFullNodeMessage) => {
    if(e.origin === chia_full_node_service && e.command === signage_point_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}

export type WsFullNodeMessage = WsGetConnectionFullNodeMessage
  | WsGetBlockchainStateMessage
  | WsBlockMessage
  | WsSignagePointMessage
;
// Whole commands for the service
export type chia_full_node_commands = get_blockchain_state_command | get_connections_command | block_command | signage_point_command;
export type TChiaFullNodeBroadcast = TGetBlockchainStateBroadCast | TGetConnectionsBroadCast | TBlockBroadCast | TSignagePointBroadCast;
export async function on_message_from_full_node(daemon: TDaemon, callback: (e: WsFullNodeMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFullNodeMessage) => {
    if(e.origin === chia_full_node_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_full_node_service, messageListener);
}
