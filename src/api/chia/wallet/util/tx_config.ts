import {bool, int, Optional, str, uint64} from "../../types/_python_types_";
import {bytes32} from "../../types/blockchain_format/sized_bytes";
import {Condition} from "../conditions";

export type CoinSelectionConfigLoader = {
  min_coin_amount?: Optional<uint64>;
  max_coin_amount?: Optional<uint64>;
  excluded_coin_amounts?: Optional<uint64[]>;
  excluded_coin_ids?: Optional<bytes32[]>;
};

export type TxEndpointForCompat = {
  exclude_coin_ids?: Optional<bytes32[]>;
  exclude_coin_amounts?: Optional<uint64[]>;
  exclude_coins?: Optional<bytes32[]>;
  excluded_coins?: Optional<bytes32[]>;
};

export type TxConfigLoader = CoinSelectionConfigLoader & {
  reuse_puzhash?: Optional<bool>;
};

export type TxEndpoint = TxConfigLoader & TxEndpointForCompat & {
  extra_conditions?: Array<{ opcode: str|int; args: Condition; }>;
};
