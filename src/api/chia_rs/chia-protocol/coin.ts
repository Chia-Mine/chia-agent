import { bytes32 } from "../wheel/python/sized_bytes";
import { uint64 } from "../wheel/python/sized_ints";

export type Coin = {
  parent_coin_info: bytes32; // bytes32
  puzzle_hash: bytes32; // bytes32
  amount: uint64; // uint64
};
