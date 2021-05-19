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
exports.on_message_from_chia_plots_create = exports.on_state_changed_of_plots = exports.state_changed_command_of_plots = exports.chia_plots_create_service = void 0;
exports.chia_plots_create_service = "chia plots create";
exports.state_changed_command_of_plots = "state_changed";
function on_state_changed_of_plots(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(exports.chia_plots_create_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_plots_create_service && e.command === exports.state_changed_command_of_plots) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_plots_create_service, messageListener);
    });
}
exports.on_state_changed_of_plots = on_state_changed_of_plots;
function on_message_from_chia_plots_create(daemon, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        yield daemon.subscribe(exports.chia_plots_create_service);
        const messageListener = (e) => {
            if (e.origin === exports.chia_plots_create_service) {
                callback(e);
            }
        };
        return daemon.addMessageListener(exports.chia_plots_create_service, messageListener);
    });
}
exports.on_message_from_chia_plots_create = on_message_from_chia_plots_create;
