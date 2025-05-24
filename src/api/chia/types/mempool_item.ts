import { SpendBundle } from "./spend_bundle";
import { Coin } from "./blockchain_format/coin";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { NPCResult } from "../consensus/cost_calculator";
import { bool, Optional } from "./_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";
import { CoinSpend } from "./coin_spend";
import { SpendBundleConditions } from "../../chia_rs/chia-consensus/gen/owned_conditions";

export type BundleCoinSpend = {
  coin_spend: CoinSpend;
  eligible_for_dedup: bool;
  eligible_for_fast_forward: bool;
  additions: Coin[];
  // cost on the specific solution in this item
  cost: Optional<uint64>;
  // If this spend is eligible for fast forward, this may be set to the
  // current unspent coin belonging to this singleton, that we would rebase
  // this spend on top of if we were to make a block now.
  // When finding MempoolItems by coin ID, we use this Coin ID if it's set.
  latest_singleton_coin: Optional<bytes32>;
};

export type MempoolItem = {
  spend_bundle: SpendBundle;
  fee: uint64;
  conds: SpendBundleConditions;
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
