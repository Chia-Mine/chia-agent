import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {DeclareProofOfSpace, NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {bool, float, str, uint32, uint64} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, TConnectionGeneral, wallet_ui_service} from "../../types";
import {Receiver} from "../../chia/plot-sync/receiver";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsBroadCast = {
  connections: TConnectionGeneral[];
};
export type WsGetConnectionFarmerMessage = GetMessageType<chia_farmer_service, get_connections_command, TGetConnectionsBroadCast>;
export async function on_get_connections(daemon: TDaemon, callback: (e: WsGetConnectionFarmerMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
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
export type WsNewFarmingInfoMessage = GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>;
export async function on_new_farming_info(daemon: TDaemon, callback: (e: WsNewFarmingInfoMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
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
export type WsNewSignagePointMessage = GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>;
export async function on_new_signage_point(daemon: TDaemon, callback: (e: WsNewSignagePointMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
    if(e.origin === chia_farmer_service && e.command === new_signage_point_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const harvester_update_command = "harvester_update";
export type harvester_update_command = typeof harvester_update_command;
export type THarvesterUpdateBroadCast = Receiver<true>;
export type WsHarvesterUpdateMessage = GetMessageType<chia_farmer_service, harvester_update_command, THarvesterUpdateBroadCast>;
export async function on_harvester_update(daemon: TDaemon, callback: (e: WsHarvesterUpdateMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
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
export type WsHarvesterRemovedMessage = GetMessageType<chia_farmer_service, harvester_removed_command, THarvesterRemovedBroadCast>;
export async function on_harvester_removed(daemon: TDaemon, callback: (e: WsHarvesterRemovedMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
    if(e.origin === chia_farmer_service && e.command === harvester_removed_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const proof_command = "proof";
export type proof_command = typeof proof_command;
export type TProofBroadCast = {
  proof: DeclareProofOfSpace;
  passed_filter: bool;
};
export type WsProofMessage = GetMessageType<chia_farmer_service, proof_command, TProofBroadCast>;
export async function on_proof(daemon: TDaemon, callback: (e: WsProofMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
    if(e.origin === chia_farmer_service && e.command === proof_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

export const submitted_partial_command = "submitted_partial";
export type submitted_partial_command = typeof submitted_partial_command;
export type TSubmittedPartialBroadCast = {
  launcher_id: str;
  pool_url: str;
  current_difficulty: uint64;
  points_acknowledged_since_start: uint64;
  points_acknowledged_24h: Array<[float, uint64]>; // [(time.time(), new_difficulty)]
};
export type WsSubmittedPartialMessage = GetMessageType<chia_farmer_service, submitted_partial_command, TSubmittedPartialBroadCast>;
export async function on_submitted_partial(daemon: TDaemon, callback: (e: WsSubmittedPartialMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
    if(e.origin === chia_farmer_service && e.command === submitted_partial_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}


export type WsFarmerMessage =
  WsGetConnectionFarmerMessage
  | WsNewFarmingInfoMessage
  | WsNewSignagePointMessage
  | WsHarvesterUpdateMessage
  | WsHarvesterRemovedMessage
  | WsProofMessage
  | WsSubmittedPartialMessage
  ;

// Whole commands for the service
export type chia_farmer_commands = get_connections_command
  | new_farming_info_command
  | new_signage_point_command
  | harvester_update_command
  | harvester_removed_command
  | proof_command
  | submitted_partial_command
;
export type TChiaFarmerBroadcast = TGetConnectionsBroadCast
  | TNewFarmingInfoBroadCast
  | TNewSignagePointBroadCast
  | THarvesterUpdateBroadCast
  | THarvesterRemovedBroadCast
  | TProofBroadCast
  | TSubmittedPartialBroadCast
;
export async function on_message_from_farmer(daemon: TDaemon, callback: (e: WsFarmerMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsFarmerMessage) => {
    if(e.origin === chia_farmer_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}
