import {str} from "../types/_python_types_";

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
