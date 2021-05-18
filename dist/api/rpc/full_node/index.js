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
exports.get_mempool_item_by_tx_id = exports.get_mempool_item_by_tx_id_command = exports.get_all_mempool_items = exports.get_all_mempool_items_command = exports.get_all_mempool_tx_ids = exports.get_all_mempool_tx_ids_command = exports.push_tx = exports.push_tx_command = exports.get_coin_record_by_name = exports.get_coin_record_by_name_command = exports.get_coin_records_by_puzzle_hashes = exports.get_coin_records_by_puzzle_hashes_command = exports.get_coin_records_by_puzzle_hash = exports.get_coin_records_by_puzzle_hash_command = exports.get_network_info_of_full_node = exports.get_network_info_command_of_full_node = exports.get_initial_freeze_period_of_full_node = exports.get_initial_freeze_period_command_of_full_node = exports.get_additions_and_removals = exports.get_additions_and_removals_command = exports.get_network_space = exports.get_network_space_command = exports.get_unfinished_block_headers = exports.get_unfinished_block_headers_command = exports.get_block_records = exports.get_block_records_command = exports.get_block_record = exports.get_block_record_command = exports.get_block_record_by_height = exports.get_block_record_by_height_command = exports.get_blocks = exports.get_blocks_command = exports.get_block = exports.get_block_command = exports.get_blockchain_state = exports.get_blockchain_state_command = exports.chia_full_node_service = void 0;
exports.chia_full_node_service = "chia_full_node";
exports.get_blockchain_state_command = "get_blockchain_state";
function get_blockchain_state(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_blockchain_state_command);
    });
}
exports.get_blockchain_state = get_blockchain_state;
exports.get_block_command = "get_block";
function get_block(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_block_command, data);
    });
}
exports.get_block = get_block;
exports.get_blocks_command = "get_blocks";
function get_blocks(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_blocks_command, data);
    });
}
exports.get_blocks = get_blocks;
exports.get_block_record_by_height_command = "get_block_record_by_height";
function get_block_record_by_height(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_block_record_by_height_command, data);
    });
}
exports.get_block_record_by_height = get_block_record_by_height;
exports.get_block_record_command = "get_block_record";
function get_block_record(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_block_record_command, data);
    });
}
exports.get_block_record = get_block_record;
exports.get_block_records_command = "get_block_records";
function get_block_records(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_block_records_command, data);
    });
}
exports.get_block_records = get_block_records;
exports.get_unfinished_block_headers_command = "get_unfinished_block_headers";
function get_unfinished_block_headers(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_unfinished_block_headers_command);
    });
}
exports.get_unfinished_block_headers = get_unfinished_block_headers;
exports.get_network_space_command = "get_network_space";
function get_network_space(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_network_space_command, data);
    });
}
exports.get_network_space = get_network_space;
exports.get_additions_and_removals_command = "get_additions_and_removals";
function get_additions_and_removals(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_additions_and_removals_command, data);
    });
}
exports.get_additions_and_removals = get_additions_and_removals;
exports.get_initial_freeze_period_command_of_full_node = "get_initial_freeze_period";
function get_initial_freeze_period_of_full_node(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_initial_freeze_period_command_of_full_node);
    });
}
exports.get_initial_freeze_period_of_full_node = get_initial_freeze_period_of_full_node;
exports.get_network_info_command_of_full_node = "get_network_info";
function get_network_info_of_full_node(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_network_info_command_of_full_node);
    });
}
exports.get_network_info_of_full_node = get_network_info_of_full_node;
exports.get_coin_records_by_puzzle_hash_command = "get_coin_records_by_puzzle_hash";
function get_coin_records_by_puzzle_hash(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_coin_records_by_puzzle_hash_command, data);
    });
}
exports.get_coin_records_by_puzzle_hash = get_coin_records_by_puzzle_hash;
exports.get_coin_records_by_puzzle_hashes_command = "get_coin_records_by_puzzle_hashes";
function get_coin_records_by_puzzle_hashes(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_coin_records_by_puzzle_hashes_command, data);
    });
}
exports.get_coin_records_by_puzzle_hashes = get_coin_records_by_puzzle_hashes;
exports.get_coin_record_by_name_command = "get_coin_record_by_name";
function get_coin_record_by_name(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_coin_record_by_name_command, data);
    });
}
exports.get_coin_record_by_name = get_coin_record_by_name;
exports.push_tx_command = "push_tx";
function push_tx(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.push_tx_command, data);
    });
}
exports.push_tx = push_tx;
exports.get_all_mempool_tx_ids_command = "get_all_mempool_tx_ids";
function get_all_mempool_tx_ids(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_all_mempool_tx_ids_command);
    });
}
exports.get_all_mempool_tx_ids = get_all_mempool_tx_ids;
exports.get_all_mempool_items_command = "get_all_mempool_items";
function get_all_mempool_items(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_all_mempool_items_command);
    });
}
exports.get_all_mempool_items = get_all_mempool_items;
exports.get_mempool_item_by_tx_id_command = "get_mempool_item_by_tx_id";
function get_mempool_item_by_tx_id(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_full_node_service, exports.get_mempool_item_by_tx_id_command, data);
    });
}
exports.get_mempool_item_by_tx_id = get_mempool_item_by_tx_id;
