import { Optional, str } from "../types/_python_types_";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { uint32, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { Coin } from "../types/blockchain_format/coin";

export type PoolState = {
  version: uint8;
  state: uint8;
  target_puzzle_hash: bytes32; // # TODO: rename target_puzzle_hash -> pay_to_address
  owner_pubkey: G1Element;
  pool_url: Optional<str>;
  relative_lock_height: uint32;
};

export type PoolWalletInfo = {
  current: PoolState;
  target: Optional<PoolState>;
  launcher_coin: Coin;
  launcher_id: bytes32;
  p2_singleton_puzzle_hash: bytes32;
  tip_singleton_coin_id: bytes32;
  singleton_block_height: uint32; // # Block height that current PoolState is from
};
