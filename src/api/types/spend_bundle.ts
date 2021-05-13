import {G2Element} from "./unclassified_type";
import {CoinSolution} from "./coin_solution";

export type SpendBundle = {
  coin_solutions: CoinSolution[];
  aggregated_signature: G2Element;
};