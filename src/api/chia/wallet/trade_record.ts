// dependency: TradeRecord, by: `get_trade` of Wallet RPC API

import { bool, bytes, Optional, str } from "../types/_python_types_";
import { uint32, uint64, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { Coin } from "../types/blockchain_format/coin";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { TDriverDict } from "./puzzle_drivers";
import { ConditionValidTimes } from "./conditions";

export type TradeRecordOld = {
  confirmed_at_index: uint32;
  accepted_at_time: Optional<uint64>;
  created_at_time: uint64;
  is_my_offer: bool;
  sent: uint32;
  offer: bytes;
  taken_offer: Optional<bytes>;
  coins_of_interest: Coin[];
  trade_id: bytes32;
  status: uint32; // # TradeStatus, enum not streamable
  sent_to: Array<[str, uint8, Optional<str>]>;
};

export type TradeRecord = TradeRecordOld & {
  valid_times: ConditionValidTimes;
};

export type TradeRecordConvenience = {
  status: str;
  summary: {
    offered: Record<str, str>; // {[asset_id]: amount (mojos as string, since chia 2.6.0)}
    requested: Record<str, str>; // {[asset_id]: amount (mojos as string, since chia 2.6.0)}
    infos: TDriverDict;
    fees: uint64;
  };
  pending: Record<str, uint64>; // {[asset_id]: amount (mojos)}
} & Omit<TradeRecord, "offer">;
