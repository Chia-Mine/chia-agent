import { GetMessageType } from "../../types";
import { TDaemon } from "../../../daemon/index";
import { bool, int, None, Optional, str, True } from "../../chia/types/_python_types_";
export declare const daemon_service = "daemon";
export declare type daemon_service = typeof daemon_service;
export declare const ping_command = "ping";
export declare type ping_command = typeof ping_command;
export declare type TPingRequest = {};
export declare type TPingResponse = {
    success: True;
    value: str;
};
export declare function ping(daemon: TDaemon): Promise<GetMessageType<"daemon", "ping", TPingResponse>>;
export declare type TService = "chia" | "chia_wallet" | "chia_full_node" | "chia_harvester" | "chia_farmer" | "chia_introducer" | "chia_timelord" | "chia_timelord_launcher" | "chia_full_node_simulator";
export declare const start_service_command = "start_service";
export declare type start_service_command = typeof start_service_command;
export declare type TStartServiceRequest = {
    service: TService;
    testing?: bool;
};
export declare type TStartServiceResponse = {
    success: bool;
    service: TService;
    error: Optional<str>;
};
export declare function start_service(daemon: TDaemon, data: TStartServiceRequest): Promise<GetMessageType<"daemon", "start_service", TStartServiceResponse>>;
export declare const start_plotting_command = "start_plotting";
export declare type start_plotting_command = typeof start_plotting_command;
export declare type TStartPlottingRequest = {
    service: "chia plots create";
    delay?: int;
    parallel?: bool;
    k: int;
    n?: int;
    queue?: str;
    t: str;
    t2: str;
    d: str;
    b: int;
    u: int;
    r: int;
    a?: int;
    f?: str;
    p?: str;
    c?: str;
    e: bool;
    x: bool;
    overrideK: bool;
};
export declare type TStartPlottingResponse = {
    success: bool;
    service_name: str;
};
export declare function start_plotting(daemon: TDaemon, data: TStartPlottingRequest): Promise<GetMessageType<"daemon", "start_plotting", TStartPlottingResponse>>;
export declare const stop_plotting_command = "stop_plotting";
export declare type stop_plotting_command = typeof stop_plotting_command;
export declare type TStopPlottingRequest = {
    id: str;
};
export declare type TStopPlottingResponse = {
    success: bool;
};
export declare function stop_plotting(daemon: TDaemon, data: TStopPlottingRequest): Promise<GetMessageType<"daemon", "stop_plotting", TStopPlottingResponse>>;
export declare const stop_service_command = "stop_service";
export declare type stop_service_command = typeof stop_service_command;
export declare type TStopServiceRequest = {
    service: str;
};
export declare type TStopServiceResponse = {};
export declare function stop_service(daemon: TDaemon, data: TStopServiceRequest): Promise<GetMessageType<"daemon", "stop_service", TStopServiceResponse>>;
export declare const is_running_command = "is_running";
export declare type is_running_command = typeof is_running_command;
export declare type TIsRunningRequest = {
    service: str;
};
export declare type TIsRunningResponse = {
    success: bool;
    service_name: str;
    is_running: bool;
};
export declare function is_running(daemon: TDaemon, data: TIsRunningRequest): Promise<GetMessageType<"daemon", "is_running", TIsRunningResponse>>;
export declare const add_private_key_command = "add_private_key";
export declare type add_private_key_command = typeof add_private_key_command;
export declare type TAddPrivateKeyRequest = {
    kc_user?: str;
    kc_testing?: bool;
    mnemonic?: str;
    passphrase?: str;
};
export declare type TAddPrivateKeyResponse = {
    success: bool;
    error?: str;
    error_details?: {
        message: str;
    };
};
export declare function add_private_key(daemon: TDaemon, data: TAddPrivateKeyRequest): Promise<GetMessageType<"daemon", "add_private_key", TAddPrivateKeyResponse>>;
export declare const check_keys_command = "check_keys";
export declare type check_keys_command = typeof check_keys_command;
export declare type TCheckKeysRequest = {
    kc_user?: str;
    kc_testing?: bool;
    root_path: str;
};
export declare type TCheckKeysResponse = {
    success: bool;
    error?: str;
    error_details?: {
        message: str;
    };
};
export declare function check_keys(daemon: TDaemon, data: TCheckKeysRequest): Promise<GetMessageType<"daemon", "check_keys", TCheckKeysResponse>>;
export declare const delete_all_keys_command = "delete_all_keys";
export declare type delete_all_keys_command = typeof delete_all_keys_command;
export declare type TDeleteAllKeysRequest = {
    kc_user?: str;
    kc_testing?: bool;
};
export declare type TDeleteAllKeysResponse = {
    success: bool;
    error?: str;
    error_details?: {
        message: str;
    };
};
export declare function delete_all_keys(daemon: TDaemon, data: TDeleteAllKeysRequest): Promise<GetMessageType<"daemon", "delete_all_keys", TDeleteAllKeysResponse>>;
export declare const delete_key_by_fingerprint_command = "delete_key_by_fingerprint";
export declare type delete_key_by_fingerprint_command = typeof delete_key_by_fingerprint_command;
export declare type TDeleteKeyByFingerprintRequest = {
    kc_user?: str;
    kc_testing?: bool;
    fingerprint: int;
};
export declare type TDeleteKeyByFingerprintResponse = {
    success: bool;
    error?: str;
    error_details?: {
        message: str;
    };
};
export declare function delete_key_by_fingerprint(daemon: TDaemon, data: TDeleteKeyByFingerprintRequest): Promise<GetMessageType<"daemon", "delete_key_by_fingerprint", TDeleteKeyByFingerprintResponse>>;
export declare const get_all_private_keys_command = "get_all_private_keys";
export declare type get_all_private_keys_command = typeof get_all_private_keys_command;
export declare type TGetAllPrivateKeysRequest = {
    kc_user?: str;
    kc_testing?: bool;
};
export declare type TGetAllPrivateKeysResponse = {
    success: bool;
    error?: str;
    private_keys: Array<{
        pk: str;
        entropy: str;
    }>;
};
export declare function get_all_private_keys(daemon: TDaemon, data: TGetAllPrivateKeysRequest): Promise<GetMessageType<"daemon", "get_all_private_keys", TGetAllPrivateKeysResponse>>;
export declare const get_first_private_key_command = "get_first_private_key";
export declare type get_first_private_key_command = typeof get_first_private_key_command;
export declare type TGetFirstPrivateKeyRequest = {
    kc_user?: str;
    kc_testing?: bool;
};
export declare type TGetFirstPrivateKeyResponse = {
    success: bool;
    error?: str;
    private_key: {
        pk: str;
        entropy: str;
    };
};
export declare function get_first_private_key(daemon: TDaemon, data: TGetFirstPrivateKeyRequest): Promise<GetMessageType<"daemon", "get_first_private_key", TGetFirstPrivateKeyResponse>>;
export declare const get_key_for_fingerprint_command = "get_key_for_fingerprint";
export declare type get_key_for_fingerprint_command = typeof get_key_for_fingerprint_command;
export declare type TGetKeyForFingerprintRequest = {
    kc_user?: str;
    kc_testing?: bool;
    fingerprint?: int;
};
export declare type TGetKeyForFingerprintResponse = {
    success: bool;
    error?: str;
    pk: str;
    entropy: str;
};
export declare function get_key_for_fingerprint(daemon: TDaemon, data: TGetKeyForFingerprintRequest): Promise<GetMessageType<"daemon", "get_key_for_fingerprint", TGetKeyForFingerprintResponse>>;
export declare const is_keyring_locked_command = "is_keyring_locked";
export declare type is_keyring_locked_command = typeof is_keyring_locked_command;
export declare type TIsKeyringLockedResponse = {
    success: bool;
    is_keyring_locked: bool;
};
export declare function is_keyring_locked(daemon: TDaemon): Promise<GetMessageType<"daemon", "is_keyring_locked", TIsKeyringLockedResponse>>;
export declare const keyring_status_command = "keyring_status";
export declare type keyring_status_command = typeof keyring_status_command;
export declare type TKeyringStatusResponse = {
    success: bool;
    is_keyring_locked: bool;
    passphrase_support_enabled: bool;
    user_passphrase_is_set: bool;
    needs_migration: bool;
};
export declare function keyring_status(daemon: TDaemon): Promise<GetMessageType<"daemon", "keyring_status", TKeyringStatusResponse>>;
export declare const unlock_keyring_command = "unlock_keyring";
export declare type unlock_keyring_command = typeof unlock_keyring_command;
export declare type TUnlockKeyringRequest = {
    key: string;
};
export declare type TUnlockKeyringResponse = {
    success: bool;
    error: string | None;
};
export declare function unlock_keyring(daemon: TDaemon, data: TUnlockKeyringRequest): Promise<GetMessageType<"daemon", "unlock_keyring", TUnlockKeyringResponse>>;
export declare const set_keyring_passphrase_command = "set_keyring_passphrase";
export declare type set_keyring_passphrase_command = typeof set_keyring_passphrase_command;
export declare type TSetKeyringPassphraseRequest = {
    current_passphrase: string;
    new_passphrase: string;
};
export declare type TSetKeyringPassphraseResponse = {
    success: bool;
    error: string;
};
export declare function set_keyring_passphrase(daemon: TDaemon, data: TSetKeyringPassphraseRequest): Promise<GetMessageType<"daemon", "set_keyring_passphrase", TSetKeyringPassphraseResponse>>;
export declare const remove_keyring_passphrase_command = "remove_keyring_passphrase";
export declare type remove_keyring_passphrase_command = typeof remove_keyring_passphrase_command;
export declare type TRemoveKeyringPassphraseRequest = {
    current_passphrase: str;
};
export declare type TRemoveKeyringPassphraseResponse = {
    success: bool;
    error: string;
};
export declare function remove_keyring_passphrase(daemon: TDaemon, data: TRemoveKeyringPassphraseRequest): Promise<GetMessageType<"daemon", "remove_keyring_passphrase", TRemoveKeyringPassphraseResponse>>;
export declare const exit_command = "exit";
export declare type exit_command = typeof exit_command;
export declare type TExitRequest = {};
export declare type TExitResponse = {
    success: bool;
};
export declare function exit(daemon: TDaemon): Promise<GetMessageType<"daemon", "exit", TExitResponse>>;
export declare type TPlotQueue = {
    id: str;
    queue: str;
    size: int;
    parallel: bool;
    delay: int;
    state: str;
    error: Optional<str>;
    deleted: bool;
    log_new: str;
    log?: str;
};
export declare const register_service_command = "register_service";
export declare type register_service_command = typeof register_service_command;
export declare type TRegisterServiceRequest = {
    service: str;
};
export declare type TRegisterServiceResponse = {
    success: bool;
} | {
    success: bool;
    service: str;
    queue: TPlotQueue[];
};
export declare function register_service(daemon: TDaemon, data: TRegisterServiceRequest): Promise<GetMessageType<"daemon", "register_service", TRegisterServiceResponse>>;
export declare const get_status_command = "get_status";
export declare type get_status_command = typeof get_status_command;
export declare type TGetStatusRequest = {};
export declare type TGetStatusResponse = {
    success: True;
    genesis_initialized: True;
};
export declare function get_status(daemon: TDaemon): Promise<GetMessageType<"daemon", "get_status", TGetStatusResponse>>;
