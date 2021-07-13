import {G2Element} from "./_python_types_";
import {CoinSpend} from "./coin_spend";

export type SpendBundle = {
  cons_spends: CoinSpend[];
  aggregated_signature: G2Element;
};