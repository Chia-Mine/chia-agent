import { Coin } from "./blockchain_format/coin";
import { SerializedProgram } from "./blockchain_format/program";
export declare type CoinSpend = {
    coin: Coin;
    puzzle_reveal: SerializedProgram;
    solution: SerializedProgram;
};
