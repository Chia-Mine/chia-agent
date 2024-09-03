import {CoinSpend} from "./coin_spend";
import {G2Element} from "../../chia/types/_python_types_";

export type SpendBundle = {
  coin_spends: CoinSpend[];
  aggregated_signature: G2Element;
};
