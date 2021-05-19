import {G2Element} from "./_python_types_";
import {CoinSolution} from "./coin_solution";

export type SpendBundle = {
  coin_solutions: CoinSolution[];
  aggregated_signature: G2Element;
};