import {bytes32} from "./sized_bytes";
import {uint64} from "../_python_types_";

/**
 * The actual definition of `Coin` type was moved to https://github.com/Chia-Network/chia_rs/blob/main/wheel/src/coin.rs
 * from chia-blockchain@1.5.1
 */
export type Coin = {
  parent_coin_info: bytes32; // bytes32
  puzzle_hash: bytes32; // bytes32
  amount: uint64; // uint64
};
