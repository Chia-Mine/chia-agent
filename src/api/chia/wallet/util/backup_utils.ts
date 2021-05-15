import {bool, int, Optional, str, uint32, uint64} from "../../types/_python_types_";
import {WalletInfo} from "../wallet_info";

export type WalletBackupData = {
  version: str;
  fingerprint: int; // https://github.com/Chia-Network/bls-signatures/blob/main/python-impl/ec.py#L164
  timestamp: uint64;
  start_height: Optional<uint32>;
};
export type WalletBackupMetadata = {
  timestamp: uint64;
  pubkey: str;
};
export type WalletBackup = {
  data: WalletBackupData;
  meta_data: WalletBackupMetadata;
  signature: unknown; // chia/wallet/util/backup_utils.py@22
};
export type WalletInfoWithTypeName = WalletInfo & {
  type_name: str; // enum.name chia/wallet/util/backup_utils.py@22
};
export type BackupInfo = Pick<WalletBackupData, "version" | "fingerprint" | "timestamp"> & {
  wallets: WalletInfoWithTypeName[];
  backup_host: str;
  downloaded: bool;
};
