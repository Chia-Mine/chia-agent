import { Coin } from "./blockchain_format/coin";
import { bool, uint32, uint64 } from "./_python_types_";
export declare type CoinRecord = {
    coin: Coin;
    confirmed_block_index: uint32;
    spent_block_index: uint32;
    spent: bool;
    coinbase: bool;
    timestamp: uint64;
};
