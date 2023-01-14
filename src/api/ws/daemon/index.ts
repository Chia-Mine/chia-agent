// The daemon service currently does not provide state_change event as of v1.1.5.
import {GetMessageType, wallet_ui_service} from "../../types";
import {TDaemon} from "../../../daemon/index";
import {bool, False, int, None, Optional, str, True, uint32} from "../../chia/types/_python_types_";
import {chiapos_install_info} from "../../chia/plotters/chiapos";
import {bladebit_install_info} from "../../chia/plotters/bladebit";
import {madmax_install_info} from "../../chia/plotters/maxmax";
import {KeyData} from "../../chia/util/keychain";

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
export type WsPingMessage = GetMessageType<daemon_service, ping_command, TPingResponse>;
export async function ping(daemon: TDaemon) {
  return daemon.sendMessage<WsPingMessage>(daemon_service, ping_command);
}



export type TService = "chia"|"chia_wallet"|"chia_full_node"|"chia_harvester"|"chia_farmer"
  |"chia_introducer"|"chia_timelord"|"chia_timelord_launcher"|"chia_full_node_simulator";
export const start_service_command = "start_service";
export type start_service_command = typeof start_service_command;
export type TStartServiceRequest = {
  service: TService;
  testing?: bool;
};
export type TStartServiceResponse = {
  success: bool;
  service: TService;
  error: Optional<str>;
};
export type WsStartServiceMessage = GetMessageType < daemon_service, start_service_command, TStartServiceResponse>;
export async function start_service(daemon: TDaemon, data: TStartServiceRequest) {
  return daemon.sendMessage<WsStartServiceMessage>(daemon_service, start_service_command, data);
}



export const start_plotting_command = "start_plotting";
export type start_plotting_command = typeof start_plotting_command;
export type TCommonPlottingParams = {
  service: "chia_plotter";
  delay?: int; // delay in seconds. Default: 0
  parallel?: bool; // parallel or serialize. Default: False
  k: int; // size. 32, 33, ...
  t: str; // tmp dir
  d: str; // final dir
  x?: bool; // exclude final dir. Skips adding [final dir] to harvester for farming. Default: False
  n?: int; // count of creating plot. Default: 1
  queue?: str; // queue name. Default: "default"
  r: int; // number of threads
  f?: str; // farmer public key.
  p?: str; // pool public key.
  c?: str; // pool contract address.
};
export type TChiaPosParams = {
  plotter: "chiapos";
  t2: str; // tmp dir 2
  b: int; // memory buffer size in MiB
  u: int; // number of buckets
  a?: int; // wallet private key fingerprint
  e: bool; // disable bitfield plotting
  overrideK: bool; // Set true only if you want to use k < 32
};
export type TBladeBitRamParams = {
  plotter: "bladebit";
  plot_type: "ramplot";
  w?: bool; // Warm start. Default: False
  m?: bool; // Disable NUMA. Default: False
  no_cpu_affinity?: bool; // Default: False
};
export type TBladeBitDiskParams = {
  plotter: "bladebit";
  plot_type: "diskplot";
  w?: bool; // Warm start. Default: False
  m?: bool; // Disable NUMA. Default: False
  no_cpu_affinity?: bool; // Default: False
  t1: str; // Temp directory
  t2?: str; // Temp2 directory
  u?: int; // Buckets
  cache?: str;
  f1_threads?: int;
  fp_threads?: int;
  c_threads?: int;
  p2_threads?: int;
  p3_threads?: int;
  alternate?: bool; // Default: False
  no_t1_direct?: bool; // Default: False
  no_t2_direct?: bool; // Default: False
};
export type TMadMaxParams = {
  plotter: "madmax";
  t2: str; // tmp dir 2
  b: int; // memory buffer size in MiB
  u: int; // number of buckets
  v: int; // number of buckets for phase 3 & 4
  K?: int; // Thread multiplier for phase 2. Default: 1
  G?: bool; // Alternate tmpdir/tmp2dir. Default: False
};
export type TStartPlottingRequest = TCommonPlottingParams & (TChiaPosParams | TBladeBitRamParams | TBladeBitDiskParams | TMadMaxParams);
export type TStartPlottingResponse = {
  success: bool;
  ids: str[];
  service_name: str; // should be 'chia_plotter'
};
export type WsStartPlottingMessage = GetMessageType<daemon_service, start_plotting_command, TStartPlottingResponse>;
export async function start_plotting(daemon: TDaemon, data: TStartPlottingRequest) {
  return daemon.sendMessage<WsStartPlottingMessage>(daemon_service, start_plotting_command, data);
}



export const stop_plotting_command = "stop_plotting";
export type stop_plotting_command = typeof stop_plotting_command;
export type TStopPlottingRequest = {
  id: str;
};
export type TStopPlottingResponse = {
  success: bool;
};
export type WsStopPlottingMessage = GetMessageType<daemon_service, stop_plotting_command, TStopPlottingResponse>;
export async function stop_plotting(daemon: TDaemon, data: TStopPlottingRequest) {
  return daemon.sendMessage<WsStopPlottingMessage>(daemon_service, stop_plotting_command, data);
}



export const stop_service_command = "stop_service";
export type stop_service_command = typeof stop_service_command;
export type TStopServiceRequest = {
  service: str;
};
export type TStopServiceResponse = {
  success: bool;
  service_name: str;
};
export type WsStopServiceMessage = GetMessageType<daemon_service, stop_service_command, TStopServiceResponse>;
export async function stop_service(daemon: TDaemon, data: TStopServiceRequest) {
  return daemon.sendMessage<WsStopServiceMessage>(daemon_service, stop_service_command, data);
}



export const running_services_command = "running_services";
export type running_services_command = typeof running_services_command;
export type TRunningServicesResponse = {
  success: bool;
  running_services: str[];
};
export type WsRunningServicesMessage = GetMessageType<daemon_service, running_services_command, TRunningServicesResponse>;
export async function running_services(daemon: TDaemon) {
  return daemon.sendMessage<WsRunningServicesMessage>(daemon_service, running_services_command);
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
export type WsIsRunningMessage = GetMessageType<daemon_service, is_running_command, TIsRunningResponse>;
export async function is_running(daemon: TDaemon, data: TIsRunningRequest) {
  return daemon.sendMessage<WsIsRunningMessage>(daemon_service, is_running_command, data);
}



export const add_private_key_command = "add_private_key";
export type add_private_key_command = typeof add_private_key_command;
export type TAddPrivateKeyRequest = {
  kc_user?: str;
  kc_testing?: bool;
  mnemonic?: str;
  label?: str;
};
export type TAddPrivateKeyResponse = {
  success: bool;
  error?: str;
  error_details?: {message: str};
};
export type WsAddPrivateKeyMessage = GetMessageType<daemon_service, add_private_key_command, TAddPrivateKeyResponse>;
export async function add_private_key(daemon: TDaemon, data: TAddPrivateKeyRequest) {
  return daemon.sendMessage<WsAddPrivateKeyMessage>(daemon_service, add_private_key_command, data);
}



export const check_keys_command = "check_keys";
export type check_keys_command = typeof check_keys_command;
export type TCheckKeysRequest = {
  kc_user?: str;
  kc_testing?: bool;
  root_path: str;
};
export type TCheckKeysResponse = {
  success: bool;
  error?: str;
  error_details?: {message: str};
};
export type WsCheckKeysMessage = GetMessageType<daemon_service, check_keys_command, TCheckKeysResponse>;
export async function check_keys(daemon: TDaemon, data: TCheckKeysRequest) {
  return daemon.sendMessage<WsCheckKeysMessage>(daemon_service, check_keys_command, data);
}



export const delete_all_keys_command = "delete_all_keys";
export type delete_all_keys_command = typeof delete_all_keys_command;
export type TDeleteAllKeysRequest = {
  kc_user?: str;
  kc_testing?: bool;
};
export type TDeleteAllKeysResponse = {
  success: bool;
  error?: str;
  error_details?: {message: str};
};
export type WsDeleteAllKeysMessage = GetMessageType<daemon_service, delete_all_keys_command, TDeleteAllKeysResponse>;
export async function delete_all_keys(daemon: TDaemon, data: TDeleteAllKeysRequest) {
  return daemon.sendMessage<WsDeleteAllKeysMessage>(daemon_service, delete_all_keys_command, data);
}



export const delete_key_by_fingerprint_command = "delete_key_by_fingerprint";
export type delete_key_by_fingerprint_command = typeof delete_key_by_fingerprint_command;
export type TDeleteKeyByFingerprintRequest = {
  kc_user?: str;
  kc_testing?: bool;
  fingerprint: int;
};
export type TDeleteKeyByFingerprintResponse = {
  success: bool;
  error?: str;
  error_details?: {message: str};
};
export type WsDeleteKeyByFingerprintMessage = GetMessageType<daemon_service, delete_key_by_fingerprint_command, TDeleteKeyByFingerprintResponse>;
export async function delete_key_by_fingerprint(daemon: TDaemon, data: TDeleteKeyByFingerprintRequest) {
  return daemon.sendMessage<WsDeleteKeyByFingerprintMessage>(daemon_service, delete_key_by_fingerprint_command, data);
}



export const get_all_private_keys_command = "get_all_private_keys";
export type get_all_private_keys_command = typeof get_all_private_keys_command;
export type TGetAllPrivateKeysRequest = {
  kc_user?: str;
  kc_testing?: bool;
};
export type TGetAllPrivateKeysResponse = {
  success: bool;
  error?: str;
  private_keys: Array<{pk: str; entropy: str}>;
};
export type WsGetAllPrivateKeysMessage = GetMessageType<daemon_service, get_all_private_keys_command, TGetAllPrivateKeysResponse>;
export async function get_all_private_keys(daemon: TDaemon, data: TGetAllPrivateKeysRequest) {
  return daemon.sendMessage<WsGetAllPrivateKeysMessage>(daemon_service, get_all_private_keys_command, data);
}



export const get_first_private_key_command = "get_first_private_key";
export type get_first_private_key_command = typeof get_first_private_key_command;
export type TGetFirstPrivateKeyRequest = {
  kc_user?: str;
  kc_testing?: bool;
};
export type TGetFirstPrivateKeyResponse = {
  success: bool;
  error?: str;
  private_key: {pk: str; entropy: str};
};
export type WsGetFirstPrivateKeyMessage = GetMessageType<daemon_service, get_first_private_key_command, TGetFirstPrivateKeyResponse>;
export async function get_first_private_key(daemon: TDaemon, data: TGetFirstPrivateKeyRequest) {
  return daemon.sendMessage<WsGetFirstPrivateKeyMessage>(daemon_service, get_first_private_key_command, data);
}



export const get_key_for_fingerprint_command = "get_key_for_fingerprint";
export type get_key_for_fingerprint_command = typeof get_key_for_fingerprint_command;
export type TGetKeyForFingerprintRequest = {
  kc_user?: str;
  kc_testing?: bool;
  fingerprint?: int;
};
export type TGetKeyForFingerprintResponse = {
  success: bool;
  error?: str;
  pk: str;
  entropy: str;
};
export type WsGetKeyForFingerprintMessage = GetMessageType<daemon_service, get_key_for_fingerprint_command, TGetKeyForFingerprintResponse>;
export async function get_key_for_fingerprint(daemon: TDaemon, data: TGetKeyForFingerprintRequest) {
  return daemon.sendMessage<WsGetKeyForFingerprintMessage>(daemon_service, get_key_for_fingerprint_command, data);
}



export const get_key_command = "get_key";
export type get_key_command = typeof get_key_command;
export type TGetKeyRequest = {
  fingerprint: uint32;
  include_secrets?: bool;
};
export type TGetKeyResponse = {
  success: True;
  key: KeyData;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
};
export type WsGetKeyMessage = GetMessageType<daemon_service, get_key_command, TGetKeyResponse>;
export async function get_key(daemon: TDaemon, data: TGetKeyRequest) {
  return daemon.sendMessage<WsGetKeyMessage>(daemon_service, get_key_command, data);
}



export const get_keys_command = "get_keys";
export type get_keys_command = typeof get_keys_command;
export type TGetKeysRequest = {
  include_secrets?: bool;
};
export type TGetKeysResponse = {
  success: True;
  keys: KeyData[];
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
};
export type WsGetKeysMessage = GetMessageType<daemon_service, get_keys_command, TGetKeysResponse>;
export async function get_keys(daemon: TDaemon, data: TGetKeysRequest) {
  return daemon.sendMessage<WsGetKeysMessage>(daemon_service, get_keys_command, data);
}



export const set_label_command = "set_label";
export type set_label_command = typeof set_label_command;
export type TSetLabelRequest = {
  fingerprint: uint32;
  label: str;
};
export type TSetLabelResponse = {
  success: True;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
};
export type WsSetLabelMessage = GetMessageType<daemon_service, set_label_command, TSetLabelResponse>;
export async function set_label(daemon: TDaemon, data: TSetLabelRequest) {
  return daemon.sendMessage<WsSetLabelMessage>(daemon_service, set_label_command, data);
}



export const delete_label_command = "delete_label";
export type delete_label_command = typeof delete_label_command;
export type TDeleteLabelRequest = {
  fingerprint: uint32;
};
export type TDeleteLabelResponse = {
  success: True;
} | {
  success: False;
  error: "keyring is locked" | "key not found" | "malformed request";
  error_details?: {message: str} | {fingerprint: int};
};
export type WsDeleteLabelMessage = GetMessageType<daemon_service, delete_label_command, TDeleteLabelResponse>;
export async function delete_label(daemon: TDaemon, data: TDeleteLabelRequest) {
  return daemon.sendMessage<WsDeleteLabelMessage>(daemon_service, delete_label_command, data);
}



export const is_keyring_locked_command = "is_keyring_locked";
export type is_keyring_locked_command = typeof is_keyring_locked_command;
export type TIsKeyringLockedResponse = {
  success: bool;
  is_keyring_locked: bool;
};
export type WsIsKeyringLockedMessage = GetMessageType<daemon_service, is_keyring_locked_command, TIsKeyringLockedResponse>;
export async function is_keyring_locked(daemon: TDaemon) {
  return daemon.sendMessage<WsIsKeyringLockedMessage>(daemon_service, is_keyring_locked_command);
}



export const keyring_status_command = "keyring_status";
export type keyring_status_command = typeof keyring_status_command;
export type TKeyringStatusResponse = {
  success: bool;
  is_keyring_locked: bool;
  passphrase_support_enabled: bool;
  can_save_passphrase: bool;
  user_passphrase_is_set: bool;
  can_set_passphrase_hint: bool;
  passphrase_hint: str;
  passphrase_requirements: {} | {
    is_optional: True;
    min_length: int;
  };
};
export type WsKeyringStateMessage = GetMessageType<daemon_service, keyring_status_command, TKeyringStatusResponse>;
export async function keyring_status(daemon: TDaemon) {
  return daemon.sendMessage<WsKeyringStateMessage>(daemon_service, keyring_status_command);
}



export const unlock_keyring_command = "unlock_keyring";
export type unlock_keyring_command = typeof unlock_keyring_command;
export type TUnlockKeyringRequest = {
  key: string;
};
export type TUnlockKeyringResponse = {
  success: bool;
  error: str|None;
};
export type WsUnlockKeyringMessage = GetMessageType<daemon_service, unlock_keyring_command, TUnlockKeyringResponse>;
export async function unlock_keyring(daemon: TDaemon, data: TUnlockKeyringRequest) {
  return daemon.sendMessage<WsUnlockKeyringMessage>(daemon_service, unlock_keyring_command, data);
}



export const validate_keyring_passphrase_command = "validate_keyring_passphrase";
export type validate_keyring_passphrase_command = typeof validate_keyring_passphrase_command;
export type TValidateKeyringPassphraseRequest = {
  key: string;
};
export type TValidateKeyringPassphraseResponse = {
  success: bool;
  error: str|None;
};
export type WsValidateKeyringPassphraseMessage = GetMessageType<daemon_service, validate_keyring_passphrase_command, TValidateKeyringPassphraseResponse>;
export async function validate_keyring_passphrase(daemon: TDaemon, data: TValidateKeyringPassphraseRequest) {
  return daemon.sendMessage<WsValidateKeyringPassphraseMessage>(daemon_service, validate_keyring_passphrase_command, data);
}



export const migrate_keyring_command = "migrate_keyring";
export type migrate_keyring_command = typeof migrate_keyring_command;
export type TMigrateKeyringRequest = {
  passphrase?: str;
  passphrase_hint?: str;
  save_passphrase?: bool;
  cleanup_legacy_keyring?: bool;
};
export type TMigrateKeyringResponse = {
  success: bool;
  error: str|None;
};
export type WsMigrateKeyringMessage = GetMessageType<daemon_service, migrate_keyring_command, TMigrateKeyringResponse>;
export async function migrate_keyring(daemon: TDaemon, data: TMigrateKeyringRequest) {
  return daemon.sendMessage<WsMigrateKeyringMessage>(daemon_service, migrate_keyring_command, data);
}



export const set_keyring_passphrase_command = "set_keyring_passphrase";
export type set_keyring_passphrase_command = typeof set_keyring_passphrase_command;
export type TSetKeyringPassphraseRequest = {
  current_passphrase: str;
  new_passphrase: str;
  passphrase_hint?: str;
  save_passphrase?: bool;
};
export type TSetKeyringPassphraseResponse = {
  success: bool;
  error: str;
};
export type WsSetKeyringPassphraseMessage = GetMessageType<daemon_service, set_keyring_passphrase_command, TSetKeyringPassphraseResponse>;
export async function set_keyring_passphrase(daemon: TDaemon, data: TSetKeyringPassphraseRequest) {
  return daemon.sendMessage<WsSetKeyringPassphraseMessage>(daemon_service, set_keyring_passphrase_command, data);
}



export const remove_keyring_passphrase_command = "remove_keyring_passphrase";
export type remove_keyring_passphrase_command = typeof remove_keyring_passphrase_command;
export type TRemoveKeyringPassphraseRequest = {
  current_passphrase: str;
};
export type TRemoveKeyringPassphraseResponse = {
  success: bool;
  error: str;
};
export type WsRemoveKeyringPassphraseMessage = GetMessageType<daemon_service, remove_keyring_passphrase_command, TRemoveKeyringPassphraseResponse>
export async function remove_keyring_passphrase(daemon: TDaemon, data: TRemoveKeyringPassphraseRequest) {
  return daemon.sendMessage<WsRemoveKeyringPassphraseMessage>(daemon_service, remove_keyring_passphrase_command, data);
}



export const notify_keyring_migration_completed_command = "notify_keyring_migration_completed";
export type notify_keyring_migration_completed_command = typeof notify_keyring_migration_completed_command;
export type TNotifyKeyringMigrationCompletedRequest = {
  key: str;
};
export type TNotifyKeyringMigrationCompletedResponse = {
  success: bool;
  error: str;
};
export type WsNotifyKeyringMigrationCompletedMessage = GetMessageType<daemon_service, notify_keyring_migration_completed_command, TNotifyKeyringMigrationCompletedResponse>;
export async function notify_keyring_migration_completed(daemon: TDaemon, data: TNotifyKeyringMigrationCompletedRequest) {
  return daemon.sendMessage<WsNotifyKeyringMigrationCompletedMessage>(daemon_service, notify_keyring_migration_completed_command, data);
}



export const exit_command = "exit";
export type exit_command = typeof exit_command;
export type TExitRequest = {
};
export type TExitResponse = {
  success: bool;
};
export type WsExitMessage = GetMessageType<daemon_service, exit_command, TExitResponse>;
export async function exit(daemon: TDaemon) {
  return daemon.sendMessage<WsExitMessage>(daemon_service, exit_command);
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
export type WsRegisterServiceMessage = GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse>;
export async function register_service(daemon: TDaemon, data: TRegisterServiceRequest) {
  return daemon.sendMessage<WsRegisterServiceMessage>(daemon_service, register_service_command, data);
}



export const get_status_command = "get_status";
export type get_status_command = typeof get_status_command;
export type TGetStatusRequest = {
};
export type TGetStatusResponse = {
  success: True;
  genesis_initialized: True;
};
export type WsGetStatusMessage = GetMessageType<daemon_service, get_status_command, TGetStatusResponse>;
export async function get_status(daemon: TDaemon) {
  return daemon.sendMessage<WsGetStatusMessage>(daemon_service, get_status_command);
}



export const get_version_command = "get_version";
export type get_version_command = typeof get_version_command;
export type TGetVersionRequest = {
};
export type TGetVersionResponse = {
  success: bool;
  version: string;
};
export type WsGetVersionMessage = GetMessageType<daemon_service, get_version_command, TGetVersionResponse>;
export async function get_version(daemon: TDaemon) {
  return daemon.sendMessage<WsGetVersionMessage>(daemon_service, get_version_command);
}



export const get_plotters_command = "get_plotters";
export type get_plotters_command = typeof get_plotters_command;
export type TGetPlottersRequest = {
};
export type TGetPlottersResponse = {
  success: True;
  plotters: {
    chiapos?: chiapos_install_info;
    bladebit?: bladebit_install_info;
    madmax?: madmax_install_info;
  }
};
export type WsGetPlottersMessage = GetMessageType<daemon_service, get_plotters_command, TGetPlottersResponse>;
export async function get_plotters(daemon: TDaemon) {
  return daemon.sendMessage<WsGetPlottersMessage>(daemon_service, get_plotters_command);
}


//// From here subscribe/listen style APIs ////

export const keyring_status_changed_command = "keyring_status_changed";
export type keyring_status_changed_command = typeof keyring_status_changed_command;
export type TKeyringStatusChangedBroadCast = {
  keyring_status_changed: TKeyringStatusResponse;
};
export type WsKeyringStatusChangedMessage = GetMessageType<daemon_service, keyring_status_changed_command, TKeyringStatusChangedBroadCast>;
export async function on_keyring_status_changed(daemon: TDaemon, callback: (e: WsKeyringStatusChangedMessage) => unknown){
  await daemon.subscribe(wallet_ui_service);
  const messageListener = (e: WsDaemonMessage) => {
    if(e.origin === daemon_service && e.command === keyring_status_changed_command){
      callback(e);
    }
  };
  return daemon.addMessageListener(daemon_service, messageListener);
}

export type WsDaemonMessage =
  WsExitMessage
  | WsGetStatusMessage
  | WsGetVersionMessage
  | WsGetPlottersMessage
  | WsRunningServicesMessage
  | WsIsRunningMessage
  | WsPingMessage
  | WsRegisterServiceMessage
  | WsStartPlottingMessage
  | WsStartServiceMessage
  | WsStopPlottingMessage
  | WsStopServiceMessage
  | WsAddPrivateKeyMessage
  | WsCheckKeysMessage
  | WsDeleteAllKeysMessage
  | WsDeleteKeyByFingerprintMessage
  | WsGetAllPrivateKeysMessage
  | WsGetFirstPrivateKeyMessage
  | WsGetKeyForFingerprintMessage
  | WsGetKeyMessage
  | WsGetKeysMessage
  | WsSetLabelMessage
  | WsDeleteLabelMessage
  | WsIsKeyringLockedMessage
  | WsKeyringStateMessage
  | WsUnlockKeyringMessage
  | WsValidateKeyringPassphraseMessage
  | WsMigrateKeyringMessage
  | WsSetKeyringPassphraseMessage
  | WsRemoveKeyringPassphraseMessage
  | WsNotifyKeyringMigrationCompletedMessage
  | WsKeyringStatusChangedMessage
;
