import {G1Element, Optional, str, uint64, uint8} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";

export type Plot = {
  filename: str;
  size: uint8;
  plot_id: bytes32;
  pool_public_key: Optional<G1Element>;
  pool_contract_puzzle_hash: Optional<bytes32>;
  plot_public_key: G1Element;
  file_size: uint64;
  time_modified: uint64;
};
