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
exports.on_message_from_full_node = exports.on_get_blockchain_state = exports.get_blockchain_state_command = exports.chia_full_node_service = void 0;
const types_1 = require("../../types");
exports.chia_full_node_service = "chia_full_node";
exports.get_blockchain_state_command = "get_blockchain_state";
function on_get_blockchain_state(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_full_node_service && e.command === exports.get_blockchain_state_command) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_full_node_service, messageListener);
    });
}
exports.on_get_blockchain_state = on_get_blockchain_state;
function on_message_from_full_node(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_full_node_service) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_full_node_service, messageListener);
    });
}
exports.on_message_from_full_node = on_message_from_full_node;
