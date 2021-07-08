// The daemon service currently does not provide state_change event as of v1.1.5.
import {GetMessageType} from "../../types";
import {TDaemon} from "../../../daemon/index";
import {bool, int, Optional, str, True} from "../../chia/types/_python_types_";

export const daemon_service = "daemon";
export type daemon_service = typeof daemon_service;

export const ping_command = "ping";
export type ping_command = typeof ping_command;
export type TPingRequest = {
};
export type TPingResponse = {
  success: True;
  value: str;
};
export async function ping(daemon: TDaemon) {
  return daemon.sendMessage<GetMessageType<daemon_service, ping_command, TPingResponse>>(daemon_service, ping_command);
}



export const start_service_command = "start_service";
export type start_service_command = typeof start_service_command;
export type TStartServiceRequest = {
  service: str;
  testing?: bool;
};
export type TStartServiceResponse = {
  success: bool;
  service: str;
  error: Optional<str>;
};
export async function start_service(daemon: TDaemon, data: TStartServiceRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, start_service_command, TStartServiceResponse>>(daemon_service, start_service_command, data);
}



export const start_plotting_command = "start_plotting";
export type start_plotting_command = typeof start_plotting_command;
export type TStartPlottingRequest = {
  service: "chia plots create";
  delay?: int; // delay in seconds
  parallel?: bool; // parallel or serialize
  k: int; // size
  n?: int; // count of creating plot
  queue?: str; // queue name
  t: str; // tmp dir
  t2: str; // tmp dir 2
  d: str; // final dir
  b: int; // memory buffer size. 3390 is recommended.
  u: int; // number of buckets. 128 is recommended
  r: int; // number of threads. 2 is recommended.
  a?: int; // fingerprint. Confirm it via `chia keys show` command.
  f?: str; // farmer public key
  p?: str; // pool public key
  c?: str; // pool contract address
  e: bool; // disable bitfield plotting. False is recommended.
  x: bool; // Skip final dir copy. False is recommended.
  overrideK: bool; // True if you want to use k < 33
};
export type TStartPlottingResponse = {
  success: bool;
  service_name: str; // should be 'chia plots create'
};
export async function start_plotting(daemon: TDaemon, data: TStartPlottingRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, start_plotting_command, TStartPlottingResponse>>(daemon_service, start_plotting_command, data);
}



export const stop_plotting_command = "stop_plotting";
export type stop_plotting_command = typeof stop_plotting_command;
export type TStopPlottingRequest = {
  id: str;
};
export type TStopPlottingResponse = {
  success: bool;
};
export async function stop_plotting(daemon: TDaemon, data: TStopPlottingRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, stop_plotting_command, TStopPlottingResponse>>(daemon_service, stop_plotting_command, data);
}



export const stop_service_command = "stop_service";
export type stop_service_command = typeof stop_service_command;
export type TStopServiceRequest = {
  service: str;
};
export type TStopServiceResponse = {
};
export async function stop_service(daemon: TDaemon, data: TStopServiceRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, stop_service_command, TStopServiceResponse>>(daemon_service, stop_service_command, data);
}



export const is_running_command = "is_running";
export type is_running_command = typeof is_running_command;
export type TIsRunningRequest = {
  service: str;
};
export type TIsRunningResponse = {
  success: bool;
  service_name: str;
  is_running: bool;
};
export async function is_running(daemon: TDaemon, data: TIsRunningRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, is_running_command, TIsRunningResponse>>(daemon_service, is_running_command, data);
}



export const exit_command = "exit";
export type exit_command = typeof exit_command;
export type TExitRequest = {
};
export type TExitResponse = {
  success: bool;
};
export async function exit(daemon: TDaemon) {
  return daemon.sendMessage<GetMessageType<daemon_service, exit_command, TExitResponse>>(daemon_service, exit_command);
}



export type TPlotQueue = {
  id: str;
  queue: str;
  size: int; // str is allowed as far as I looked into the code.
  parallel: bool;
  delay: int;
  state: str;
  error: Optional<str>;
  deleted: bool;
  log_new: str;
  log?: str;
};
export const register_service_command = "register_service";
export type register_service_command = typeof register_service_command;
export type TRegisterServiceRequest = {
  service: str;
};
export type TRegisterServiceResponse = {
  success: bool;
} | {
  success: bool;
  service: str;
  queue: TPlotQueue[];
};
export async function register_service(daemon: TDaemon, data: TRegisterServiceRequest) {
  return daemon.sendMessage<GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse>>(daemon_service, register_service_command, data);
}



export const get_status_command = "get_status";
export type get_status_command = typeof get_status_command;
export type TGetStatusRequest = {
};
export type TGetStatusResponse = {
  success: True;
  genesis_initialized: True;
};
export async function get_status(daemon: TDaemon) {
  return daemon.sendMessage<GetMessageType<daemon_service, get_status_command, TGetStatusResponse>>(daemon_service, get_status_command);
}
