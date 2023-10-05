import {CoinSpend} from "./coin_spend";
import {ConditionWithArgs} from "./condition_with_args";

export type CoinSpendWithConditions = {
  coin_spend: CoinSpend;
  conditions: ConditionWithArgs[];
};
