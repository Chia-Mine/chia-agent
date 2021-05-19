import {Coin} from "./blockchain_format/coin";
import {SerializedProgram} from "./blockchain_format/program";

export type CoinSolution = {
  coin: Coin;
  puzzle_reveal: SerializedProgram;
  solution: SerializedProgram;
};