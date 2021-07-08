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
exports.login = exports.partial = exports.put_farmer = exports.post_farmer = exports.get_farmer = exports.pool_info = void 0;
function pool_info(agent) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("GET", "pool_info");
    });
}
exports.pool_info = pool_info;
function get_farmer(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("GET", "farmer");
    });
}
exports.get_farmer = get_farmer;
function post_farmer(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("POST", "farmer");
    });
}
exports.post_farmer = post_farmer;
function put_farmer(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("PUT", "farmer");
    });
}
exports.put_farmer = put_farmer;
function partial(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("POST", "partial", data);
    });
}
exports.partial = partial;
function login(agent, data) {
    return __awaiter(this, void 0, void 0, function* () {
        return agent.request("GET", "login", data);
    });
}
exports.login = login;
