import {SpendBundle} from "./spend_bundle";
import {Coin} from "./blockchain_format/coin";
import {bytes32} from "./blockchain_format/sized_bytes";
import {NPCResult} from "../consensus/cost_calculator";
import {bool, Optional, uint32, uint64} from "./_python_types_";
import {CoinSpend} from "./coin_spend";

export type BundleCoinSpend = {
  coin_spend: CoinSpend;
  eligible_for_dedup: bool;
  additions: Coin[];
  // cost on the specific solution in this item
  cost: Optional<uint64>;
};

export type MempoolItem = {
  spend_bundle: SpendBundle;
  fee: uint64;
  npc_result: NPCResult;
  spend_bundle_name: bytes32;
  height_added_to_mempool: uint32;
  assert_height: Optional<uint32>;
  assert_before_height: Optional<uint32>;
  assert_before_seconds: Optional<uint64>;
  bundle_coin_spends: Record<bytes32, BundleCoinSpend>;
};

export type MempoolItemInJsonDict = {
  spend_bundle: SpendBundle;
  fee: uint64;
  npc_result: NPCResult;
  cost: uint64;
  spend_bundle_name: bytes32;
  additions: Coin[];
  removals: Coin[];
};
