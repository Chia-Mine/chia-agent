import { WalletInfo } from "../../chia/wallet/wallet_info";
import { Coin } from "../../chia/types/blockchain_format/coin";
import { bool, bytes, False, int, Optional, str, True, uint128, uint32, uint64, uint8 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { TransactionRecord } from "../../chia/wallet/transaction_record";
import { SpendBundle } from "../../chia/types/spend_bundle";
export declare type WalletBackupData = {
    version: str;
    fingerprint: int;
    timestamp: uint64;
    start_height: Optional<uint32>;
};
export declare type WalletBackupMetadata = {
    timestamp: uint64;
    pubkey: str;
};
export declare type WalletBackup = {
    data: WalletBackupData;
    meta_data: WalletBackupMetadata;
    signature: unknown;
};
export declare type WalletInfoWithTypeName = WalletInfo & {
    type_name: str;
};
export declare type BackupInfo = Pick<WalletBackupData, "version" | "fingerprint" | "timestamp"> & {
    wallets: WalletInfoWithTypeName[];
    backup_host: str;
    downloaded: bool;
};
export declare const log_in = "log_in";
export declare type TLoginRequest = {
    fingerprint: int;
    type: "skip";
    host: str;
} | {
    fingerprint: int;
    type: "restore_backup";
    host: str;
    file_path: str;
};
export declare type TLoginResponse = {
    fingerprint: int;
} | {
    success: false;
    error: "not_initialized" | "Unknown Error";
} | {
    success: false;
    error: "not_initialized";
    backup_info: BackupInfo;
    backup_path: str;
};
export declare const get_public_keys = "get_public_keys";
export declare type TGetPublicKeysRequest = {};
export declare type TGetPublicKeysResponse = {
    public_key_fingerprints: int[];
};
export declare const get_private_key = "get_private_key";
export declare type TGetPrivateKeyRequest = {
    fingerprint: int;
};
export declare type TGetPrivateKeyResponse = {
    "private_key": {
        fingerprint: int;
        sk: str;
        pk: str;
        seed: str;
    };
};
export declare const generate_mnemonic = "generate_mnemonic";
export declare type TGenerateMnemonicRequest = {};
export declare type TGenerateMnemonicResponse = {
    mnemonic: str[];
};
export declare const add_key = "add_key";
export declare type TAddKeyRequest = {
    mnemonic: str[];
    type: "new_wallet" | "skip";
} | {
    mnemonic: str[];
    type: "restore_backup";
    file_path: str;
};
export declare type TAddKeyResponse = {
    success: false;
    error: str;
    word: unknown;
} | {
    fingerprint: int;
};
export declare const delete_key = "delete_key";
export declare type TDeleteKeyRequest = {
    fingerprint: int;
};
export declare type TDeleteKeyResponse = {};
export declare const delete_all_keys = "delete_all_keys";
export declare type TDeleteAllKeysRequest = {};
export declare type TDeleteAllKeysResponse = {};
export declare const get_sync_status = "get_sync_status";
export declare type TGetSyncStatusRequest = {};
export declare type TGetSyncStatusResponse = {
    synced: bool;
    syncing: bool;
    genesis_initialized: bool;
};
export declare const get_height_info = "get_height_info";
export declare type TGetHeightInfoRequest = {};
export declare type TGetHeightInfoResponse = {
    height: uint32;
};
export declare const farm_block = "farm_block";
export declare type TFarmBlockRequest = {
    address: str;
};
export declare type TFarmBlockResponse = {};
export declare const get_initial_freeze_period = "get_initial_freeze_period";
export declare type TGetInitialFreezePeriodRequest = {};
export declare type TGetInitialFreezePeriodResponse = {
    INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export declare const get_network_info = "get_network_info";
export declare type TGetNetworkInfoRequest = {};
export declare type TGetNetworkInfoResponse = {
    network_name: str;
    network_prefix: str;
};
export declare const get_wallets = "get_wallets";
export declare type TGetWalletsRequest = {};
export declare type TGetWalletsResponse = {
    wallets: WalletInfo[];
};
export declare type Create_New_CC_WalletRequest = {
    wallet_type: "cc_wallet";
    mode: "new";
    amount: uint64;
} | {
    wallet_type: "cc_wallet";
    mode: "existing";
    colour: str;
};
export declare type Create_New_RC_WalletRequest = {
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
export declare type Create_New_DID_WalletRequest = {
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
export declare type Create_New_CC_WalletResponse = {
    type: uint8;
    colour: str;
    wallet_id: uint32;
} | {
    type: uint8;
};
export declare type Create_New_RC_WalletResponse = {
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
export declare type Create_New_DID_WalletResponse = {
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
export declare const create_new_wallet = "create_new_wallet";
export declare type TCreateNewWalletRequest = {
    host: str;
} & (Create_New_CC_WalletRequest | Create_New_RC_WalletRequest | Create_New_DID_WalletRequest);
export declare type TCreateNewWalletResponse = Create_New_CC_WalletResponse | Create_New_RC_WalletResponse | Create_New_DID_WalletResponse;
export declare const get_wallet_balance = "get_wallet_balance";
export declare type TGetWalletBalanceRequest = {
    wallet_id: int;
};
export declare type TGetWalletBalanceResponse = {
    wallet_balance: {
        wallet_id: uint32;
        confirmed_wallet_balance: uint128;
        unconfirmed_wallet_balance: uint128;
        spendable_balance: uint128;
        pending_change: uint64;
        max_send_amount: uint64;
        unspent_coin_count: int;
        pending_coin_removal_count: int;
    };
};
export declare const get_transaction = "get_transaction";
export declare type TGetTransactionRequest = {
    transaction_id: bytes32;
};
export declare type TGetTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare const get_transactions = "get_transactions";
export declare type TGetTransactionsRequest = {
    wallet_id: int;
    start?: int;
    end?: int;
};
export declare type TGetTransactionsResponse = {
    transactions: Array<TransactionRecord & {
        to_address: string;
    }>;
    wallet_id: int;
};
export declare const get_next_address = "get_next_address";
export declare type TGetNextAddressRequest = {
    new_address: bool;
    wallet_id: int;
};
export declare type TGetNextAddressResponse = {
    wallet_id: uint32;
    address: str;
};
export declare const send_transaction = "send_transaction";
export declare type TSendTransactionRequest = {
    wallet_id: int;
    amount: int;
    fee: int;
    address: str;
};
export declare type TSendTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare const create_backup = "create_backup";
export declare type TCreateBackupRequest = {
    file_path: str;
};
export declare type TCreateBackupResponse = {};
export declare const get_transaction_count = "get_transaction_count";
export declare type TGetTransactionCountRequest = {
    wallet_id: int;
};
export declare type TGetTransactionCountResponse = {
    wallet_id: int;
    count: int;
};
export declare const get_farmed_amount = "get_farmed_amount";
export declare type TGetFarmedAmountRequest = {};
export declare type TGetFarmedAmountResponse = {
    farmed_amount: int;
    pool_reward_amount: int;
    farmer_reward_amount: int;
    fee_amount: int;
    last_height_farmed: int;
};
export declare type TAdditions = {
    amount: uint64;
    puzzle_hash: str;
};
export declare const create_signed_transaction = "create_signed_transaction";
export declare type TCreateSignedTransactionRequest = {
    additions: TAdditions[];
    fee?: uint64;
    coins?: Coin[];
};
export declare type TCreateSignedTransactionResponse = {
    signed_tx: TransactionRecord;
};
export declare const cc_set_name = "cc_set_name";
export declare type TCcSetNameRequest = {
    wallet_id: int;
    name: str;
};
export declare type TCcSetNameResponse = {
    wallet_id: int;
};
export declare const cc_get_name = "cc_get_name";
export declare type TCcGetNameRequest = {
    wallet_id: int;
};
export declare type TCcGetNameResponse = {
    wallet_id: int;
    name: str;
};
export declare const cc_spend = "cc_spend";
export declare type TCcSpendRequest = {
    wallet_id: int;
    inner_address: str;
    amount: int;
    fee?: uint64;
};
export declare type TCcSpendResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare const cc_get_colour = "cc_get_colour";
export declare type TCcGetColourRequest = {
    wallet_id: int;
};
export declare type TCcGetColourResponse = {
    colour: str;
    wallet_id: int;
};
export declare const create_offer_for_ids = "create_offer_for_ids";
export declare type TCreateOfferForIdsRequest = {
    ids: Record<int, int>;
    filename: str;
};
export declare type TCreateOfferForIdsResponse = {
    discrepancies: Optional<Record<str, int>>;
};
export declare const get_discrepancies_for_offer = "get_discrepancies_for_offer";
export declare type TGetDiscrepanciesForOfferRequest = {
    filename: str;
};
export declare type TGetDiscrepanciesForOfferResponse = {};
export declare const respond_to_offer = "respond_to_offer";
export declare type TResponseToOfferRequest = {
    filename: str;
};
export declare type TResponseToOfferResponse = {};
export declare type TradeRecordInJson = {
    trade_id: str;
    sent: uint32;
    my_offer: bool;
    created_at_time: uint64;
    accepted_at_time: Optional<uint64>;
    confirmed_at_index: uint32;
    status: str;
    offer_dict: Optional<Record<str, int>>;
};
export declare const get_trade = "get_trade";
export declare type TGetTradeRequest = {
    trade_id: bytes;
};
export declare type TGetTradeResponse = {
    trade: TradeRecordInJson;
};
export declare const get_all_trades = "get_all_trades";
export declare type TGetAllTradesRequest = {};
export declare type TGetAllTradesResponse = {
    trades: TradeRecordInJson[];
};
export declare const cancel_trade = "cancel_trade";
export declare type TCancelTradeRequest = {
    secure: bool;
    trade_id: str;
};
export declare type TCancelTradeResponse = {};
export declare const did_update_recovery_ids = "did_update_recovery_ids";
export declare type TDidUpdateRecoveryIdsRequest = {
    wallet_id: int;
    new_list: str[];
    num_verifications_required?: uint64;
};
export declare type TDidUpdateRecoveryIdsResponse = {
    success: bool;
};
export declare const did_spend = "did_spend";
export declare type TDidSpendRequest = {
    wallet_id: int;
    puzzlehash: bytes32;
};
export declare type TDidSpendResponse = {
    success: bool;
};
export declare const did_get_pubkey = "did_get_pubkey";
export declare type TDidGetPubkeyRequest = {};
export declare type TDidGetPubkeyResponse = {
    success: bool;
    pubkey: str;
};
export declare const did_get_did = "did_get_did";
export declare type TDidGetDidRequest = {
    wallet_id: int;
};
export declare type TDidGetDidResponse = {
    success: bool;
    wallet_id: int;
    my_did: str;
    coin_id?: bytes32;
};
export declare const did_recovery_spend = "did_recovery_spend";
export declare type TDidRecoverySpendRequest = {
    wallet_id: int;
    attest_filenames: str[];
    pubkey: str;
    puzhash: str;
};
export declare type TDidRecoverySpendResponse = {
    success: SpendBundle;
};
export declare const did_get_recovery_list = "did_get_recovery_list";
export declare type TDidGetRecoveryListRequest = {
    wallet_id: int;
};
export declare type TDidGetRecoveryListResponse = {
    success: bool;
    wallet_id: int;
    recover_list: str[];
    num_required: uint64;
};
export declare const did_create_attest = "did_create_attest";
export declare type TDidCreateAttestRequest = {
    wallet_id: int;
    coin_name: str;
    puzhash: str;
    filename: str;
};
export declare type TDidCreateAttestResponse = {
    success: True;
    message_spend_bundle: str;
    info: [str, str, uint64];
} | {
    success: False;
};
export declare const did_get_information_needed_for_recovery = "did_get_information_needed_for_recovery";
export declare type TDidGetInformationNeededForRecoveryRequest = {
    wallet_id: int;
};
export declare type TDidGetInformationNeededForRecoveryResponse = {
    success: bool;
    wallet_id: int;
    my_did: str;
    coin_name: str;
    newpuzhash: Optional<bytes32>;
    pubkey: Optional<bytes>;
    backup_dids: bytes[];
};
export declare const did_create_backup_file = "did_create_backup_file";
export declare type TDidCreateBackupFileRequest = {
    wallet_id: int;
    filename: str;
};
export declare type TDidCreateBackupFileResponse = {
    wallet_id: int;
    success: bool;
};
export declare const rl_set_user_info = "rl_set_user_info";
export declare type TRlSetUserInfoRequest = {
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
export declare type TRlSetUserInfoResponse = {};
export declare const send_clawback_transaction = "send_clawback_transaction:";
export declare type TSendClawbackTransactionRequest = {
    wallet_id: int;
    fee: int;
};
export declare type TSendClawbackTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare const add_rate_limited_funds = "add_rate_limited_funds:";
export declare type TAddRateLimitedFundsRequest = {
    wallet_id: uint32;
    amount: uint64;
    fee: uint64;
};
export declare type TAddRateLimitedFundsResponse = {
    status: "SUCCESS";
};
