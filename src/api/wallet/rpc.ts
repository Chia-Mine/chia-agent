import {WalletInfo} from "../chia/wallet/wallet_info";
import {Coin} from "../chia/types/blockchain_format/coin";
import {bytes, uint128, uint32, uint64, uint8} from "../chia/types/_python_types_";
import {bytes32} from "../chia/types/blockchain_format/sized_bytes";
import {TransactionRecord} from "../chia/wallet/transaction_record";

// # Key management

// chia-blockchain/chia/wallet/wallet_state_manager.py@986
export type WalletBackupData = {
  version: string;
  fingerprint: number;
  timestamp: uint64;
  start_height?: uint32;
};

export type WalletBackupMetadata = {
  timestamp: uint64;
  pubkey: string;
};

export type WalletBackup = {
  data: WalletBackupData;
  meta_data: WalletBackupMetadata;
  signature: string;
};



export type BackupInfo = Pick<WalletBackupData, "version" | "fingerprint" | "timestamp"> & {
  wallets: Array<WalletInfo & {
    type_name: string;
  }>;
  backup_host: string;
  downloaded: boolean;
};

const log_in = "log_in";
export type TLoginRequest = {
  fingerprint: string;
  type: "skip"|"restore_backup";
  host: string;
  file_path?: string;
};
export type TLoginResponse = {
  fingerprint: string;
} | {
  success: false;
  error: "not_initialized" | "Unknown Error";
} | {
  success: false;
  error: "not_initialized";
  backup_info: BackupInfo;
  backup_path: string;
};




const get_public_keys = "get_public_keys";
export type TGetPublicKeysRequest = {
};
export type TGetPublicKeysResponse = {
  public_key_fingerprints: number[];
};



const get_private_key = "get_private_key";
export type TGetPrivateKeyRequest = {
  fingerprint: number;
};
export type TGetPrivateKeyResponse = {
  "private_key": {
    fingerprint: number;
    sk: string;
    pk: string;
    seed: string;
  },
};




const generate_mnemonic = "generate_mnemonic";
export type TGenerateMnemonicRequest = {
};
export type TGenerateMnemonicResponse = {
  mnemonic: string[];
};




const add_key = "add_key";
export type TAddKeyRequest = {
  mnemonic: string[];
  type: "new_wallet" | "skip" | "restore_backup";
  file_path?: string;
};
export type TAddKeyResponse = {
  success: false;
  error: string;
  word: unknown; // e.args[0] where e = KeyError
} | {
  fingerprint: number;
};




const delete_key = "delete_key";
export type TDeleteKeyRequest = {
  fingerprint: number;
};
export type TDeleteKeyResponse = {
};




const delete_all_keys = "delete_all_keys";
export type TDeleteAllKeysRequest = {
  // no input
};
export type TDeleteAllKeysResponse = {
  // no output
};




// # Wallet node
const get_sync_status = "get_sync_status";
export type TGetSyncStatusRequest = {
};
export type TGetSyncStatusResponse = {
  synced: boolean;
  syncing: boolean;
  genesis_initialized: true;
};



const get_height_info = "get_height_info";
export type TGetHeightInfoRequest = {
};
export type TGetHeightInfoResponse = {
  height: uint32;
};



const farm_block = "farm_block";
export type TFarmBlockRequest = {
  address: string;
};
export type TFarmBlockResponse = {
};



const get_initial_freeze_period = "get_initial_freeze_period";
export type TGetInitialFreezePeriodRequest = {
};
export type TGetInitialFreezePeriodResponse = {
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
};



const get_network_info = "get_network_info";
export type TGetNetworkInfoRequest = {
};
export type TGetNetworkInfoResponse = {
  network_name: string;
  network_prefix: string;
};



// # Wallet management
const get_wallets = "get_wallets";
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
  colour: string;
};
export type Create_New_RC_WalletRequest = {
  wallet_type: "rc_wallet";
  rl_type: "admin";
  interval: number;
  limit: number;
  pubkey: string;
  amount: number;
  fee: number;
} | {
  wallet_type: "rc_wallet";
  rl_type: "user";
};
export type Create_New_DID_WalletRequest = {
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: string[];
  num_of_backup_ids_needed: number;
  amount: number;
} | {
  wallet_type: "did_wallet";
  did_type: "recovery";
  filename: string;
};

export type Create_New_CC_WalletResponse = {
  type: uint8;
  colour: string;
  wallet_id: uint32;
} | {
  type: uint8;
};

export type Create_New_RC_WalletResponse = {
  success: boolean;
  id: uint32;
  type: uint8;
  origin?: Coin;
  pubkey: string;
} | {
  id: uint32;
  type: uint8;
  pubkey: string;
};

export type Create_New_DID_WalletResponse = {
  success: true;
  type: uint8;
  my_did: string;
  wallet_id: uint32;
} | {
  success: true;
  type: uint8;
  my_did: string;
  wallet_id: uint32;
  coin_name: bytes32;
  coin_list: [bytes32, bytes32, uint64];
  newpuzhash: string;
  pubkey: string;
  backup_dids: bytes[];
  num_verifications_required: uint64;
};

const create_new_wallet = "create_new_wallet";
export type TCreateNewWalletRequest = {
  host: string;
} & (Create_New_CC_WalletRequest | Create_New_RC_WalletRequest | Create_New_DID_WalletRequest);
export type TCreateNewWalletResponse = Create_New_CC_WalletResponse | Create_New_RC_WalletResponse | Create_New_DID_WalletResponse;



// # Wallet
const get_wallet_balance = "get_wallet_balance";
export type TGetWalletBalanceRequest = {
  wallet_id: number;
};
export type TGetWalletBalanceResponse = {
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128, // MEMO: cc_wallet, did_wallet ceclares `uint64`
    unconfirmed_wallet_balance: uint128,
    spendable_balance: uint128,
    pending_change: uint64,
    max_send_amount: uint64,
    unspent_coin_count: number;
  };
};



const get_transaction = "get_transaction";
export type TGetTransactionRequest = {
  transaction_id: string;
};
export type TGetTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: bytes32;
};




const get_transactions = "get_transactions";
export type TGetTransactionsRequest = {
  wallet_id: number;
  start?: number;
  end?: number;
};
export type TGetTransactionsResponse = {
  transactions: Array<TransactionRecord & {to_address: string}>;
  wallet_id: number;
};




const get_next_address = "get_next_address";
export type TGetNextAddressRequest = {
  new_address: boolean;
  wallet_id: number;
};
export type TGetNextAddressResponse = {
  wallet_id: uint32;
  address: string;
};




const send_transaction = "send_transaction";
export type TSendTransactionRequest = {
  wallet_id: number;
  amount: number;
  fee: number;
  address: string;
};
export type TSendTransactionResponse = {
  transaction: TransactionRecord;
  transaction_id: bytes32;
};




const create_backup = "create_backup";
export type TCreateBackupRequest = {
  file_path: string;
};
export type TCreateBackupResponse = {
  wallet_id: number;
  count: number;
};




const get_transaction_count = "get_transaction_count";
export type TGetTransactionCountRequest = {
  wallet_id: number;
};
export type TGetTransactionCountResponse = {
};




const get_farmed_amount = "get_farmed_amount";
export type TGetFarmedAmountRequest = {
  wallet_id: number;
};
export type TGetFarmedAmountResponse = {
  farmed_amount: number;
  pool_reward_amount: number;
  farmer_reward_amount: number;
  fee_amount: number;
  last_height_farmed: number;
};




const create_signed_transaction = "create_signed_transaction";
// # Coloured coins and trading
const cc_set_name = "cc_set_name";
const cc_get_name = "cc_get_name";
const cc_spend = "cc_spend";
const cc_get_colour = "cc_get_colour";
const create_offer_for_ids = "create_offer_for_ids";
const get_discrepancies_for_offer = "get_discrepancies_for_offer";
const respond_to_offer = "respond_to_offer";
const get_trade = "get_trade";
const get_all_trades = "get_all_trades";
const cancel_trade = "cancel_trade";
// # DID Wallet
const did_update_recovery_ids = "did_update_recovery_ids";
const did_spend = "did_spend";
const did_get_pubkey = "did_get_pubkey";
const did_get_did = "did_get_did";
const did_recovery_spend = "did_recovery_spend";
const did_get_recovery_list = "did_get_recovery_list";
const did_create_attest = "did_create_attest";
const did_get_information_needed_for_recovery = "did_get_information_needed_for_recovery";
const did_create_backup_file = "did_create_backup_file";
// # RL wallet
const rl_set_user_info = "rl_set_user_info";
const send_clawback_transaction = "send_clawback_transaction:";
const add_rate_limited_funds = "add_rate_limited_funds:";

export type Request = {
};
export type Response = {
};
