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
exports.get_status = exports.get_status_command = exports.register_service = exports.register_service_command = exports.exit = exports.exit_command = exports.is_running = exports.is_running_command = exports.stop_service = exports.stop_service_command = exports.stop_plotting = exports.stop_plotting_command = exports.start_plotting = exports.start_plotting_command = exports.start_service = exports.start_service_command = exports.ping = exports.ping_command = exports.daemon_service = void 0;
exports.daemon_service = "daemon";
exports.ping_command = "ping";
function ping(daemon) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.ping_command);
    });
}
exports.ping = ping;
exports.start_service_command = "start_service";
function start_service(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.start_service_command, data);
    });
}
exports.start_service = start_service;
exports.start_plotting_command = "start_plotting";
function start_plotting(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.start_plotting_command, data);
    });
}
exports.start_plotting = start_plotting;
exports.stop_plotting_command = "stop_plotting";
function stop_plotting(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.stop_plotting_command, data);
    });
}
exports.stop_plotting = stop_plotting;
exports.stop_service_command = "stop_service";
function stop_service(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.stop_service_command, data);
    });
}
exports.stop_service = stop_service;
exports.is_running_command = "is_running";
function is_running(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.is_running_command, data);
    });
}
exports.is_running = is_running;
exports.exit_command = "exit";
function exit(daemon) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.exit_command);
    });
}
exports.exit = exit;
exports.register_service_command = "register_service";
function register_service(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.register_service_command, data);
    });
}
exports.register_service = register_service;
exports.get_status_command = "get_status";
function get_status(daemon) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.get_status_command);
    });
}
exports.get_status = get_status;
