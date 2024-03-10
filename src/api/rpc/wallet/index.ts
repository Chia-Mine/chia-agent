import {WalletInfo} from "../../chia/wallet/wallet_info";
import {Coin} from "../../chia/types/blockchain_format/coin";
import {
  bool,
  bytes,
  False,
  int, None,
  Optional,
  str,
  True, uint128,
  uint16,
  uint32,
  uint64,
  uint8
} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {
  TransactionRecord,
  TransactionRecordConvenience,
  TransactionRecordConvenienceWithMetadata
} from "../../chia/wallet/transaction_record";
import {SpendBundle} from "../../chia/types/spend_bundle";
import {TRPCAgent} from "../../../rpc";
import {PoolWalletInfo} from "../../chia/pools/pool_wallet_info";
import {TradeRecordConvenience} from "../../chia/wallet/trade_record";
import {CAT} from "../../chia/wallet/cat_wallet/cat_constants";
import {TDriverDict} from "../../chia/wallet/puzzle_drivers";
import {NFTInfo} from "../../chia/wallet/nft_wallet/nft_info";
import {Mirror, SingletonRecord} from "../../chia/data_layer/data_layer_wallet";
import {TPushTxResponseOfWallet} from "../index";
import {GetMessageType, ResType} from "../../types";
import {TDaemon} from "../../../daemon/index";
import {CoinRecord} from "../../chia/types/coin_record";
import {SigningMode} from "../../chia/types/signing_mode";
import {Balance} from "../../chia/wallet/wallet_node";
import {AutoClaimSettings} from "../../chia/wallet/puzzles/clawback/metadata";
import {GetCoinRecords} from "../../chia/wallet/wallet_coin_store";
import {WalletCoinRecordWithMetadata} from "../../chia/wallet/wallet_coin_record";
import {VCRecord} from "../../chia/wallet/vc_wallet/vc_store";
import {TransactionTypeFilter} from "../../chia/wallet/util/quality_filter";
import {CoinSelectionConfigLoader, TxEndpoint} from "../../chia/wallet/util/tx_config";
import {ConditionValidTimes} from "../../chia/wallet/conditions";
import {DAOInfo, DAORules, ProposalInfo} from "../../chia/wallet/dao_wallet/dao_info";
import {ParsedProposalSpend, ParsedProposalUpdate, ProposalState} from "../../chia/wallet/dao_wallet/dao_wallet";
import {DLProof, VerifyProofResponse} from "../../chia/data_layer/data_layer_util";
import {GetNotifications, GetNotificationsResponse} from "../../chia/rpc/wallet_request_types";

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
export type WsLoginMessage = GetMessageType<chia_wallet_service, log_in_command, TLoginResponse>;
export async function log_in<T extends TRPCAgent | TDaemon>(agent: T, data: TLoginRequest){
  type R = ResType<T, TLoginResponse, WsLoginMessage>;
  return agent.sendMessage<R>(chia_wallet_service, log_in_command, data);
}



export const get_logged_in_fingerprint_command = "get_logged_in_fingerprint";
export type get_logged_in_fingerprint_command = typeof get_logged_in_fingerprint_command;
export type TGetLoggedInFingerprintResponse = {
  fingerprint: Optional<int>;
};
export type WsGetLoggedInFingerprintMessage = GetMessageType<chia_wallet_service, get_logged_in_fingerprint_command, TGetLoggedInFingerprintResponse>;
export async function get_logged_in_fingerprint<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetLoggedInFingerprintResponse, WsGetLoggedInFingerprintMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_logged_in_fingerprint_command);
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
export type WsGetPublicKeysMessage = GetMessageType<chia_wallet_service, get_public_keys_command, TGetPublicKeysResponse>;
export async function get_public_keys<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetPublicKeysResponse, WsGetPublicKeysMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_public_keys_command);
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
export type WsGetPrivateKeyMessage = GetMessageType<chia_wallet_service, get_private_key_command, TGetPrivateKeyResponse>;
export async function get_private_key<T extends TRPCAgent | TDaemon>(agent: T, data: TGetPrivateKeyRequest){
  type R = ResType<T, TGetPrivateKeyResponse, WsGetPrivateKeyMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_private_key_command, data);
}




export const generate_mnemonic_command = "generate_mnemonic";
export type generate_mnemonic_command = typeof generate_mnemonic_command;
export type TGenerateMnemonicRequest = {
};
export type TGenerateMnemonicResponse = {
  mnemonic: str[];
};
export type WsGenerateMnemonicMessage = GetMessageType<chia_wallet_service, generate_mnemonic_command, TGenerateMnemonicResponse>;
export async function generate_mnemonic<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGenerateMnemonicResponse, WsGenerateMnemonicMessage>;
  return agent.sendMessage<R>(chia_wallet_service, generate_mnemonic_command);
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
export type WsAddKeyMessage = GetMessageType<chia_wallet_service, add_key_command, TAddKeyResponse>;
export async function add_key<T extends TRPCAgent | TDaemon>(agent: T, data: TAddKeyRequest){
  type R = ResType<T, TAddKeyResponse, WsAddKeyMessage>;
  return agent.sendMessage<R>(chia_wallet_service, add_key_command, data);
}




export const delete_key_command = "delete_key";
export type delete_key_command = typeof delete_key_command;
export type TDeleteKeyRequest = {
  fingerprint: int;
};
export type TDeleteKeyResponse = {
};
export type WsDeleteKeyMessage = GetMessageType<chia_wallet_service, delete_key_command, TDeleteKeyResponse>;
export async function delete_key<T extends TRPCAgent | TDaemon>(agent: T, data: TDeleteKeyRequest){
  type R = ResType<T, TDeleteKeyResponse, WsDeleteKeyMessage>;
  return agent.sendMessage<R>(chia_wallet_service, delete_key_command, data);
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
export type WsCheckDeleteKeyMessage = GetMessageType<chia_wallet_service, check_delete_key_command, TCheckDeleteKeyResponse>;
export async function check_delete_key<T extends TRPCAgent | TDaemon>(agent: T, data: TCheckDeleteKeyRequest){
  type R = ResType<T, TCheckDeleteKeyResponse, WsCheckDeleteKeyMessage>;
  return agent.sendMessage<R>(chia_wallet_service, check_delete_key_command, data);
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
export type WsDeleteAllKeysMessage = GetMessageType<chia_wallet_service, delete_all_keys_command, TDeleteAllKeysResponse>;
export async function delete_all_keys<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TDeleteAllKeysResponse, WsDeleteAllKeysMessage>;
  return agent.sendMessage<R>(chia_wallet_service, delete_all_keys_command);
}


export const set_wallet_resync_on_startup_command = "set_wallet_resync_on_startup";
export type set_wallet_resync_on_startup_command = typeof set_wallet_resync_on_startup_command;
export type TSetWalletResyncOnStartupRequest = {
  enable?: bool;
};
export type TSetWalletResyncOnStartupResponse = {
  success: True;
};
export type WsSetWalletResyncOnStartupMessage = GetMessageType<chia_wallet_service, set_wallet_resync_on_startup_command, TSetWalletResyncOnStartupResponse>;
export async function set_wallet_resync_on_startup<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TSetWalletResyncOnStartupResponse, WsSetWalletResyncOnStartupMessage>;
  return agent.sendMessage<R>(chia_wallet_service, set_wallet_resync_on_startup_command);
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
export type WsGetSyncStatusMessage = GetMessageType<chia_wallet_service, get_sync_status_command, TGetSyncStatusResponse>;
export async function get_sync_status<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetSyncStatusResponse, WsGetSyncStatusMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_sync_status_command);
}



export const get_height_info_command = "get_height_info";
export type get_height_info_command = typeof get_height_info_command;
export type TGetHeightInfoRequest = {
};
export type TGetHeightInfoResponse = {
  height: uint32;
};
export type WsGetHeightInfoMessage = GetMessageType<chia_wallet_service, get_height_info_command, TGetHeightInfoResponse>;
export async function get_height_info<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetHeightInfoResponse, WsGetHeightInfoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_height_info_command);
}



export const push_tx_command = "push_tx";
export type push_tx_command = typeof push_tx_command;
export type TPushTxRequest = {
  spend_bundle: str; // SpendBundle serialized to hex string 
};
export type TPushTxResponse = {};
export type WsPushTxMessageOfWallet = GetMessageType<chia_wallet_service, push_tx_command, TPushTxResponse>;
export async function push_tx<T extends TRPCAgent | TDaemon>(agent: T, data: TPushTxRequest){
  type R = ResType<T, TPushTxResponseOfWallet, WsPushTxMessageOfWallet>;
  return agent.sendMessage<R>(chia_wallet_service, push_tx_command, data);
}



export const push_transactions_command = "push_transactions";
export type push_transactions_command = typeof push_transactions_command;
export type TPushTransactionsRequest = {
  transactions: str; // TransactionRecord serialized to hex string 
};
export type TPushTransactionsResponse = {};
export type WsPushTransactionsMessage = GetMessageType<chia_wallet_service, push_transactions_command, TPushTransactionsResponse>;
export async function push_transactions<T extends TRPCAgent | TDaemon>(agent: T, data: TPushTransactionsRequest){
  type R = ResType<T, TPushTransactionsResponse, WsPushTransactionsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, push_transactions_command, data);
}



export const farm_block_command = "farm_block";
export type farm_block_command = typeof farm_block_command;
export type TFarmBlockRequest = {
  address: str;
};
export type TFarmBlockResponse = {
};
export type WsFarmBlockMessage = GetMessageType<chia_wallet_service, farm_block_command, TFarmBlockResponse>;
export async function farm_block<T extends TRPCAgent | TDaemon>(agent: T, data: TFarmBlockRequest){
  type R = ResType<T, TFarmBlockResponse, WsFarmBlockMessage>;
  return agent.sendMessage<R>(chia_wallet_service, farm_block_command, data);
}



export const get_timestamp_for_height_command = "get_timestamp_for_height";
export type get_timestamp_for_height_command = typeof get_timestamp_for_height_command;
export type TGetTimestampForHeightResponse = {
  timestamp: uint64;
};
export type WsGetTimestampForHeightMessage = GetMessageType<chia_wallet_service, get_timestamp_for_height_command, TGetTimestampForHeightResponse>;
export async function get_timestamp_for_height<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetTimestampForHeightResponse, WsGetTimestampForHeightMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_timestamp_for_height_command);
}



export const set_auto_claim_command = "set_auto_claim";
export type set_auto_claim_command = typeof set_auto_claim_command;
export type TSetAutoClaimRequest = AutoClaimSettings;
export type TSetAutoClaimResponse = AutoClaimSettings;
export type WsSetAutoClaimMessage = GetMessageType<chia_wallet_service, set_auto_claim_command, TSetAutoClaimResponse>;
export async function set_auto_claim<T extends TRPCAgent | TDaemon>(agent: T, data: TSetAutoClaimRequest) {
  type R = ResType<T, TSetAutoClaimResponse, WsSetAutoClaimMessage>;
  return agent.sendMessage<R>(chia_wallet_service, set_auto_claim_command, data);
}


export const get_auto_claim_command = "get_auto_claim";
export type get_auto_claim_command = typeof get_auto_claim_command;
export type TGetAutoClaimResponse = AutoClaimSettings;
export type WsGetAutoClaimMessage = GetMessageType<chia_wallet_service, get_auto_claim_command, TGetAutoClaimResponse>;
export async function get_auto_claim<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetAutoClaimResponse, WsGetAutoClaimMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_auto_claim_command);
}


export const get_initial_freeze_period_command_of_wallet = "get_initial_freeze_period";
export type get_initial_freeze_period_command_of_wallet = typeof get_initial_freeze_period_command_of_wallet;
export type TGetInitialFreezePeriodRequestOfWallet = {
};
export type TGetInitialFreezePeriodResponseOfWallet = {
  INITIAL_FREEZE_END_TIMESTAMP: 1620061200; // Mon May 03 2021 17:00:00 GMT+0000
};
export type WsGetInitialFreezePeriodMessageOfWallet = GetMessageType<chia_wallet_service, get_initial_freeze_period_command_of_wallet, TGetInitialFreezePeriodResponseOfWallet>;
export async function get_initial_freeze_period_of_wallet<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetInitialFreezePeriodResponseOfWallet, WsGetInitialFreezePeriodMessageOfWallet>;
  return agent.sendMessage<R>(chia_wallet_service, get_initial_freeze_period_command_of_wallet);
}



export const get_network_info_command_of_wallet = "get_network_info";
export type get_network_info_command_of_wallet = typeof get_network_info_command_of_wallet;
export type TGetNetworkInfoRequestOfWallet = {
};
export type TGetNetworkInfoResponseOfWallet = {
  network_name: str;
  network_prefix: str;
};
export type WsGetNetworkInfoMessageOfWallet = GetMessageType<chia_wallet_service, get_network_info_command_of_wallet, TGetNetworkInfoResponseOfWallet>;
export async function get_network_info_of_wallet<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetNetworkInfoResponseOfWallet, WsGetNetworkInfoMessageOfWallet>;
  return agent.sendMessage<R>(chia_wallet_service, get_network_info_command_of_wallet);
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
export type WsGetWalletsMessage = GetMessageType<chia_wallet_service, get_wallets_command, TGetWalletsResponse>;
export async function get_wallets<T extends TRPCAgent | TDaemon>(agent: T, data: TGetWalletsRequest){
  type R = ResType<T, TGetWalletsResponse, WsGetWalletsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_wallets_command, data);
}



export type TCreate_New_CAT_WalletRequest = {
  fee?: uint64;
  wallet_type: "cat_wallet"
  name?: str;
  mode: "new";
  test?: bool;
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

export type TCreate_New_DAO_WalletRequest = {
  wallet_type: "dao_wallet";
  name?: str;
  mode: "new" | "existing";
  amount_of_cats?: uint64;
  filter_amount: uint64;
  fee: uint64;
  fee_for_cat: uint64;
  treasury_id: str;
  
};
export type TCreate_New_DAO_WalletResponse = {
  success: True;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
  treasury_id: bytes32;
  cat_wallet_id: uint32;
  dao_cat_wallet_id: uint32;
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
export type TCreateNewWalletRequest = (TCreate_New_CAT_WalletRequest
  | TCreate_New_RL_WalletRequest
  | TCreate_New_DID_WalletRequest
  | TCreate_New_DAO_WalletRequest
  | TCreate_New_NFT_WalletRequest
  | TCreate_New_Pool_WalletRequest) & TxEndpoint;
export type TCreateNewWalletResponse = TCreate_New_CAT_WalletResponse
  | TCreate_New_RL_WalletResponse
  | TCreate_New_DID_WalletResponse
  | TCreate_New_DAO_WalletResponse
  | TCreate_New_NFT_WalletResponse
  | TCreate_New_Pool_WalletResponse
  | TCreateWalletErrorResponse;
export type WsCreateNewWalletMessage = GetMessageType<chia_wallet_service, create_new_wallet_command, TCreateNewWalletResponse>;
export async function create_new_wallet<T extends TRPCAgent | TDaemon>(agent: T, data: TCreateNewWalletRequest){
  type R = ResType<T, TCreateNewWalletResponse, WsCreateNewWalletMessage>;
  return agent.sendMessage<R>(chia_wallet_service, create_new_wallet_command, data);
}


// # Wallet
export type WalletBalance = Balance & {
  wallet_id: uint32;
  wallet_type: int;
  fingerprint?: int;
  asset_id?: str;
};
export const get_wallet_balance_command = "get_wallet_balance";
export type get_wallet_balance_command = typeof get_wallet_balance_command;
export type TGetWalletBalanceRequest = {
  wallet_id: int;
};
export type TGetWalletBalanceResponse = {
  wallet_balance: WalletBalance;
};
export type WsGetWalletBalanceMessage = GetMessageType<chia_wallet_service, get_wallet_balance_command, TGetWalletBalanceResponse>;
export async function get_wallet_balance<T extends TRPCAgent | TDaemon>(agent: T, data: TGetWalletBalanceRequest){
  type R = ResType<T, TGetWalletBalanceResponse, WsGetWalletBalanceMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_wallet_balance_command, data);
}


export const get_wallet_balances_command = "get_wallet_balances";
export type get_wallet_balances_command = typeof get_wallet_balances_command;
export type TGetWalletBalancesRequest = {
  wallet_ids: int[];
};
export type TGetWalletBalancesResponse = {
  wallet_balances: Record<uint32, WalletBalance>;
};
export type WsGetWalletBalancesMessage = GetMessageType<chia_wallet_service, get_wallet_balances_command, TGetWalletBalancesResponse>;
export async function get_wallet_balances<T extends TRPCAgent | TDaemon>(agent: T, data: TGetWalletBalancesRequest) {
  type R = ResType<T, TGetWalletBalancesResponse, WsGetWalletBalancesMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_wallet_balances_command, data);
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
export type WsGetTransactionMessage = GetMessageType<chia_wallet_service, get_transaction_command, TGetTransactionResponse>;
export async function get_transaction<T extends TRPCAgent | TDaemon>(agent: T, data: TGetTransactionRequest){
  type R = ResType<T, TGetTransactionResponse, WsGetTransactionMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_transaction_command, data);
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
  type_filter?: TransactionTypeFilter;
  confirmed?: bool;
};
export type TGetTransactionsResponse = {
  transactions: TransactionRecordConvenienceWithMetadata[];
  wallet_id: int;
};
export type WsGetTransactionsMessage = GetMessageType<chia_wallet_service, get_transactions_command, TGetTransactionsResponse>;
export async function get_transactions<T extends TRPCAgent | TDaemon>(agent: T, data: TGetTransactionsRequest){
  type R = ResType<T, TGetTransactionsResponse, WsGetTransactionsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_transactions_command, data);
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
export type WsGetNextAddressMessage = GetMessageType<chia_wallet_service, get_next_address_command, TGetNextAddressResponse>;
export async function get_next_address<T extends TRPCAgent | TDaemon>(agent: T, data: TGetNextAddressRequest){
  type R = ResType<T, TGetNextAddressResponse, WsGetNextAddressMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_next_address_command, data);
}




export const send_transaction_command = "send_transaction";
export type send_transaction_command = typeof send_transaction_command;
export type TSendTransactionRequest = {
  wallet_id: uint32;
  amount: int;
  fee: int;
  address: str;
  memos?: str[];
  puzzle_decorator?: Array<{decorator: str; clawback_timelock?: uint64}>;
} & TxEndpoint;
export type TSendTransactionResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export type WsSendTransactionMessage = GetMessageType<chia_wallet_service, send_transaction_command, TSendTransactionResponse>;
export async function send_transaction<T extends TRPCAgent | TDaemon>(agent: T, data: TSendTransactionRequest){
  type R = ResType<T, TSendTransactionResponse, WsSendTransactionMessage>;
  return agent.sendMessage<R>(chia_wallet_service, send_transaction_command, data);
}




export const send_transaction_multi_command = "send_transaction_multi";
export type send_transaction_multi_command = typeof send_transaction_multi_command;
export type TSendTransactionMultiRequest = {
  wallet_id: uint32;
  additions: TAdditions[];
  fee?: uint64;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coins?: Coin[];
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
} | {
  wallet_id: uint32;
  additions: TAdditions[];
  fee: uint64;
  amount: uint64;
  inner_address: str;
  memos: str;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coin_ids?: str[];
};
export type TSendTransactionMultiResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecordConvenience["name"];
};
export type WsSendTransactionMultiMessage = GetMessageType<chia_wallet_service, send_transaction_multi_command, TSendTransactionMultiResponse>;
export async function send_transaction_multi<T extends TRPCAgent | TDaemon>(agent: T, data: TSendTransactionMultiRequest){
  type R = ResType<T, TSendTransactionMultiResponse, WsSendTransactionMultiMessage>;
  return agent.sendMessage<R>(chia_wallet_service, send_transaction_multi_command, data);
}



export const spend_clawback_coins_command = "spend_clawback_coins";
export type spend_clawback_coins_command = typeof spend_clawback_coins_command;
export type TSpendClawbackCoinsRequest = {
  coin_ids: str[];
  fee?: uint64;
  batch_size: int;
  force?: bool;
} & TxEndpoint;
export type TSpendClawbackCoinsResponse = {
  success: True;
  transaction_ids: str[];
};
export type WsSpendClawbackCoinsMessage = GetMessageType<chia_wallet_service, spend_clawback_coins_command, TSpendClawbackCoinsResponse>;
export async function spend_clawback_coins<T extends TRPCAgent | TDaemon>(agent: T, data: TSpendClawbackCoinsRequest) {
  type R = ResType<T, TSpendClawbackCoinsResponse, WsSpendClawbackCoinsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, spend_clawback_coins_command, data);
}


export const get_coin_records_command = "get_coin_records";
export type get_coin_records_command = typeof get_coin_records_command;
export type TGetCoinRecordsRequest = GetCoinRecords;
export type TGetCoinRecordsResponse = {
  coin_records: WalletCoinRecordWithMetadata[];
  total_count: uint32 | None;
};
export type WsGetCoinRecordsMessage = GetMessageType<chia_wallet_service, get_coin_records_command, TGetCoinRecordsResponse>;
export async function get_coin_records<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsRequest) {
  type R = ResType<T, TGetCoinRecordsResponse, WsGetCoinRecordsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_coin_records_command, data);
}


export const get_transaction_count_command = "get_transaction_count";
export type get_transaction_count_command = typeof get_transaction_count_command;
export type TGetTransactionCountRequest = {
  wallet_id: int;
  type_filter?: TransactionTypeFilter;
  confirmed?: bool;
};
export type TGetTransactionCountResponse = {
  count: int;
  wallet_id: int;
};
export type WsGetTransactionCountMessage = GetMessageType<chia_wallet_service, get_transaction_count_command, TGetTransactionCountResponse>;
export async function get_transaction_count<T extends TRPCAgent | TDaemon>(agent: T, data: TGetTransactionCountRequest){
  type R = ResType<T, TGetTransactionCountResponse, WsGetTransactionCountMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_transaction_count_command, data);
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
  last_time_farmed: uint32;
  blocks_won: uint32;
};
export type WsGetFarmedAmountMessage = GetMessageType<chia_wallet_service, get_farmed_amount_command, TGetFarmedAmountResponse>;
export async function get_farmed_amount<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetFarmedAmountResponse, WsGetFarmedAmountMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_farmed_amount_command);
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
  wallet_id?: uint32;
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
} & TxEndpoint;
export type TCreateSignedTransactionResponse = {
  signed_txs: TransactionRecordConvenience[];
  signed_tx: TransactionRecordConvenience;
};
export type WsCreateSignedTransactionMessage = GetMessageType<chia_wallet_service, create_signed_transaction_command, TCreateSignedTransactionResponse>;
export async function create_signed_transaction<T extends TRPCAgent | TDaemon>(agent: T, data: TCreateSignedTransactionRequest){
  type R = ResType<T, TCreateSignedTransactionResponse, WsCreateSignedTransactionMessage>;
  return agent.sendMessage<R>(chia_wallet_service, create_signed_transaction_command, data);
}




export const delete_unconfirmed_transactions_command = "delete_unconfirmed_transactions";
export type delete_unconfirmed_transactions_command = typeof delete_unconfirmed_transactions_command;
export type TDeleteUnconfirmedTransactionsRequest = {
  wallet_id: uint32;
};
export type TDeleteUnconfirmedTransactionsResponse = {
};
export type WsDeleteUnconfirmedTransactionsMessage = GetMessageType<chia_wallet_service, delete_unconfirmed_transactions_command, TDeleteUnconfirmedTransactionsResponse>;
export async function delete_unconfirmed_transactions<T extends TRPCAgent | TDaemon>(agent: T, data: TDeleteUnconfirmedTransactionsRequest){
  type R = ResType<T, TDeleteUnconfirmedTransactionsResponse, WsDeleteUnconfirmedTransactionsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, delete_unconfirmed_transactions_command, data);
}




export const select_coins_command = "select_coins";
export type select_coins_command = typeof select_coins_command;
export type TSelectCoinsRequest = {
  amount: uint64;
  wallet_id: uint32;
  exclude_coins?: Optional<Coin[]>;
  excluded_coins?: Optional<Coin[]>;
} & CoinSelectionConfigLoader;
export type TSelectCoinsResponse = {
  coins: Coin[];
};
export type WsSelectCoinsMessage = GetMessageType<chia_wallet_service, select_coins_command, TSelectCoinsResponse>;
export async function select_coins<T extends TRPCAgent | TDaemon>(agent: T, data: TSelectCoinsRequest){
  type R = ResType<T, TSelectCoinsResponse, WsSelectCoinsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, select_coins_command, data);
}


export const get_spendable_coins_command = "get_spendable_coins";
export type get_spendable_coins_command = typeof get_spendable_coins_command;
export type TGetSpendableCoinsRequest = {
  wallet_id: uint32;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  excluded_coin_amounts?: Optional<uint64[]>;
  excluded_coins?: Coin[];
  excluded_coin_ids?: str[];
};
export type TGetSpendableCoinsResponse = {
  confirmed_records: CoinRecord[];
  unconfirmed_removals: CoinRecord[];
  unconfirmed_additions: Coin[];
};
export type WsGetSpendableCoinsMessage = GetMessageType<chia_wallet_service, get_spendable_coins_command, TGetSpendableCoinsResponse>;
export async function get_spendable_coins<T extends TRPCAgent | TDaemon>(agent: T, data: TGetSpendableCoinsRequest) {
  type R = ResType<T, TGetSpendableCoinsResponse, WsGetSpendableCoinsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_spendable_coins_command, data);
}


export const get_coin_records_by_names_command = "get_coin_records_by_names";
export type get_coin_records_by_names_command = typeof get_coin_records_by_names_command;
export type TGetCoinRecordsByNamesRequest = {
  names: str[];
  start_height?: uint32;
  end_height?: uint32;
  include_spent_coins?: bool;
};
export type TGetCoinRecordsByNamesResponse = {
  coin_records: CoinRecord[];
};
export type WsGetCoinRecordsByNamesMessage = GetMessageType<chia_wallet_service, get_coin_records_by_names_command, TGetCoinRecordsByNamesResponse>;
export async function get_coin_records_by_names<T extends TRPCAgent | TDaemon>(agent: T, data: TGetCoinRecordsByNamesRequest) {
  type R = ResType<T, TGetCoinRecordsByNamesResponse, WsGetCoinRecordsByNamesMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_coin_records_by_names_command, data);
}


export const get_current_derivation_index_command = "get_current_derivation_index";
export type get_current_derivation_index_command = typeof get_current_derivation_index_command;
export type TGetCurrentDerivationIndexResponse = {
  success: True;
  index: Optional<uint32>;
};
export type WsGetCurrentDerivationIndexMessage = GetMessageType<chia_wallet_service, get_current_derivation_index_command, TGetCurrentDerivationIndexResponse>;
export async function get_current_derivation_index<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetCurrentDerivationIndexResponse, WsGetCurrentDerivationIndexMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_current_derivation_index_command);
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
export type WsExtendDerivationIndexMessage = GetMessageType<chia_wallet_service, extend_derivation_index_command, TExtendDerivationIndexResponse>;
export async function extend_derivation_index<T extends TRPCAgent | TDaemon>(agent: T, data: TExtendDerivationIndexRequest){
  type R = ResType<T, TExtendDerivationIndexResponse, WsExtendDerivationIndexMessage>;
  return agent.sendMessage<R>(chia_wallet_service, extend_derivation_index_command, data);
}




export const get_notifications_command = "get_notifications";
export type get_notifications_command = typeof get_notifications_command;
export type TGetNotificationsRequest = GetNotifications;
export type TGetNotificationsResponse = GetNotificationsResponse;
export type WsGetNotificationsMessage = GetMessageType<chia_wallet_service, get_notifications_command, TGetNotificationsResponse>;
export async function get_notifications<T extends TRPCAgent | TDaemon>(agent: T, data: TGetNotificationsRequest){
  type R = ResType<T, TGetNotificationsResponse, WsGetNotificationsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_notifications_command, data);
}




export const delete_notifications_command = "delete_notifications";
export type delete_notifications_command = typeof delete_notifications_command;
export type TDeleteNotificationsRequest = {
  ids?: str[];
};
export type TDeleteNotificationsResponse = {
};
export type WsDeleteNotificationsMessage = GetMessageType<chia_wallet_service, delete_notifications_command, TDeleteNotificationsResponse>;
export async function delete_notifications<T extends TRPCAgent | TDaemon>(agent: T, data: TDeleteNotificationsRequest){
  type R = ResType<T, TDeleteNotificationsResponse, WsDeleteNotificationsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, delete_notifications_command, data);
}




export const send_notification_command = "send_notification";
export type send_notification_command = typeof send_notification_command;
export type TSendNotificationRequest = {
  target: str;
  message: str;
  amount: uint64;
  fee?: uint64;
} & TxEndpoint;
export type TSendNotificationResponse = {
  tx: TransactionRecordConvenience;
};
export type WsSendNotificationMessage = GetMessageType<chia_wallet_service, send_notification_command, TSendNotificationResponse>;
export async function send_notification<T extends TRPCAgent | TDaemon>(agent: T, data: TSendNotificationRequest){
  type R = ResType<T, TSendNotificationResponse, WsSendNotificationMessage>;
  return agent.sendMessage<R>(chia_wallet_service, send_notification_command, data);
}


export const verify_signature_command = "verify_signature";
export type verify_signature_command = typeof verify_signature_command;
export type TVerifySignatureRequest = {
  message: str;
  signing_mode?: SigningMode;
  pubkey: str;
  signature: str;
  address?: str;
};
export type TVerifySignatureResponse = {
  isValid: True;
} | {
  isValid: False;
  error: str;
};
export type WsVerifySignatureMessage = GetMessageType<chia_wallet_service, verify_signature_command, TVerifySignatureResponse>;
export async function verify_signature<T extends TRPCAgent | TDaemon>(agent: T, data: TVerifySignatureRequest) {
  type R = ResType<T, TVerifySignatureResponse, WsVerifySignatureMessage>;
  return agent.sendMessage<R>(chia_wallet_service, verify_signature_command, data);
}


export const get_transaction_memo_command = "get_transaction_memo";
export type get_transaction_memo_command = typeof get_transaction_memo_command;
export type TGetTransactionMemoRequest = {
  transaction_id: str;
};
export type TGetTransactionMemoResponse = {
  [transaction_id: string]: {
    [coin_id: string]: string[];
  };
};
export type WsGetTransactionMemoMessage = GetMessageType<chia_wallet_service, get_transaction_memo_command, TGetTransactionMemoResponse>;
export async function get_transaction_memo<T extends TRPCAgent | TDaemon>(agent: T, data: TGetTransactionMemoRequest) {
  type R = ResType<T, TGetTransactionMemoResponse, WsGetTransactionMemoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_transaction_memo_command, data);
}


export const sign_message_by_address_command = "sign_message_by_address";
export type sign_message_by_address_command = typeof sign_message_by_address_command;
export type TSignMessageByAddressRequest = {
  address: str;
  message: str;
  is_hex?: bool;
  safe_mode?: bool;
};
export type TSignMessageByAddressResponse = {
  success: True;
  pubkey: str;
  signature: str;
  signing_mode: SigningMode;
};
export type WsSignMessageByAddressMessage = GetMessageType<chia_wallet_service, sign_message_by_address_command, TSignMessageByAddressResponse>;
export async function sign_message_by_address<T extends TRPCAgent | TDaemon>(agent: T, data: TSignMessageByAddressRequest){
  type R = ResType<T, TSignMessageByAddressResponse, WsSignMessageByAddressMessage>;
  return agent.sendMessage<R>(chia_wallet_service, sign_message_by_address_command, data);
}




export const sign_message_by_id_command = "sign_message_by_id";
export type sign_message_by_id_command = typeof sign_message_by_id_command;
export type TSignMessageByIdRequest = {
  id: str;
  message: str;
  is_hex?: bool;
  safe_mode?: bool;
};
export type TSignMessageByIdResponse = {
  success: False;
  error: str;
} | {
  success: True;
  pubkey: str;
  signature: str;
  latest_coin_id: str|None;
  signing_mode: SigningMode;
};
export type WsSignMessageByIdMessage = GetMessageType<chia_wallet_service, sign_message_by_id_command, TSignMessageByIdResponse>;
export async function sign_message_by_id<T extends TRPCAgent | TDaemon>(agent: T, data: TSignMessageByIdRequest){
  type R = ResType<T, TSignMessageByIdResponse, WsSignMessageByIdMessage>;
  return agent.sendMessage<R>(chia_wallet_service, sign_message_by_id_command, data);
}




// # CATs and Trading
export const get_cat_list_command = "get_cat_list";
export type get_cat_list_command = typeof get_cat_list_command;
export type TGetCatListResponse = {
  cat_list: CAT[];
};
export type WsGetCatListMessage = GetMessageType<chia_wallet_service, get_cat_list_command, TGetCatListResponse>;
export async function get_cat_list<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetCatListResponse, WsGetCatListMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_cat_list_command);
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
export type WsCatSetNameMessage = GetMessageType<chia_wallet_service, cat_set_name_command, TCatSetNameResponse>;
export async function cat_set_name<T extends TRPCAgent | TDaemon>(agent: T, data: TCatSetNameRequest){
  type R = ResType<T, TCatSetNameResponse, WsCatSetNameMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cat_set_name_command, data);
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
export type WsCatAssetIdToNameMessage = GetMessageType<chia_wallet_service, cat_asset_id_to_name_command, TCatAssetIdToNameResponse>;
export async function cat_asset_id_to_name<T extends TRPCAgent | TDaemon>(agent: T, data: TCatAssetIdToNameRequest){
  type R = ResType<T, TCatAssetIdToNameResponse, WsCatAssetIdToNameMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cat_asset_id_to_name_command, data);
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
export type WsCatGetNameMessage = GetMessageType<chia_wallet_service, cat_get_name_command, TCatGetNameResponse>;
export async function cat_get_name<T extends TRPCAgent | TDaemon>(agent: T, data: TCatGetNameRequest){
  type R = ResType<T, TCatGetNameResponse, WsCatGetNameMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cat_get_name_command, data);
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
export type WsGetStrayCatsMessage = GetMessageType<chia_wallet_service, get_stray_cats_command, TGetStrayCatsResponse>;
export async function get_stray_cats<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetStrayCatsResponse, WsGetStrayCatsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_stray_cats_command);
}




export const cat_spend_command = "cat_spend";
export type cat_spend_command = typeof cat_spend_command;
export type TCatSpendRequest = {
  wallet_id: uint32;
  additions?: TAdditions[];
  fee: uint64;
  amount: uint64;
  inner_address: str;
  memos?: str[];
  coins?: Coin[];
  extra_delta?: int;
  tail_reveal?: str;
  tail_solution?: str;
} & TxEndpoint;
export type TCatSpendResponse = {
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
};
export type WsCatSpendMessage = GetMessageType<chia_wallet_service, cat_spend_command, TCatSpendResponse>;
export async function cat_spend<T extends TRPCAgent | TDaemon>(agent: T, data: TCatSpendRequest){
  type R = ResType<T, TCatSpendResponse, WsCatSpendMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cat_spend_command, data);
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
export type WsCatGetAssetIdMessage = GetMessageType<chia_wallet_service, cat_get_asset_id_command, TCatGetAssetIdResponse>;
export async function cat_get_asset_id<T extends TRPCAgent | TDaemon>(agent: T, data: TCatGetAssetIdRequest){
  type R = ResType<T, TCatGetAssetIdResponse, WsCatGetAssetIdMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cat_get_asset_id_command, data);
}




export const create_offer_for_ids_command = "create_offer_for_ids";
export type create_offer_for_ids_command = typeof create_offer_for_ids_command;
export type TCreateOfferForIdsRequest = {
  offer: Record<int, int>;
  fee?: uint64;
  validate_only?: bool;
  driver_dict?: TDriverDict;
  solver?: Record<str, any>;
} & TxEndpoint;
export type TCreateOfferForIdsResponse = {
  offer: str;
  trade_record: TradeRecordConvenience;
};
export type WsCreateOfferForIdsMessage = GetMessageType<chia_wallet_service, create_offer_for_ids_command, TCreateOfferForIdsResponse>;
export async function create_offer_for_ids<T extends TRPCAgent | TDaemon>(agent: T, data: TCreateOfferForIdsRequest){
  type R = ResType<T, TCreateOfferForIdsResponse, WsCreateOfferForIdsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, create_offer_for_ids_command, data);
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
    additions: str[];
    removals: str[];
    valid_times: Omit<
      ConditionValidTimes,
      "max_secs_after_created" | "min_secs_since_created" | "max_blocks_after_created" | "min_blocks_since_created"
    >;
  };
  id: bytes32;
};
export type WsGetOfferSummaryMessage = GetMessageType<chia_wallet_service, get_offer_summary_command, TGetOfferSummaryResponse>;
export async function get_offer_summary<T extends TRPCAgent | TDaemon>(agent: T, data: TGetOfferSummaryRequest){
  type R = ResType<T, TGetOfferSummaryResponse, WsGetOfferSummaryMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_offer_summary_command, data);
}




export const check_offer_validity_command = "check_offer_validity";
export type check_offer_validity_command = typeof check_offer_validity_command;
export type TCheckOfferValidityRequest = {
  offer: str;
};
export type TCheckOfferValidityResponse = {
  valid: bool;
  id: bytes32;
};
export type WsCheckOfferValidityMessage = GetMessageType<chia_wallet_service, check_offer_validity_command, TCheckOfferValidityResponse>;
export async function check_offer_validity<T extends TRPCAgent | TDaemon>(agent: T, data: TCheckOfferValidityRequest){
  type R = ResType<T, TCheckOfferValidityResponse, WsCheckOfferValidityMessage>;
  return agent.sendMessage<R>(chia_wallet_service, check_offer_validity_command, data);
}




export const take_offer_command = "take_offer";
export type take_offer_command = typeof take_offer_command;
export type TTakeOfferRequest = {
  offer: str;
  fee?: uint64;
  solver?: Record<str, any>;
} & TxEndpoint;
export type TTakeOfferResponse = {
  trade_record: TradeRecordConvenience;
};
export type WsTakeOfferMessage = GetMessageType<chia_wallet_service, take_offer_command, TTakeOfferResponse>;
export async function take_offer<T extends TRPCAgent | TDaemon>(agent: T, data: TTakeOfferRequest){
  type R = ResType<T, TTakeOfferResponse, WsTakeOfferMessage>;
  return agent.sendMessage<R>(chia_wallet_service, take_offer_command, data);
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
export type WsGetOfferMessage = GetMessageType<chia_wallet_service, get_offer_command, TGetOfferResponse>;
export async function get_offer<T extends TRPCAgent | TDaemon>(agent: T, data: TGetOfferRequest){
  type R = ResType<T, TGetOfferResponse, WsGetOfferMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_offer_command, data);
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
export type WsGetAllOffersMessage = GetMessageType<chia_wallet_service, get_all_offers_command, TGetAllOffersResponse>;
export async function get_all_offers<T extends TRPCAgent | TDaemon>(agent: T, data: TGetAllOffersRequest){
  type R = ResType<T, TGetAllOffersResponse, WsGetAllOffersMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_all_offers_command, data);
}




export const get_offers_count_command = "get_offers_count";
export type get_offers_count_command = typeof get_offers_count_command;
export type TGetOffersCountResponse = {
  total: int;
  my_offers_count: int;
  taken_offers_count: int;
};
export type WsGetOffersCountMessage = GetMessageType<chia_wallet_service, get_offers_count_command, TGetOffersCountResponse>;
export async function get_offers_count<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TGetOffersCountResponse, WsGetOffersCountMessage>;
  return agent.sendMessage<R>(chia_wallet_service, get_offers_count_command);
}




export const cancel_offer_command = "cancel_offer";
export type cancel_offer_command = typeof cancel_offer_command;
export type TCancelOfferRequest = {
  secure: bool;
  trade_id: str;
  fee?: uint64;
} & TxEndpoint;
export type TCancelOfferResponse = {};
export type WsCancelOfferMessage = GetMessageType<chia_wallet_service, cancel_offer_command, TCancelOfferResponse>;
export async function cancel_offer<T extends TRPCAgent | TDaemon>(agent: T, data: TCancelOfferRequest){
  type R = ResType<T, TCancelOfferResponse, WsCancelOfferMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cancel_offer_command, data);
}




export const cancel_offers_command = "cancel_offers";
export type cancel_offers_command = typeof cancel_offers_command;
export type TCancelOffersRequest = {
  secure: bool;
  batch_fee?: uint64;
  batch_size?: int;
  cancel_all?: bool;
  asset_id?: str;
} & TxEndpoint;
export type TCancelOffersResponse = {
  success: True;
};
export type WsCancelOffersMessage = GetMessageType<chia_wallet_service , cancel_offers_command, TCancelOffersResponse>;
export async function cancel_offers<T extends TRPCAgent | TDaemon>(agent: T, data: TCancelOffersRequest){
  type R = ResType<T, TCancelOffersResponse, WsCancelOffersMessage>;
  return agent.sendMessage<R>(chia_wallet_service, cancel_offers_command, data);
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
export type WsDidSetWalletNameMessage = GetMessageType<chia_wallet_service, did_set_wallet_name_command, TDidSetWalletNameResponse>;
export async function did_set_wallet_name<T extends TRPCAgent | TDaemon>(agent: T, data: TDidSetWalletNameRequest){
  type R = ResType<T, TDidSetWalletNameResponse, WsDidSetWalletNameMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_set_wallet_name_command, data);
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
export type WsDidGetWalletNameMessage = GetMessageType<chia_wallet_service, did_get_wallet_name_command, TDidGetWalletNameResponse>;
export async function did_get_wallet_name<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetWalletNameRequest){
  type R = ResType<T, TDidGetWalletNameResponse, WsDidGetWalletNameMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_wallet_name_command, data);
}




export const did_update_recovery_ids_command = "did_update_recovery_ids";
export type did_update_recovery_ids_command = typeof did_update_recovery_ids_command;
export type TDidUpdateRecoveryIdsRequest = {
  wallet_id: uint32;
  new_list: str[];
  num_verifications_required?: uint64;
} & TxEndpoint;
export type TDidUpdateRecoveryIdsResponse = {
  success: bool;
};
export type WsDidUpdateRecoveryIdsMessage = GetMessageType<chia_wallet_service, did_update_recovery_ids_command, TDidUpdateRecoveryIdsResponse>;
export async function did_update_recovery_ids<T extends TRPCAgent | TDaemon>(agent: T, data: TDidUpdateRecoveryIdsRequest){
  type R = ResType<T, TDidUpdateRecoveryIdsResponse, WsDidUpdateRecoveryIdsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_update_recovery_ids_command, data);
}




export const did_update_metadata_command = "did_update_metadata";
export type did_update_metadata_command = typeof did_update_metadata_command;
export type TDidUpdateMetadataRequest = {
  wallet_id: uint32;
  metadata?: Record<str, str>;
  fee?: uint64;
} & TxEndpoint;
export type TDidUpdateMetadataResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export type WsDidUpdateMetadataMessage = GetMessageType<chia_wallet_service, did_update_metadata_command, TDidUpdateMetadataResponse>;
export async function did_update_metadata<T extends TRPCAgent | TDaemon>(agent: T, data: TDidUpdateMetadataRequest){
  type R = ResType<T, TDidUpdateMetadataResponse, WsDidUpdateMetadataMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_update_metadata_command, data);
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
export type WsDidSpendMessage = GetMessageType<chia_wallet_service, did_spend_command, TDidSpendResponse>;
export async function did_spend<T extends TRPCAgent | TDaemon>(agent: T, data: TDidSpendRequest){
  console.warn("did_spend was deprecated at chia-blockchain@1.2.8.");
  type R = ResType<T, TDidSpendResponse, WsDidSpendMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_spend_command, data);
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
export type WsDidGetPubkeyMessage = GetMessageType<chia_wallet_service, did_get_pubkey_command, TDidGetPubkeyResponse>;
export async function did_get_pubkey<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TDidGetPubkeyResponse, WsDidGetPubkeyMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_pubkey_command);
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
export type WsDidGetDidMessage = GetMessageType<chia_wallet_service, did_get_did_command, TDidGetDidResponse>;
export async function did_get_did<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetDidRequest){
  type R = ResType<T, TDidGetDidResponse, WsDidGetDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_did_command, data);
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
export type WsDidRecoverySpendMessage = GetMessageType<chia_wallet_service, did_recovery_spend_command, TDidRecoverySpendResponse>;
export async function did_recovery_spend<T extends TRPCAgent | TDaemon>(agent: T, data: TDidRecoverySpendRequest){
  type R = ResType<T, TDidRecoverySpendResponse, WsDidRecoverySpendMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_recovery_spend_command, data);
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
export type WsDidGetRecoveryListMessage = GetMessageType<chia_wallet_service, did_get_recovery_list_command, TDidGetRecoveryListResponse>;
export async function did_get_recovery_list<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetRecoveryListRequest){
  type R = ResType<T, TDidGetRecoveryListResponse, WsDidGetRecoveryListMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_recovery_list_command, data);
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
export type WsDidGetMetadataMessage = GetMessageType<chia_wallet_service, did_get_metadata_command, TDidGetMetadataResponse>;
export async function did_get_metadata<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetMetadataRequest){
  type R = ResType<T, TDidGetMetadataResponse, WsDidGetMetadataMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_metadata_command, data);
}




export const did_create_attest_command = "did_create_attest";
export type did_create_attest_command = typeof did_create_attest_command;
export type TDidCreateAttestRequest = {
  wallet_id: uint32;
  coin_name: str;
  puzhash: str;
} & TxEndpoint;
export type TDidCreateAttestResponse = {
  success: True;
  message_spend_bundle: str;
  info: [str, str, uint64];
  attest_data: str;
} | {
  success: False;
};
export type WsDidCreateAttestMessage = GetMessageType<chia_wallet_service, did_create_attest_command, TDidCreateAttestResponse>;
export async function did_create_attest<T extends TRPCAgent | TDaemon>(agent: T, data: TDidCreateAttestRequest){
  type R = ResType<T, TDidCreateAttestResponse, WsDidCreateAttestMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_create_attest_command, data);
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
export type WsDidGetInformationNeededForRecoveryMessage = GetMessageType<chia_wallet_service, did_get_information_needed_for_recovery_command, TDidGetInformationNeededForRecoveryResponse>;
export async function did_get_information_needed_for_recovery<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetInformationNeededForRecoveryRequest){
  type R = ResType<T, TDidGetInformationNeededForRecoveryResponse, WsDidGetInformationNeededForRecoveryMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_information_needed_for_recovery_command, data);
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
export type WsDidGetCurrentCoinInfoMessage = GetMessageType<chia_wallet_service, did_get_current_coin_info_command, TDidGetCurrentCoinInfoResponse>;
export async function did_get_current_coin_info<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetCurrentCoinInfoRequest){
  type R = ResType<T, TDidGetCurrentCoinInfoResponse, WsDidGetCurrentCoinInfoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_current_coin_info_command, data);
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
export type WsDidCreateBackupFileMessage = GetMessageType<chia_wallet_service, did_create_backup_file_command, TDidCreateBackupFileResponse>;
export async function did_create_backup_file<T extends TRPCAgent | TDaemon>(agent: T, data: TDidCreateBackupFileRequest){
  type R = ResType<T, TDidCreateBackupFileResponse, WsDidCreateBackupFileMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_create_backup_file_command, data);
}


export const did_message_spend_command = "did_message_spend";
export type did_message_spend_command = typeof did_message_spend_command;
export type TDidMessageSpendRequest = {
  wallet_id: uint32;
  coin_announcements: str[];
  puzzle_announcements: str[];
} & TxEndpoint;
export type TDidMessageSpendResponse = {
  success: True;
  spend_bundle: SpendBundle;
};
export type WsDidMessageSpendMessage = GetMessageType<chia_wallet_service, did_message_spend_command, TDidMessageSpendResponse>;
export async function did_message_spend<T extends TRPCAgent | TDaemon>(agent: T, data: TDidMessageSpendRequest) {
  type R = ResType<T, TDidMessageSpendResponse, WsDidMessageSpendMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_message_spend_command, data);
}


export const did_get_info_command = "did_get_info";
export type did_get_info_command = typeof did_get_info_command;
export type TDidGetInfoRequest = {
  coin_id: str;
  latest?: bool;
};
export type TDidGetInfoResponse = {
  success: False;
  error: str;
} | {
  success: True;
  did_id: str;
  latest_coin: str;
  p2_address: str;
  public_key: str;
  recovery_list_hash: str;
  num_verification: int;
  metadata: Record<str, str>;
  launcher_id: str;
  full_puzzle: str; // hex bytes of serialized CLVM program
  solution: any;
  hints: str[];
};
export type WsDidGetInfoMessage = GetMessageType<chia_wallet_service, did_get_info_command, TDidGetInfoResponse>;
export async function did_get_info<T extends TRPCAgent | TDaemon>(agent: T, data: TDidGetInfoRequest) {
  type R = ResType<T, TDidGetInfoResponse, WsDidGetInfoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_get_info_command, data);
}


export const did_find_lost_did_command = "did_find_lost_did";
export type did_find_lost_did_command = typeof did_find_lost_did_command;
export type TDidFindLostDidRequest = {
  coin_id: str;
  recovery_list_hash?: str;
  num_verification?: int;
  metadata?: Record<str, any>;
};
export type TDidFindLostDidResponse = {
  success: False;
  error: str;
} | {
  success: True;
  latest_coin_id: str;
};
export type WsDidFindLostDidMessage = GetMessageType<chia_wallet_service, did_find_lost_did_command, TDidFindLostDidResponse>;
export async function did_find_lost_did<T extends TRPCAgent | TDaemon>(agent: T, data: TDidFindLostDidRequest) {
  type R = ResType<T, TDidFindLostDidResponse, WsDidFindLostDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_find_lost_did_command, data);
}


export const did_transfer_did_command = "did_transfer_did";
export type did_transfer_did_command = typeof did_transfer_did_command;
export type TDidTransferDidRequest = {
  wallet_id: uint32;
  inner_address: str;
  fee?: uint64;
  with_recovery_info?: bool;
} & TxEndpoint;
export type TDidTransferDidResponse = {
  success: True;
  transaction: TransactionRecordConvenience;
  transaction_id: bytes32;
};
export type WsDidTransferDidMessage = GetMessageType<chia_wallet_service, did_transfer_did_command, TDidTransferDidResponse>;
export async function did_transfer_did<T extends TRPCAgent | TDaemon>(agent: T, data: TDidTransferDidRequest){
  type R = ResType<T, TDidTransferDidResponse, WsDidTransferDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, did_transfer_did_command, data);
}



// # DAO Wallet
export const dao_adjust_filter_level_command = "dao_adjust_filter_level";
export type dao_adjust_filter_level_command = typeof dao_adjust_filter_level_command;
export type TDaoAdjustFilterLevelRequest = {
  wallet_id: uint32;
  filter_level: uint64;
};
export type TDaoAdjustFilterLevelResponse = {
  success: True;
  dao_info: DAOInfo;
};
export type WsDaoAdjustFilterLevelMessage = GetMessageType<chia_wallet_service, dao_adjust_filter_level_command, TDaoAdjustFilterLevelResponse>;
export async function dao_adjust_filter_level<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoAdjustFilterLevelRequest) {
  type R = ResType<T, TDaoAdjustFilterLevelResponse, WsDaoAdjustFilterLevelMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_adjust_filter_level_command, data);
}


export const dao_add_funds_to_treasury_command = "dao_add_funds_to_treasury";
export type dao_add_funds_to_treasury_command = typeof dao_add_funds_to_treasury_command;
export type TDaoAddFundsToTreasuryRequest = {
  wallet_id: uint32;
  funding_wallet_id: uint32;
  amount: uint64;
  fee?: uint64;
} & TxEndpoint;
export type TDaoAddFundsToTreasuryResponse = {
  success: True;
  tx_id: bytes32;
  tx: TransactionRecord;
};
export type WsDaoAddFundsToTreasuryMessage = GetMessageType<chia_wallet_service, dao_add_funds_to_treasury_command, TDaoAddFundsToTreasuryResponse>;
export async function dao_add_funds_to_treasury<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoAddFundsToTreasuryRequest) {
  type R = ResType<T, TDaoAddFundsToTreasuryResponse, WsDaoAddFundsToTreasuryMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_add_funds_to_treasury_command, data);
}


export const dao_get_treasury_balance_command = "dao_get_treasury_balance";
export type dao_get_treasury_balance_command = typeof dao_get_treasury_balance_command;
export type TDaoGetTreasuryBalanceRequest = {
  wallet_id: uint32;
};
export type TDaoGetTreasuryBalanceResponse = {
  success: True;
  balance: Record<str, uint128>;
};
export type WsDaoGetTreasuryBalanceMessage = GetMessageType<chia_wallet_service, dao_get_treasury_balance_command, TDaoGetTreasuryBalanceResponse>;
export async function dao_get_treasury_balance<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoGetTreasuryBalanceRequest) {
  type R = ResType<T, TDaoGetTreasuryBalanceResponse, WsDaoGetTreasuryBalanceMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_get_treasury_balance_command, data);
}


export const dao_get_treasury_id_command = "dao_get_treasury_id";
export type dao_get_treasury_id_command = typeof dao_get_treasury_id_command;
export type TDaoGetTreasuryIdRequest = {
  wallet_id: uint32;
};
export type TDaoGetTreasuryIdResponse = {
  success: True;
  treasury_id: bytes32;
};
export type WsDaoGetTreasuryIdMessage = GetMessageType<chia_wallet_service, dao_get_treasury_id_command, TDaoGetTreasuryIdResponse>;
export async function dao_get_treasury_id<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoGetTreasuryIdRequest) {
  type R = ResType<T, TDaoGetTreasuryIdResponse, WsDaoGetTreasuryIdMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_get_treasury_id_command, data);
}


export const dao_get_rules_command = "dao_get_rules";
export type dao_get_rules_command = typeof dao_get_rules_command;
export type TDaoGetRulesRequest = {
  wallet_id: uint32;
};
export type TDaoGetRulesResponse = {
  success: True;
  rules: DAORules;
};
export type WsDaoGetRulesMessage = GetMessageType<chia_wallet_service, dao_get_rules_command, TDaoGetRulesResponse>;
export async function dao_get_rules<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoGetRulesRequest) {
  type R = ResType<T, TDaoGetRulesResponse, WsDaoGetRulesMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_get_rules_command, data);
}


export const dao_send_to_lockup_command = "dao_send_to_lockup";
export type dao_send_to_lockup_command = typeof dao_send_to_lockup_command;
export type TDaoSendToLockupRequest = {
  wallet_id: uint32;
  amount: uint64;
  fee?: uint64;
} & TxEndpoint;
export type TDaoSendToLockupResponse = {
  success: True;
  tx_id: bytes32;
  txs: TransactionRecord[];
};
export type WsDaoSendToLockupMessage = GetMessageType<chia_wallet_service, dao_send_to_lockup_command, TDaoSendToLockupResponse>;
export async function dao_send_to_lockup<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoSendToLockupRequest) {
  type R = ResType<T, TDaoSendToLockupResponse, WsDaoSendToLockupMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_send_to_lockup_command, data);
}


export const dao_get_proposals_command = "dao_get_proposals";
export type dao_get_proposals_command = typeof dao_get_proposals_command;
export type TDaoGetProposalsRequest = {
  wallet_id: uint32;
  include_closed?: bool;
};
export type TDaoGetProposalsResponse = {
  success: True;
  proposals: ProposalInfo[];
  proposal_timelock: uint64;
  soft_close_length: uint64;
};
export type WsDaoGetProposalsMessage = GetMessageType<chia_wallet_service, dao_get_proposals_command, TDaoGetProposalsResponse>;
export async function dao_get_proposals<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoGetProposalsRequest) {
  type R = ResType<T, TDaoGetProposalsResponse, WsDaoGetProposalsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_get_proposals_command, data);
}


export const dao_get_proposal_state_command = "dao_get_proposal_state";
export type dao_get_proposal_state_command = typeof dao_get_proposal_state_command;
export type TDaoGetProposalStateRequest = {
  wallet_id: uint32;
  proposal_id: str;
};
export type TDaoGetProposalStateResponse = {
  success: True;
  state: ProposalState;
};
export type WsDaoGetProposalStateMessage = GetMessageType<chia_wallet_service, dao_get_proposal_state_command, TDaoGetProposalStateResponse>;
export async function dao_get_proposal_state<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoGetProposalStateRequest) {
  type R = ResType<T, TDaoGetProposalStateResponse, WsDaoGetProposalStateMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_get_proposal_state_command, data);
}


export const dao_exit_lockup_command = "dao_exit_lockup";
export type dao_exit_lockup_command = typeof dao_exit_lockup_command;
export type TDaoExitLockupRequest = {
  wallet_id: uint32;
  coins: Coin[] | undefined;
  fee?: uint64;
} & TxEndpoint;
export type TDaoExitLockupResponse = {
  success: True;
  tx_id: bytes32;
  tx: TransactionRecord;
};
export type WsDaoExitLockupMessage = GetMessageType<chia_wallet_service, dao_exit_lockup_command, TDaoExitLockupResponse>;
export async function dao_exit_lockup<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoExitLockupRequest) {
  type R = ResType<T, TDaoExitLockupResponse, WsDaoExitLockupMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_exit_lockup_command, data);
}


export const dao_create_proposal_command = "dao_create_proposal";
export type dao_create_proposal_command = typeof dao_create_proposal_command;
export type TDaoCreateProposalRequest = ({
  wallet_id: uint32;
  proposal_type: "spend";
  additions: Array<{
    asset_id?: str;
    puzzle_hash: str;
    amount: uint64;
  }>;
  vote_amount?: uint64;
  fee?: uint64;
} | {
  wallet_id: uint32;
  proposal_type: "spend";
  amount: uint64;
  inner_address: str;
  asset_id: str;
  vote_amount?: uint64;
  fee?: uint64;
} | {
  wallet_id: uint32;
  proposal_type: "update";
  new_dao_rules: Partial<DAORules>;
  vote_amount?: uint64;
  fee?: uint64;
} | {
  wallet_id: uint32;
  proposal_type: "mint";
  amount: uint64;
  cat_target_address: str;
  vote_amount?: uint64;
  fee?: uint64;
}) & TxEndpoint;
export type TDaoCreateProposalResponse = {
  success: False;
  error: str;
} | {
  success: True;
  proposal_id: bytes32;
  tx_id: str;
  tx: TransactionRecord;
};
export type WsDaoCreateProposalMessage = GetMessageType<chia_wallet_service, dao_create_proposal_command, TDaoCreateProposalResponse>;
export async function dao_create_proposal<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoCreateProposalRequest) {
  type R = ResType<T, TDaoCreateProposalResponse, WsDaoCreateProposalMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_create_proposal_command, data);
}


export const dao_vote_on_proposal_command = "dao_vote_on_proposal";
export type dao_vote_on_proposal_command = typeof dao_vote_on_proposal_command;
export type TDaoVoteOnProposalRequest = {
  wallet_id: uint32;
  vote_amount?: uint64;
  fee?: uint64;
  proposal_id: str;
  is_yes_vote: bool;
} & TxEndpoint;
export type TDaoVoteOnProposalResponse = {
  success: True;
  tx_id: bytes32;
  tx: TransactionRecord;
};
export type WsDaoVoteOnProposalMessage = GetMessageType<chia_wallet_service, dao_vote_on_proposal_command, TDaoVoteOnProposalResponse>;
export async function dao_vote_on_proposal<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoVoteOnProposalRequest) {
  type R = ResType<T, TDaoVoteOnProposalResponse, WsDaoVoteOnProposalMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_vote_on_proposal_command, data);
}


export const dao_parse_proposal_command = "dao_parse_proposal";
export type dao_parse_proposal_command = typeof dao_parse_proposal_command;
export type TDaoParseProposalRequest = {
  wallet_id: uint32;
  proposal_id: str;
};
export type TDaoParseProposalResponse = {
  success: True;
  proposal_dictionary: ParsedProposalSpend | ParsedProposalUpdate;
};
export type WsDaoParseProposalMessage = GetMessageType<chia_wallet_service, dao_parse_proposal_command, TDaoParseProposalResponse>;
export async function dao_parse_proposal<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoParseProposalRequest) {
  type R = ResType<T, TDaoParseProposalResponse, WsDaoParseProposalMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_parse_proposal_command, data);
}


export const dao_close_proposal_command = "dao_close_proposal";
export type dao_close_proposal_command = typeof dao_close_proposal_command;
export type TDaoCloseProposalRequest = {
  wallet_id: uint32;
  fee?: uint64;
  genesis_id?: str;
  self_destruct?: bool;
  proposal_id: str;
} & TxEndpoint;
export type TDaoCloseProposalResponse = {
  success: True;
  tx_id: bytes32;
  tx: TransactionRecord;
};
export type WsDaoCloseProposalMessage = GetMessageType<chia_wallet_service, dao_close_proposal_command, TDaoCloseProposalResponse>;
export async function dao_close_proposal<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoCloseProposalRequest) {
  type R = ResType<T, TDaoCloseProposalResponse, WsDaoCloseProposalMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_close_proposal_command, data);
}


export const dao_free_coins_from_finished_proposals_command = "dao_free_coins_from_finished_proposals";
export type dao_free_coins_from_finished_proposals_command = typeof dao_free_coins_from_finished_proposals_command;
export type TDaoFreeCoinsFromFinishedProposalsRequest = {
  wallet_id: uint32;
  fee?: uint64;
} & TxEndpoint;
export type TDaoFreeCoinsFromFinishedProposalsResponse = {
  success: True;
  tx_id: bytes32;
  tx: TransactionRecord;
};
export type WsDaoFreeCoinsFromFinishedProposalsMessage = GetMessageType<chia_wallet_service, dao_free_coins_from_finished_proposals_command, TDaoFreeCoinsFromFinishedProposalsResponse>;
export async function dao_free_coins_from_finished_proposals<T extends TRPCAgent | TDaemon>(agent: T, data: TDaoFreeCoinsFromFinishedProposalsRequest) {
  type R = ResType<T, TDaoFreeCoinsFromFinishedProposalsResponse, WsDaoFreeCoinsFromFinishedProposalsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dao_free_coins_from_finished_proposals_command, data);
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
} & TxEndpoint;
export type TNftMintNftResponse = {
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
  nft_id: Optional<str>;
};
export type WsNftMintNftMessage = GetMessageType<chia_wallet_service, nft_mint_nft_command, TNftMintNftResponse>;
export async function nft_mint_nft<T extends TRPCAgent | TDaemon>(agent: T, data: TNftMintNftRequest){
  type R = ResType<T, TNftMintNftResponse, WsNftMintNftMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_mint_nft_command, data);
}



export const nft_count_nfts_command = "nft_count_nfts";
export type nft_count_nfts_command = typeof nft_count_nfts_command;
export type TNftCountNftsRequest = {
  wallet_id: uint32;
};
export type TNftCountNftsResponse = {
  success: False;
  error: str;
} | {
  wallet_id: uint32;
  success: True;
  count: int;
};
export type WsNftCountNftsMessage = GetMessageType<chia_wallet_service, nft_count_nfts_command, TNftCountNftsResponse>;
export async function nft_count_nfts<T extends TRPCAgent | TDaemon>(agent: T, data: TNftCountNftsRequest) {
  type R = ResType<T, TNftCountNftsResponse, WsNftCountNftsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_count_nfts_command, data);
}


export const nft_get_nfts_command = "nft_get_nfts";
export type nft_get_nfts_command = typeof nft_get_nfts_command;
export type TNftGetNftsRequest = {
  wallet_id?: uint32;
  start_index?: int;
  num?: int;
  ignore_size_limit?: bool;
};
export type TNftGetNftsResponse = {
  wallet_id: uint32;
  success: True;
  nft_list: NFTInfo[];
};
export type WsNftGetNftsMessage = GetMessageType<chia_wallet_service, nft_get_nfts_command, TNftGetNftsResponse>;
export async function nft_get_nfts<T extends TRPCAgent | TDaemon>(agent: T, data: TNftGetNftsRequest){
  type R = ResType<T, TNftGetNftsResponse, WsNftGetNftsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_get_nfts_command, data);
}




export const nft_set_nft_did_command = "nft_set_nft_did";
export type nft_set_nft_did_command = typeof nft_set_nft_did_command;
export type TNftSetNftDidRequest = {
  wallet_id: uint32;
  did_id?: str;
  nft_coin_id: str;
  fee?: uint64;
} & TxEndpoint;
export type TNftSetNftDidResponse = {
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export type WsNftSetNftDidMessage = GetMessageType<chia_wallet_service, nft_set_nft_did_command, TNftSetNftDidResponse>;
export async function nft_set_nft_did<T extends TRPCAgent | TDaemon>(agent: T, data: TNftSetNftDidRequest){
  type R = ResType<T, TNftSetNftDidResponse, WsNftSetNftDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_set_nft_did_command, data);
}


export const nft_set_did_bulk_command = "nft_set_did_bulk";
export type nft_set_did_bulk_command = typeof nft_set_did_bulk_command;
export type TNftSetDidBulkRequest = {
  nft_coin_list: Array<{nft_coin_id: str; wallet_id: uint32;}>;
  did_id?: str;
  fee?: uint64;
} & TxEndpoint;
export type TNftSetDidBulkResponse = {
  success: False;
  error: str;
} | {
  success: True;
  wallet_id: uint32[];
  spend_bundle: SpendBundle;
  tx_num: int;
};
export type WsNftSetDidBulkMessage = GetMessageType<chia_wallet_service, nft_set_did_bulk_command, TNftSetDidBulkResponse>;
export async function nft_set_did_bulk<T extends TRPCAgent | TDaemon>(agent: T, data: TNftSetDidBulkRequest) {
  type R = ResType<T, TNftSetDidBulkResponse, WsNftSetDidBulkMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_set_did_bulk_command, data);
}


export const nft_transfer_bulk_command = "nft_transfer_bulk";
export type nft_transfer_bulk_command = typeof nft_transfer_bulk_command;
export type TNftTransferBulkRequest = {
  nft_coin_list: Array<{ nft_coin_id: str; wallet_id: uint32; }>;
  target_address: str;
  fee?: uint64;
} & TxEndpoint;
export type TNftTransferBulkResponse = {
  success: False;
  error: str;
} | {
  success: True;
  wallet_id: uint32[];
  spend_bundle: SpendBundle;
  tx_num: int;
};
export type WsNftTransferBulkMessage = GetMessageType<chia_wallet_service, nft_transfer_bulk_command, TNftTransferBulkResponse>;

export async function nft_transfer_bulk<T extends TRPCAgent | TDaemon>(agent: T, data: TNftTransferBulkRequest) {
  type R = ResType<T, TNftTransferBulkResponse, WsNftTransferBulkMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_transfer_bulk_command, data);
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
export type WsNftGetByDidMessage = GetMessageType<chia_wallet_service, nft_get_by_did_command, TNftGetByDidResponse>;
export async function nft_get_by_did<T extends TRPCAgent | TDaemon>(agent: T, data: TNftGetByDidRequest){
  type R = ResType<T, TNftGetByDidResponse, WsNftGetByDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_get_by_did_command, data);
}




export const nft_get_wallet_did_command = "nft_get_wallet_did";
export type nft_get_wallet_did_command = typeof nft_get_wallet_did_command;
export type TNftGetWalletDidRequest = {
  wallet_id: uint32;
};
export type TNftGetWalletDidResponse = {
  did_id: Optional<str>;
  success: True;
};
export type WsNftGetWalletDidMessage = GetMessageType<chia_wallet_service, nft_get_wallet_did_command, TNftGetWalletDidResponse>;
export async function nft_get_wallet_did<T extends TRPCAgent | TDaemon>(agent: T, data: TNftGetWalletDidRequest){
  type R = ResType<T, TNftGetWalletDidResponse, WsNftGetWalletDidMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_get_wallet_did_command, data);
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
export type WsNftGetWalletsWithDidsMessage = GetMessageType<chia_wallet_service, nft_get_wallets_with_dids_command, TNftGetWalletsWithDidsResponse>;
export async function nft_get_wallets_with_dids<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TNftGetWalletsWithDidsResponse, WsNftGetWalletsWithDidsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_get_wallets_with_dids_command);
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
};
export type WsNftSetNftStatusMessage = GetMessageType<chia_wallet_service, nft_set_nft_status_command, TNftSetNftStatusResponse>;
export async function nft_set_nft_status<T extends TRPCAgent | TDaemon>(agent: T, data: TNftSetNftStatusRequest){
  type R = ResType<T, TNftSetNftStatusResponse, WsNftSetNftStatusMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_set_nft_status_command, data);
}




export const nft_transfer_nft_command = "nft_transfer_nft";
export type nft_transfer_nft_command = typeof nft_transfer_nft_command;
export type TNftTransferNftRequest = {
  wallet_id: uint32;
  target_address: str;
  nft_coin_id: str;
  fee?: uint64;
} & TxEndpoint;
export type TNftTransferNftResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
};
export type WsNftTransferNftMessage = GetMessageType<chia_wallet_service, nft_transfer_nft_command, TNftTransferNftResponse>;
export async function nft_transfer_nft<T extends TRPCAgent | TDaemon>(agent: T, data: TNftTransferNftRequest){
  type R = ResType<T, TNftTransferNftResponse, WsNftTransferNftMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_transfer_nft_command, data);
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
export type WsNftGetInfoMessage = GetMessageType<chia_wallet_service, nft_get_info_command, TNftGetInfoResponse>;
export async function nft_get_info<T extends TRPCAgent | TDaemon>(agent: T, data: TNftGetInfoRequest){
  type R = ResType<T, TNftGetInfoResponse, WsNftGetInfoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_get_info_command, data);
}




export const nft_add_uri_command = "nft_add_uri";
export type nft_add_uri_command = typeof nft_add_uri_command;
export type TNftAddUriRequest = {
  wallet_id: uint32;
  uri: str;
  key: str;
  nft_coin_id: str;
  fee?: uint64;
} & TxEndpoint;
export type TNftAddUriResponse = {
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
};
export type WsNftAddUriMessage = GetMessageType<chia_wallet_service, nft_add_uri_command, TNftAddUriResponse>;
export async function nft_add_uri<T extends TRPCAgent | TDaemon>(agent: T, data: TNftAddUriRequest){
  type R = ResType<T, TNftAddUriResponse, WsNftAddUriMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_add_uri_command, data);
}




export const nft_calculate_royalties_command = "nft_calculate_royalties";
export type nft_calculate_royalties_command = typeof nft_calculate_royalties_command;
export type TNftCalculateRoyaltiesRequest = {
  royalty_assets?: Array<{
    asset: str;
    royalty_address: str;
    royalty_percentage: uint16;
  }>;
  fungible_assets?: Array<{
    asset: str;
    amount: uint64
  }>;
};
export type TNftCalculateRoyaltiesResponse = Record<str, Array<{
  asset: str;
  address: str;
  amount: uint64;
}>>;
export type WsNftCalculateRoyaltiesMessage = GetMessageType<chia_wallet_service, nft_calculate_royalties_command, TNftCalculateRoyaltiesResponse>;
export async function nft_calculate_royalties<T extends TRPCAgent | TDaemon>(agent: T, data: TNftCalculateRoyaltiesRequest){
  type R = ResType<T, TNftCalculateRoyaltiesResponse, WsNftCalculateRoyaltiesMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_calculate_royalties_command, data);
}




export const nft_mint_bulk_command = "nft_mint_bulk";
export type nft_mint_bulk_command = typeof nft_mint_bulk_command;
export type TNftMintBulkRequest = {
  wallet_id: uint32;
  royalty_address?: str;
  royalty_percentage?: uint16;
  metadata_list: Array<{
    uris: str[];
    meta_uris: str[];
    license_uris: str[];
    hash: str;
    edition_number?: uint64;
    edition_total?: uint64;
    meta_hash?: str;
    license_hash?: str;
  }>;
  target_list?: str[];
  mint_number_start?: int;
  mint_total?: int;
  xch_coins?: Coin[];
  xch_change_target?: str;
  new_innerpuzhash?: str;
  new_p2_puzhash?: str;
  did_coin?: Coin;
  did_lineage_parent?: str;
  mint_from_did?: bool;
  fee?: uint64;
} & TxEndpoint;
export type TNftMintBulkResponse = {
  success: False;
  error: str;
} | {
  success: True;
  spend_bundle: SpendBundle;
  nft_id_list: str[];
};
export type WsNftMintBulkMessage = GetMessageType<chia_wallet_service, nft_mint_bulk_command, TNftMintBulkResponse>;
export async function nft_mint_bulk<T extends TRPCAgent | TDaemon>(agent: T, data: TNftMintBulkRequest){
  type R = ResType<T, TNftMintBulkResponse, WsNftMintBulkMessage>;
  return agent.sendMessage<R>(chia_wallet_service, nft_mint_bulk_command, data);
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
export type WsRlSetUserInfoMessage = GetMessageType<chia_wallet_service, rl_set_user_info_command, TRlSetUserInfoResponse>;
export async function rl_set_user_info<T extends TRPCAgent | TDaemon>(agent: T, data: TRlSetUserInfoRequest){
  type R = ResType<T, TRlSetUserInfoResponse, WsRlSetUserInfoMessage>;
  return agent.sendMessage<R>(chia_wallet_service, rl_set_user_info_command, data);
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
export type WsSendClawbackTransactionMessage = GetMessageType<chia_wallet_service, send_clawback_transaction_command, TSendClawbackTransactionResponse>;
export async function send_clawback_transaction<T extends TRPCAgent | TDaemon>(agent: T, data: TSendClawbackTransactionRequest){
  type R = ResType<T, TSendClawbackTransactionResponse, WsSendClawbackTransactionMessage>;
  return agent.sendMessage<R>(chia_wallet_service, send_clawback_transaction_command, data);
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
export type WsAddRateLimitedFundsMessage = GetMessageType<chia_wallet_service, add_rate_limited_funds_command, TAddRateLimitedFundsResponse>;
export async function add_rate_limited_funds<T extends TRPCAgent | TDaemon>(agent: T, data: TAddRateLimitedFundsRequest){
  type R = ResType<T, TAddRateLimitedFundsResponse, WsAddRateLimitedFundsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, add_rate_limited_funds_command, data);
}




export const pw_join_pool_command = "pw_join_pool";
export type pw_join_pool_command = typeof pw_join_pool_command;
export type TPwJoinPoolRequest = {
  fee?: uint64;
  wallet_id: uint32;
  target_puzzlehash?: string;
  pool_url?: str;
  relative_lock_height: uint32;
} & TxEndpoint;
export type TPwJoinPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
export type WsPwJoinPoolMessage = GetMessageType<chia_wallet_service, pw_join_pool_command, TPwJoinPoolResponse>;
export async function pw_join_pool<T extends TRPCAgent | TDaemon>(agent: T, data: TPwJoinPoolRequest){
  type R = ResType<T, TPwJoinPoolResponse, WsPwJoinPoolMessage>;
  return agent.sendMessage<R>(chia_wallet_service, pw_join_pool_command, data);
}




export const pw_self_pool_command = "pw_self_pool";
export type pw_self_pool_command = typeof pw_self_pool_command;
export type TPwSelfPoolRequest = {
  wallet_id: uint32;
  fee?: uint64;
} & TxEndpoint;
export type TPwSelfPoolResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
};
export type WsPwSelfPoolMessage = GetMessageType<chia_wallet_service, pw_self_pool_command, TPwSelfPoolResponse>;
export async function pw_self_pool<T extends TRPCAgent | TDaemon>(agent: T, data: TPwSelfPoolRequest){
  type R = ResType<T, TPwSelfPoolResponse, WsPwSelfPoolMessage>;
  return agent.sendMessage<R>(chia_wallet_service, pw_self_pool_command, data);
}




export const pw_absorb_rewards_command = "pw_absorb_rewards";
export type pw_absorb_rewards_command = typeof pw_absorb_rewards_command;
export type TPwAbsorbRewardsRequest = {
  wallet_id: uint32;
  fee?: uint64;
  max_spends_in_tx?: int;
} & TxEndpoint;
export type TPwAbsorbRewardsResponse = {
  state: PoolWalletInfo;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
};
export type WsPwAbsorbRewardsMessage = GetMessageType<chia_wallet_service, pw_absorb_rewards_command, TPwAbsorbRewardsResponse>;
export async function pw_absorb_rewards<T extends TRPCAgent | TDaemon>(agent: T, data: TPwAbsorbRewardsRequest){
  type R = ResType<T, TPwAbsorbRewardsResponse, WsPwAbsorbRewardsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, pw_absorb_rewards_command, data);
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
export type WsPwStatusMessage = GetMessageType<chia_wallet_service, pw_status_command, TPwStatusResponse>;
export async function pw_status<T extends TRPCAgent | TDaemon>(agent: T, data: TPwStatusRequest){
  type R = ResType<T, TPwStatusResponse, WsPwStatusMessage>;
  return agent.sendMessage<R>(chia_wallet_service, pw_status_command, data);
}




export const create_new_dl_command = "create_new_dl";
export type create_new_dl_command = typeof create_new_dl_command;
export type TCreateNewDlRequest = {
  root: str;
  fee?: uint64;
} & TxEndpoint;
export type TCreateNewDlResponse = {
  success: False;
  error: str;
} | {
  success: True;
  transactions: TransactionRecordConvenience[];
  launcher_id: bytes32;
};
export type WsCreateNewDlMessage = GetMessageType<chia_wallet_service, create_new_dl_command, TCreateNewDlResponse>;
export async function create_new_dl<T extends TRPCAgent | TDaemon>(agent: T, data: TCreateNewDlRequest){
  type R = ResType<T, TCreateNewDlResponse, WsCreateNewDlMessage>;
  return agent.sendMessage<R>(chia_wallet_service, create_new_dl_command, data);
}




export const dl_track_new_command = "dl_track_new";
export type dl_track_new_command = typeof dl_track_new_command;
export type TDlTrackNewRequest = {
  launcher_id: str;
};
export type TDlTrackNewResponse = {
};
export type WsDlTrackNewMessage = GetMessageType<chia_wallet_service, dl_track_new_command, TDlTrackNewResponse>;
export async function dl_track_new<T extends TRPCAgent | TDaemon>(agent: T, data: TDlTrackNewRequest){
  type R = ResType<T, TDlTrackNewResponse, WsDlTrackNewMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_track_new_command, data);
}




export const dl_stop_tracking_command = "dl_stop_tracking";
export type dl_stop_tracking_command = typeof dl_stop_tracking_command;
export type TDlStopTrackingRequest = {
  launcher_id: str;
};
export type TDlStopTrackingResponse = {
};
export type WsDlStopTrackingMessage = GetMessageType<chia_wallet_service, dl_stop_tracking_command, TDlStopTrackingResponse>;
export async function dl_stop_tracking<T extends TRPCAgent | TDaemon>(agent: T, data: TDlStopTrackingRequest){
  type R = ResType<T, TDlStopTrackingResponse, WsDlStopTrackingMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_stop_tracking_command, data);
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
export type WsDlLatestSingletonMessage = GetMessageType<chia_wallet_service, dl_latest_singleton_command, TDlLatestSingletonResponse>;
export async function dl_latest_singleton<T extends TRPCAgent | TDaemon>(agent: T, data: TDlLatestSingletonRequest){
  type R = ResType<T, TDlLatestSingletonResponse, WsDlLatestSingletonMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_latest_singleton_command, data);
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
export type WsDlSingletonsByRootMessage = GetMessageType<chia_wallet_service, dl_singletons_by_root_command, TDlSingletonsByRootResponse>;
export async function dl_singletons_by_root<T extends TRPCAgent | TDaemon>(agent: T, data: TDlSingletonsByRootRequest){
  type R = ResType<T, TDlSingletonsByRootResponse, WsDlSingletonsByRootMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_singletons_by_root_command, data);
}




export const dl_update_root_command = "dl_update_root";
export type dl_update_root_command = typeof dl_update_root_command;
export type TDlUpdateRootRequest = {
  launcher_id: str;
  new_root: str;
  fee?: uint64;
} & TxEndpoint;
export type TDlUpdateRootResponse = {
  tx_record: TransactionRecordConvenience;
};
export type WsDlUpdateRootMessage = GetMessageType<chia_wallet_service, dl_update_root_command, TDlUpdateRootResponse>;
export async function dl_update_root<T extends TRPCAgent | TDaemon>(agent: T, data: TDlUpdateRootRequest){
  type R = ResType<T, TDlUpdateRootResponse, WsDlUpdateRootMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_update_root_command, data);
}




export const dl_update_multiple_command = "dl_update_multiple";
export type dl_update_multiple_command = typeof dl_update_multiple_command;
export type TDlUpdateMultipleRequest = {
  updates: Record<str, str>; // {[launcher_id]: root}
} & TxEndpoint;
export type TDlUpdateMultipleResponse = {
  tx_records: TransactionRecordConvenience[];
};
export type WsDlUpdateMultipleMessage = GetMessageType<chia_wallet_service, dl_update_multiple_command, TDlUpdateMultipleResponse>;
export async function dl_update_multiple<T extends TRPCAgent | TDaemon>(agent: T, data: TDlUpdateMultipleRequest){
  type R = ResType<T, TDlUpdateMultipleResponse, WsDlUpdateMultipleMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_update_multiple_command, data);
}




export const dl_history_command = "dl_history";
export type dl_history_command = typeof dl_history_command;
export type TDlHistoryRequest = {
  launcher_id: str;
  min_generation?: uint32;
  max_generation?: uint32;
  num_results?: uint32;
};
export type TDlHistoryResponse = {
  history: SingletonRecord[];
  count: int;
};
export type WsDlHistoryMessage = GetMessageType<chia_wallet_service, dl_history_command, TDlHistoryResponse>;
export async function dl_history<T extends TRPCAgent | TDaemon>(agent: T, data: TDlHistoryRequest){
  type R = ResType<T, TDlHistoryResponse, WsDlHistoryMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_history_command, data);
}




export const dl_owned_singletons_command = "dl_owned_singletons";
export type dl_owned_singletons_command = typeof dl_owned_singletons_command;
export type TDlOwnedSingletonsResponse = {
  singletons: SingletonRecord[];
  count: int;
};
export type WsDlOwnedSingletonsMessage = GetMessageType<chia_wallet_service, dl_owned_singletons_command, TDlOwnedSingletonsResponse>;
export async function dl_owned_singletons<T extends TRPCAgent | TDaemon>(agent: T){
  type R = ResType<T, TDlOwnedSingletonsResponse, WsDlOwnedSingletonsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_owned_singletons_command);
}




export const dl_get_mirrors_command = "dl_get_mirrors";
export type dl_get_mirrors_command = typeof dl_get_mirrors_command;
export type TDlGetMirrorsRequest = {
  launcher_id: str;
};
export type TDlGetMirrorsResponse = {
  mirrors: Mirror[];
};
export type WsDlGetMirrorsMessage = GetMessageType<chia_wallet_service, dl_get_mirrors_command, TDlGetMirrorsResponse>;
export async function dl_get_mirrors<T extends TRPCAgent | TDaemon>(agent: T, data: TDlGetMirrorsRequest){
  type R = ResType<T, TDlGetMirrorsResponse, WsDlGetMirrorsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_get_mirrors_command, data);
}




export const dl_new_mirror_command = "dl_new_mirror";
export type dl_new_mirror_command = typeof dl_new_mirror_command;
export type TDlNewMirrorRequest = {
  launcher_id: str;
  amount: uint64;
  urls: str[];
  fee?: uint64;
} & TxEndpoint;
export type TDlNewMirrorResponse = {
  transactions: TransactionRecordConvenience[];
};
export type WsDlNewMirrorMessage = GetMessageType<chia_wallet_service, dl_new_mirror_command, TDlNewMirrorResponse>;
export async function dl_new_mirror<T extends TRPCAgent | TDaemon>(agent: T, data: TDlNewMirrorRequest){
  type R = ResType<T, TDlNewMirrorResponse, WsDlNewMirrorMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_new_mirror_command, data);
}




export const dl_delete_mirror_command = "dl_delete_mirror";
export type dl_delete_mirror_command = typeof dl_delete_mirror_command;
export type TDlDeleteMirrorRequest = {
  coin_id: str;
  fee?: uint64;
} & TxEndpoint;
export type TDlDeleteMirrorResponse = {
  transactions: TransactionRecordConvenience[];
};
export type WsDlDeleteMirrorMessage = GetMessageType<chia_wallet_service, dl_delete_mirror_command, TDlDeleteMirrorResponse>;
export async function dl_delete_mirror<T extends TRPCAgent | TDaemon>(agent: T, data: TDlDeleteMirrorRequest){
  type R = ResType<T, TDlDeleteMirrorResponse, WsDlDeleteMirrorMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_delete_mirror_command, data);
}


export const dl_verify_proof_command = "dl_verify_proof";
export type dl_verify_proof_command = typeof dl_verify_proof_command;
export type TDlVerifyProofRequest = DLProof;
export type TDlVerifyProofResponse = VerifyProofResponse;
export type WsDlVerifyProofMessage = GetMessageType<chia_wallet_service, dl_verify_proof_command, TDlVerifyProofResponse>;
export async function dl_verify_proof<T extends TRPCAgent | TDaemon>(agent: T, data: TDlVerifyProofRequest) {
  type R = ResType<T, TDlVerifyProofResponse, WsDlVerifyProofMessage>;
  return agent.sendMessage<R>(chia_wallet_service, dl_verify_proof_command, data);
}


export type VCMint = {
  did_id: str;
  target_address: Optional<str>;
  fee: uint64;
};
export const vc_mint_command = "vc_mint";
export type vc_mint_command = typeof vc_mint_command;
export type TVcMintRequest = VCMint & TxEndpoint;
export type TVcMintResponse = {
  vc_record: VCRecord;
  transactions: TransactionRecordConvenience[];
};
export type WsVcMintMessage = GetMessageType<chia_wallet_service, vc_mint_command, TVcMintResponse>;
export async function vc_mint<T extends TRPCAgent | TDaemon>(agent: T, data: TVcMintRequest) {
  type R = ResType<T, TVcMintResponse, WsVcMintMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_mint_command, data);
}


export type VCGet = {
  vc_id: bytes32;
};
export const vc_get_command = "vc_get";
export type vc_get_command = typeof vc_get_command;
export type TVcGetRequest = VCGet;
export type TVcGetResponse = {
  vc_record: VCRecord | None;
};
export type WsVcGetMessage = GetMessageType<chia_wallet_service, vc_get_command, TVcGetResponse>;
export async function vc_get<T extends TRPCAgent | TDaemon>(agent: T, data: TVcGetRequest) {
  type R = ResType<T, TVcGetResponse, WsVcGetMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_get_command, data);
}


export type VcGetList = {
  start: uint32;
  end: uint32;
};
export const vc_get_list_command = "vc_get_list";
export type vc_get_list_command = typeof vc_get_list_command;
export type TVcGetListRequest = VcGetList;
export type TVcGetListResponse = {
  vc_records: Array<VCRecord & {coin_id: str;}>;
  proofs: Record<str, Record<str, str> | None>;
};
export type WsVcGetListMessage = GetMessageType<chia_wallet_service, vc_get_list_command, TVcGetListResponse>;
export async function vc_get_list<T extends TRPCAgent | TDaemon>(agent: T, data: TVcGetListRequest) {
  type R = ResType<T, TVcGetListResponse, WsVcGetListMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_get_list_command, data);
}


export type VcSpend = {
  vc_id: bytes32;
  new_puzhash: Optional<bytes32>;
  new_proof_hash: Optional<bytes32>;
  provider_inner_puzhash: Optional<bytes32>;
  fee: uint64;
};
export const vc_spend_command = "vc_spend";
export type vc_spend_command = typeof vc_spend_command;
export type TVcSpendRequest = VcSpend & TxEndpoint;
export type TVcSpendResponse = {
  transactions: TransactionRecordConvenience[];
};
export type WsVcSpendMessage = GetMessageType<chia_wallet_service, vc_spend_command, TVcSpendResponse>;
export async function vc_spend<T extends TRPCAgent | TDaemon>(agent: T, data: TVcSpendRequest) {
  type R = ResType<T, TVcSpendResponse, WsVcSpendMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_spend_command, data);
}


export const vc_add_proofs_command = "vc_add_proofs";
export type vc_add_proofs_command = typeof vc_add_proofs_command;
export type TVcAddProofsRequest = {
  proofs: {
    key_value_pairs: Record<str, str>;
  };
};
export type TVcAddProofsResponse = Record<string, never>;
export type WsVcAddProofsMessage = GetMessageType<chia_wallet_service, vc_add_proofs_command, TVcAddProofsResponse>;
export async function vc_add_proofs<T extends TRPCAgent | TDaemon>(agent: T, data: TVcAddProofsRequest) {
  type R = ResType<T, TVcAddProofsResponse, WsVcAddProofsMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_add_proofs_command, data);
}


export type VCGetProofsForRoot = {
  root: bytes32;
};
export const vc_get_proofs_for_root_command = "vc_get_proofs_for_root";
export type vc_get_proofs_for_root_command = typeof vc_get_proofs_for_root_command;
export type TVcGetProofsForRootRequest = VCGetProofsForRoot;
export type TVcGetProofsForRootResponse = {
  proofs: Record<str, str>;
};
export type WsVcGetProofsForRootMessage = GetMessageType<chia_wallet_service, vc_get_proofs_for_root_command, TVcGetProofsForRootResponse>;
export async function vc_get_proofs_for_root<T extends TRPCAgent | TDaemon>(agent: T, data: TVcGetProofsForRootRequest) {
  type R = ResType<T, TVcGetProofsForRootResponse, WsVcGetProofsForRootMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_get_proofs_for_root_command, data);
}


export type VcRevoke = {
  vc_parent_id: bytes32;
  fee: uint64;
};
export const vc_revoke_command = "vc_revoke";
export type vc_revoke_command = typeof vc_revoke_command;
export type TVcRevokeRequest = VcRevoke & TxEndpoint;
export type TVcRevokeResponse = {
  transactions: TransactionRecordConvenience[];
};
export type WsVcRevokeMessage = GetMessageType<chia_wallet_service, vc_revoke_command, TVcRevokeResponse>;
export async function vc_revoke<T extends TRPCAgent | TDaemon>(agent: T, data: TVcRevokeRequest) {
  type R = ResType<T, TVcRevokeResponse, WsVcRevokeMessage>;
  return agent.sendMessage<R>(chia_wallet_service, vc_revoke_command, data);
}


export type CrcatApprovePending = {
  wallet_id: uint32;
  min_amount_to_claim: uint64;
  fee: uint64;
};
export const crcat_approve_pending_command = "crcat_approve_pending";
export type crcat_approve_pending_command = typeof crcat_approve_pending_command;
export type TCrcatApprovePendingRequest = CrcatApprovePending & TxEndpoint;
export type TCrcatApprovePendingResponse = {
  transactions: TransactionRecordConvenience[];
};
export type WsCrcatApprovePendingMessage = GetMessageType<chia_wallet_service, crcat_approve_pending_command, TCrcatApprovePendingResponse>;

export async function crcat_approve_pending<T extends TRPCAgent | TDaemon>(agent: T, data: TCrcatApprovePendingRequest) {
  type R = ResType<T, TCrcatApprovePendingResponse, WsCrcatApprovePendingMessage>;
  return agent.sendMessage<R>(chia_wallet_service, crcat_approve_pending_command, data);
}

export type RpcWalletMessage =
  TAddKeyResponse
  | TAddRateLimitedFundsResponse
  | TCancelOfferResponse
  | TCancelOffersResponse
  | TCatGetAssetIdResponse
  | TCatGetNameResponse
  | TGetStrayCatsResponse
  | TCatAssetIdToNameResponse
  | TCatSetNameResponse
  | TCatSpendResponse
  | TCheckOfferValidityResponse
  | TCreateNewWalletResponse
  | TCreateOfferForIdsResponse
  | TCreateSignedTransactionResponse
  | TDeleteUnconfirmedTransactionsResponse
  | TSelectCoinsResponse
  | TGetSpendableCoinsResponse
  | TGetCoinRecordsByNamesResponse
  | TGetCurrentDerivationIndexResponse
  | TExtendDerivationIndexResponse
  | TGetNotificationsResponse
  | TDeleteNotificationsResponse
  | TSendNotificationResponse
  | TSignMessageByAddressResponse
  | TSignMessageByIdResponse
  | TVerifySignatureResponse
  | TGetTransactionMemoResponse
  | TNftCalculateRoyaltiesResponse
  | TNftMintBulkResponse
  | TNftSetDidBulkResponse
  | TNftTransferBulkResponse
  | TDeleteAllKeysResponse
  | TSetWalletResyncOnStartupResponse
  | TDeleteKeyResponse
  | TCheckDeleteKeyResponse
  | TDidSetWalletNameResponse
  | TDidGetWalletNameResponse
  | TDidCreateAttestResponse
  | TDidCreateBackupFileResponse
  | TDidTransferDidResponse
  | TDidMessageSpendResponse
  | TDidGetInfoResponse
  | TDidFindLostDidResponse
  | TDidGetDidResponse
  | TDidGetInformationNeededForRecoveryResponse
  | TDidGetCurrentCoinInfoResponse
  | TDidGetPubkeyResponse
  | TDidGetRecoveryListResponse
  | TDidGetMetadataResponse
  | TDidRecoverySpendResponse
  | TDidSpendResponse
  | TDidUpdateRecoveryIdsResponse
  | TDidUpdateMetadataResponse
  | TDaoAdjustFilterLevelResponse
  | TDaoAddFundsToTreasuryResponse
  | TDaoGetTreasuryBalanceResponse
  | TDaoGetTreasuryIdResponse
  | TDaoGetRulesResponse
  | TDaoSendToLockupResponse
  | TDaoGetProposalsResponse
  | TDaoGetProposalStateResponse
  | TDaoExitLockupResponse
  | TDaoCreateProposalResponse
  | TDaoVoteOnProposalResponse
  | TDaoParseProposalResponse
  | TDaoCloseProposalResponse
  | TDaoFreeCoinsFromFinishedProposalsResponse
  | TNftMintNftResponse
  | TNftCountNftsResponse
  | TNftGetNftsResponse
  | TNftSetNftDidResponse
  | TNftGetByDidResponse
  | TNftGetWalletDidResponse
  | TNftGetWalletsWithDidsResponse
  | TNftSetNftStatusResponse
  | TNftTransferNftResponse
  | TNftGetInfoResponse
  | TNftAddUriResponse
  | TFarmBlockResponse
  | TGetTimestampForHeightResponse
  | TSetAutoClaimResponse
  | TGetAutoClaimResponse
  | TGenerateMnemonicResponse
  | TGetAllOffersResponse
  | TGetCatListResponse
  | TGetFarmedAmountResponse
  | TGetHeightInfoResponse
  | TGetInitialFreezePeriodResponseOfWallet
  | TGetLoggedInFingerprintResponse
  | TGetOfferResponse
  | TGetOffersCountResponse
  | TGetOfferSummaryResponse
  | TGetNetworkInfoResponseOfWallet
  | TGetNextAddressResponse
  | TGetPrivateKeyResponse
  | TGetPublicKeysResponse
  | TGetSyncStatusResponse
  | TGetTransactionResponse
  | TGetTransactionCountResponse
  | TGetTransactionsResponse
  | TGetWalletBalanceResponse
  | TGetWalletBalancesResponse
  | TGetWalletsResponse
  | TLoginResponse
  | TPushTxResponseOfWallet
  | TPushTransactionsResponse
  | TPwJoinPoolResponse
  | TPwSelfPoolResponse
  | TPwAbsorbRewardsResponse
  | TPwStatusResponse
  | TRlSetUserInfoResponse
  | TSendClawbackTransactionResponse
  | TSendTransactionResponse
  | TSendTransactionMultiResponse
  | TSpendClawbackCoinsResponse
  | TGetCoinRecordsResponse
  | TTakeOfferResponse
  | TCreateNewDlResponse
  | TDlTrackNewResponse
  | TDlStopTrackingResponse
  | TDlLatestSingletonResponse
  | TDlSingletonsByRootResponse
  | TDlUpdateRootResponse
  | TDlUpdateMultipleResponse
  | TDlHistoryResponse
  | TDlOwnedSingletonsResponse
  | TDlGetMirrorsResponse
  | TDlNewMirrorResponse
  | TDlDeleteMirrorResponse
  | TDlVerifyProofResponse
  | TVcMintResponse
  | TVcGetResponse
  | TVcGetListResponse
  | TVcSpendResponse
  | TVcAddProofsResponse
  | TVcGetProofsForRootResponse
  | TVcRevokeResponse
  | TCrcatApprovePendingResponse
;

export type RpcWalletMessageOnWs =
  WsAddKeyMessage
  | WsAddRateLimitedFundsMessage
  | WsCancelOfferMessage
  | WsCancelOffersMessage
  | WsCatGetAssetIdMessage
  | WsCatGetNameMessage
  | WsGetStrayCatsMessage
  | WsCatAssetIdToNameMessage
  | WsCatSetNameMessage
  | WsCatSpendMessage
  | WsCheckOfferValidityMessage
  | WsCreateNewWalletMessage
  | WsCreateOfferForIdsMessage
  | WsCreateSignedTransactionMessage
  | WsDeleteUnconfirmedTransactionsMessage
  | WsSelectCoinsMessage
  | WsGetSpendableCoinsMessage
  | WsGetCoinRecordsByNamesMessage
  | WsGetCurrentDerivationIndexMessage
  | WsExtendDerivationIndexMessage
  | WsGetNotificationsMessage
  | WsDeleteNotificationsMessage
  | WsSendNotificationMessage
  | WsSignMessageByAddressMessage
  | WsSignMessageByIdMessage
  | WsVerifySignatureMessage
  | WsGetTransactionMemoMessage
  | WsNftCalculateRoyaltiesMessage
  | WsNftMintBulkMessage
  | WsNftSetDidBulkMessage
  | WsNftTransferBulkMessage
  | WsDeleteAllKeysMessage
  | WsSetWalletResyncOnStartupMessage
  | WsDeleteKeyMessage
  | WsCheckDeleteKeyMessage
  | WsDidSetWalletNameMessage
  | WsDidGetWalletNameMessage
  | WsDidCreateAttestMessage
  | WsDidCreateBackupFileMessage
  | WsDidTransferDidMessage
  | WsDidMessageSpendMessage
  | WsDidGetInfoMessage
  | WsDidFindLostDidMessage
  | WsDidGetDidMessage
  | WsDidGetInformationNeededForRecoveryMessage
  | WsDidGetCurrentCoinInfoMessage
  | WsDidGetPubkeyMessage
  | WsDidGetRecoveryListMessage
  | WsDidGetMetadataMessage
  | WsDidRecoverySpendMessage
  | WsDidSpendMessage
  | WsDidUpdateRecoveryIdsMessage
  | WsDidUpdateMetadataMessage
  | WsDaoAdjustFilterLevelMessage
  | WsDaoAddFundsToTreasuryMessage
  | WsDaoGetTreasuryBalanceMessage
  | WsDaoGetTreasuryIdMessage
  | WsDaoGetRulesMessage
  | WsDaoSendToLockupMessage
  | WsDaoGetProposalsMessage
  | WsDaoGetProposalStateMessage
  | WsDaoExitLockupMessage
  | WsDaoCreateProposalMessage
  | WsDaoVoteOnProposalMessage
  | WsDaoParseProposalMessage
  | WsDaoCloseProposalMessage
  | WsDaoFreeCoinsFromFinishedProposalsMessage
  | WsNftMintNftMessage
  | WsNftCountNftsMessage
  | WsNftGetNftsMessage
  | WsNftSetNftDidMessage
  | WsNftGetByDidMessage
  | WsNftGetWalletDidMessage
  | WsNftGetWalletsWithDidsMessage
  | WsNftSetNftStatusMessage
  | WsNftTransferNftMessage
  | WsNftGetInfoMessage
  | WsNftAddUriMessage
  | WsFarmBlockMessage
  | WsGetTimestampForHeightMessage
  | WsSetAutoClaimMessage
  | WsGetAutoClaimMessage
  | WsGenerateMnemonicMessage
  | WsGetAllOffersMessage
  | WsGetCatListMessage
  | WsGetFarmedAmountMessage
  | WsGetHeightInfoMessage
  | WsGetInitialFreezePeriodMessageOfWallet
  | WsGetLoggedInFingerprintMessage
  | WsGetOfferMessage
  | WsGetOffersCountMessage
  | WsGetOfferSummaryMessage
  | WsGetNetworkInfoMessageOfWallet
  | WsGetNextAddressMessage
  | WsGetPrivateKeyMessage
  | WsGetPublicKeysMessage
  | WsGetSyncStatusMessage
  | WsGetTransactionMessage
  | WsGetTransactionCountMessage
  | WsGetTransactionsMessage
  | WsGetWalletBalanceMessage
  | WsGetWalletBalancesMessage
  | WsGetWalletsMessage
  | WsLoginMessage
  | WsPushTxMessageOfWallet
  | WsPushTransactionsMessage
  | WsPwJoinPoolMessage
  | WsPwSelfPoolMessage
  | WsPwAbsorbRewardsMessage
  | WsPwStatusMessage
  | WsRlSetUserInfoMessage
  | WsSendClawbackTransactionMessage
  | WsSendTransactionMessage
  | WsSendTransactionMultiMessage
  | WsSpendClawbackCoinsMessage
  | WsGetCoinRecordsMessage
  | WsTakeOfferMessage
  | WsCreateNewDlMessage
  | WsDlTrackNewMessage
  | WsDlStopTrackingMessage
  | WsDlLatestSingletonMessage
  | WsDlSingletonsByRootMessage
  | WsDlUpdateRootMessage
  | WsDlUpdateMultipleMessage
  | WsDlHistoryMessage
  | WsDlOwnedSingletonsMessage
  | WsDlGetMirrorsMessage
  | WsDlNewMirrorMessage
  | WsDlDeleteMirrorMessage
  | WsDlVerifyProofMessage
  | WsVcMintMessage
  | WsVcGetMessage
  | WsVcGetListMessage
  | WsVcSpendMessage
  | WsVcAddProofsMessage
  | WsVcGetProofsForRootMessage
  | WsVcRevokeMessage
  | WsCrcatApprovePendingMessage
;
