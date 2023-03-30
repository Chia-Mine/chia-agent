import {Coin} from "./blockchain_format/coin";
import {SerializedProgram} from "./blockchain_format/serialized_program";

export type CoinSpend = {
  coin: Coin;
  puzzle_reveal: SerializedProgram;
  solution: SerializedProgram;
};
