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
exports.on_message_from_farmer = exports.on_new_plots = exports.new_plots_command = exports.on_new_signage_point = exports.new_signage_point_command = exports.on_new_farming_info = exports.new_farming_info_command = exports.chia_farmer_service = void 0;
const types_1 = require("../../types");
exports.chia_farmer_service = "chia_farmer";
exports.new_farming_info_command = "new_farming_info";
function on_new_farming_info(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_farmer_service && e.command === exports.new_farming_info_command) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_farmer_service, messageListener);
    });
}
exports.on_new_farming_info = on_new_farming_info;
exports.new_signage_point_command = "new_signage_point";
function on_new_signage_point(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_farmer_service && e.command === exports.new_signage_point_command) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_farmer_service, messageListener);
    });
}
exports.on_new_signage_point = on_new_signage_point;
exports.new_plots_command = "get_harvesters"; // not "new_plots" for now.
function on_new_plots(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_farmer_service && e.command === exports.new_plots_command) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_farmer_service, messageListener);
    });
}
exports.on_new_plots = on_new_plots;
function on_message_from_farmer(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(types_1.wallet_ui_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_farmer_service) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_farmer_service, messageListener);
    });
}
exports.on_message_from_farmer = on_message_from_farmer;
