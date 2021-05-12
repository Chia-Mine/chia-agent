export declare const chiaRoot: string;
export declare const configPath: string;
export declare const logDir: string;
export declare const plotterDir: string;
export declare type TConfig = Record<string, string | number | Array<string | number> | null>;
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
export declare function getConfig(configFilePath?: string): TConfig;
export declare const defaultDaemonKeyPath: string;
export declare const defaultDaemonCertPath: string;
export declare function resolveFromChiaRoot(pathFromChiaRoot: string[]): string;
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
export declare function getPathFromConfig(yPath: string, configFilePath?: string): string;
