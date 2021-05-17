import { bool, int, Optional, str, uint32, uint64 } from "../../types/_python_types_";
import { WalletInfo } from "../wallet_info";
export declare type WalletBackupData = {
    version: str;
    fingerprint: int;
    timestamp: uint64;
    start_height: Optional<uint32>;
};
export declare type WalletBackupMetadata = {
    timestamp: uint64;
    pubkey: str;
};
export declare type WalletBackup = {
    data: WalletBackupData;
    meta_data: WalletBackupMetadata;
    signature: unknown;
};
export declare type WalletInfoWithTypeName = WalletInfo & {
    type_name: str;
};
export declare type BackupInfo = Pick<WalletBackupData, "version" | "fingerprint" | "timestamp"> & {
    wallets: WalletInfoWithTypeName[];
    backup_host: str;
    downloaded: bool;
};
