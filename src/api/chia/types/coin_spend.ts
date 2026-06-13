import { bytes } from "./_python_types_";
import { int } from "../../chia_rs/wheel/python/sized_ints";
import { CoinSpend } from "../../chia_rs/chia-protocol/coin_spend";

// As of chia-blockchain 2.5.7, each condition is serialized as a 2-element array of
// [opcode (int), args (0x-prefixed hex strings)] instead of {opcode, vars} objects.
export type CoinSpendWithConditions = {
  coin_spend: CoinSpend;
  conditions: Array<[int, bytes[]]>;
};
