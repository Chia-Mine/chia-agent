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
exports.on_message_from_wallet = exports.on_state_changed_of_wallet = exports.state_changed_command_of_wallet = exports.chia_wallet_service = void 0;
const types_1 = require("../../types");
exports.chia_wallet_service = "chia_wallet";
exports.state_changed_command_of_wallet = "state_changed";
function on_state_changed_of_wallet(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_wallet_service && e.command === exports.state_changed_command_of_wallet) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.state_changed_command_of_wallet, messageListener);
    });
}
exports.on_state_changed_of_wallet = on_state_changed_of_wallet;
function on_message_from_wallet(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_wallet_service) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.state_changed_command_of_wallet, messageListener);
    });
}
exports.on_message_from_wallet = on_message_from_wallet;
