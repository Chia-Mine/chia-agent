import {bool, int, Optional, str, uint32} from "../types/_python_types_";
import {Coin} from "../types/blockchain_format/coin";
import {CoinType, StreamableWalletIdentifier, WalletType} from "./util/wallet_types";
import {VersionBlob} from "../util/misc";
import {ClawbackMetadata} from "./puzzles/clawback/metadata";

export type WalletCoinRecord = {
  coin: Coin;
  confirmed_block_height: uint32;
  spent_block_height: uint32;
  spent: bool;
  coinbase: bool;
  wallet_type: typeof WalletType[keyof typeof WalletType];
  wallet_id: int;
  // Cannot include new attributes in the hash since they will change the coin order in a set.
  // The launcher coin ID will change and will break all hardcode offer tests in CAT/NFT/DL, etc.
  coin_type: typeof CoinType[keyof typeof CoinType];
  metadata: Optional<VersionBlob>;
};

export type WalletCoinRecordWithMetadata = WalletCoinRecord & {
  id: str;
  type: typeof CoinType[keyof typeof CoinType];
  wallet_identifier: StreamableWalletIdentifier;
  metadata: ClawbackMetadata;
  confirmed_height: uint32;
  spent_height: uint32;
  coinbase: bool;
};
