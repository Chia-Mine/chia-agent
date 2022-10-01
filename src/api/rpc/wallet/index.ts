import {WalletInfo} from "../../chia/wallet/wallet_info";
import {Coin} from "../../chia/types/blockchain_format/coin";
import {
  bool,
  bytes,
  False,
  int,
  Optional,
  str,
  True,
  uint128, uint16,
  uint32,
  uint64,
  uint8
} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TransactionRecord, TransactionRecordConvenience} from "../../chia/wallet/transaction_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {TRPCAgent} from "../../../rpc";
import {PoolWalletInfo} from "../../chia/pools/pool_wallet_info";
import {TradeRecordConvenience} from "../../chia/wallet/trade_record";
import {CAT} from "../../chia/wallet/cat_wallet/cat_constants";
import {TDriverDict} from "../../chia/wallet/puzzle_drivers";
import {NFTInfo} from "../../chia/wallet/nft_wallet/nft_info";
import {Mirror, SingletonRecord} from "../../chia/data_layer/data_layer_wallet";

export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

// # Key management

export const log_in_command = "log_in";
export type log_in_command = typeof log_in_command;
export type TLoginRequest = {
  fingerprint: int;
};
export type TLoginResponse = {
  fingerprint: int;
} | {
  success: False;
  error: "Unknown Error";
};
export async function log_in(agent: TRPCAgent, data: TLoginRequest){
  return agent.sendMessage<TLoginResponse>(chia_wallet_service, log_in_command, data);
}



export const get_logged_in_fingerprint_command = "get_logged_in_fingerprint";
export type get_logged_in_fingerprint_command = typeof get_logged_in_fingerprint_command;
export type TGetLoggedInFingerprintResponse = {
  fingerprint: Optional<int>;
};
export async function get_logged_in_fingerprint(agent: TRPCAgent){
  return agent.sendMessage<TGetLoggedInFingerprintResponse>(chia_wallet_service, get_logged_in_fingerprint_command);
}



export const get_public_keys_command = "get_public_keys";
export type get_public_keys_command = typeof get_public_keys_command;
export type TGetPublicKeysRequest = {
};
export type TGetPublicKeysResponse = {
  public_key_fingerprints: int[];
} | {
  keyring_is_locked: True;
};
export async function get_public_keys(agent: TRPCAgent){
  return agent.sendMessage<TGetPublicKeysResponse>(chia_wallet_service, get_public_keys_command);
}



export const get_private_key_command = "get_private_key";
export type get_private_key_command = typeof get_private_key_command;
export type TGetPrivateKeyRequest = {
  fingerprint: int; // https://github.com/Chia-Network/bls-signatures/blob/main/python-impl/ec.py#L164
};
export type TGetPrivateKeyResponse = {
  private_key: {
    fingerprint: int;
    sk: str;
    pk: str;
    farmer_pk: str;
    pool_pk: str;
    seed: Optional<str>;
  };
} | {
  success: False;
  private_key: {
    fingerprint: int;
  };
};
export async function get_private_key(agent: TRPCAgent, data: TGetPrivateKeyRequest){
  return agent.sendMessage<TGetPrivateKeyResponse>(chia_wallet_service, get_private_key_command, data);
}




export const generate_mnemonic_command = "generate_mnemonic";
export type generate_mnemonic_command = typeof generate_mnemonic_command;
export type TGenerateMnemonicRequest = {
};
export type TGenerateMnemonicResponse = {
  mnemonic: str[];
};
export async function generate_mnemonic(agent: TRPCAgent){
  return agent.sendMessage<TGenerateMnemonicResponse>(chia_wallet_service, generate_mnemonic_command);
}




export const add_key_command = "add_key";
export type add_key_command = typeof add_key_command;
export type TAddKeyRequest = {
  mnemonic: str[];
};
export type TAddKeyResponse = {
  success: false;
  error: str;
  word?: unknown; // `word` is e.args[0] where e = KeyError
} | {
  fingerprint: int;
};
export async function add_key(agent: TRPCAgent, data: TAddKeyRequest){
  return agent.sendMessage<TAddKeyResponse>(chia_wallet_service, add_key_command, data);
}




export const delete_key_command = "delete_key";
export type delete_key_command = typeof delete_key_command;
export type TDeleteKeyRequest = {
  fingerprint: int;
};
export type TDeleteKeyResponse = {
};
export async function delete_key(agent: TRPCAgent, data: TDeleteKeyRequest){
  return agent.sendMessage<TDeleteKeyResponse>(chia_wallet_service, delete_key_command, data);
}




export const check_delete_key_command = "check_delete_key";
export type check_delete_key_command = typeof check_delete_key_command;
export type TCheckDeleteKeyRequest = {
  fingerprint: int;
  max_ph_to_search?: int;
};
export type TCheckDeleteKeyResponse = {
  fingerprint: int;
  used_for_farmer_rewards: bool;
  used_for_pool_rewards: bool;
  wallet_balance: bool;
};
export async function check_delete_key(agent: TRPCAgent, data: TCheckDeleteKeyRequest){
  return agent.sendMessage<TCheckDeleteKeyResponse>(chia_wallet_service, check_delete_key_command, data);
}




export const delete_all_keys_command = "delete_all_keys";
export type delete_all_keys_command = typeof delete_all_keys_command;
export type TDeleteAllKeysRequest = {
  // no input
};
export type TDeleteAllKeysResponse = {} | {
  success: False;
  error: str;
};
export async function delete_all_keys(agent: TRPCAgent){
  return agent.sendMessage<TDeleteAllKeysResponse>(chia_wallet_service, delete_all_keys_command);
}




// # Wallet node
export const get_sync_status_command = "get_sync_status";
export type get_sync_status_command = typeof get_sync_status_command;
export type TGetSyncStatusRequest = {
};
export type TGetSyncStatusResponse = {
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
};
export async function get_sync_status(agent: TRPCAgent){
  return agent.sendMessage<TGetSyncStatusResponse>(chia_wallet_service, get_sync_status_command);
}



export const get_height_info_command = "get_height_info";
export type get_height_info_command = typeof get_height_info_command;
export type TGetHeightInfoRequest = {
};
export type TGetHeightInfoResponse = {
  height: uint32;
};
export async function get_height_info(agent: TRPCAgent){
  return agent.sendMessage<TGetHeightInfoResponse>(chia_wallet_service, get_height_info_command);
}



export const push_tx_command = "push_tx";
export type push_tx_command = typeof push_tx_command;
export type TPushTxRequest = {
  spend_bundle: str; // streamable binary in hex string 
};
export type TPushTxResponse = {};
export async function push_tx(agent: TRPCAgent, data: TPushTxRequest){
  return agent.sendMessage<TPushTxResponse>(chia_wallet_service, push_tx_command, data);
}



export const farm_block_command = "farm_block";
export type farm_block_command = typeof farm_block_command;
export type TFarmBlockRequest = {
  address: str;
};
export type TFarmBlockResponse = {
};
export async function farm_block(agent: TRPCAgent, data: TFarmBlockRequest){
  return agent.sendMessage<TFarmBlockResponse>(chia_wallet_service, farm_block_command, data);
}



export const get_initial_freeze_period_command_of_wallet = "get_initial_freeze_period";
export type get_initial_freeze_period_command_of_wallet = typeof get_initial_freeze_period_command_of_wallet;
export type TGetInitialFreezePeriodRequestOfWallet = {
};
export type TGetInitialFreezePeriodResponseOfWallet = {
  INITIAL_FREEZE_END_TIMESTAMP: 1620061200; // Mon May 03 2021 17:00:00 GMT+0000
};
export async function get_initial_freeze_period_of_wallet(agent: TRPCAgent){
  return agent.sendMessage<TGetInitialFreezePeriodResponseOfWallet>(chia_wallet_service, get_initial_freeze_period_command_of_wallet);
}



export const get_network_info_command_of_wallet = "get_network_info";
export type get_network_info_command_of_wallet = typeof get_network_info_command_of_wallet;
export type TGetNetworkInfoRequestOfWallet = {
};
export type TGetNetworkInfoResponseOfWallet = {
  network_name: str;
  network_prefix: str;
};
export async function get_network_info_of_wallet(agent: TRPCAgent){
  return agent.sendMessage<TGetNetworkInfoResponseOfWallet>(chia_wallet_service, get_network_info_command_of_wallet);
}



// # Wallet management
export const get_wallets_command = "get_wallets";
export type get_wallets_command = typeof get_wallets_command;
export type TGetWalletsRequest = {
  type?: int;
  include_data?: bool;
};
export type TGetWalletsResponse = {
  wallets: WalletInfo[];
  fingerprint?: int;
};
export async function get_wallets(agent: TRPCAgent, data: TGetWalletsRequest){
  return agent.sendMessage<TGetWalletsResponse>(chia_wallet_service, get_wallets_command, data);
}



export type TCreate_New_CAT_WalletRequest = {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "new";
  amount: uint64;
} | {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "existing";
  asset_id: str;
};
export type TCreate_New_CAT_WalletResponse = {
  type: uint8;
  asset_id: str;
  wallet_id: uint32;
};

export type TCreate_New_RL_WalletRequest = {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "admin";
  interval: int;
  limit: int;
  pubkey: str;
  amount: int;
} | {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "user";
};
export type TCreate_New_RL_WalletResponse = {
  success: bool;
  id: uint32;
  type: uint8;
  origin: Optional<Coin>;
  pubkey: str;
} | {
  id: uint32;
  type: uint8;
  pubkey: str;
};

export type TCreate_New_DID_WalletRequest = {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
  metadata?: Record<str, str>;
  wallet_name?: str;
} | {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "recovery";
  backup_data: str;
};
export type TCreate_New_DID_WalletResponse = {
  success: True;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
} | {
  success: True;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
  coin_name: str;
  coin_list: [bytes32, bytes32, uint64]; // Not Coin[]. See as_list function implementation.
  newpuzhash: str;
  pubkey: str;
  backup_dids: bytes[];
  num_verifications_required: uint64;
};

export type TCreate_New_NFT_WalletRequest = {
  fee?: uint64;
  wallet_type: "nft_wallet";
  did_id?: str;
  name?: str;
};
export type TCreate_New_NFT_WalletResponse = {
  success: True;
  type: uint8;
  wallet_id: uint32;
};

export type TCreate_New_Pool_WalletRequest = {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "new";
  initial_target_state: {
    state: "SELF_POOLING";
  } | {
    state: "FARMING_TO_POOL";
    target_puzzle_hash: str;
    pool_url: str;
    relative_lock_height: uint32;
  };
  p2_singleton_delayed_ph?: str;
  p2_singleton_delay_time?: uint64;
} | {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "recovery";
};

export type TCreate_New_Pool_WalletResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  launcher_id: str;
  p2_singleton_puzzle_hash: str;
};

export type TCreateWalletErrorResponse = {
  success: False;
  error: str;
};

export const create_new_wallet_command = "create_new_wallet";
export type create_new_wallet_command = typeof create_new_wallet_command;
export type TCreateNewWalletRequest = TCreate_New_CAT_WalletRequest
  | TCreate_New_RL_WalletRequest
  | TCreate_New_DID_WalletRequest
  | TCreate_New_NFT_WalletRequest
  | TCreate_New_Pool_WalletRequest;
export type TCreateNewWalletResponse = TCreate_New_CAT_WalletResponse
  | TCreate_New_RL_WalletResponse
  | TCreate_New_DID_WalletResponse
  | TCreate_New_NFT_WalletResponse
  | TCreate_New_Pool_WalletResponse
  | TCreateWalletErrorResponse;
export async function create_new_wallet(agent: TRPCAgent, data: TCreateNewWalletRequest){
  return agent.sendMessage<TCreateNewWalletResponse>(chia_wallet_service, create_new_wallet_command, data);
}


// # Wallet
export const get_wallet_balance_command = "get_wallet_balance";
export type get_wallet_balance_command = typeof get_wallet_balance_command;
export type TGetWalletBalanceRequest = {
  wallet_id: int;
};
export type TGetWalletBalanceResponse = {
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128; // MEMO: cat_wallet, did_wallet and pool_wallet declare `uint64`. rl_wallet and standard_wallet declare uint128.
    unconfirmed_wallet_balance: uint128;
    spendable_balance: uint128;
    pending_change: uint64;
    max_send_amount: uint64;
    unspent_coin_count: int;
    pending_coin_removal_count: int;
    wallet_type: int;
    fingerprint?: int;
    asset_id?: str;
  };
};
export async function get_wallet_balance(agent: TRPCAgent, data: TGetWalletBalanceRequest){
  return agent.sendMessage<TGetWalletBalanceResponse>(chia_wallet_service, get_wallet_balance_command, data);
}



export const get_transaction_command = "get_transaction";
export type get_transaction_command = typeof get_transaction_command;
export type TGetTransactionRequest = {
  transaction_id: str;
};
export type TGetTransactionResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function get_transaction(agent: TRPCAgent, data: TGetTransactionRequest){
  return agent.sendMessage<TGetTransactionResponse>(chia_wallet_service, get_transaction_command, data);
}




export const get_transactions_command = "get_transactions";
export type get_transactions_command = typeof get_transactions_command;
export type TGetTransactionsRequest = {
  wallet_id: int;
  start?: int;
  end?: int;
  sort_key?: str;
  reverse?: bool;
  to_address?: str;
};
export type TGetTransactionsResponse = {
  transactions: TransactionRecordConvenience[];
  wallet_id: int;
};
export async function get_transactions(agent: TRPCAgent, data: TGetTransactionsRequest){
  return agent.sendMessage<TGetTransactionsResponse>(chia_wallet_service, get_transactions_command, data);
}




export const get_next_address_command = "get_next_address";
export type get_next_address_command = typeof get_next_address_command;
export type TGetNextAddressRequest = {
  new_address: bool;
  wallet_id: int;
};
export type TGetNextAddressResponse = {
  wallet_id: uint32; // wallet_id in request is int, but response is uint32
  address: str;
};
export async function get_next_address(agent: TRPCAgent, data: TGetNextAddressRequest){
  return agent.sendMessage<TGetNextAddressResponse>(chia_wallet_service, get_next_address_command, data);
}




export const send_transaction_command = "send_transaction";
export type send_transaction_command = typeof send_transaction_command;
export type TSendTransactionRequest = {
  wallet_id: uint32;
  amount: int;
  fee: int;
  address: str;
  memos?: str[];
  min_coin_amount?: uint64;
};
export type TSendTransactionResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function send_transaction(agent: TRPCAgent, data: TSendTransactionRequest){
  return agent.sendMessage<TSendTransactionResponse>(chia_wallet_service, send_transaction_command, data);
}




export const send_transaction_multi_command = "send_transaction_multi";
export type send_transaction_multi_command = typeof send_transaction_multi_command;
export type TSendTransactionMultiRequest = {
  wallet_id: uint32;
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
};
export type TSendTransactionMultiResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecordConvenience["name"];
};
export async function send_transaction_multi(agent: TRPCAgent, data: TSendTransactionMultiRequest){
  return agent.sendMessage<TSendTransactionMultiResponse>(chia_wallet_service, send_transaction_multi_command, data);
}




export const get_transaction_count_command = "get_transaction_count";
export type get_transaction_count_command = typeof get_transaction_count_command;
export type TGetTransactionCountRequest = {
  wallet_id: int;
};
export type TGetTransactionCountResponse = {
  count: int;
  wallet_id: int;
};
export async function get_transaction_count(agent: TRPCAgent, data: TGetTransactionCountRequest){
  return agent.sendMessage<TGetTransactionCountResponse>(chia_wallet_service, get_transaction_count_command, data);
}




export const get_farmed_amount_command = "get_farmed_amount";
export type get_farmed_amount_command = typeof get_farmed_amount_command;
export type TGetFarmedAmountRequest = {
};
export type TGetFarmedAmountResponse = {
  farmed_amount: int;
  pool_reward_amount: int;
  farmer_reward_amount: int;
  fee_amount: int;
  last_height_farmed: int;
};
export async function get_farmed_amount(agent: TRPCAgent){
  return agent.sendMessage<TGetFarmedAmountResponse>(chia_wallet_service, get_farmed_amount_command);
}




export type TAdditions = {
  amount: uint64;
  puzzle_hash: str;
  memos?: str[];
};
export type TCoinAnnouncement = {
  coin_id: str;
  message: str;
  morph_bytes?: str;
};
export type TPuzzleAnnouncement = {
  puzzle_hash: str;
  message: str;
  morph_bytes?: str;
};
export const create_signed_transaction_command = "create_signed_transaction";
export type create_signed_transaction_command = typeof create_signed_transaction_command;
export type TCreateSignedTransactionRequest = {
  additions: TAdditions[];
  fee?: uint64;
  min_coin_amount?: uint64;
  coins?: Coin[];
  exclude_coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
};
export type TCreateSignedTransactionResponse = {
  signed_tx: TransactionRecordConvenience;
};
export async function create_signed_transaction(agent: TRPCAgent, data: TCreateSignedTransactionRequest){
  return agent.sendMessage<TCreateSignedTransactionResponse>(chia_wallet_service, create_signed_transaction_command, data);
}




export const delete_unconfirmed_transactions_command = "delete_unconfirmed_transactions";
export type delete_unconfirmed_transactions_command = typeof delete_unconfirmed_transactions_command;
export type TDeleteUnconfirmedTransactionsRequest = {
  wallet_id: uint32;
};
export type TDeleteUnconfirmedTransactionsResponse = {
};
export async function delete_unconfirmed_transactions(agent: TRPCAgent, data: TDeleteUnconfirmedTransactionsRequest){
  return agent.sendMessage<TDeleteUnconfirmedTransactionsResponse>(chia_wallet_service, delete_unconfirmed_transactions_command, data);
}




export const select_coins_command = "select_coins";
export type select_coins_command = typeof select_coins_command;
export type TSelectCoinsRequest = {
  amount: uint64;
  wallet_id: uint32;
  min_coin_amount?: uint64;
  excluded_coins?: Coin[];
};
export type TSelectCoinsResponse = {
  coins: Coin[];
};
export async function select_coins(agent: TRPCAgent, data: TSelectCoinsRequest){
  return agent.sendMessage<TSelectCoinsResponse>(chia_wallet_service, select_coins_command, data);
}




export const get_current_derivation_index_command = "get_current_derivation_index";
export type get_current_derivation_index_command = typeof get_current_derivation_index_command;
export type TGetCurrentDerivationIndexResponse = {
  success: True;
  index: Optional<uint32>;
};
export async function get_current_derivation_index(agent: TRPCAgent){
  return agent.sendMessage<TGetCurrentDerivationIndexResponse>(chia_wallet_service, get_current_derivation_index_command);
}




export const extend_derivation_index_command = "extend_derivation_index";
export type extend_derivation_index_command = typeof extend_derivation_index_command;
export type TExtendDerivationIndexRequest = {
  index: uint32;
};
export type TExtendDerivationIndexResponse = {
  success: True;
  index: Optional<uint32>;
};
export async function extend_derivation_index(agent: TRPCAgent, data: TExtendDerivationIndexRequest){
  return agent.sendMessage<TExtendDerivationIndexResponse>(chia_wallet_service, extend_derivation_index_command, data);
}




// # CATs and Trading
export const get_cat_list_command = "get_cat_list";
export type get_cat_list_command = typeof get_cat_list_command;
export type TGetCatListResponse = {
  cat_list: CAT[];
};
export async function get_cat_list(agent: TRPCAgent){
  return agent.sendMessage<TGetCatListResponse>(chia_wallet_service, get_cat_list_command);
}




export const cat_set_name_command = "cat_set_name";
export type cat_set_name_command = typeof cat_set_name_command;
export type TCatSetNameRequest = {
  wallet_id: uint32;
  name: str;
};
export type TCatSetNameResponse = {
  wallet_id: uint32;
};
export async function cat_set_name(agent: TRPCAgent, data: TCatSetNameRequest){
  return agent.sendMessage<TCatSetNameResponse>(chia_wallet_service, cat_set_name_command, data);
}




export const cat_asset_id_to_name_command = "cat_asset_id_to_name";
export type cat_asset_id_to_name_command = typeof cat_asset_id_to_name_command;
export type TCatAssetIdToNameRequest = {
  asset_id: str;
};
export type TCatAssetIdToNameResponse = {
  wallet_id: Optional<uint32>;
  name: str;
};
export async function cat_asset_id_to_name(agent: TRPCAgent, data: TCatAssetIdToNameRequest){
  return agent.sendMessage<TCatAssetIdToNameResponse>(chia_wallet_service, cat_asset_id_to_name_command, data);
}




export const cat_get_name_command = "cat_get_name";
export type cat_get_name_command = typeof cat_get_name_command;
export type TCatGetNameRequest = {
  wallet_id: uint32;
};
export type TCatGetNameResponse = {
  wallet_id: uint32;
  name: str;
};
export async function cat_get_name(agent: TRPCAgent, data: TCatGetNameRequest){
  return agent.sendMessage<TCatGetNameResponse>(chia_wallet_service, cat_get_name_command, data);
}




export const get_stray_cats_command = "get_stray_cats";
export type get_stray_cats_command = typeof get_stray_cats_command;
export type TGetStrayCatsResponse = {
  stray_cats: Array<{
    asset_id: str;
    name: str;
    first_seen_height: int;
    sender_puzzle_hash: str;
  }>;
};
export async function get_stray_cats(agent: TRPCAgent){
  return agent.sendMessage<TGetStrayCatsResponse>(chia_wallet_service, get_stray_cats_command);
}




export const cat_spend_command = "cat_spend";
export type cat_spend_command = typeof cat_spend_command;
export type TCatSpendRequest = {
  wallet_id: uint32;
  inner_address: str;
  memos?: str[];
  amount: uint64;
  fee: uint64;
  min_coin_amount?: uint64;
};
export type TCatSpendResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export async function cat_spend(agent: TRPCAgent, data: TCatSpendRequest){
  return agent.sendMessage<TCatSpendResponse>(chia_wallet_service, cat_spend_command, data);
}




export const cat_get_asset_id_command = "cat_get_asset_id";
export type cat_get_asset_id_command = typeof cat_get_asset_id_command;
export type TCatGetAssetIdRequest = {
  wallet_id: uint32;
};
export type TCatGetAssetIdResponse = {
  asset_id: str;
  wallet_id: uint32;
};
export async function cat_get_asset_id(agent: TRPCAgent, data: TCatGetAssetIdRequest){
  return agent.sendMessage<TCatGetAssetIdResponse>(chia_wallet_service, cat_get_asset_id_command, data);
}




export const create_offer_for_ids_command = "create_offer_for_ids";
export type create_offer_for_ids_command = typeof create_offer_for_ids_command;
export type TCreateOfferForIdsRequest = {
  offer: Record<int, int>;
  fee?: uint64;
  validate_only?: bool;
  driver_dict?: TDriverDict;
  min_coin_amount?: uint64;
};
export type TCreateOfferForIdsResponse = {
  offer: str;
  trade_record: TradeRecordConvenience;
};
export async function create_offer_for_ids(agent: TRPCAgent, data: TCreateOfferForIdsRequest){
  return agent.sendMessage<TCreateOfferForIdsResponse>(chia_wallet_service, create_offer_for_ids_command, data);
}




export const get_offer_summary_command = "get_offer_summary";
export type get_offer_summary_command = typeof get_offer_summary_command;
export type TGetOfferSummaryRequest = {
  offer: str;
  advanced?: bool;
};
export type TGetOfferSummaryResponse = {
  summary: {
    offered: Record<str, int>;
    requested: Record<str, int>;
    fees: int;
    infos: TDriverDict;
  };
};
export async function get_offer_summary(agent: TRPCAgent, data: TGetOfferSummaryRequest){
  return agent.sendMessage<TGetOfferSummaryResponse>(chia_wallet_service, get_offer_summary_command, data);
}




export const check_offer_validity_command = "check_offer_validity";
export type check_offer_validity_command = typeof check_offer_validity_command;
export type TCheckOfferValidityRequest = {
  offer: str;
};
export type TCheckOfferValidityResponse = {
  valid: bool;
};
export async function check_offer_validity(agent: TRPCAgent, data: TCheckOfferValidityRequest){
  return agent.sendMessage<TCheckOfferValidityResponse>(chia_wallet_service, check_offer_validity_command, data);
}




export const take_offer_command = "take_offer";
export type take_offer_command = typeof take_offer_command;
export type TTakeOfferRequest = {
  offer: str;
  fee?: uint64;
  min_coin_amount?: uint64;
  solver?: Record<str, any>;
};
export type TTakeOfferResponse = {
  trade_record: TradeRecordConvenience;
};
export async function take_offer(agent: TRPCAgent, data: TTakeOfferRequest){
  return agent.sendMessage<TTakeOfferResponse>(chia_wallet_service, take_offer_command, data);
}




export const get_offer_command = "get_offer";
export type get_offer_command = typeof get_offer_command;
export type TGetOfferRequest = {
  trade_id: str;
  file_contents?: bool;
};
export type TGetOfferResponse = {
  trade_record: TradeRecordConvenience;
  offer: Optional<str>;
};
export async function get_offer(agent: TRPCAgent, data: TGetOfferRequest){
  return agent.sendMessage<TGetOfferResponse>(chia_wallet_service, get_offer_command, data);
}




export const get_all_offers_command = "get_all_offers";
export type get_all_offers_command = typeof get_all_offers_command;
export type TGetAllOffersRequest = {
  start?: int;
  end?: int;
  exclude_my_offers?: bool;
  exclude_taken_offers?: bool;
  include_completed?: bool;
  sort_key?: str;
  reverse?: bool;
  file_contents?: bool;
};
export type TGetAllOffersResponse = {
  trade_records: TradeRecordConvenience[];
  offers: Optional<str[]>;
};
export async function get_all_offers(agent: TRPCAgent, data: TGetAllOffersRequest){
  return agent.sendMessage<TGetAllOffersResponse>(chia_wallet_service, get_all_offers_command, data);
}




export const get_offers_count_command = "get_offers_count";
export type get_offers_count_command = typeof get_offers_count_command;
export type TGetOffersCountResponse = {
  total: int;
  my_offers_count: int;
  taken_offers_count: int;
};
export async function get_offers_count(agent: TRPCAgent){
  return agent.sendMessage<TGetOffersCountResponse>(chia_wallet_service, get_offers_count_command);
}




export const cancel_offer_command = "cancel_offer";
export type cancel_offer_command = typeof cancel_offer_command;
export type TCancelOfferRequest = {
  secure: bool;
  trade_id: str;
  fee?: uint64;
};
export type TCancelOfferResponse = {};
export async function cancel_offer(agent: TRPCAgent, data: TCancelOfferRequest){
  return agent.sendMessage<TCancelOfferResponse>(chia_wallet_service, cancel_offer_command, data);
}




export const cancel_offers_command = "cancel_offers";
export type cancel_offers_command = typeof cancel_offers_command;
export type TCancelOffersRequest = {
  secure: bool;
  batch_fee?: uint64;
  batch_size?: int;
  cancel_all?: bool;
  asset_id?: str;
};
export type TCancelOffersResponse = {
  success: True;
};
export async function cancel_offers(agent: TRPCAgent, data: TCancelOffersRequest){
  return agent.sendMessage<TCancelOffersResponse>(chia_wallet_service, cancel_offers_command, data);
}




// # DID Wallet
export const did_set_wallet_name_command = "did_set_wallet_name";
export type did_set_wallet_name_command = typeof did_set_wallet_name_command;
export type TDidSetWalletNameRequest = {
  wallet_id: uint32;
  name: str;
};
export type TDidSetWalletNameResponse = {
  success: True;
  wallet_id: uint32;
} | {
  success: False;
  error: str;
};
export async function did_set_wallet_name(agent: TRPCAgent, data: TDidSetWalletNameRequest){
  return agent.sendMessage<TDidSetWalletNameResponse>(chia_wallet_service, did_set_wallet_name_command, data);
}




export const did_get_wallet_name_command = "did_get_wallet_name";
export type did_get_wallet_name_command = typeof did_get_wallet_name_command;
export type TDidGetWalletNameRequest = {
  wallet_id: uint32;
};
export type TDidGetWalletNameResponse = {
  success: True;
  wallet_id: uint32;
  name: str;
};
export async function did_get_wallet_name(agent: TRPCAgent, data: TDidGetWalletNameRequest){
  return agent.sendMessage<TDidGetWalletNameResponse>(chia_wallet_service, did_get_wallet_name_command, data);
}




export const did_update_recovery_ids_command = "did_update_recovery_ids";
export type did_update_recovery_ids_command = typeof did_update_recovery_ids_command;
export type TDidUpdateRecoveryIdsRequest = {
  wallet_id: uint32;
  new_list: str[];
  num_verifications_required?: uint64;
};
export type TDidUpdateRecoveryIdsResponse = {
  success: bool;
};
export async function did_update_recovery_ids(agent: TRPCAgent, data: TDidUpdateRecoveryIdsRequest){
  return agent.sendMessage<TDidUpdateRecoveryIdsResponse>(chia_wallet_service, did_update_recovery_ids_command, data);
}




export const did_update_metadata_command = "did_update_metadata";
export type did_update_metadata_command = typeof did_update_metadata_command;
export type TDidUpdateMetadataRequest = {
  wallet_id: uint32;
  metadata?: Record<str, str>;
  fee?: uint64;
};
export type TDidUpdateMetadataResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export async function did_update_metadata(agent: TRPCAgent, data: TDidUpdateMetadataRequest){
  return agent.sendMessage<TDidUpdateMetadataResponse>(chia_wallet_service, did_update_metadata_command, data);
}




export const did_spend_command = "did_spend";
export type did_spend_command = typeof did_spend_command;
export type TDidSpendRequest = {
  wallet_id: int;
  puzzlehash: bytes32;
};
export type TDidSpendResponse = {
  success: bool;
};
export async function did_spend(agent: TRPCAgent, data: TDidSpendRequest){
  console.warn("did_spend was deprecated at chia-blockchain@1.2.8.");
  return agent.sendMessage<TDidSpendResponse>(chia_wallet_service, did_spend_command, data);
}




export const did_get_pubkey_command = "did_get_pubkey";
export type did_get_pubkey_command = typeof did_get_pubkey_command;
export type TDidGetPubkeyRequest = {
  wallet_id: uint32;
};
export type TDidGetPubkeyResponse = {
  success: bool;
  pubkey: str;
};
export async function did_get_pubkey(agent: TRPCAgent){
  return agent.sendMessage<TDidGetPubkeyResponse>(chia_wallet_service, did_get_pubkey_command);
}




export const did_get_did_command = "did_get_did";
export type did_get_did_command = typeof did_get_did_command;
export type TDidGetDidRequest = {
  wallet_id: uint32;
};
export type TDidGetDidResponse = {
  success: bool;
  wallet_id: uint32;
  my_did: str;
  coin_id?: bytes32;
};
export async function did_get_did(agent: TRPCAgent, data: TDidGetDidRequest){
  return agent.sendMessage<TDidGetDidResponse>(chia_wallet_service, did_get_did_command, data);
}




export const did_recovery_spend_command = "did_recovery_spend";
export type did_recovery_spend_command = typeof did_recovery_spend_command;
export type TDidRecoverySpendRequest = {
  wallet_id: uint32;
  attest_data: str[];
  pubkey?: str;
  puzhash?: str;
};
export type TDidRecoverySpendResponse = {
  success: True;
  spend_bundle: SpendBundle;
} | {
  success: False;
};
export async function did_recovery_spend(agent: TRPCAgent, data: TDidRecoverySpendRequest){
  return agent.sendMessage<TDidRecoverySpendResponse>(chia_wallet_service, did_recovery_spend_command, data);
}




export const did_get_recovery_list_command = "did_get_recovery_list";
export type did_get_recovery_list_command = typeof did_get_recovery_list_command;
export type TDidGetRecoveryListRequest = {
  wallet_id: uint32;
};
export type TDidGetRecoveryListResponse = {
  success: bool;
  wallet_id: uint32;
  recovery_list: str[];
  num_required: uint64;
};
export async function did_get_recovery_list(agent: TRPCAgent, data: TDidGetRecoveryListRequest){
  return agent.sendMessage<TDidGetRecoveryListResponse>(chia_wallet_service, did_get_recovery_list_command, data);
}




export const did_get_metadata_command = "did_get_metadata";
export type did_get_metadata_command = typeof did_get_metadata_command;
export type TDidGetMetadataRequest = {
  wallet_id: uint32;
};
export type TDidGetMetadataResponse = {
  success: True;
  wallet_id: uint32;
  metadata: Record<str, str>
};
export async function did_get_metadata(agent: TRPCAgent, data: TDidGetMetadataRequest){
  return agent.sendMessage<TDidGetMetadataResponse>(chia_wallet_service, did_get_metadata_command, data);
}




export const did_create_attest_command = "did_create_attest";
export type did_create_attest_command = typeof did_create_attest_command;
export type TDidCreateAttestRequest = {
  wallet_id: uint32;
  coin_name: str;
  puzhash: str;
};
export type TDidCreateAttestResponse = {
  success: True;
  message_spend_bundle: str;
  info: [str, str, uint64];
  attest_data: str;
} | {
  success: False;
};
export async function did_create_attest(agent: TRPCAgent, data: TDidCreateAttestRequest){
  return agent.sendMessage<TDidCreateAttestResponse>(chia_wallet_service, did_create_attest_command, data);
}



export const did_get_information_needed_for_recovery_command = "did_get_information_needed_for_recovery";
export type did_get_information_needed_for_recovery_command = typeof did_get_information_needed_for_recovery_command;
export type TDidGetInformationNeededForRecoveryRequest = {
  wallet_id: uint32;
};
export type TDidGetInformationNeededForRecoveryResponse = {
  success: bool;
  wallet_id: uint32;
  my_did: str;
  coin_name: str;
  newpuzhash: Optional<bytes32>;
  pubkey: Optional<bytes>;
  backup_dids: bytes[];
};
export async function did_get_information_needed_for_recovery(agent: TRPCAgent, data: TDidGetInformationNeededForRecoveryRequest){
  return agent.sendMessage<TDidGetInformationNeededForRecoveryResponse>(chia_wallet_service, did_get_information_needed_for_recovery_command, data);
}



export const did_get_current_coin_info_command = "did_get_current_coin_info";
export type did_get_current_coin_info_command = typeof did_get_current_coin_info_command;
export type TDidGetCurrentCoinInfoRequest = {
  wallet_id: uint32;
};
export type TDidGetCurrentCoinInfoResponse = {
  success: True;
  wallet_id: uint32;
  my_did: str;
  did_parent: bytes32;
  did_innerpuz: bytes32;
  did_amount: uint64;
};
export async function did_get_current_coin_info(agent: TRPCAgent, data: TDidGetCurrentCoinInfoRequest){
  return agent.sendMessage<TDidGetCurrentCoinInfoResponse>(chia_wallet_service, did_get_current_coin_info_command, data);
}




export const did_create_backup_file_command = "did_create_backup_file";
export type did_create_backup_file_command = typeof did_create_backup_file_command;
export type TDidCreateBackupFileRequest = {
  wallet_id: uint32;
};
export type TDidCreateBackupFileResponse = {
  wallet_id: uint32;
  success: True;
  backup_data: str;
};
export async function did_create_backup_file(agent: TRPCAgent, data: TDidCreateBackupFileRequest){
  return agent.sendMessage<TDidCreateBackupFileResponse>(chia_wallet_service, did_create_backup_file_command, data);
}




export const did_transfer_did_command = "did_transfer_did";
export type did_transfer_did_command = typeof did_transfer_did_command;
export type TDidTransferDidRequest = {
  wallet_id: uint32;
  inner_address: str;
  fee?: uint64;
  with_recovery_info?: bool;
};
export type TDidTransferDidResponse = {
  success: True;
  transaction: TransactionRecordConvenience;
  transaction_id: bytes32;
};
export async function did_transfer_did(agent: TRPCAgent, data: TDidTransferDidRequest){
  return agent.sendMessage<TDidTransferDidResponse>(chia_wallet_service, did_transfer_did_command, data);
}




// # NFT Wallet
export const nft_mint_nft_command = "nft_mint_nft";
export type nft_mint_nft_command = typeof nft_mint_nft_command;
export type TNftMintNftRequest = {
  wallet_id: uint32;
  royalty_address?: str;
  target_address?: str;
  uris: str[]; // Reference: NFTInfo.data_uris at chia/wallet/nft_wallet/nft_info.py
  meta_uris: str[]; // Reference: chia/wallet/nft_wallet/nft_info.py
  license_uris: str[]; // Reference: chia/wallet/nft_wallet/nft_info.py
  hash: str;
  edition_number: uint64;
  edition_total: uint64;
  meta_hash?: str;
  license_hash?: str;
  fee?: uint64;
  did_id?: str;
  royalty_percentage?: uint16;
};
export type TNftMintNftResponse = {
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
};
export async function nft_mint_nft(agent: TRPCAgent, data: TNftMintNftRequest){
  return agent.sendMessage<TNftMintNftResponse>(chia_wallet_service, nft_mint_nft_command, data);
}




export const nft_get_nfts_command = "nft_get_nfts";
export type nft_get_nfts_command = typeof nft_get_nfts_command;
export type TNftGetNftsRequest = {
  wallet_id: uint32;
};
export type TNftGetNftsResponse = {
  wallet_id: uint32;
  success: True;
  nft_list: NFTInfo[];
};
export async function nft_get_nfts(agent: TRPCAgent, data: TNftGetNftsRequest){
  return agent.sendMessage<TNftGetNftsResponse>(chia_wallet_service, nft_get_nfts_command, data);
}




export const nft_set_nft_did_command = "nft_set_nft_did";
export type nft_set_nft_did_command = typeof nft_set_nft_did_command;
export type TNftSetNftDidRequest = {
  wallet_id: uint32;
  did_id: str;
  nft_coin_id: str;
  fee?: uint64;
};
export type TNftSetNftDidResponse = {
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export async function nft_set_nft_did(agent: TRPCAgent, data: TNftSetNftDidRequest){
  return agent.sendMessage<TNftSetNftDidResponse>(chia_wallet_service, nft_set_nft_did_command, data);
}




export const nft_get_by_did_command = "nft_get_by_did";
export type nft_get_by_did_command = typeof nft_get_by_did_command;
export type TNftGetByDidRequest = {
  did_id?: str;
};
export type TNftGetByDidResponse = {
  wallet_id: uint32;
  success: True;
} | {
  success: False;
  error: str;
};
export async function nft_get_by_did(agent: TRPCAgent, data: TNftGetByDidRequest){
  return agent.sendMessage<TNftGetByDidResponse>(chia_wallet_service, nft_get_by_did_command, data);
}




export const nft_get_wallet_did_command = "nft_get_wallet_did";
export type nft_get_wallet_did_command = typeof nft_get_wallet_did_command;
export type TNftGetWalletDidRequest = {
  wallet_id: uint32;
};
export type TNftGetWalletDidResponse = {
  did_id: Optional<str>;
  success: True;
} | {
  success: False;
  error: str;
};
export async function nft_get_wallet_did(agent: TRPCAgent, data: TNftGetWalletDidRequest){
  return agent.sendMessage<TNftGetWalletDidResponse>(chia_wallet_service, nft_get_wallet_did_command, data);
}




export const nft_get_wallets_with_dids_command = "nft_get_wallets_with_dids";
export type nft_get_wallets_with_dids_command = typeof nft_get_wallets_with_dids_command;
export type TNftGetWalletsWithDidsResponse = {
  success: True;
  nft_wallets: Array<{
    wallet_id: uint32;
    did_id: str;
    did_wallet_id: uint32;
  }>;
};
export async function nft_get_wallets_with_dids(agent: TRPCAgent){
  return agent.sendMessage<TNftGetWalletsWithDidsResponse>(chia_wallet_service, nft_get_wallets_with_dids_command);
}




export const nft_set_nft_status_command = "nft_set_nft_status";
export type nft_set_nft_status_command = typeof nft_set_nft_status_command;
export type TNftSetNftStatusRequest = {
  wallet_id: uint32;
  coin_id: str;
  in_transaction: bool;
};
export type TNftSetNftStatusResponse = {
  success: True;
} | {
  success: False;
  error: str;
};
export async function nft_set_nft_status(agent: TRPCAgent, data: TNftSetNftStatusRequest){
  return agent.sendMessage<TNftSetNftStatusResponse>(chia_wallet_service, nft_set_nft_status_command, data);
}




export const nft_transfer_nft_command = "nft_transfer_nft";
export type nft_transfer_nft_command = typeof nft_transfer_nft_command;
export type TNftTransferNftRequest = {
  wallet_id: uint32;
  target_address: str;
  nft_coin_id: str;
  fee?: uint64;
};
export type TNftTransferNftResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export async function nft_transfer_nft(agent: TRPCAgent, data: TNftTransferNftRequest){
  return agent.sendMessage<TNftTransferNftResponse>(chia_wallet_service, nft_transfer_nft_command, data);
}




export const nft_get_info_command = "nft_get_info";
export type nft_get_info_command = typeof nft_get_info_command;
export type TNftGetInfoRequest = {
  coin_id: str;
  latest?: bool;
};
export type TNftGetInfoResponse = {
  success: True;
  nft_info: NFTInfo;
} | {
  success: False;
  error: str;
};
export async function nft_get_info(agent: TRPCAgent, data: TNftGetInfoRequest){
  return agent.sendMessage<TNftGetInfoResponse>(chia_wallet_service, nft_get_info_command, data);
}




export const nft_add_uri_command = "nft_add_uri";
export type nft_add_uri_command = typeof nft_add_uri_command;
export type TNftAddUriRequest = {
  wallet_id: uint32;
  uri: str;
  key: str;
  nft_coin_id: str;
  fee?: uint64;
};
export type TNftAddUriResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export async function nft_add_uri(agent: TRPCAgent, data: TNftAddUriRequest){
  return agent.sendMessage<TNftAddUriResponse>(chia_wallet_service, nft_add_uri_command, data);
}



// # RL wallet
export const rl_set_user_info_command = "rl_set_user_info";
export type rl_set_user_info_command = typeof rl_set_user_info_command;
export type TRlSetUserInfoRequest = {
  wallet_id: int;
  origin: {
    parent_coin_info: str;
    puzzle_hash: str;
    amount: uint64;
  };
  interval: uint64;
  limit: uint64;
  admin_pubkey: str;
};
export type TRlSetUserInfoResponse = {
};
export async function rl_set_user_info(agent: TRPCAgent, data: TRlSetUserInfoRequest){
  return agent.sendMessage<TRlSetUserInfoResponse>(chia_wallet_service, rl_set_user_info_command, data);
}




export const send_clawback_transaction_command = "send_clawback_transaction:";
export type send_clawback_transaction_command = typeof send_clawback_transaction_command;
export type TSendClawbackTransactionRequest = {
  wallet_id: uint32;
  fee: int;
};
export type TSendClawbackTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};
export async function send_clawback_transaction(agent: TRPCAgent, data: TSendClawbackTransactionRequest){
  return agent.sendMessage<TSendClawbackTransactionResponse>(chia_wallet_service, send_clawback_transaction_command, data);
}




export const add_rate_limited_funds_command = "add_rate_limited_funds:";
export type add_rate_limited_funds_command = typeof add_rate_limited_funds_command;
export type TAddRateLimitedFundsRequest = {
  wallet_id: uint32;
  amount: uint64;
  fee: uint64;
};
export type TAddRateLimitedFundsResponse = {
  status: "SUCCESS";
};
export async function add_rate_limited_funds(agent: TRPCAgent, data: TAddRateLimitedFundsRequest){
  return agent.sendMessage<TAddRateLimitedFundsResponse>(chia_wallet_service, add_rate_limited_funds_command, data);
}




export const pw_join_pool_command = "pw_join_pool";
export type pw_join_pool_command = typeof pw_join_pool_command;
export type TPwJoinPoolRequest = {
  fee?: uint64;
  wallet_id: uint32;
  target_puzzlehash?: string;
  pool_url?: str;
  relative_lock_height: uint32;
};
export type TPwJoinPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
export async function pw_join_pool(agent: TRPCAgent, data: TPwJoinPoolRequest){
  return agent.sendMessage<TPwJoinPoolResponse>(chia_wallet_service, pw_join_pool_command, data);
}




export const pw_self_pool_command = "pw_self_pool";
export type pw_self_pool_command = typeof pw_self_pool_command;
export type TPwSelfPoolRequest = {
  wallet_id: uint32;
  fee?: uint64;
};
export type TPwSelfPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
};
export async function pw_self_pool(agent: TRPCAgent, data: TPwSelfPoolRequest){
  return agent.sendMessage<TPwSelfPoolResponse>(chia_wallet_service, pw_self_pool_command, data);
}




export const pw_absorb_rewards_command = "pw_absorb_rewards";
export type pw_absorb_rewards_command = typeof pw_absorb_rewards_command;
export type TPwAbsorbRewardsRequest = {
  wallet_id: uint32;
  fee?: uint64;
  max_spends_in_tx?: int;
};
export type TPwAbsorbRewardsResponse = {
  state: PoolWalletInfo;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
};
export async function pw_absorb_rewards(agent: TRPCAgent, data: TPwAbsorbRewardsRequest){
  return agent.sendMessage<TPwAbsorbRewardsResponse>(chia_wallet_service, pw_absorb_rewards_command, data);
}




export const pw_status_command = "pw_status";
export type pw_status_command = typeof pw_status_command;
export type TPwStatusRequest = {
  wallet_id: uint32;
};
export type TPwStatusResponse = {
  state: PoolWalletInfo;
  unconfirmed_transactions: TransactionRecord[];
};
export async function pw_status(agent: TRPCAgent, data: TPwStatusRequest){
  return agent.sendMessage<TPwStatusResponse>(chia_wallet_service, pw_status_command, data);
}




export const create_new_dl_command = "create_new_dl";
export type create_new_dl_command = typeof create_new_dl_command;
export type TCreateNewDlRequest = {
  root: str;
  fee?: uint64;
};
export type TCreateNewDlResponse = {
  success: False;
  error: str;
} | {
  success: True;
  transactions: TransactionRecordConvenience[];
  launcher_id: bytes32;
};
export async function create_new_dl(agent: TRPCAgent, data: TCreateNewDlRequest){
  return agent.sendMessage<TCreateNewDlResponse>(chia_wallet_service, create_new_dl_command, data);
}




export const dl_track_new_command = "dl_track_new";
export type dl_track_new_command = typeof dl_track_new_command;
export type TDlTrackNewRequest = {
  launcher_id: str;
};
export type TDlTrackNewResponse = {
};
export async function dl_track_new(agent: TRPCAgent, data: TDlTrackNewRequest){
  return agent.sendMessage<TDlTrackNewResponse>(chia_wallet_service, dl_track_new_command, data);
}




export const dl_stop_tracking_command = "dl_stop_tracking";
export type dl_stop_tracking_command = typeof dl_stop_tracking_command;
export type TDlStopTrackingRequest = {
  launcher_id: str;
};
export type TDlStopTrackingResponse = {
};
export async function dl_stop_tracking(agent: TRPCAgent, data: TDlStopTrackingRequest){
  return agent.sendMessage<TDlStopTrackingResponse>(chia_wallet_service, dl_stop_tracking_command, data);
}




export const dl_latest_singleton_command = "dl_latest_singleton";
export type dl_latest_singleton_command = typeof dl_latest_singleton_command;
export type TDlLatestSingletonRequest = {
  launcher_id: str;
  only_confirmed?: bool;
};
export type TDlLatestSingletonResponse = {
  singleton: Optional<SingletonRecord>;
};
export async function dl_latest_singleton(agent: TRPCAgent, data: TDlLatestSingletonRequest){
  return agent.sendMessage<TDlLatestSingletonResponse>(chia_wallet_service, dl_latest_singleton_command, data);
}




export const dl_singletons_by_root_command = "dl_singletons_by_root";
export type dl_singletons_by_root_command = typeof dl_singletons_by_root_command;
export type TDlSingletonsByRootRequest = {
  launcher_id: str;
  root: str;
};
export type TDlSingletonsByRootResponse = {
  singletons: SingletonRecord[];
};
export async function dl_singletons_by_root(agent: TRPCAgent, data: TDlSingletonsByRootRequest){
  return agent.sendMessage<TDlSingletonsByRootResponse>(chia_wallet_service, dl_singletons_by_root_command, data);
}




export const dl_update_root_command = "dl_update_root";
export type dl_update_root_command = typeof dl_update_root_command;
export type TDlUpdateRootRequest = {
  launcher_id: str;
  new_root: str;
  fee?: uint64;
};
export type TDlUpdateRootResponse = {
  tx_record: TransactionRecordConvenience;
};
export async function dl_update_root(agent: TRPCAgent, data: TDlUpdateRootRequest){
  return agent.sendMessage<TDlUpdateRootResponse>(chia_wallet_service, dl_update_root_command, data);
}




export const dl_update_multiple_command = "dl_update_multiple";
export type dl_update_multiple_command = typeof dl_update_multiple_command;
export type TDlUpdateMultipleRequest = {
  updates: Record<str, str>; // {[launcher_id]: root}
};
export type TDlUpdateMultipleResponse = {
  tx_records: TransactionRecordConvenience[];
};
export async function dl_update_multiple(agent: TRPCAgent, data: TDlUpdateMultipleRequest){
  return agent.sendMessage<TDlUpdateMultipleResponse>(chia_wallet_service, dl_update_multiple_command, data);
}




export const dl_history_command = "dl_history";
export type dl_history_command = typeof dl_history_command;
export type TDlHistoryRequest = {
  min_generation?: uint32;
  max_generation?: uint32;
  num_results?: uint32;
};
export type TDlHistoryResponse = {
  history: SingletonRecord[];
  count: int;
};
export async function dl_history(agent: TRPCAgent, data: TDlHistoryRequest){
  return agent.sendMessage<TDlHistoryResponse>(chia_wallet_service, dl_history_command, data);
}




export const dl_owned_singletons_command = "dl_owned_singletons";
export type dl_owned_singletons_command = typeof dl_owned_singletons_command;
export type TDlOwnedSingletonsResponse = {
  singletons: SingletonRecord[];
  count: int;
};
export async function dl_owned_singletons(agent: TRPCAgent){
  return agent.sendMessage<TDlOwnedSingletonsResponse>(chia_wallet_service, dl_owned_singletons_command);
}




export const dl_get_mirrors_command = "dl_get_mirrors";
export type dl_get_mirrors_command = typeof dl_get_mirrors_command;
export type TDlGetMirrorsRequest = {
  launcher_id: str;
};
export type TDlGetMirrorsResponse = {
  mirrors: Mirror[];
};
export async function dl_get_mirrors(agent: TRPCAgent, data: TDlGetMirrorsRequest){
  return agent.sendMessage<TDlGetMirrorsResponse>(chia_wallet_service, dl_get_mirrors_command, data);
}




export const dl_new_mirror_command = "dl_new_mirror";
export type dl_new_mirror_command = typeof dl_new_mirror_command;
export type TDlNewMirrorRequest = {
  launcher_id: str;
  amount: uint64;
  urls: str[];
  fee?: uint64;
};
export type TDlNewMirrorResponse = {
  transactions: TransactionRecordConvenience[];
};
export async function dl_new_mirror(agent: TRPCAgent, data: TDlNewMirrorRequest){
  return agent.sendMessage<TDlNewMirrorResponse>(chia_wallet_service, dl_new_mirror_command, data);
}




export const dl_delete_mirror_command = "dl_delete_mirror";
export type dl_delete_mirror_command = typeof dl_delete_mirror_command;
export type TDlDeleteMirrorRequest = {
  coin_id: str;
  fee?: uint64;
};
export type TDlDeleteMirrorResponse = {
  transactions: TransactionRecordConvenience[];
};
export async function dl_delete_mirror(agent: TRPCAgent, data: TDlDeleteMirrorRequest){
  return agent.sendMessage<TDlDeleteMirrorResponse>(chia_wallet_service, dl_delete_mirror_command, data);
}
