"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.open = void 0;
const fs_1 = require("fs");
const config_1 = require("../config");
const WS = require("ws");
const logger_1 = require("../logger");
function create(url) {
    const config = config_1.getConfig();
    const daemonCertPath = config_1.getPathFromConfig("/daemon_ssl/private_crt") || config_1.defaultDaemonCertPath;
    const daemonKeyPath = config_1.getPathFromConfig("/daemon_ssl/private_key") || config_1.defaultDaemonKeyPath;
    if (!fs_1.existsSync(daemonCertPath)) {
        logger_1.getLogger().error("daemon cert file was not found at: " + daemonCertPath);
        throw new Error("Cert file not found");
    }
    if (!fs_1.existsSync(daemonCertPath)) {
        logger_1.getLogger().error("daemon key file was not found at: " + daemonCertPath);
        throw new Error("Key file not found");
    }
    const cert = fs_1.readFileSync(daemonCertPath);
    const key = fs_1.readFileSync(daemonKeyPath);
    const options = {
        cert,
        key,
        rejectUnauthorized: false,
    };
    return new WS(url, options);
}
const defaultTimeoutInMs = 50000;
function open(url, timeoutMs) {
    return new Promise((resolve, reject) => {
        const ws = create(url);
        let timer = null;
        timeoutMs = typeof timeoutMs === "number" ? timeoutMs : defaultTimeoutInMs;
        timer = setTimeout(() => {
            timer = null;
            logger_1.getLogger().error("Request to open connection timed out");
            reject("Timeout");
        }, timeoutMs);
        ws.onopen = (openEvent) => {
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
                resolve({ ws, openEvent });
            }
        };
    });
}
exports.open = open;
