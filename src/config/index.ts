import { homedir } from "os";
import * as path from "path";
import { readFileSync } from "fs";
import { parse } from "yaml";

// Suppress noisy YAML warning
process.env.YAML_SILENCE_WARNINGS = "true";

const defaultChiaRoot = path.resolve(homedir(), ".chia", "mainnet");

export const chiaRoot = process.env.CHIA_ROOT
  ? path.resolve(process.env.CHIA_ROOT)
  : defaultChiaRoot;

// config
export const configPath = path.resolve(chiaRoot, "config", "config.yaml");

// log
export const logDir = path.resolve(chiaRoot, "log");

// plotter
export const plotterDir = path.resolve(chiaRoot, "plotter");

export type TConfig = Record<
  string,
  string | number | Array<string | number> | null
>;

let _lastConfigPath: string | undefined;
let _config: TConfig | undefined;

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
export function getConfig(configFilePath?: string): TConfig {
  // Memoize config data once.
  if (_lastConfigPath === configFilePath && _config) {
    return _config;
  }
  _lastConfigPath = configFilePath;

  const file = readFileSync(configFilePath || configPath, "utf8");
  const parsedYamlObj = parse(file);
  return (_config = buildConfigObj(parsedYamlObj));
}

export function buildConfigObj(
  config: Record<string, unknown>,
  currentPath: string[] = [],
  product: Record<string, any> = {},
) {
  for (const propName in config) {
    if (!Object.prototype.hasOwnProperty.call(config, propName)) {
      continue;
    }

    const value = config[propName];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      currentPath.push(propName);
      buildConfigObj(value as Record<string, unknown>, currentPath, product);
      currentPath.pop();
    } else if (Array.isArray(value)) {
      value.forEach((v, i) => {
        currentPath.push(`${i}`);
        buildConfigObj(v as Record<string, unknown>, currentPath, product);
        currentPath.pop();
      });
    } else {
      const p =
        currentPath.length > 0
          ? `/${currentPath.join("/")}/${propName}`
          : `/${propName}`;
      product[p] = value;
    }
  }

  return product;
}

export const defaultDaemonKeyPath = path.resolve(
  chiaRoot,
  "config",
  "ssl",
  "daemon",
  "private_daemon.key",
);
export const defaultDaemonCertPath = path.resolve(
  chiaRoot,
  "config",
  "ssl",
  "daemon",
  "private_daemon.crt",
);

export function resolveFromChiaRoot(pathFromChiaRoot: string[]) {
  return path.resolve(chiaRoot, ...pathFromChiaRoot);
}

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
export function getPathFromConfig(yPath: string, configFilePath?: string) {
  const config = getConfig(configFilePath);
  return resolveFromChiaRoot([config[yPath]] as string[]);
}
