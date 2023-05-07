import {uint128, uint32, uint64} from "../types/_python_types_";

export type Balance = {
  confirmed_wallet_balance: uint128;
  unconfirmed_wallet_balance: uint128;
  spendable_balance: uint128;
  pending_change: uint64;
  max_send_amount: uint128;
  unspent_coin_count: uint32;
  pending_coin_removal_count: uint32;
};
