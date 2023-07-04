import {bool, Optional, uint32, uint8} from "../types/_python_types_";
import {AmountFilter, HashFilter, UInt32Range, UInt64Range} from "./util/quality_filter";

export type GetCoinRecords = {
  offset: uint32;
  limit: uint32;
  wallet_id: Optional<uint32>;
  wallet_type: Optional<uint8>;
  coin_type: Optional<uint8>;
  coin_id_filter: Optional<HashFilter>;
  puzzle_hash_filter: Optional<HashFilter>;
  parent_coin_id_filter: Optional<HashFilter>;
  amount_filter: Optional<AmountFilter>;
  amount_range: Optional<UInt64Range>;
  confirmed_range: Optional<UInt32Range>;
  spent_range: Optional<UInt32Range>;
  order: uint8;
  reverse: bool;
  include_total_count: bool;
};
