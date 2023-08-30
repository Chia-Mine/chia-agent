import {int, Optional, str} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";

export type KeyValueMarshalled = {
  key: str;
  value: str;
};

export type OfferStoreMarshalled = {
  store_id: str;
  inclusions: KeyValueMarshalled[];
}

export type StoreProofsMarshalled = {
  store_id: str;
  proofs: ProofMarshalled[];
};

export type ProofMarshalled = {
  key: str;
  value: str;
  node_hash: str;
  layers: LayerMarshalled[];
};

export type LayerMarshalled = {
  other_hash_side: "left"|"right";
  other_hash: str;
  combined_hash: str;
};

export type OfferMarshalled = {
  trade_id: str;
  offer: str;
  taker: OfferStoreMarshalled[];
  maker: StoreProofsMarshalled[];
};

export type SyncStatus = {
  root_hash: bytes32; // converted to string via `.hex()`
  generation: int;
  target_root_hash: bytes32; // converted to string via `.hex()`
  target_generation: int;
};

export type PluginStatusMarshalled = {
  plugin_status: {
    uploaders: Record<str, Record<str, any>>;
    downloaders: Record<str, Record<str, any>>;
  }
};

export type RootMarshalled = {
  tree_id: str;
  node_hash: Optional<str>;
  generation: int;
  status: int;
};
