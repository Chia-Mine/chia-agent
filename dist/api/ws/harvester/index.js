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
exports.on_message_from_harvester = exports.on_get_plots = exports.get_plots_command = exports.chia_harvester_service = void 0;
const types_1 = require("../../types");
exports.chia_harvester_service = "chia_harvester";
exports.get_plots_command = "get_plots";
function on_get_plots(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_harvester_service && e.command === exports.get_plots_command) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_harvester_service, messageListener);
    });
}
exports.on_get_plots = on_get_plots;
function on_message_from_harvester(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_harvester_service) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_harvester_service, messageListener);
    });
}
exports.on_message_from_harvester = on_message_from_harvester;
