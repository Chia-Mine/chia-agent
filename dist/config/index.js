"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPathFromConfig = exports.resolveFromChiaRoot = exports.defaultDaemonCertPath = exports.defaultDaemonKeyPath = exports.getConfig = exports.plotterDir = exports.logDir = exports.configPath = exports.chiaRoot = void 0;
const os_1 = require("os");
const path = require("path");
const fs_1 = require("fs");
const yaml_1 = require("yaml");
const defaultChiaRoot = path.resolve(os_1.homedir(), ".chia", "mainnet");
exports.chiaRoot = process.env.CHIA_ROOT ? path.resolve(process.env.CHIA_ROOT) : defaultChiaRoot;
// config 
exports.configPath = path.resolve(exports.chiaRoot, "config", "config.yaml");
// log
exports.logDir = path.resolve(exports.chiaRoot, "log");
// plotter
exports.plotterDir = path.resolve(exports.chiaRoot, "plotter");
let lastConfigPath = undefined;
let config;
/**
 * Get parsed config object
 *
 * @example
   ```
   {
    '/ALERTS_URL': 'https://download.chia.net/notify/mainnet_alert.txt',
    '/daemon_port': 55400,
    '/farmer/network_overrides/config/testnet0/address_prefix': 'txch',
    ...
    }
   ```
 */
function getConfig(configFilePath) {
    // Memoize config data once.
    if (lastConfigPath === configFilePath && config) {
        return config;
    }
    lastConfigPath = configFilePath;
    const file = fs_1.readFileSync(configFilePath || exports.configPath, "utf8");
    const parsedYamlObj = yaml_1.parse(file);
    return config = buildConfigObj(parsedYamlObj);
}
exports.getConfig = getConfig;
function buildConfigObj(config, currentPath = [], product = {}) {
    for (const propName in config) {
        if (!config.hasOwnProperty(propName)) {
            continue;
        }
        const value = config[propName];
        if (value && typeof value === "object" && !Array.isArray(value)) {
            currentPath.push(propName);
            buildConfigObj(value, currentPath, product);
            currentPath.pop();
        }
        else {
            const path = currentPath.length > 0 ? `/${currentPath.join("/")}/${propName}` : `/${propName}`;
            product[path] = value;
        }
    }
    return product;
}
exports.defaultDaemonKeyPath = path.resolve(exports.chiaRoot, "config", "ssl", "daemon", "private_daemon.key");
exports.defaultDaemonCertPath = path.resolve(exports.chiaRoot, "config", "ssl", "daemon", "private_daemon.crt");
function resolveFromChiaRoot(pathFromChiaRoot) {
    return path.resolve(exports.chiaRoot, ...pathFromChiaRoot);
}
exports.resolveFromChiaRoot = resolveFromChiaRoot;
/**
 * Get path string resolved based on CHIA_ROOT dir.
 *
 * @param {string} yPath - Canonical path for yaml. See @description.
 * @param {string?} configFilePath - If you want to specify path for config file, use this param.
 * @description
 *   When YAML is like below:
     ```
     daemon_ssl:
       private_crt: config/ssl/daemon/private_daemon.crt
       private_key: config/ssl/daemon/private_daemon.key
       ...
     ```
     yPath for daemon private key is: `/daemon_ssl/private_key`
 */
function getPathFromConfig(yPath, configFilePath) {
    const config = getConfig(configFilePath);
    return resolveFromChiaRoot([config[yPath]]);
}
exports.getPathFromConfig = getPathFromConfig;
