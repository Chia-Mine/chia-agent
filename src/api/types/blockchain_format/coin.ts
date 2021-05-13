import {bytes32} from "./sized_bytes";
import {uint64} from "./ints";

export type Coin = {
  parent_coin_info: bytes32; // bytes32
  puzzle_hash: bytes32; // bytes32
  amount: uint64; // uint64
};
