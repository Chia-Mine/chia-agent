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
const index_1 = require("./daemon/index");
const logger_1 = require("./logger");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.setLogLevel("debug");
        const daemon = index_1.getDaemon();
        yield daemon.connect();
        const res = yield daemon.subscribe("wallet_ui");
        daemon.addMessageListener("chia_farmer", (e) => {
            console.log("message!", e);
        });
        setTimeout(() => {
            daemon.close();
        }, 40 * 1000);
    });
}
main();
