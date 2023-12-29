import {Coin} from "./blockchain_format/coin";
import {SerializedProgram} from "./blockchain_format/serialized_program";
import {ConditionWithArgs} from "./condition_with_args";

export type CoinSpend = {
  coin: Coin;
  puzzle_reveal: SerializedProgram;
  solution: SerializedProgram;
};

export type CoinSpendWithConditions = {
  coin_spend: CoinSpend;
  conditions: ConditionWithArgs[];
};
