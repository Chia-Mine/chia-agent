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
exports.remove_plot_directory = exports.remove_plot_directory_command = exports.get_plot_directories = exports.get_plot_directories_command = exports.add_plot_directory = exports.add_plot_directory_command = exports.delete_plot = exports.delete_plot_command = exports.refresh_plots = exports.refresh_plots_command = exports.get_plots = exports.get_plots_command = exports.chia_harvester_service = void 0;
exports.chia_harvester_service = "chia_harvester";
exports.get_plots_command = "get_plots";
function get_plots(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.get_plots_command);
    });
}
exports.get_plots = get_plots;
exports.refresh_plots_command = "refresh_plots";
function refresh_plots(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.refresh_plots_command);
    });
}
exports.refresh_plots = refresh_plots;
exports.delete_plot_command = "delete_plot";
function delete_plot(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.delete_plot_command, data);
    });
}
exports.delete_plot = delete_plot;
exports.add_plot_directory_command = "add_plot_directory";
function add_plot_directory(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.add_plot_directory_command, data);
    });
}
exports.add_plot_directory = add_plot_directory;
exports.get_plot_directories_command = "get_plot_directories";
function get_plot_directories(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.get_plot_directories_command);
    });
}
exports.get_plot_directories = get_plot_directories;
exports.remove_plot_directory_command = "remove_plot_directory";
function remove_plot_directory(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_harvester_service, exports.remove_plot_directory_command, data);
    });
}
exports.remove_plot_directory = remove_plot_directory;
