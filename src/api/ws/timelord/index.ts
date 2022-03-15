import {TDaemon} from "../../../daemon/index";
import {GetMessageType, metrics_service} from "../../types";
import {WsMessage} from "../index";
import {float, uint32, uint64, uint8} from "../../chia/types/_python_types_";
import {Chain} from "../../chia/timelord/types";
import {VDFInfo, VDFProof} from "../../chia/types/blockchain_format/vdf";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";

export const chia_timelord_service = "chia_timelord";
export type chia_timelord_service = typeof chia_timelord_service;

export const finished_pot_command = "finished_pot";
export type finished_pot_command = typeof finished_pot_command;
export type TFinishedPotBroadCast = {
  estimated_ips: float;
  iterations_needed: uint64;
  chain: Chain;
  vdf_info: VDFInfo;
  vdf_proof: VDFProof;
};
export async function on_finished_pot(daemon: TDaemon, callback: (e: GetMessageType<chia_timelord_service, finished_pot_command, TFinishedPotBroadCast>) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_timelord_service && e.command === finished_pot_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_timelord_service, messageListener);
}

export const new_compact_proof_command = "new_compact_proof";
export type new_compact_proof_command = typeof new_compact_proof_command;
export type TNewCompactProofBroadCast = {
  header_hash: bytes32;
  height: uint32;
  field_vdf: uint8;
};
export async function on_new_compact_proof(daemon: TDaemon, callback: (e: GetMessageType<chia_timelord_service, new_compact_proof_command, TNewCompactProofBroadCast>) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_timelord_service && e.command === new_compact_proof_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_timelord_service, messageListener);
}

export const skipping_peak_command = "skipping_peak";
export type skipping_peak_command = typeof skipping_peak_command;
export type TSkippingPeakBroadCast = {
  height: uint32;
};
export async function on_skipping_peak(daemon: TDaemon, callback: (e: GetMessageType<chia_timelord_service, skipping_peak_command, TSkippingPeakBroadCast>) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_timelord_service && e.command === skipping_peak_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_timelord_service, messageListener);
}

export const new_peak_command = "new_peak";
export type new_peak_command = typeof new_peak_command;
export type TNewPeakBroadCast = {
  height: uint32;
};
export async function on_new_peak(daemon: TDaemon, callback: (e: GetMessageType<chia_timelord_service, new_peak_command, TNewPeakBroadCast>) => unknown){
  await daemon.subscribe(metrics_service);
  const messageListener = (e: WsMessage) => {
    if(e.origin === chia_timelord_service && e.command === new_peak_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(chia_timelord_service, messageListener);
}
