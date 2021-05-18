import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {uint32, uint64} from "../../chia/types/_python_types_";
import {TDaemon} from "../../../daemon/index";
import {GetMessageType, wallet_ui_service} from "../../types";
import {WsMessage} from "../index";

export const chia_farmer_service = "chia_farmer";
export type chia_farmer_service = typeof chia_farmer_service;

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
