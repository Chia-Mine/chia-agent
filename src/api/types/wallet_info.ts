import {uint32, uint8} from "./blockchain_format/ints";

export type WalletInfo = {
  id: uint32;
  name: string;
  type: uint8;
  data: string;
};

export type WalletInfoBackup = {
  wallet_list: WalletInfo[];
};