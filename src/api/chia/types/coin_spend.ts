import { ConditionWithArgs } from "./condition_with_args";
import { CoinSpend } from "../../chia_rs/chia-protocol/coin_spend";

export { CoinSpend } from "../../chia_rs/chia-protocol/coin_spend";

export type CoinSpendWithConditions = {
  coin_spend: CoinSpend;
  conditions: ConditionWithArgs[];
};
