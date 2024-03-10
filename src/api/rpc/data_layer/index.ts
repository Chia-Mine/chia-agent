import {TRPCAgent} from "../../../rpc/index";
import {bool, bytes, int, None, Optional, str, uint64} from "../../chia/types/_python_types_";
import {TransactionRecord} from "../../chia/wallet/transaction_record";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {
  DLProof,
  OfferMarshalled,
  OfferStoreMarshalled,
  PluginStatusMarshalled,
  RootMarshalled,
  SyncStatus, VerifyProofResponse
} from "../../chia/data_layer/data_layer_util";
import {GetMessageType, ResType} from "../../types";
import {TDaemon} from "../../../daemon/index";

export const chia_data_layer_service = "chia_data_layer";
export type chia_data_layer_service = typeof chia_data_layer_service;

export const wallet_log_in_command = "wallet_log_in";
export type wallet_log_in_command = typeof wallet_log_in_command;
export type TWalletLogInRequest = {
  fingerprint: int;
};
export type TWalletLogInResponse = {
};
export type WsWalletLogInMessage = GetMessageType<chia_data_layer_service, wallet_log_in_command, TWalletLogInResponse>;
export async function wallet_log_in<T extends TRPCAgent | TDaemon>(agent: T, params: TWalletLogInRequest) {
  type R = ResType<T, TWalletLogInResponse, WsWalletLogInMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, wallet_log_in_command, params);
}


export const create_data_store_command = "create_data_store";
export type create_data_store_command = typeof create_data_store_command;
export type TCreateDataStoreRequest = {
  fee?: uint64;
  verbose?: bool;
};
export type TCreateDataStoreResponse = {
  txs?: TransactionRecord[];
  id: str;
};
export type WsCreateDataStoreMessage = GetMessageType<chia_data_layer_service, create_data_store_command, TCreateDataStoreResponse>;
export async function create_data_store<T extends TRPCAgent|TDaemon>(agent: T, params: TCreateDataStoreRequest) {
  type R = ResType<T, TCreateDataStoreResponse, WsCreateDataStoreMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, create_data_store_command, params);
}


export const get_owned_stores_command = "get_owned_stores";
export type get_owned_stores_command = typeof get_owned_stores_command;
export type TGetOwnedStoresResponse = {
  store_ids: str[];
};
export type WsGetOwnedStoresMessage = GetMessageType<chia_data_layer_service, get_owned_stores_command, TGetOwnedStoresResponse>;
export async function get_owned_stores<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TGetOwnedStoresResponse, WsGetOwnedStoresMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_owned_stores_command);
}


export const batch_update_command = "batch_update";
export type batch_update_command = typeof batch_update_command;
export type TBatchUpdateRequest = {
  fee?: uint64;
  changelist: Array<{
    key: str;
    reference_node_hash?: str;
    side?: 0|1;
    value?: str;
  }>;
  id: str;
};
export type TBatchUpdateResponse = {
  tx_id: bytes32;
};
export type WsBatchUpdateMessage = GetMessageType<chia_data_layer_service, batch_update_command, TBatchUpdateResponse>;
export async function batch_update<T extends TRPCAgent|TDaemon>(agent: T, params: TBatchUpdateRequest) {
  type R = ResType<T, TBatchUpdateResponse, WsBatchUpdateMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, batch_update_command, params);
}


export const get_value_command = "get_value";
export type get_value_command = typeof get_value_command;
export type TGetValueRequest = {
  id: str;
  key: str;
  root_hash?: str;
};
export type TGetValueResponse = {
  value: str|None;
};
export type WsGetValueMessage = GetMessageType<chia_data_layer_service, get_value_command, TGetValueResponse>;
export async function get_value<T extends TRPCAgent|TDaemon>(agent: T, params: TGetValueRequest) {
  type R = ResType<T, TGetValueResponse, WsGetValueMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_value_command, params);
}


export const get_keys_command = "get_keys";
export type get_keys_command = typeof get_keys_command;
export type TGetKeysRequest = {
  id: str;
  root_hash?: str;
};
export type TGetKeysResponse = {
  keys: str[];
};
export type WsGetKeysMessage = GetMessageType<chia_data_layer_service, get_keys_command, TGetKeysResponse>;
export async function get_keys<T extends TRPCAgent|TDaemon>(agent: T, params: TGetKeysRequest) {
  type R = ResType<T, TGetKeysResponse, WsGetKeysMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_keys_command, params);
}


export const get_keys_values_command = "get_keys_values";
export type get_keys_values_command = typeof get_keys_values_command;
export type TGetKeysValuesRequest = {
  id: str;
  root_hash?: str;
};
export type TGetKeysValuesResponse = {
  keys_values: Array<{
    hash: str;
    key: str;
    value: str;
  }>;
};
export type WsGetKeysValuesMessage = GetMessageType<chia_data_layer_service, get_keys_values_command, TGetKeysValuesResponse>;
export async function get_keys_values<T extends TRPCAgent|TDaemon>(agent: T, params: TGetKeysValuesRequest) {
  type R = ResType<T, TGetKeysValuesResponse, WsGetKeysValuesMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_keys_values_command, params);
}


export const get_ancestors_command = "get_ancestors";
export type get_ancestors_command = typeof get_ancestors_command;
export type TGetAncestorsRequest = {
  id: str;
  hash: str;
};
export type TGetAncestorsResponse = {
  ancestors: Array<{
    hash: bytes32;
    left_hash: bytes32;
    right_hash: bytes32;
  }>;
};
export type WsGetAncestorsMessage = GetMessageType<chia_data_layer_service, get_ancestors_command, TGetAncestorsResponse>;
export async function get_ancestors<T extends TRPCAgent|TDaemon>(agent: T, params: TGetAncestorsRequest) {
  type R = ResType<T, TGetAncestorsResponse, WsGetAncestorsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_ancestors_command, params);
}


export const get_root_command = "get_root";
export type get_root_command = typeof get_root_command;
export type TGetRootRequest = {
  id: str;
};
export type TGetRootResponse = {
  hash: bytes32;
  confirmed: bool;
  timestamp: uint64;
};
export type WsGetRootMessage = GetMessageType<chia_data_layer_service, get_root_command, TGetRootResponse>;
export async function get_root<T extends TRPCAgent|TDaemon>(agent: T, params: TGetRootRequest) {
  type R = ResType<T, TGetRootResponse, WsGetRootMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_root_command, params);
}


export const get_local_root_command = "get_local_root";
export type get_local_root_command = typeof get_local_root_command;
export type TGetLocalRootRequest = {
  id: str;
};
export type TGetLocalRootResponse = {
  hash: bytes32|None;
};
export type WsGetLocalRootMessage = GetMessageType<chia_data_layer_service, get_local_root_command, TGetLocalRootResponse>;
export async function get_local_root<T extends TRPCAgent|TDaemon>(agent: T, params: TGetLocalRootRequest) {
  type R = ResType<T, TGetLocalRootResponse, WsGetLocalRootMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_local_root_command, params);
}


export const get_roots_command = "get_roots";
export type get_roots_command = typeof get_roots_command;
export type TGetRootsRequest = {
  ids: str[];
};
export type TGetRootsResponse = {
  root_hashes: Array<{
    id: bytes32;
    hash: bytes32;
    confirmed: bool;
    timestamp: uint64;
  }>;
};
export type WsGetRootsMessage = GetMessageType<chia_data_layer_service, get_roots_command, TGetRootsResponse>;
export async function get_roots<T extends TRPCAgent|TDaemon>(agent: T, params: TGetRootsRequest) {
  type R = ResType<T, TGetRootsResponse, WsGetRootsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_roots_command, params);
}


export const delete_key_command = "delete_key";
export type delete_key_command = typeof delete_key_command;
export type TDeleteKeyRequest = {
  fee?: uint64;
  key: str;
  id: str;
};
export type TDeleteKeyResponse = {
  tx_id: bytes32;
};
export type WsDeleteKeyMessage = GetMessageType<chia_data_layer_service, delete_key_command, TDeleteKeyResponse>;
export async function delete_key<T extends TRPCAgent|TDaemon>(agent: T, params: TDeleteKeyRequest) {
  type R = ResType<T, TDeleteKeyResponse, WsDeleteKeyMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, delete_key_command, params);
}


export const insert_command = "insert";
export type insert_command = typeof insert_command;
export type TInsertRequest = {
  fee?: uint64;
  key: str;
  value: str;
  id: str;
};
export type TInsertResponse = {
  tx_id: bytes32;
};
export type WsInsertMessage = GetMessageType<chia_data_layer_service, insert_command, TInsertResponse>;
export async function insert<T extends TRPCAgent|TDaemon>(agent: T, params: TInsertRequest) {
  type R = ResType<T, TInsertResponse, WsInsertMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, insert_command, params);
}


export const subscribe_command = "subscribe";
export type subscribe_command = typeof subscribe_command;
export type TSubscribeRequest = {
  id: str;
  urls: str[];
};
export type TSubscribeResponse = {
};
export type WsSubscribeMessage = GetMessageType<chia_data_layer_service, subscribe_command, TSubscribeResponse>;
export async function subscribe<T extends TRPCAgent|TDaemon>(agent: T, params: TSubscribeRequest) {
  type R = ResType<T, TSubscribeResponse, WsSubscribeMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, subscribe_command, params);
}


export const unsubscribe_command = "unsubscribe";
export type unsubscribe_command = typeof unsubscribe_command;
export type TUnsubscribeRequest = {
  id: str;
  retain?: bool;
};
export type TUnsubscribeResponse = {
};
export type WsUnsubscribeMessage = GetMessageType<chia_data_layer_service, unsubscribe_command, TUnsubscribeResponse>;
export async function unsubscribe<T extends TRPCAgent|TDaemon>(agent: T, params: TUnsubscribeRequest) {
  type R = ResType<T, TUnsubscribeResponse, WsUnsubscribeMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, unsubscribe_command, params);
}


export const add_mirror_command = "add_mirror";
export type add_mirror_command = typeof add_mirror_command;
export type TAddMirrorRequest = {
  id: str;
  urls: str[];
  amount: uint64;
  fee?: uint64;
};
export type TAddMirrorResponse = {
};
export type WsAddMirrorMessage = GetMessageType<chia_data_layer_service, add_mirror_command, TAddMirrorResponse>;
export async function add_mirror<T extends TRPCAgent|TDaemon>(agent: T, params: TAddMirrorRequest) {
  type R = ResType<T, TAddMirrorResponse, WsAddMirrorMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, add_mirror_command, params);
}


export const delete_mirror_command = "delete_mirror";
export type delete_mirror_command = typeof delete_mirror_command;
export type TDeleteMirrorRequest = {
  coin_id: str;
  fee?: uint64;
};
export type TDeleteMirrorResponse = {
};
export type WsDeleteMirrorMessage = GetMessageType<chia_data_layer_service, delete_mirror_command, TDeleteMirrorResponse>;
export async function delete_mirror<T extends TRPCAgent|TDaemon>(agent: T, params: TDeleteMirrorRequest) {
  type R = ResType<T, TDeleteMirrorResponse, WsDeleteMirrorMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, delete_mirror_command, params);
}


export const get_mirrors_command = "get_mirrors";
export type get_mirrors_command = typeof get_mirrors_command;
export type TGetMirrorsRequest = {
  id: str;
};
export type TGetMirrorsResponse = {
  mirrors: Array<{
    coin_id: str;
    launcher_id: str;
    amount: uint64;
    urls: str[];
    ours: bool;
  }>;
};
export type WsGetMirrorsMessage = GetMessageType<chia_data_layer_service, get_mirrors_command, TGetMirrorsResponse>;
export async function get_mirrors<T extends TRPCAgent|TDaemon>(agent: T, params: TGetMirrorsRequest) {
  type R = ResType<T, TGetMirrorsResponse, WsGetMirrorsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_mirrors_command, params);
}


export const remove_subscriptions_command = "remove_subscriptions";
export type remove_subscriptions_command = typeof remove_subscriptions_command;
export type TRemoveSubscriptionsRequest = {
  id: str;
  urls: str[];
};
export type TRemoveSubscriptionsResponse = {
};
export type WsRemoveSubscriptionsMessage = GetMessageType<chia_data_layer_service, remove_subscriptions_command, TRemoveSubscriptionsResponse>;
export async function remove_subscriptions<T extends TRPCAgent|TDaemon>(agent: T, params: TRemoveSubscriptionsRequest) {
  type R = ResType<T, TRemoveSubscriptionsResponse, WsRemoveSubscriptionsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, remove_subscriptions_command, params);
}


export const subscriptions_command = "subscriptions";
export type subscriptions_command = typeof subscriptions_command;
export type TSubscriptionsResponse = {
  store_ids: str[];
};
export type WsSubscriptionsMessage = GetMessageType<chia_data_layer_service, subscriptions_command, TSubscriptionsResponse>;
export async function subscriptions<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TSubscriptionsResponse, WsSubscriptionsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, subscriptions_command);
}


export const get_kv_diff_command = "get_kv_diff";
export type get_kv_diff_command = typeof get_kv_diff_command;
export type TGetKvDiffRequest = {
  id: str;
  hash_1: str;
  hash_2: str;
};
export type TGetKvDiffResponse = {
  diff: Array<{
    type: str;
    key: str;
    value: str;
  }>;
};
export type WsGetKvDiffMessage = GetMessageType<chia_data_layer_service, get_kv_diff_command, TGetKvDiffResponse>;
export async function get_kv_diff<T extends TRPCAgent|TDaemon>(agent: T, params: TGetKvDiffRequest) {
  type R = ResType<T, TGetKvDiffResponse, WsGetKvDiffMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_kv_diff_command, params);
}


export const get_root_history_command = "get_root_history";
export type get_root_history_command = typeof get_root_history_command;
export type TGetRootHistoryRequest = {
  id: str;
};
export type TGetRootHistoryResponse = {
  root_history: Array<{
    root_hash: bytes32;
    confirmed: bool;
    timestamp: uint64;
  }>;
};
export type WsGetRootHistoryMessage = GetMessageType<chia_data_layer_service, get_root_history_command, TGetRootHistoryResponse>;
export async function get_root_history<T extends TRPCAgent|TDaemon>(agent: T, params: TGetRootHistoryRequest) {
  type R = ResType<T, TGetRootHistoryResponse, WsGetRootHistoryMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_root_history_command, params);
}


export const add_missing_files_command = "add_missing_files";
export type add_missing_files_command = typeof add_missing_files_command;
export type TAddMissingFilesRequest = {
  ids?: str[];
  overwrite?: bool;
  foldername?: str;
};
export type TAddMissingFilesResponse = {
};
export type WsAddMissingFilesMessage = GetMessageType<chia_data_layer_service, add_missing_files_command, TAddMissingFilesResponse>;
export async function add_missing_files<T extends TRPCAgent|TDaemon>(agent: T, params: TAddMissingFilesRequest) {
  type R = ResType<T, TAddMissingFilesResponse, WsAddMissingFilesMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, add_missing_files_command, params);
}


export const make_offer_command = "make_offer";
export type make_offer_command = typeof make_offer_command;
export type TMakeOfferRequest = {
  fee?: uint64;
  maker: OfferStoreMarshalled;
  taker: OfferStoreMarshalled;
};
export type TMakeOfferResponse = {
  success: bool;
  offer: OfferMarshalled;
};
export type WsMakeOfferMessage = GetMessageType<chia_data_layer_service, make_offer_command, TMakeOfferResponse>;
export async function make_offer<T extends TRPCAgent|TDaemon>(agent: T, params: TMakeOfferRequest) {
  type R = ResType<T, TMakeOfferResponse, WsMakeOfferMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, make_offer_command, params);
}


export const take_offer_command = "take_offer";
export type take_offer_command = typeof take_offer_command;
export type TTakeOfferRequest = {
  fee?: uint64;
  offer: OfferMarshalled;
};
export type TTakeOfferResponse = {
  success: bool;
  trade_id: str;
};
export type WsTakeOfferMessage = GetMessageType<chia_data_layer_service, take_offer_command, TTakeOfferResponse>;
export async function take_offer<T extends TRPCAgent|TDaemon>(agent: T, params: TTakeOfferRequest) {
  type R = ResType<T, TTakeOfferResponse, WsTakeOfferMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, take_offer_command, params);
}


export const verify_offer_command = "verify_offer";
export type verify_offer_command = typeof verify_offer_command;
export type TVerifyOfferRequest = {
  fee?: uint64;
  offer: OfferMarshalled;
};
export type TVerifyOfferResponse = {
  success: bool;
  valid: bool;
  error: Optional<str>;
  fee: Optional<uint64>;
};
export type WsVerifyOfferMessage = GetMessageType<chia_data_layer_service, verify_offer_command, TVerifyOfferResponse>;
export async function verify_offer<T extends TRPCAgent|TDaemon>(agent: T, params: TVerifyOfferRequest) {
  type R = ResType<T, TVerifyOfferResponse, WsVerifyOfferMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, verify_offer_command, params);
}


export const cancel_offer_command = "cancel_offer";
export type cancel_offer_command = typeof cancel_offer_command;
export type TCancelOfferRequest = {
  trade_id: str;
  secure: bool;
  fee?: uint64;
};
export type TCancelOfferResponse = {
  success: bool;
};
export type WsCancelOfferMessage = GetMessageType<chia_data_layer_service, cancel_offer_command, TCancelOfferResponse>;
export async function cancel_offer<T extends TRPCAgent|TDaemon>(agent: T, params: TCancelOfferRequest) {
  type R = ResType<T, TCancelOfferResponse, WsCancelOfferMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, cancel_offer_command, params);
}


export const get_sync_status_command = "get_sync_status";
export type get_sync_status_command = typeof get_sync_status_command;
export type TGetSyncStatusRequest = {
  id: str;
};
export type TGetSyncStatusResponse = {
  sync_status: SyncStatus;
};
export type WsGetSyncStatusMessage = GetMessageType<chia_data_layer_service, get_sync_status_command, TGetSyncStatusResponse>;
export async function get_sync_status<T extends TRPCAgent | TDaemon>(agent: T, params: TGetSyncStatusRequest) {
  type R = ResType<T, TGetSyncStatusResponse, WsGetSyncStatusMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_sync_status_command, params);
}


export const check_plugins_command = "check_plugins";
export type check_plugins_command = typeof check_plugins_command;
export type TCheckPluginsResponse = PluginStatusMarshalled;
export type WsCheckPluginsMessage = GetMessageType<chia_data_layer_service, check_plugins_command, TCheckPluginsResponse>;
export async function check_plugins<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TCheckPluginsResponse, WsCheckPluginsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, check_plugins_command);
}


export const clear_pending_roots_command = "clear_pending_roots";
export type clear_pending_roots_command = typeof clear_pending_roots_command;
export type TClearPendingRootsRequest = {
  store_id: str;
};
export type TClearPendingRootsResponse = {
  success: bool;
  root: Optional<RootMarshalled>;
};
export type WsClearPendingRootsMessage = GetMessageType<chia_data_layer_service, clear_pending_roots_command, TClearPendingRootsResponse>;
export async function clear_pending_roots<T extends TRPCAgent | TDaemon>(agent: T, params: TClearPendingRootsRequest) {
  type R = ResType<T, TClearPendingRootsResponse, WsClearPendingRootsMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, clear_pending_roots_command, params);
}


export const get_proof_command = "get_proof";
export type get_proof_command = typeof get_proof_command;
export type TGetProofRequest = {
  store_id: bytes32;
  keys: bytes[];
};
export type TGetProofResponse = {
  proof: DLProof;
  success: bool;
};
export type WsGetProofMessage = GetMessageType<chia_data_layer_service, get_proof_command, TGetProofResponse>;
export async function get_proof<T extends TRPCAgent | TDaemon>(agent: T, params: TGetProofRequest) {
  type R = ResType<T, TGetProofResponse, WsGetProofMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, get_proof_command, params);
}


export const verify_proof_command = "verify_proof";
export type verify_proof_command = typeof verify_proof_command;
export type TVerifyProofRequest = DLProof;
export type TVerifyProofResponse = VerifyProofResponse;
export type WsVerifyProofMessage = GetMessageType<chia_data_layer_service, verify_proof_command, TVerifyProofResponse>;
export async function verify_proof<T extends TRPCAgent | TDaemon>(agent: T, params: TVerifyProofRequest) {
  type R = ResType<T, TVerifyProofResponse, WsVerifyProofMessage>;
  return agent.sendMessage<R>(chia_data_layer_service, verify_proof_command, params);
}

export type RpcDataLayerMessage =
  TWalletLogInResponse
  | TCreateDataStoreResponse
  | TGetOwnedStoresResponse
  | TBatchUpdateResponse
  | TGetValueResponse
  | TGetKeysResponse
  | TGetKeysValuesResponse
  | TGetAncestorsResponse
  | TGetRootResponse
  | TGetLocalRootResponse
  | TGetRootsResponse
  | TDeleteKeyResponse
  | TInsertResponse
  | TSubscribeResponse
  | TUnsubscribeResponse
  | TAddMirrorResponse
  | TDeleteMirrorResponse
  | TGetMirrorsResponse
  | TRemoveSubscriptionsResponse
  | TSubscriptionsResponse
  | TGetKvDiffResponse
  | TGetRootHistoryResponse
  | TAddMissingFilesResponse
  | TMakeOfferResponse
  | TTakeOfferResponse
  | TVerifyOfferResponse
  | TCancelOfferResponse
  | TGetSyncStatusResponse
  | TCheckPluginsResponse
  | TClearPendingRootsResponse
  | TGetProofResponse
  | TVerifyProofResponse
;

export type RpcDataLayerMessageOnWs =
  WsWalletLogInMessage
  | WsCreateDataStoreMessage
  | WsGetOwnedStoresMessage
  | WsBatchUpdateMessage
  | WsGetValueMessage
  | WsGetKeysMessage
  | WsGetKeysValuesMessage
  | WsGetAncestorsMessage
  | WsGetRootMessage
  | WsGetLocalRootMessage
  | WsGetRootsMessage
  | WsDeleteKeyMessage
  | WsInsertMessage
  | WsSubscribeMessage
  | WsUnsubscribeMessage
  | WsAddMirrorMessage
  | WsDeleteMirrorMessage
  | WsGetMirrorsMessage
  | WsRemoveSubscriptionsMessage
  | WsSubscriptionsMessage
  | WsGetKvDiffMessage
  | WsGetRootHistoryMessage
  | WsAddMissingFilesMessage
  | WsMakeOfferMessage
  | WsTakeOfferMessage
  | WsVerifyOfferMessage
  | WsCancelOfferMessage
  | WsGetSyncStatusMessage
  | WsCheckPluginsMessage
  | WsClearPendingRootsMessage
  | WsGetProofMessage
  | WsVerifyProofMessage
;
