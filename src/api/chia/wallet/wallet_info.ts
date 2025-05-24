import { str } from "../types/_python_types_";
import { uint32, uint8 } from "../../chia_rs/wheel/python/sized_ints";

export type WalletInfo = {
  id: uint32;
  name: str;
  type: uint8;
  data: str;
};

export type WalletInfoBackup = {
  wallet_list: WalletInfo[];
};
