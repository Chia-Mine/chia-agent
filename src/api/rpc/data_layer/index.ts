import {TRPCAgent} from "../../../rpc/index";
import {bool, bytes, None, Optional, str, uint64} from "../../chia/types/_python_types_";
import {TransactionRecord} from "../../chia/wallet/transaction_record";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {OfferMarshalled, OfferStoreMarshalled} from "../../chia/data_layer/data_layer_util";

export const chia_data_layer_service = "chia_data_layer";
export type chia_data_layer_service = typeof chia_data_layer_service;

export const create_data_store_command = "create_data_store";
export type create_data_store_command = typeof create_data_store_command;
export type TCreateDataStoreRequest = {
  fee?: uint64;
};
export type TCreateDataStoreResponse = {
  txs: TransactionRecord[];
  id: str;
};
export async function create_data_store(agent: TRPCAgent, params: TCreateDataStoreRequest) {
  return agent.sendMessage<TCreateDataStoreResponse>(chia_data_layer_service, create_data_store_command, params);
}


export const get_owned_stores_command = "get_owned_stores";
export type get_owned_stores_command = typeof get_owned_stores_command;
export type TGetOwnedStoresResponse = {
  store_ids: str[];
};
export async function get_owned_stores(agent: TRPCAgent) {
  return agent.sendMessage<TGetOwnedStoresResponse>(chia_data_layer_service, get_owned_stores_command);
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
export async function batch_update(agent: TRPCAgent, params: TBatchUpdateRequest) {
  return agent.sendMessage<TBatchUpdateResponse>(chia_data_layer_service, batch_update_command, params);
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
export async function get_value(agent: TRPCAgent, params: TGetValueRequest) {
  return agent.sendMessage<TGetValueResponse>(chia_data_layer_service, get_value_command, params);
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
export async function get_keys(agent: TRPCAgent, params: TGetKeysRequest) {
  return agent.sendMessage<TGetKeysResponse>(chia_data_layer_service, get_keys_command, params);
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
export async function get_keys_values(agent: TRPCAgent, params: TGetKeysValuesRequest) {
  return agent.sendMessage<TGetKeysValuesResponse>(chia_data_layer_service, get_keys_values_command, params);
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
export async function get_ancestors(agent: TRPCAgent, params: TGetAncestorsRequest) {
  return agent.sendMessage<TGetAncestorsResponse>(chia_data_layer_service, get_ancestors_command, params);
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
export async function get_root(agent: TRPCAgent, params: TGetRootRequest) {
  return agent.sendMessage<TGetRootResponse>(chia_data_layer_service, get_root_command, params);
}


export const get_local_root_command = "get_local_root";
export type get_local_root_command = typeof get_local_root_command;
export type TGetLocalRootRequest = {
  id: str;
};
export type TGetLocalRootResponse = {
  hash: bytes32|None;
};
export async function get_local_root(agent: TRPCAgent, params: TGetLocalRootRequest) {
  return agent.sendMessage<TGetLocalRootResponse>(chia_data_layer_service, get_local_root_command, params);
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
export async function get_roots(agent: TRPCAgent, params: TGetRootsRequest) {
  return agent.sendMessage<TGetRootsResponse>(chia_data_layer_service, get_roots_command, params);
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
export async function delete_key(agent: TRPCAgent, params: TDeleteKeyRequest) {
  return agent.sendMessage<TDeleteKeyResponse>(chia_data_layer_service, delete_key_command, params);
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
export async function insert(agent: TRPCAgent, params: TInsertRequest) {
  return agent.sendMessage<TInsertResponse>(chia_data_layer_service, insert_command, params);
}


export const subscribe_command = "subscribe";
export type subscribe_command = typeof subscribe_command;
export type TSubscribeRequest = {
  id: str;
  urls: str[];
};
export type TSubscribeResponse = {
};
export async function subscribe(agent: TRPCAgent, params: TSubscribeRequest) {
  return agent.sendMessage<TSubscribeResponse>(chia_data_layer_service, subscribe_command, params);
}


export const unsubscribe_command = "unsubscribe";
export type unsubscribe_command = typeof unsubscribe_command;
export type TUnsubscribeRequest = {
  id: str;
};
export type TUnsubscribeResponse = {
};
export async function unsubscribe(agent: TRPCAgent, params: TUnsubscribeRequest) {
  return agent.sendMessage<TUnsubscribeResponse>(chia_data_layer_service, unsubscribe_command, params);
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
export async function add_mirror(agent: TRPCAgent, params: TAddMirrorRequest) {
  return agent.sendMessage<TAddMirrorResponse>(chia_data_layer_service, add_mirror_command, params);
}


export const delete_mirror_command = "delete_mirror";
export type delete_mirror_command = typeof delete_mirror_command;
export type TDeleteMirrorRequest = {
  coin_id: str;
  fee?: uint64;
};
export type TDeleteMirrorResponse = {
};
export async function delete_mirror(agent: TRPCAgent, params: TDeleteMirrorRequest) {
  return agent.sendMessage<TDeleteMirrorResponse>(chia_data_layer_service, delete_mirror_command, params);
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
export async function get_mirrors(agent: TRPCAgent, params: TGetMirrorsRequest) {
  return agent.sendMessage<TGetMirrorsResponse>(chia_data_layer_service, get_mirrors_command, params);
}


export const remove_subscriptions_command = "remove_subscriptions";
export type remove_subscriptions_command = typeof remove_subscriptions_command;
export type TRemoveSubscriptionsRequest = {
  id: str;
  urls: str[];
};
export type TRemoveSubscriptionsResponse = {
};
export async function remove_subscriptions(agent: TRPCAgent, params: TRemoveSubscriptionsRequest) {
  return agent.sendMessage<TRemoveSubscriptionsResponse>(chia_data_layer_service, remove_subscriptions_command, params);
}


export const subscriptions_command = "subscriptions";
export type subscriptions_command = typeof subscriptions_command;
export type TSubscriptionsResponse = {
  store_ids: str[];
};
export async function subscriptions(agent: TRPCAgent) {
  return agent.sendMessage<TSubscriptionsResponse>(chia_data_layer_service, subscriptions_command);
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
export async function get_kv_diff(agent: TRPCAgent, params: TGetKvDiffRequest) {
  return agent.sendMessage<TGetKvDiffResponse>(chia_data_layer_service, get_kv_diff_command, params);
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
export async function get_root_history(agent: TRPCAgent, params: TGetRootHistoryRequest) {
  return agent.sendMessage<TGetRootHistoryResponse>(chia_data_layer_service, get_root_history_command, params);
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
export async function add_missing_files(agent: TRPCAgent, params: TAddMissingFilesRequest) {
  return agent.sendMessage<TAddMissingFilesResponse>(chia_data_layer_service, add_missing_files_command, params);
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
export async function make_offer(agent: TRPCAgent, params: TMakeOfferRequest) {
  return agent.sendMessage<TMakeOfferResponse>(chia_data_layer_service, make_offer_command, params);
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
export async function take_offer(agent: TRPCAgent, params: TTakeOfferRequest) {
  return agent.sendMessage<TTakeOfferResponse>(chia_data_layer_service, take_offer_command, params);
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
export async function verify_offer(agent: TRPCAgent, params: TVerifyOfferRequest) {
  return agent.sendMessage<TVerifyOfferResponse>(chia_data_layer_service, verify_offer_command, params);
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
export async function cancel_offer(agent: TRPCAgent, params: TCancelOfferRequest) {
  return agent.sendMessage<TCancelOfferResponse>(chia_data_layer_service, cancel_offer_command, params);
}
