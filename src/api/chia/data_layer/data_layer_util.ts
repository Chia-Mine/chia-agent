import {bool, int, Optional, str, uint8} from "../types/_python_types_";
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

export type ProofLayer = {
  other_hash_side: uint8;
  other_hash: bytes32;
  combined_hash: bytes32;
};

export type HashOnlyProof = {
  key_clvm_hash: bytes32;
  value_clvm_hash: bytes32;
  node_hash: bytes32;
  layers: ProofLayer[]
};

export type KeyValueHashes = {
  key_clvm_hash: bytes32;
  value_clvm_hash: bytes32;
};

export type ProofResultInclusions = {
  store_id: bytes32
  inclusions: KeyValueHashes[];
};

export type StoreProofsHashes = {
  store_id: bytes32;
  proofs: HashOnlyProof[];
};

export type DLProof = {
  store_proofs: StoreProofsHashes;
  coin_id: bytes32;
  inner_puzzle_hash: bytes32;
};

export type VerifyProofResponse = {
  verified_clvm_hashes: ProofResultInclusions;
  current_root: bool
  success: bool;
};