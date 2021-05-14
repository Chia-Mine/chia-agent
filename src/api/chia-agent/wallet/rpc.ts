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
  uint128,
  uint32,
  uint64,
  uint8
} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {TransactionRecord} from "../../chia/wallet/transaction_record";
import {SpendBundle} from "../../chia/types/spend_bundle";

// # Key management

// chia-blockchain/chia/wallet/wallet_state_manager.py@986
export type WalletBackupData = {
  version: str;
  fingerprint: int; // https://github.com/Chia-Network/bls-signatures/blob/main/python-impl/ec.py#L164
  timestamp: uint64;
  start_height: Optional<uint32>;
};

export type WalletBackupMetadata = {
  timestamp: uint64;
  pubkey: str;
};

export type WalletBackup = {
  data: WalletBackupData;
  meta_data: WalletBackupMetadata;
  signature: unknown; // chia/wallet/util/backup_utils.py@22
};


export type WalletInfoWithTypeName = WalletInfo & {
  type_name: str; // enum.name chia/wallet/util/backup_utils.py@22
};

export type BackupInfo = Pick<WalletBackupData, "version" | "fingerprint" | "timestamp"> & {
  wallets: WalletInfoWithTypeName[];
  backup_host: str;
  downloaded: bool;
};

const log_in = "log_in";
export type TLoginRequest = {
  fingerprint: int;
  type: "skip";
  host: str;
} | {
  fingerprint: int;
  type: "restore_backup";
  host: str;
  file_path: str; // Union[str | PathLike[str]]
};

export type TLoginResponse = {
  fingerprint: int;
} | {
  success: false;
  error: "not_initialized" | "Unknown Error";
} | {
  success: false;
  error: "not_initialized";
  backup_info: BackupInfo;
  backup_path: str; // Union[str, PathLike[str]]
};




export const get_public_keys = "get_public_keys";
export type TGetPublicKeysRequest = {
};
export type TGetPublicKeysResponse = {
  public_key_fingerprints: int[];
};



export const get_private_key = "get_private_key";
export type TGetPrivateKeyRequest = {
  fingerprint: int; // https://github.com/Chia-Network/bls-signatures/blob/main/python-impl/ec.py#L164
};
export type TGetPrivateKeyResponse = {
  "private_key": {
    fingerprint: int;
    sk: str;
    pk: str;
    seed: str;
  },
};




export const generate_mnemonic = "generate_mnemonic";
export type TGenerateMnemonicRequest = {
};
export type TGenerateMnemonicResponse = {
  mnemonic: str[];
};




export const add_key = "add_key";
export type TAddKeyRequest = {
  mnemonic: str[];
  type: "new_wallet" | "skip";
} | {
  mnemonic: str[];
  type: "restore_backup";
  file_path: str;
};

export type TAddKeyResponse = {
  success: false;
  error: str;
  word: unknown; // e.args[0] where e = KeyError
} | {
  fingerprint: int;
};




export const delete_key = "delete_key";
export type TDeleteKeyRequest = {
  fingerprint: int;
};
export type TDeleteKeyResponse = {
};




export const delete_all_keys = "delete_all_keys";
export type TDeleteAllKeysRequest = {
  // no input
};
export type TDeleteAllKeysResponse = {
  // no output
};




// # Wallet node
export const get_sync_status = "get_sync_status";
export type TGetSyncStatusRequest = {
};
export type TGetSyncStatusResponse = {
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
};



export const get_height_info = "get_height_info";
export type TGetHeightInfoRequest = {
};
export type TGetHeightInfoResponse = {
  height: uint32;
};



export const farm_block = "farm_block";
export type TFarmBlockRequest = {
  address: str;
};
export type TFarmBlockResponse = {
};



export const get_initial_freeze_period = "get_initial_freeze_period";
export type TGetInitialFreezePeriodRequest = {
};
export type TGetInitialFreezePeriodResponse = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};



export const get_network_info = "get_network_info";
export type TGetNetworkInfoRequest = {
};
export type TGetNetworkInfoResponse = {
  network_name: str;
  network_prefix: str;
};



// # Wallet management
export const get_wallets = "get_wallets";
export type TGetWalletsRequest = {
};
export type TGetWalletsResponse = {
  wallets: WalletInfo[];
};



export type Create_New_CC_WalletRequest = {
  wallet_type: "cc_wallet"
  mode: "new";
  amount: uint64;
} | {
  wallet_type: "cc_wallet"
  mode: "existing";
  colour: str;
};
export type Create_New_RC_WalletRequest = {
  wallet_type: "rc_wallet";
  rl_type: "admin";
  interval: int;
  limit: int;
  pubkey: str;
  amount: int;
  fee: int;
} | {
  wallet_type: "rc_wallet";
  rl_type: "user";
};
export type Create_New_DID_WalletRequest = {
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
} | {
  wallet_type: "did_wallet";
  did_type: "recovery";
  filename: str;
};

export type Create_New_CC_WalletResponse = {
  type: uint8;
  colour: str;
  wallet_id: uint32;
} | {
  type: uint8;
};

export type Create_New_RC_WalletResponse = {
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

export type Create_New_DID_WalletResponse = {
  success: true;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
} | {
  success: true;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
  coin_name: bytes32;
  coin_list: [bytes32, bytes32, uint64];
  newpuzhash: str;
  pubkey: str;
  backup_dids: bytes[];
  num_verifications_required: uint64;
};

export const create_new_wallet = "create_new_wallet";
export type TCreateNewWalletRequest = {
  host: str;
} & (Create_New_CC_WalletRequest | Create_New_RC_WalletRequest | Create_New_DID_WalletRequest);
export type TCreateNewWalletResponse = Create_New_CC_WalletResponse | Create_New_RC_WalletResponse | Create_New_DID_WalletResponse;



// # Wallet
export const get_wallet_balance = "get_wallet_balance";
export type TGetWalletBalanceRequest = {
  wallet_id: int;
};
export type TGetWalletBalanceResponse = {
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128, // MEMO: cc_wallet, did_wallet ceclares `uint64`
    unconfirmed_wallet_balance: uint128,
    spendable_balance: uint128,
    pending_change: uint64,
    max_send_amount: uint64,
    unspent_coin_count: int;
    pending_coin_removal_count: int;
  };
};



export const get_transaction = "get_transaction";
export type TGetTransactionRequest = {
  transaction_id: bytes32;
};
export type TGetTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};




export const get_transactions = "get_transactions";
export type TGetTransactionsRequest = {
  wallet_id: int;
  start?: int;
  end?: int;
};
export type TGetTransactionsResponse = {
  transactions: Array<TransactionRecord & {to_address: string}>;
  wallet_id: int;
};




export const get_next_address = "get_next_address";
export type TGetNextAddressRequest = {
  new_address: bool;
  wallet_id: int;
};
export type TGetNextAddressResponse = {
  wallet_id: uint32; // wallet_id in request is int, but response is uint32
  address: str;
};




export const send_transaction = "send_transaction";
export type TSendTransactionRequest = {
  wallet_id: int;
  amount: int;
  fee: int;
  address: str;
};
export type TSendTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};




export const create_backup = "create_backup";
export type TCreateBackupRequest = {
  file_path: str;
};
export type TCreateBackupResponse = {
};




export const get_transaction_count = "get_transaction_count";
export type TGetTransactionCountRequest = {
  wallet_id: int;
};
export type TGetTransactionCountResponse = {
  wallet_id: int;
  count: int;
};




export const get_farmed_amount = "get_farmed_amount";
export type TGetFarmedAmountRequest = {
};
export type TGetFarmedAmountResponse = {
  farmed_amount: int;
  pool_reward_amount: int;
  farmer_reward_amount: int;
  fee_amount: int;
  last_height_farmed: int;
};




export type TAdditions = {
  amount: uint64;
  puzzle_hash: str;
};
export const create_signed_transaction = "create_signed_transaction";
export type TCreateSignedTransactionRequest = {
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
};
export type TCreateSignedTransactionResponse = {
  signed_tx: TransactionRecord;
};




// # Coloured coins and trading
export const cc_set_name = "cc_set_name";
export type TCcSetNameRequest = {
  wallet_id: int;
  name: str;
};
export type TCcSetNameResponse = {
  wallet_id: int;
};




export const cc_get_name = "cc_get_name";
export type TCcGetNameRequest = {
  wallet_id: int;
};
export type TCcGetNameResponse = {
  wallet_id: int;
  name: str;
};




export const cc_spend = "cc_spend";
export type TCcSpendRequest = {
  wallet_id: int;
  inner_address: str;
  amount: int;
  fee?: uint64;
};
export type TCcSpendResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};




export const cc_get_colour = "cc_get_colour";
export type TCcGetColourRequest = {
  wallet_id: int;
};
export type TCcGetColourResponse = {
  colour: str;
  wallet_id: int;
};




export const create_offer_for_ids = "create_offer_for_ids";
export type TCreateOfferForIdsRequest = {
  ids: Record<int, int>;
  filename: str;
};
export type TCreateOfferForIdsResponse = {
  discrepancies: Optional<Record<str, int>>;
};




export const get_discrepancies_for_offer = "get_discrepancies_for_offer";
export type TGetDiscrepanciesForOfferRequest = {
  filename: str;
};
export type TGetDiscrepanciesForOfferResponse = {
};




export const respond_to_offer = "respond_to_offer";
export type TResponseToOfferRequest = {
  filename: str;
};
export type TResponseToOfferResponse = {
};




export type TradeRecordInJson = {
  trade_id: str;
  sent: uint32;
  my_offer: bool;
  created_at_time: uint64;
  accepted_at_time: Optional<uint64>;
  confirmed_at_index: uint32;
  status: str;
  offer_dict: Optional<Record<str, int>>;
};
export const get_trade = "get_trade";
export type TGetTradeRequest = {
  trade_id: bytes;
};
export type TGetTradeResponse = {
  trade: TradeRecordInJson;
};




export const get_all_trades = "get_all_trades";
export type TGetAllTradesRequest = {
};
export type TGetAllTradesResponse = {
  trades: TradeRecordInJson[];
};




export const cancel_trade = "cancel_trade";
export type TCancelTradeRequest = {
  secure: bool;
  trade_id: str;
};
export type TCancelTradeResponse = {
};




// # DID Wallet
export const did_update_recovery_ids = "did_update_recovery_ids";
export type TDidUpdateRecoveryIdsRequest = {
  wallet_id: int;
  new_list: str[];
  num_verifications_required?: uint64;
};
export type TDidUpdateRecoveryIdsResponse = {
  success: bool;
};




export const did_spend = "did_spend";
export type TDidSpendRequest = {
  wallet_id: int;
  puzzlehash: bytes32;
};
export type TDidSpendResponse = {
  success: bool;
};




export const did_get_pubkey = "did_get_pubkey";
export type TDidGetPubkeyRequest = {
};
export type TDidGetPubkeyResponse = {
  success: bool;
  pubkey: str;
};




export const did_get_did = "did_get_did";
export type TDidGetDidRequest = {
  wallet_id: int;
};
export type TDidGetDidResponse = {
  success: bool;
  wallet_id: int;
  my_did: str;
  coin_id?: bytes32;
};




export const did_recovery_spend = "did_recovery_spend";
export type TDidRecoverySpendRequest = {
  wallet_id: int;
  attest_filenames: str[];
  pubkey: str;
  puzhash: str;
};
export type TDidRecoverySpendResponse = {
  success: SpendBundle;
};




export const did_get_recovery_list = "did_get_recovery_list";
export type TDidGetRecoveryListRequest = {
  wallet_id: int;
};
export type TDidGetRecoveryListResponse = {
  success: bool;
  wallet_id: int;
  recover_list: str[];
  num_required: uint64;
};




export const did_create_attest = "did_create_attest";
export type TDidCreateAttestRequest = {
  wallet_id: int;
  coin_name: str;
  puzhash: str;
  filename: str;
};
export type TDidCreateAttestResponse = {
  success: True;
  message_spend_bundle: str;
  info: [str, str, uint64];
} | {
  success: False;
};




export const did_get_information_needed_for_recovery = "did_get_information_needed_for_recovery";
export type TDidGetInformationNeededForRecoveryRequest = {
  wallet_id: int;
};
export type TDidGetInformationNeededForRecoveryResponse = {
  success: bool;
  wallet_id: int;
  my_did: str;
  coin_name: str;
  newpuzhash: Optional<bytes32>;
  pubkey: Optional<bytes>;
  backup_dids: bytes[];
};




export const did_create_backup_file = "did_create_backup_file";
export type TDidCreateBackupFileRequest = {
  wallet_id: int;
  filename: str;
};
export type TDidCreateBackupFileResponse = {
  wallet_id: int;
  success: bool;
};




// # RL wallet
export const rl_set_user_info = "rl_set_user_info";
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




export const send_clawback_transaction = "send_clawback_transaction:";
export type TSendClawbackTransactionRequest = {
  wallet_id: int;
  fee: int;
};
export type TSendClawbackTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
};




export const add_rate_limited_funds = "add_rate_limited_funds:";
export type TAddRateLimitedFundsRequest = {
  wallet_id: uint32;
  amount: uint64;
  fee: uint64;
};
export type TAddRateLimitedFundsResponse = {
  status: "SUCCESS";
};
