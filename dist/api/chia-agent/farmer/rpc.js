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
exports.set_reward_targets = exports.get_reward_targets = exports.get_signage_points = exports.get_signage_point = exports.serviceName = void 0;
exports.serviceName = "chia_farmer";
function get_signage_point(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = "get_signage_point";
        return agent.sendMessage(exports.serviceName, command, data);
    });
}
exports.get_signage_point = get_signage_point;
function get_signage_points(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = "get_signage_points";
        return agent.sendMessage(exports.serviceName, command, data);
    });
}
exports.get_signage_points = get_signage_points;
function get_reward_targets(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = "get_reward_targets";
        return agent.sendMessage(exports.serviceName, command, data);
    });
}
exports.get_reward_targets = get_reward_targets;
function set_reward_targets(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = "set_reward_targets";
        return agent.sendMessage(exports.serviceName, command, data);
    });
}
exports.set_reward_targets = set_reward_targets;
