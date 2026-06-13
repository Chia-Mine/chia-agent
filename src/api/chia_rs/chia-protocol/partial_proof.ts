import { uint64 } from "../wheel/python/sized_ints";

export type PartialProof = {
  proof_fragments: uint64[]; // 64 entries
};
