import { Coin } from "./blockchain_format/coin";
import { bool } from "./_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";

export type CoinRecord = {
  coin: Coin;
  confirmed_block_index: uint32;
  spent_block_index: uint32;
  coinbase: bool;
  timestamp: uint64; //  # Timestamp of the block at height confirmed_block_index
};

export type CoinRecordBackwardCompatible = CoinRecord & {
  spent: bool;
};
