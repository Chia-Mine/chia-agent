// dependency: TradeRecord, by: `get_trade` of Wallet RPC API

import {bool, bytes, int, Optional, str, uint32, uint64, uint8} from "../types/_python_types_";
import {Coin} from "../types/blockchain_format/coin";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {TDriverDict} from "./puzzle_drivers";

export type TradeRecord = {
  confirmed_at_index: uint32;
  accepted_at_time: Optional<uint64>;
  created_at_time: uint64;
  is_my_offer: bool;
  sent: uint32;
  offer: bytes;
  taken_offer: Optional<bytes>;
  coins_of_interest: Coin[];
  trade_id: bytes32;
  status: uint32;  // # TradeStatus, enum not streamable
  sent_to: Array<[str, uint8, Optional<str>]>;
};

export type TradeRecordConvenience = {
  summary: {
    offered: Record<str, int>; // {[asset_id]: amount}
    requested: Record<str, int>; // {[asset_id]: amount}
    infos: TDriverDict;
    fees: int;
  };
  pending: Record<str, int>; // {[asset_id]: amount}
} & Omit<TradeRecord, "offer">;
