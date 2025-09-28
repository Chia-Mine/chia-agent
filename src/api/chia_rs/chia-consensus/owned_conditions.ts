import { bool, bytes, Optional } from "../../chia/types/_python_types_";
import { uint128, uint32, uint64 } from "../wheel/python/sized_ints";
import { bytes32 } from "../wheel/python/sized_bytes";
import { PublicKey } from "../chia-bls/public_key";

export type SpendConditions = {
  coin_id: bytes32;
  parent_id: bytes32;
  puzzle_hash: bytes32;
  coin_amount: uint64;
  height_relative: Optional<uint32>;
  seconds_relative: Optional<uint64>;
  before_height_relative: Optional<uint32>;
  before_seconds_relative: Optional<uint64>;
  birth_height: Optional<uint32>;
  birth_seconds: Optional<uint64>;
  create_coin: Array<[bytes32, uint64, Optional<bytes>]>;
  agg_sig_me: Array<[PublicKey, bytes]>;
  agg_sig_parent: Array<[PublicKey, bytes]>;
  agg_sig_puzzle: Array<[PublicKey, bytes]>;
  agg_sig_amount: Array<[PublicKey, bytes]>;
  agg_sig_puzzle_amount: Array<[PublicKey, bytes]>;
  agg_sig_parent_amount: Array<[PublicKey, bytes]>;
  agg_sig_parent_puzzle: Array<[PublicKey, bytes]>;
  flags: uint32;
  // per-spend execution and condition cost
  execution_cost: uint64;
  condition_cost: uint64;
};

export type SpendBundleConditions = {
  spends: SpendConditions[];
  reserve_fee: uint64;
  // the highest height/time conditions (i.e. most strict)
  height_absolute: uint32;
  seconds_absolute: uint64;
  // when set, this is the lowest (i.e. most restrictive) of all
  // ASSERT_BEFORE_HEIGHT_ABSOLUTE conditions
  before_height_absolute: Optional<uint32>;
  // ASSERT_BEFORE_SECONDS_ABSOLUTE conditions
  before_seconds_absolute: Optional<uint64>;
  // Unsafe Agg Sig conditions (i.e. not tied to the spend generating it)
  agg_sig_unsafe: Array<[PublicKey, bytes]>;
  cost: uint64;
  // the sum of all values of all spent coins
  removal_amount: uint128;
  // the sum of all amounts of CREATE_COIN conditions
  addition_amount: uint128;
  // set if the aggregate signature of the block/spend bundle was
  // successfully validated
  validated_signature: bool;
  execution_cost: uint64;
  condition_cost: uint64;
};
