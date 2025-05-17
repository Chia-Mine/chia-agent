import { Coin } from "./coin";
import { Program } from "./program";

export type CoinSpend = {
  coin: Coin;
  puzzle_reveal: Program;
  solution: Program;
};
