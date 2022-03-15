import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {uint32, uint64} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, TConnectionGeneral, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";
import {TGetHarvestersResponse} from "../../rpc/farmer/index";

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

export const new_plots_command = "get_harvesters"; // not "new_plots" for now. See https://github.com/Chia-Network/chia-blockchain/blob/773d692fc5a7ee539392c78902857c3c03e00560/chia/rpc/farmer_rpc_api.py#L50
export type new_plots_command = typeof new_plots_command;
export type TNewPlotsBroadCast = TGetHarvestersResponse;
export async function on_new_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_plots_command, TNewPlotsBroadCast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service && e.command === new_plots_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}

// Whole commands for the service
export type chia_farmer_commands = get_connections_command | new_farming_info_command | new_signage_point_command | new_plots_command;
export type TChiaFarmerBroadcast = TGetConnectionsBroadCast | TNewFarmingInfoBroadCast | TNewSignagePointBroadCast | TNewPlotsBroadCast;
export async function on_message_from_farmer(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, chia_farmer_commands, TChiaFarmerBroadcast>) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_farmer_service){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_farmer_service, messageListener);
}