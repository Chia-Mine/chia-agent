import { WalletInfo } from "../../chia/wallet/wallet_info";
import { Coin } from "../../chia/types/blockchain_format/coin";
import { bool, bytes, False, int, Optional, str, True, uint128, uint32, uint64, uint8 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { TransactionRecord } from "../../chia/wallet/transaction_record";
import { SpendBundle } from "../../chia/types/spend_bundle";
import { BackupInfo } from "../../chia/wallet/util/backup_utils";
import { TRPCAgent } from "../../../rpc";
import { PoolWalletInfo } from "../../chia/pools/pool_wallet_info";
import { TradeRecordInJson } from "../../chia/wallet/util/trade_utils";
export declare const chia_wallet_service = "chia_wallet";
export declare type chia_wallet_service = typeof chia_wallet_service;
export declare const log_in_command = "log_in";
export declare type log_in_command = typeof log_in_command;
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
    success: False;
    error: "not_initialized" | "Unknown Error";
} | {
    backup_info: BackupInfo;
    backup_path: str;
};
export declare function log_in(agent: TRPCAgent, data: TLoginRequest): Promise<TLoginResponse>;
export declare const get_public_keys_command = "get_public_keys";
export declare type get_public_keys_command = typeof get_public_keys_command;
export declare type TGetPublicKeysRequest = {};
export declare type TGetPublicKeysResponse = {
    public_key_fingerprints: int[];
};
export declare function get_public_keys(agent: TRPCAgent): Promise<TGetPublicKeysResponse>;
export declare const get_private_key_command = "get_private_key";
export declare type get_private_key_command = typeof get_private_key_command;
export declare type TGetPrivateKeyRequest = {
    fingerprint: int;
};
export declare type TGetPrivateKeyResponse = {
    private_key: {
        fingerprint: int;
        sk: str;
        pk: str;
        seed: Optional<str>;
    };
} | {
    success: False;
    private_key: {
        fingerprint: int;
    };
};
export declare function get_private_key(agent: TRPCAgent, data: TGetPrivateKeyRequest): Promise<TGetPrivateKeyResponse>;
export declare const generate_mnemonic_command = "generate_mnemonic";
export declare type generate_mnemonic_command = typeof generate_mnemonic_command;
export declare type TGenerateMnemonicRequest = {};
export declare type TGenerateMnemonicResponse = {
    mnemonic: str[];
};
export declare function generate_mnemonic(agent: TRPCAgent): Promise<TGenerateMnemonicResponse>;
export declare const add_key_command = "add_key";
export declare type add_key_command = typeof add_key_command;
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
export declare function add_key(agent: TRPCAgent, data: TAddKeyRequest): Promise<TAddKeyResponse>;
export declare const delete_key_command = "delete_key";
export declare type delete_key_command = typeof delete_key_command;
export declare type TDeleteKeyRequest = {
    fingerprint: int;
};
export declare type TDeleteKeyResponse = {};
export declare function delete_key(agent: TRPCAgent, data: TDeleteKeyRequest): Promise<TDeleteKeyResponse>;
export declare const delete_all_keys_command = "delete_all_keys";
export declare type delete_all_keys_command = typeof delete_all_keys_command;
export declare type TDeleteAllKeysRequest = {};
export declare type TDeleteAllKeysResponse = {};
export declare function delete_all_keys(agent: TRPCAgent): Promise<TDeleteAllKeysResponse>;
export declare const get_sync_status_command = "get_sync_status";
export declare type get_sync_status_command = typeof get_sync_status_command;
export declare type TGetSyncStatusRequest = {};
export declare type TGetSyncStatusResponse = {
    synced: bool;
    syncing: bool;
    genesis_initialized: bool;
};
export declare function get_sync_status(agent: TRPCAgent): Promise<TGetSyncStatusResponse>;
export declare const get_height_info_command = "get_height_info";
export declare type get_height_info_command = typeof get_height_info_command;
export declare type TGetHeightInfoRequest = {};
export declare type TGetHeightInfoResponse = {
    height: uint32;
};
export declare function get_height_info(agent: TRPCAgent): Promise<TGetHeightInfoResponse>;
export declare const farm_block_command = "farm_block";
export declare type farm_block_command = typeof farm_block_command;
export declare type TFarmBlockRequest = {
    address: str;
};
export declare type TFarmBlockResponse = {};
export declare function farm_block(agent: TRPCAgent, data: TFarmBlockRequest): Promise<TFarmBlockResponse>;
export declare const get_initial_freeze_period_command_of_wallet = "get_initial_freeze_period";
export declare type get_initial_freeze_period_command_of_wallet = typeof get_initial_freeze_period_command_of_wallet;
export declare type TGetInitialFreezePeriodRequestOfWallet = {};
export declare type TGetInitialFreezePeriodResponseOfWallet = {
    INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export declare function get_initial_freeze_period_of_wallet(agent: TRPCAgent): Promise<TGetInitialFreezePeriodResponseOfWallet>;
export declare const get_network_info_command_of_wallet = "get_network_info";
export declare type get_network_info_command_of_wallet = typeof get_network_info_command_of_wallet;
export declare type TGetNetworkInfoRequestOfWallet = {};
export declare type TGetNetworkInfoResponseOfWallet = {
    network_name: str;
    network_prefix: str;
};
export declare function get_network_info_of_wallet(agent: TRPCAgent): Promise<TGetNetworkInfoResponseOfWallet>;
export declare const get_wallets_command = "get_wallets";
export declare type get_wallets_command = typeof get_wallets_command;
export declare type TGetWalletsRequest = {};
export declare type TGetWalletsResponse = {
    wallets: WalletInfo[];
};
export declare function get_wallets(agent: TRPCAgent): Promise<TGetWalletsResponse>;
export declare type TCreate_New_CC_WalletRequest = {
    host: str;
    fee?: uint64;
    wallet_type: "cc_wallet";
    mode: "new";
    amount: uint64;
} | {
    host: str;
    fee?: uint64;
    wallet_type: "cc_wallet";
    mode: "existing";
    colour: str;
};
export declare type TCreate_New_CC_WalletResponse = {
    type: uint8;
    colour: str;
    wallet_id: uint32;
} | {
    type: uint8;
};
export declare type TCreate_New_RL_WalletRequest = {
    host: str;
    fee?: uint64;
    wallet_type: "rl_wallet";
    rl_type: "admin";
    interval: int;
    limit: int;
    pubkey: str;
    amount: int;
} | {
    host: str;
    fee?: uint64;
    wallet_type: "rl_wallet";
    rl_type: "user";
};
export declare type TCreate_New_RL_WalletResponse = {
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
export declare type TCreate_New_DID_WalletRequest = {
    host: str;
    fee?: uint64;
    wallet_type: "did_wallet";
    did_type: "new";
    backup_dids: str[];
    num_of_backup_ids_needed: uint64;
    amount: int;
} | {
    host: str;
    fee?: uint64;
    wallet_type: "did_wallet";
    did_type: "recovery";
    filename: str;
};
export declare type TCreate_New_DID_WalletResponse = {
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
    coin_list: [bytes32, bytes32, uint64];
    newpuzhash: str;
    pubkey: str;
    backup_dids: bytes[];
    num_verifications_required: uint64;
};
export declare type TCreate_New_Pool_WalletRequest = {
    host: str;
    fee?: uint64;
    wallet_type: "pool_wallet";
    mode: "new";
    initial_target_state: {
        state: "SELF_POOLING" | "FARMING_TO_POOL";
        target_puzzle_hash: str;
        pool_url: str;
        relative_lock_height: uint32;
    };
} | {
    host: str;
    fee?: uint64;
    wallet_type: "pool_wallet";
    mode: "recovery";
};
export declare type TCreate_New_Pool_WalletResponse = {
    transaction: TransactionRecord;
};
export declare const create_new_wallet_command = "create_new_wallet";
export declare type create_new_wallet_command = typeof create_new_wallet_command;
export declare type TCreateNewWalletRequest = TCreate_New_CC_WalletRequest | TCreate_New_RL_WalletRequest | TCreate_New_DID_WalletRequest | TCreate_New_Pool_WalletRequest;
export declare type TCreateNewWalletResponse = TCreate_New_CC_WalletResponse | TCreate_New_RL_WalletResponse | TCreate_New_DID_WalletResponse | TCreate_New_Pool_WalletResponse;
export declare function create_new_wallet(agent: TRPCAgent, data: TCreateNewWalletRequest): Promise<TCreateNewWalletResponse>;
export declare const get_wallet_balance_command = "get_wallet_balance";
export declare type get_wallet_balance_command = typeof get_wallet_balance_command;
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
export declare function get_wallet_balance(agent: TRPCAgent, data: TGetWalletBalanceRequest): Promise<TGetWalletBalanceResponse>;
export declare const get_transaction_command = "get_transaction";
export declare type get_transaction_command = typeof get_transaction_command;
export declare type TGetTransactionRequest = {
    transaction_id: str;
};
export declare type TGetTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare function get_transaction(agent: TRPCAgent, data: TGetTransactionRequest): Promise<TGetTransactionResponse>;
export declare const get_transactions_command = "get_transactions";
export declare type get_transactions_command = typeof get_transactions_command;
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
export declare function get_transactions(agent: TRPCAgent, data: TGetTransactionsRequest): Promise<TGetTransactionsResponse>;
export declare const get_next_address_command = "get_next_address";
export declare type get_next_address_command = typeof get_next_address_command;
export declare type TGetNextAddressRequest = {
    new_address: bool;
    wallet_id: int;
};
export declare type TGetNextAddressResponse = {
    wallet_id: uint32;
    address: str;
};
export declare function get_next_address(agent: TRPCAgent, data: TGetNextAddressRequest): Promise<TGetNextAddressResponse>;
export declare const send_transaction_command = "send_transaction";
export declare type send_transaction_command = typeof send_transaction_command;
export declare type TSendTransactionRequest = {
    wallet_id: int;
    amount: int;
    fee?: int;
    address: str;
};
export declare type TSendTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare function send_transaction(agent: TRPCAgent, data: TSendTransactionRequest): Promise<TSendTransactionResponse>;
export declare const send_transaction_multi_command = "send_transaction_multi";
export declare type send_transaction_multi_command = typeof send_transaction_multi_command;
export declare type TSendTransactionMultiRequest = {
    wallet_id: uint32;
    additions: TAdditions[];
    fee?: uint64;
    coins?: Coin[];
};
export declare type TSendTransactionMultiResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare function send_transaction_multi(agent: TRPCAgent, data: TSendTransactionMultiRequest): Promise<TSendTransactionMultiResponse>;
export declare const create_backup_command = "create_backup";
export declare type create_backup_command = typeof create_backup_command;
export declare type TCreateBackupRequest = {
    file_path: str;
};
export declare type TCreateBackupResponse = {};
export declare function create_backup(agent: TRPCAgent, data: TCreateBackupRequest): Promise<TCreateBackupResponse>;
export declare const get_transaction_count_command = "get_transaction_count";
export declare type get_transaction_count_command = typeof get_transaction_count_command;
export declare type TGetTransactionCountRequest = {
    wallet_id: int;
};
export declare type TGetTransactionCountResponse = {
    wallet_id: int;
    count: int;
};
export declare function get_transaction_count(agent: TRPCAgent, data: TGetTransactionCountRequest): Promise<TGetTransactionCountResponse>;
export declare const get_farmed_amount_command = "get_farmed_amount";
export declare type get_farmed_amount_command = typeof get_farmed_amount_command;
export declare type TGetFarmedAmountRequest = {};
export declare type TGetFarmedAmountResponse = {
    farmed_amount: int;
    pool_reward_amount: int;
    farmer_reward_amount: int;
    fee_amount: int;
    last_height_farmed: int;
};
export declare function get_farmed_amount(agent: TRPCAgent): Promise<TGetFarmedAmountResponse>;
export declare type TAdditions = {
    amount: uint64;
    puzzle_hash: str;
};
export declare const create_signed_transaction_command = "create_signed_transaction";
export declare type create_signed_transaction_command = typeof create_signed_transaction_command;
export declare type TCreateSignedTransactionRequest = {
    additions: TAdditions[];
    fee?: uint64;
    coins?: Coin[];
};
export declare type TCreateSignedTransactionResponse = {
    signed_tx: TransactionRecord;
};
export declare function create_signed_transaction(agent: TRPCAgent, data: TCreateSignedTransactionRequest): Promise<TCreateSignedTransactionResponse>;
export declare const cc_set_name_command = "cc_set_name";
export declare type cc_set_name_command = typeof cc_set_name_command;
export declare type TCcSetNameRequest = {
    wallet_id: int;
    name: str;
};
export declare type TCcSetNameResponse = {
    wallet_id: int;
};
export declare function cc_set_name(agent: TRPCAgent, data: TCcSetNameRequest): Promise<TCcSetNameResponse>;
export declare const cc_get_name_command = "cc_get_name";
export declare type cc_get_name_command = typeof cc_get_name_command;
export declare type TCcGetNameRequest = {
    wallet_id: int;
};
export declare type TCcGetNameResponse = {
    wallet_id: int;
    name: str;
};
export declare function cc_get_name(agent: TRPCAgent, data: TCcGetNameRequest): Promise<TCcGetNameResponse>;
export declare const cc_spend_command = "cc_spend";
export declare type cc_spend_command = typeof cc_spend_command;
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
export declare function cc_spend(agent: TRPCAgent, data: TCcSpendRequest): Promise<TCcSpendResponse>;
export declare const cc_get_colour_command = "cc_get_colour";
export declare type cc_get_colour_command = typeof cc_get_colour_command;
export declare type TCcGetColourRequest = {
    wallet_id: int;
};
export declare type TCcGetColourResponse = {
    colour: str;
    wallet_id: int;
};
export declare function cc_get_colour(agent: TRPCAgent, data: TCcGetColourRequest): Promise<TCcGetColourResponse>;
export declare const create_offer_for_ids_command = "create_offer_for_ids";
export declare type create_offer_for_ids_command = typeof create_offer_for_ids_command;
export declare type TCreateOfferForIdsRequest = {
    ids: Record<int, int>;
    filename: str;
};
export declare type TCreateOfferForIdsResponse = {};
export declare function create_offer_for_ids(agent: TRPCAgent, data: TCreateOfferForIdsRequest): Promise<TCreateOfferForIdsResponse>;
export declare const get_discrepancies_for_offer_command = "get_discrepancies_for_offer";
export declare type get_discrepancies_for_offer_command = typeof get_discrepancies_for_offer_command;
export declare type TGetDiscrepanciesForOfferRequest = {
    filename: str;
};
export declare type TGetDiscrepanciesForOfferResponse = {
    discrepancies: Optional<Record<str, int>>;
};
export declare function get_discrepancies_for_offer(agent: TRPCAgent, data: TGetDiscrepanciesForOfferRequest): Promise<TGetDiscrepanciesForOfferResponse>;
export declare const respond_to_offer_command = "respond_to_offer";
export declare type respond_to_offer_command = typeof respond_to_offer_command;
export declare type TResponseToOfferRequest = {
    filename: str;
};
export declare type TResponseToOfferResponse = {};
export declare function respond_to_offer(agent: TRPCAgent, data: TResponseToOfferRequest): Promise<TResponseToOfferResponse>;
export declare const get_trade_command = "get_trade";
export declare type get_trade_command = typeof get_trade_command;
export declare type TGetTradeRequest = {
    trade_id: bytes;
};
export declare type TGetTradeResponse = {
    trade: TradeRecordInJson;
};
export declare function get_trade(agent: TRPCAgent, data: TGetTradeRequest): Promise<TGetTradeResponse>;
export declare const get_all_trades_command = "get_all_trades";
export declare type get_all_trades_command = typeof get_all_trades_command;
export declare type TGetAllTradesRequest = {};
export declare type TGetAllTradesResponse = {
    trades: TradeRecordInJson[];
};
export declare function get_all_trades(agent: TRPCAgent): Promise<TGetAllTradesResponse>;
export declare const cancel_trade_command = "cancel_trade";
export declare type cancel_trade_command = typeof cancel_trade_command;
export declare type TCancelTradeRequest = {
    secure: bool;
    trade_id: str;
};
export declare type TCancelTradeResponse = {};
export declare function cancel_trade(agent: TRPCAgent, data: TCancelTradeRequest): Promise<TCancelTradeResponse>;
export declare const did_update_recovery_ids_command = "did_update_recovery_ids";
export declare type did_update_recovery_ids_command = typeof did_update_recovery_ids_command;
export declare type TDidUpdateRecoveryIdsRequest = {
    wallet_id: int;
    new_list: str[];
    num_verifications_required?: uint64;
};
export declare type TDidUpdateRecoveryIdsResponse = {
    success: bool;
};
export declare function did_update_recovery_ids(agent: TRPCAgent, data: TDidUpdateRecoveryIdsRequest): Promise<TDidUpdateRecoveryIdsResponse>;
export declare const did_spend_command = "did_spend";
export declare type did_spend_command = typeof did_spend_command;
export declare type TDidSpendRequest = {
    wallet_id: int;
    puzzlehash: bytes32;
};
export declare type TDidSpendResponse = {
    success: bool;
};
export declare function did_spend(agent: TRPCAgent, data: TDidSpendRequest): Promise<TDidSpendResponse>;
export declare const did_get_pubkey_command = "did_get_pubkey";
export declare type did_get_pubkey_command = typeof did_get_pubkey_command;
export declare type TDidGetPubkeyRequest = {
    wallet_id: int;
};
export declare type TDidGetPubkeyResponse = {
    success: bool;
    pubkey: bytes;
};
export declare function did_get_pubkey(agent: TRPCAgent): Promise<TDidGetPubkeyResponse>;
export declare const did_get_did_command = "did_get_did";
export declare type did_get_did_command = typeof did_get_did_command;
export declare type TDidGetDidRequest = {
    wallet_id: int;
};
export declare type TDidGetDidResponse = {
    success: bool;
    wallet_id: int;
    my_did: str;
    coin_id?: bytes32;
};
export declare function did_get_did(agent: TRPCAgent, data: TDidGetDidRequest): Promise<TDidGetDidResponse>;
export declare const did_recovery_spend_command = "did_recovery_spend";
export declare type did_recovery_spend_command = typeof did_recovery_spend_command;
export declare type TDidRecoverySpendRequest = {
    wallet_id: int;
    attest_filenames: str[];
    pubkey?: str;
    puzhash?: str;
};
export declare type TDidRecoverySpendResponse = {
    success: SpendBundle;
};
export declare function did_recovery_spend(agent: TRPCAgent, data: TDidRecoverySpendRequest): Promise<TDidRecoverySpendResponse>;
export declare const did_get_recovery_list_command = "did_get_recovery_list";
export declare type did_get_recovery_list_command = typeof did_get_recovery_list_command;
export declare type TDidGetRecoveryListRequest = {
    wallet_id: int;
};
export declare type TDidGetRecoveryListResponse = {
    success: bool;
    wallet_id: int;
    recover_list: str[];
    num_required: uint64;
};
export declare function did_get_recovery_list(agent: TRPCAgent, data: TDidGetRecoveryListRequest): Promise<TDidGetRecoveryListResponse>;
export declare const did_create_attest_command = "did_create_attest";
export declare type did_create_attest_command = typeof did_create_attest_command;
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
export declare function did_create_attest(agent: TRPCAgent, data: TDidCreateAttestRequest): Promise<TDidCreateAttestResponse>;
export declare const did_get_information_needed_for_recovery_command = "did_get_information_needed_for_recovery";
export declare type did_get_information_needed_for_recovery_command = typeof did_get_information_needed_for_recovery_command;
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
export declare function did_get_information_needed_for_recovery(agent: TRPCAgent, data: TDidGetInformationNeededForRecoveryRequest): Promise<TDidGetInformationNeededForRecoveryResponse>;
export declare const did_create_backup_file_command = "did_create_backup_file";
export declare type did_create_backup_file_command = typeof did_create_backup_file_command;
export declare type TDidCreateBackupFileRequest = {
    wallet_id: int;
    filename: str;
};
export declare type TDidCreateBackupFileResponse = {
    wallet_id: int;
    success: bool;
};
export declare function did_create_backup_file(agent: TRPCAgent, data: TDidCreateBackupFileRequest): Promise<TDidCreateBackupFileResponse>;
export declare const rl_set_user_info_command = "rl_set_user_info";
export declare type rl_set_user_info_command = typeof rl_set_user_info_command;
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
export declare function rl_set_user_info(agent: TRPCAgent, data: TRlSetUserInfoRequest): Promise<TRlSetUserInfoResponse>;
export declare const send_clawback_transaction_command = "send_clawback_transaction:";
export declare type send_clawback_transaction_command = typeof send_clawback_transaction_command;
export declare type TSendClawbackTransactionRequest = {
    wallet_id: int;
    fee: int;
};
export declare type TSendClawbackTransactionResponse = {
    transaction: TransactionRecord;
    transaction_id: TransactionRecord["name"];
};
export declare function send_clawback_transaction(agent: TRPCAgent, data: TSendClawbackTransactionRequest): Promise<TSendClawbackTransactionResponse>;
export declare const add_rate_limited_funds_command = "add_rate_limited_funds:";
export declare type add_rate_limited_funds_command = typeof add_rate_limited_funds_command;
export declare type TAddRateLimitedFundsRequest = {
    wallet_id: uint32;
    amount: uint64;
    fee: uint64;
};
export declare type TAddRateLimitedFundsResponse = {
    status: "SUCCESS";
};
export declare function add_rate_limited_funds(agent: TRPCAgent, data: TAddRateLimitedFundsRequest): Promise<TAddRateLimitedFundsResponse>;
export declare const pw_join_pool_command = "pw_join_pool";
export declare type pw_join_pool_command = typeof pw_join_pool_command;
export declare type TPwJoinPoolRequest = {
    wallet_id: uint32;
    target_puzzlehash?: string;
    pool_url: Optional<str>;
    relative_lock_height: uint32;
};
export declare type TPwJoinPoolResponse = {
    transaction: TransactionRecord;
};
export declare function pw_join_pool(agent: TRPCAgent, data: TPwJoinPoolRequest): Promise<TPwJoinPoolResponse>;
export declare const pw_self_pool_command = "pw_self_pool";
export declare type pw_self_pool_command = typeof pw_self_pool_command;
export declare type TPwSelfPoolRequest = {
    wallet_id: uint32;
};
export declare type TPwSelfPoolResponse = {
    transaction: TransactionRecord;
};
export declare function pw_self_pool(agent: TRPCAgent, data: TPwSelfPoolRequest): Promise<TPwSelfPoolResponse>;
export declare const pw_absorb_rewards_command = "pw_absorb_rewards";
export declare type pw_absorb_rewards_command = typeof pw_absorb_rewards_command;
export declare type TPwAbsorbRewardsRequest = {
    wallet_id: uint32;
    fee: uint64;
};
export declare type TPwAbsorbRewardsResponse = {
    state: PoolWalletInfo;
    transaction: TransactionRecord;
};
export declare function pw_absorb_rewards(agent: TRPCAgent, data: TPwAbsorbRewardsRequest): Promise<TPwAbsorbRewardsResponse>;
export declare const pw_status_command = "pw_status";
export declare type pw_status_command = typeof pw_status_command;
export declare type TPwStatusRequest = {
    wallet_id: uint32;
};
export declare type TPwStatusResponse = {
    state: PoolWalletInfo;
};
export declare function pw_status(agent: TRPCAgent, data: TPwStatusRequest): Promise<TPwStatusResponse>;
