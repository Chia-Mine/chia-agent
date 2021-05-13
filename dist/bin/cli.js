#!/usr/bin/env node
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
const index_1 = require("../daemon/index");
const logger_1 = require("../logger");
logger_1.setLogLevel("error");
const exeCommand = "npx chia-agent";
const argv = process.argv.slice(2);
const usage = `Usage:
${exeCommand} farm monitor
(*) This command is experimental. Will improved in few weeks`;
if (argv.length < 1) {
    console.log(usage);
    process.exit(1);
}
const command = argv[0];
if (command === "farm") {
    const subCommand = argv[1];
    if (subCommand === "monitor") {
        (function () {
            return __awaiter(this, void 0, void 0, function* () {
                const daemon = index_1.getDaemon();
                yield daemon.connect();
                yield daemon.subscribe("wallet_ui");
                let sumPassedFilter = 0;
                let sumTotalPlot = 0;
                let sumTotalProof = 0;
                daemon.addMessageListener("chia_farmer", (e) => {
                    if (e.command === "new_farming_info") {
                        const { farming_info } = e.data;
                        const { challenge_hash, passed_filter, proofs, total_plots, timestamp } = farming_info;
                        const date = new Date(timestamp * 1000);
                        console.log(`${challenge_hash.substr(0, 32)}... ${passed_filter}/${total_plots} ${proofs} ${date.toLocaleTimeString()}`);
                        sumPassedFilter += passed_filter;
                        sumTotalPlot += total_plots;
                        sumTotalProof += proofs;
                    }
                });
                const onTerminate = () => __awaiter(this, void 0, void 0, function* () {
                    console.log("Terminating process...");
                    const percentage = Math.round((sumPassedFilter / sumTotalPlot) * 10000) / 100;
                    console.log(`total passed_filters: ${sumPassedFilter}`);
                    console.log(`total_plots: ${sumTotalPlot}`);
                    console.log(`total passed filters(%): ${percentage}%`);
                    console.log(`total_proofs: ${sumTotalProof}`);
                    let timer = null;
                    daemon.addEventListener("close", () => {
                        if (timer)
                            clearTimeout(timer);
                        process.exit(0);
                    });
                    yield daemon.close();
                    timer = setTimeout(() => {
                        console.error("Closing request timed out.");
                        timer = null;
                        process.exit(1);
                    }, 15 * 1000);
                });
                process.addListener("SIGTERM", onTerminate);
                process.addListener("SIGINT", onTerminate);
            });
        })();
    }
    else {
        console.log(usage);
        process.exit(1);
    }
}
else {
    console.log(usage);
    process.exit(1);
}
