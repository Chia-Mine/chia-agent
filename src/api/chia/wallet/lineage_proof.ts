import { Optional } from "../types/_python_types_";
import { uint64 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";

export type LineageProof = {
  parent_name: Optional<bytes32>;
  inner_puzzle_hash: Optional<bytes32>;
  amount: Optional<uint64>;
};
