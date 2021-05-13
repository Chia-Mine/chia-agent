import {uint32, uint64} from "./blockchain_format/ints";
import {Coin} from "./blockchain_format/coin";

export type CoinRecord = {
  coin: Coin;
  confirmed_block_index: uint32
  spent_block_index: uint32;
  spent: boolean;
  coinbase: boolean;
  timestamp: uint64; //  # Timestamp of the block at height confirmed_block_index
};
