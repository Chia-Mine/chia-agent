import { bool, Optional } from "../../types/_python_types_";
import { uint64 } from "../../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../../chia_rs/wheel/python/sized_bytes";

export type CoinSelectionConfigLoader = {
  min_coin_amount?: Optional<uint64>;
  max_coin_amount?: Optional<uint64>;
  excluded_coin_amounts?: Optional<uint64[]>;
  excluded_coin_ids?: Optional<bytes32[]>;
};

export type TXEndpointForCompat = {
  exclude_coin_ids?: Optional<bytes32[]>;
  exclude_coin_amounts?: Optional<uint64[]>;
  exclude_coins?: Optional<bytes32[]>;
  excluded_coins?: Optional<bytes32[]>;
};

export type TXConfigLoader = CoinSelectionConfigLoader & {
  reuse_puzhash?: Optional<bool>;
};
