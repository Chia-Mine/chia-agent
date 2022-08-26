import {bytes32, bytes48} from "./blockchain_format/sized_bytes";
import {bytes, Optional, uint32, uint64} from "./_python_types_";

/**
 * The actual definition of `Spend` type was moved to https://github.com/Chia-Network/chia_rs/blob/main/wheel/src/run_generator.rs
 * from chia-blockchain@1.5.1
 */
export type Spend = {
  coin_id: bytes32
  puzzle_hash: bytes32
  height_relative: Optional<uint32>
  seconds_relative: uint64
  create_coin: Array<[bytes32, uint64, bytes]>
  agg_sig_me: Array<[bytes48, bytes]>
};

/**
 * The actual definition of `SpendBundleConditions` type was moved to https://github.com/Chia-Network/chia_rs/blob/main/wheel/src/run_generator.rs
 * from chia-blockchain@1.5.1
 */
export type SpendBundleConditions = {
  spends: Spend[]
  reserve_fee: uint64
  height_absolute: uint32
  seconds_absolute: uint64
  agg_sig_unsafe: Array<[bytes48, bytes]>
  cost: uint64
};
