import { uint64 } from "../wheel/python/sized_ints";

export type PartialProof = {
  fragments: uint64[]; // 16 entries
};
