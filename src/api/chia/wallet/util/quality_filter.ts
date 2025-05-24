import {
  uint32,
  uint64,
  uint8,
} from "../../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../../chia_rs/wheel/python/sized_bytes";

export type TransactionTypeFilter = {
  values: uint8[];
  mode: uint8; // FilterMode
};

export type HashFilter = {
  values: bytes32[];
  mode: uint8; // FilterMode
};

export type AmountFilter = {
  values: uint64[];
  mode: uint8; // FilterMode
};

export type UInt32Range = {
  start: uint32;
  stop: uint32;
};

export type UInt64Range = {
  start: uint64;
  stop: uint64;
};
