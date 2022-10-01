import {Optional, uint64} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";

export type LineageProof = {
  parent_name: Optional<bytes32>;
  inner_puzzle_hash: Optional<bytes32>;
  amount: Optional<uint64>;
};
