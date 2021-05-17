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
exports.set_reward_targets = exports.set_reward_targets_command = exports.get_reward_targets = exports.get_reward_targets_command = exports.get_signage_points = exports.get_signage_points_command = exports.get_signage_point = exports.get_signage_point_command = exports.chia_farmer_service = void 0;
exports.chia_farmer_service = "chia_farmer";
exports.get_signage_point_command = "get_signage_point";
function get_signage_point(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_farmer_service, exports.get_signage_point_command, data);
    });
}
exports.get_signage_point = get_signage_point;
exports.get_signage_points_command = "get_signage_points";
function get_signage_points(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_farmer_service, exports.get_signage_points_command);
    });
}
exports.get_signage_points = get_signage_points;
exports.get_reward_targets_command = "get_reward_targets";
function get_reward_targets(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_farmer_service, exports.get_reward_targets_command, data);
    });
}
exports.get_reward_targets = get_reward_targets;
exports.set_reward_targets_command = "set_reward_targets";
function set_reward_targets(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.sendMessage(exports.chia_farmer_service, exports.set_reward_targets_command, data);
    });
}
exports.set_reward_targets = set_reward_targets;
