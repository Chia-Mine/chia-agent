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
exports.get_status = exports.get_status_command = exports.register_service = exports.register_service_command = exports.exit = exports.exit_command = exports.remove_keyring_passphrase = exports.remove_keyring_passphrase_command = exports.set_keyring_passphrase = exports.set_keyring_passphrase_command = exports.unlock_keyring = exports.unlock_keyring_command = exports.keyring_status = exports.keyring_status_command = exports.is_keyring_locked = exports.is_keyring_locked_command = exports.get_key_for_fingerprint = exports.get_key_for_fingerprint_command = exports.get_first_private_key = exports.get_first_private_key_command = exports.get_all_private_keys = exports.get_all_private_keys_command = exports.delete_key_by_fingerprint = exports.delete_key_by_fingerprint_command = exports.delete_all_keys = exports.delete_all_keys_command = exports.check_keys = exports.check_keys_command = exports.add_private_key = exports.add_private_key_command = exports.is_running = exports.is_running_command = exports.stop_service = exports.stop_service_command = exports.stop_plotting = exports.stop_plotting_command = exports.start_plotting = exports.start_plotting_command = exports.start_service = exports.start_service_command = exports.ping = exports.ping_command = exports.daemon_service = void 0;
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
exports.add_private_key_command = "add_private_key";
function add_private_key(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.add_private_key_command, data);
    });
}
exports.add_private_key = add_private_key;
exports.check_keys_command = "check_keys";
function check_keys(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.check_keys_command, data);
    });
}
exports.check_keys = check_keys;
exports.delete_all_keys_command = "delete_all_keys";
function delete_all_keys(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.delete_all_keys_command, data);
    });
}
exports.delete_all_keys = delete_all_keys;
exports.delete_key_by_fingerprint_command = "delete_key_by_fingerprint";
function delete_key_by_fingerprint(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.delete_key_by_fingerprint_command, data);
    });
}
exports.delete_key_by_fingerprint = delete_key_by_fingerprint;
exports.get_all_private_keys_command = "get_all_private_keys";
function get_all_private_keys(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.get_all_private_keys_command, data);
    });
}
exports.get_all_private_keys = get_all_private_keys;
exports.get_first_private_key_command = "get_first_private_key";
function get_first_private_key(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.get_first_private_key_command, data);
    });
}
exports.get_first_private_key = get_first_private_key;
exports.get_key_for_fingerprint_command = "get_key_for_fingerprint";
function get_key_for_fingerprint(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.get_key_for_fingerprint_command, data);
    });
}
exports.get_key_for_fingerprint = get_key_for_fingerprint;
exports.is_keyring_locked_command = "is_keyring_locked";
function is_keyring_locked(daemon) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.is_keyring_locked_command);
    });
}
exports.is_keyring_locked = is_keyring_locked;
exports.keyring_status_command = "keyring_status";
function keyring_status(daemon) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.keyring_status_command);
    });
}
exports.keyring_status = keyring_status;
exports.unlock_keyring_command = "unlock_keyring";
function unlock_keyring(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.unlock_keyring_command, data);
    });
}
exports.unlock_keyring = unlock_keyring;
exports.set_keyring_passphrase_command = "set_keyring_passphrase";
function set_keyring_passphrase(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.set_keyring_passphrase_command, data);
    });
}
exports.set_keyring_passphrase = set_keyring_passphrase;
exports.remove_keyring_passphrase_command = "remove_keyring_passphrase";
function remove_keyring_passphrase(daemon, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return daemon.sendMessage(exports.daemon_service, exports.remove_keyring_passphrase_command, data);
    });
}
exports.remove_keyring_passphrase = remove_keyring_passphrase;
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
