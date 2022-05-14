import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {uint32, uint64} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, TConnectionGeneral, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";
import {Receiver} from "../../chia/plot-sync/receiver";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsBroadCast = {
  connections: TConnectionGeneral[];
};
export async function on_get_connections(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, get_connections_command, TGetConnectionsBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === get_connections_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const new_farming_info_command = "new_farming_info";
export type new_farming_info_command = typeof new_farming_info_command;
export type TNewFarmingInfoBroadCast = {
  farming_info: {
    challenge_hash: bytes32;
    signage_point: bytes32;
    passed_filter: uint32;
    proofs: uint32;
    total_plots: uint32;
    timestamp: uint64;
  }
};
export async function on_new_farming_info(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === new_farming_info_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const new_signage_point_command = "new_signage_point";
export type new_signage_point_command = typeof new_signage_point_command;
export type TNewSignagePointBroadCast = {
  proofs: ProofOfSpace[];
  signage_point: NewSignagePoint;
};
export async function on_new_signage_point(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === new_signage_point_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const harvester_update_command = "harvester_update";
export type harvester_update_command = typeof harvester_update_command;
export type THarvesterUpdateBroadCast = Receiver<true>;
export async function on_harvester_update(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, harvester_update_command, THarvesterUpdateBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === harvester_update_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const harvester_removed_command = "harvester_removed";
export type harvester_removed_command = typeof harvester_removed_command;
export type THarvesterRemovedBroadCast = {
  node_id: bytes32;
};
export async function on_harvester_removed(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, harvester_removed_command, THarvesterRemovedBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === harvester_removed_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

// Whole commands for the service
export type chia_farmer_commands = get_connections_command
  | new_farming_info_command
  | new_signage_point_command
  | harvester_update_command
  | harvester_removed_command
;
export type TChiaFarmerBroadcast = TGetConnectionsBroadCast
  | TNewFarmingInfoBroadCast
  | TNewSignagePointBroadCast
  | THarvesterUpdateBroadCast
  | THarvesterRemovedBroadCast
;
export async function on_message_from_farmer(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, chia_farmer_commands, TChiaFarmerBroadcast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}