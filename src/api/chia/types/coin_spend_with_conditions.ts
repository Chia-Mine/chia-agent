import {Coin} from "./blockchain_format/coin";
import {SerializedProgram} from "./blockchain_format/serialized_program";

export type CoinSpendWithConditions = {
  coin: Coin;
  puzzle_reveal: SerializedProgram;
  solution: SerializedProgram;
  conditions: SerializedProgram;
};
