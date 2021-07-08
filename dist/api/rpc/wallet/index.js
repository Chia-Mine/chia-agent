"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create_signed_transaction_command = exports.get_farmed_amount = exports.get_farmed_amount_command = exports.get_transaction_count = exports.get_transaction_count_command = exports.create_backup = exports.create_backup_command = exports.send_transaction_multi = exports.send_transaction_multi_command = exports.send_transaction = exports.send_transaction_command = exports.get_next_address = exports.get_next_address_command = exports.get_transactions = exports.get_transactions_command = exports.get_transaction = exports.get_transaction_command = exports.get_wallet_balance = exports.get_wallet_balance_command = exports.create_new_wallet = exports.create_new_wallet_command = exports.get_wallets = exports.get_wallets_command = exports.get_network_info_of_wallet = exports.get_network_info_command_of_wallet = exports.get_initial_freeze_period_of_wallet = exports.get_initial_freeze_period_command_of_wallet = exports.farm_block = exports.farm_block_command = exports.get_height_info = exports.get_height_info_command = exports.get_sync_status = exports.get_sync_status_command = exports.delete_all_keys = exports.delete_all_keys_command = exports.check_delete_key = exports.check_delete_key_command = exports.delete_key = exports.delete_key_command = exports.add_key = exports.add_key_command = exports.generate_mnemonic = exports.generate_mnemonic_command = exports.get_private_key = exports.get_private_key_command = exports.get_public_keys = exports.get_public_keys_command = exports.log_in = exports.log_in_command = exports.chia_wallet_service = void 0;
exports.pw_self_pool_command = exports.pw_join_pool = exports.pw_join_pool_command = exports.add_rate_limited_funds = exports.add_rate_limited_funds_command = exports.send_clawback_transaction = exports.send_clawback_transaction_command = exports.rl_set_user_info = exports.rl_set_user_info_command = exports.did_create_backup_file = exports.did_create_backup_file_command = exports.did_get_information_needed_for_recovery = exports.did_get_information_needed_for_recovery_command = exports.did_create_attest = exports.did_create_attest_command = exports.did_get_recovery_list = exports.did_get_recovery_list_command = exports.did_recovery_spend = exports.did_recovery_spend_command = exports.did_get_did = exports.did_get_did_command = exports.did_get_pubkey = exports.did_get_pubkey_command = exports.did_spend = exports.did_spend_command = exports.did_update_recovery_ids = exports.did_update_recovery_ids_command = exports.cancel_trade = exports.cancel_trade_command = exports.get_all_trades = exports.get_all_trades_command = exports.get_trade = exports.get_trade_command = exports.respond_to_offer = exports.respond_to_offer_command = exports.get_discrepancies_for_offer = exports.get_discrepancies_for_offer_command = exports.create_offer_for_ids = exports.create_offer_for_ids_command = exports.cc_get_colour = exports.cc_get_colour_command = exports.cc_spend = exports.cc_spend_command = exports.cc_get_name = exports.cc_get_name_command = exports.cc_set_name = exports.cc_set_name_command = exports.delete_unconfirmed_transactions = exports.delete_unconfirmed_transactions_command = exports.create_signed_transaction = void 0;
exports.pw_status = exports.pw_status_command = exports.pw_absorb_rewards = exports.pw_absorb_rewards_command = exports.pw_self_pool = void 0;
exports.chia_wallet_service = "chia_wallet";
// # Key management
exports.log_in_command = "log_in";
function log_in(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.log_in_command, data);
    });
}
exports.log_in = log_in;
exports.get_public_keys_command = "get_public_keys";
function get_public_keys(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_public_keys_command);
    });
}
exports.get_public_keys = get_public_keys;
exports.get_private_key_command = "get_private_key";
function get_private_key(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_private_key_command, data);
    });
}
exports.get_private_key = get_private_key;
exports.generate_mnemonic_command = "generate_mnemonic";
function generate_mnemonic(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.generate_mnemonic_command);
    });
}
exports.generate_mnemonic = generate_mnemonic;
exports.add_key_command = "add_key";
function add_key(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.add_key_command, data);
    });
}
exports.add_key = add_key;
exports.delete_key_command = "delete_key";
function delete_key(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.delete_key_command, data);
    });
}
exports.delete_key = delete_key;
exports.check_delete_key_command = "check_delete_key";
function check_delete_key(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.check_delete_key_command, data);
    });
}
exports.check_delete_key = check_delete_key;
exports.delete_all_keys_command = "delete_all_keys";
function delete_all_keys(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.delete_all_keys_command);
    });
}
exports.delete_all_keys = delete_all_keys;
// # Wallet node
exports.get_sync_status_command = "get_sync_status";
function get_sync_status(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_sync_status_command);
    });
}
exports.get_sync_status = get_sync_status;
exports.get_height_info_command = "get_height_info";
function get_height_info(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_height_info_command);
    });
}
exports.get_height_info = get_height_info;
exports.farm_block_command = "farm_block";
function farm_block(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.farm_block_command, data);
    });
}
exports.farm_block = farm_block;
exports.get_initial_freeze_period_command_of_wallet = "get_initial_freeze_period";
function get_initial_freeze_period_of_wallet(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_initial_freeze_period_command_of_wallet);
    });
}
exports.get_initial_freeze_period_of_wallet = get_initial_freeze_period_of_wallet;
exports.get_network_info_command_of_wallet = "get_network_info";
function get_network_info_of_wallet(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_network_info_command_of_wallet);
    });
}
exports.get_network_info_of_wallet = get_network_info_of_wallet;
// # Wallet management
exports.get_wallets_command = "get_wallets";
function get_wallets(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_wallets_command);
    });
}
exports.get_wallets = get_wallets;
exports.create_new_wallet_command = "create_new_wallet";
function create_new_wallet(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.create_new_wallet_command, data);
    });
}
exports.create_new_wallet = create_new_wallet;
// # Wallet
exports.get_wallet_balance_command = "get_wallet_balance";
function get_wallet_balance(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_wallet_balance_command, data);
    });
}
exports.get_wallet_balance = get_wallet_balance;
exports.get_transaction_command = "get_transaction";
function get_transaction(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_transaction_command, data);
    });
}
exports.get_transaction = get_transaction;
exports.get_transactions_command = "get_transactions";
function get_transactions(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_transactions_command, data);
    });
}
exports.get_transactions = get_transactions;
exports.get_next_address_command = "get_next_address";
function get_next_address(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_next_address_command, data);
    });
}
exports.get_next_address = get_next_address;
exports.send_transaction_command = "send_transaction";
function send_transaction(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.send_transaction_command, data);
    });
}
exports.send_transaction = send_transaction;
exports.send_transaction_multi_command = "send_transaction_multi";
function send_transaction_multi(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.send_transaction_multi_command, data);
    });
}
exports.send_transaction_multi = send_transaction_multi;
exports.create_backup_command = "create_backup";
function create_backup(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.create_backup_command, data);
    });
}
exports.create_backup = create_backup;
exports.get_transaction_count_command = "get_transaction_count";
function get_transaction_count(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_transaction_count_command, data);
    });
}
exports.get_transaction_count = get_transaction_count;
exports.get_farmed_amount_command = "get_farmed_amount";
function get_farmed_amount(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_farmed_amount_command);
    });
}
exports.get_farmed_amount = get_farmed_amount;
exports.create_signed_transaction_command = "create_signed_transaction";
function create_signed_transaction(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.create_signed_transaction_command, data);
    });
}
exports.create_signed_transaction = create_signed_transaction;
exports.delete_unconfirmed_transactions_command = "delete_unconfirmed_transactions";
function delete_unconfirmed_transactions(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.delete_unconfirmed_transactions_command, data);
    });
}
exports.delete_unconfirmed_transactions = delete_unconfirmed_transactions;
// # Coloured coins and trading
exports.cc_set_name_command = "cc_set_name";
function cc_set_name(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.cc_set_name_command, data);
    });
}
exports.cc_set_name = cc_set_name;
exports.cc_get_name_command = "cc_get_name";
function cc_get_name(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.cc_get_name_command, data);
    });
}
exports.cc_get_name = cc_get_name;
exports.cc_spend_command = "cc_spend";
function cc_spend(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.cc_spend_command, data);
    });
}
exports.cc_spend = cc_spend;
exports.cc_get_colour_command = "cc_get_colour";
function cc_get_colour(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.cc_get_colour_command, data);
    });
}
exports.cc_get_colour = cc_get_colour;
exports.create_offer_for_ids_command = "create_offer_for_ids";
function create_offer_for_ids(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.create_offer_for_ids_command, data);
    });
}
exports.create_offer_for_ids = create_offer_for_ids;
exports.get_discrepancies_for_offer_command = "get_discrepancies_for_offer";
function get_discrepancies_for_offer(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_discrepancies_for_offer_command, data);
    });
}
exports.get_discrepancies_for_offer = get_discrepancies_for_offer;
exports.respond_to_offer_command = "respond_to_offer";
function respond_to_offer(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.respond_to_offer_command, data);
    });
}
exports.respond_to_offer = respond_to_offer;
exports.get_trade_command = "get_trade";
function get_trade(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_trade_command, data);
    });
}
exports.get_trade = get_trade;
exports.get_all_trades_command = "get_all_trades";
function get_all_trades(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.get_all_trades_command);
    });
}
exports.get_all_trades = get_all_trades;
exports.cancel_trade_command = "cancel_trade";
function cancel_trade(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.cancel_trade_command, data);
    });
}
exports.cancel_trade = cancel_trade;
// # DID Wallet
exports.did_update_recovery_ids_command = "did_update_recovery_ids";
function did_update_recovery_ids(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_update_recovery_ids_command, data);
    });
}
exports.did_update_recovery_ids = did_update_recovery_ids;
exports.did_spend_command = "did_spend";
function did_spend(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_spend_command, data);
    });
}
exports.did_spend = did_spend;
exports.did_get_pubkey_command = "did_get_pubkey";
function did_get_pubkey(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_get_pubkey_command);
    });
}
exports.did_get_pubkey = did_get_pubkey;
exports.did_get_did_command = "did_get_did";
function did_get_did(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_get_did_command, data);
    });
}
exports.did_get_did = did_get_did;
exports.did_recovery_spend_command = "did_recovery_spend";
function did_recovery_spend(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_recovery_spend_command, data);
    });
}
exports.did_recovery_spend = did_recovery_spend;
exports.did_get_recovery_list_command = "did_get_recovery_list";
function did_get_recovery_list(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_get_recovery_list_command, data);
    });
}
exports.did_get_recovery_list = did_get_recovery_list;
exports.did_create_attest_command = "did_create_attest";
function did_create_attest(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_create_attest_command, data);
    });
}
exports.did_create_attest = did_create_attest;
exports.did_get_information_needed_for_recovery_command = "did_get_information_needed_for_recovery";
function did_get_information_needed_for_recovery(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_get_information_needed_for_recovery_command, data);
    });
}
exports.did_get_information_needed_for_recovery = did_get_information_needed_for_recovery;
exports.did_create_backup_file_command = "did_create_backup_file";
function did_create_backup_file(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.did_create_backup_file_command, data);
    });
}
exports.did_create_backup_file = did_create_backup_file;
// # RL wallet
exports.rl_set_user_info_command = "rl_set_user_info";
function rl_set_user_info(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.rl_set_user_info_command, data);
    });
}
exports.rl_set_user_info = rl_set_user_info;
exports.send_clawback_transaction_command = "send_clawback_transaction:";
function send_clawback_transaction(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.send_clawback_transaction_command, data);
    });
}
exports.send_clawback_transaction = send_clawback_transaction;
exports.add_rate_limited_funds_command = "add_rate_limited_funds:";
function add_rate_limited_funds(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.add_rate_limited_funds_command, data);
    });
}
exports.add_rate_limited_funds = add_rate_limited_funds;
exports.pw_join_pool_command = "pw_join_pool";
function pw_join_pool(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.pw_join_pool_command, data);
    });
}
exports.pw_join_pool = pw_join_pool;
exports.pw_self_pool_command = "pw_self_pool";
function pw_self_pool(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.pw_self_pool_command, data);
    });
}
exports.pw_self_pool = pw_self_pool;
exports.pw_absorb_rewards_command = "pw_absorb_rewards";
function pw_absorb_rewards(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.pw_absorb_rewards_command, data);
    });
}
exports.pw_absorb_rewards = pw_absorb_rewards;
exports.pw_status_command = "pw_status";
function pw_status(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_wallet_service, exports.pw_status_command, data);
    });
}
exports.pw_status = pw_status;
