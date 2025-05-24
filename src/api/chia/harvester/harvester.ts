import { bytes, Optional, str } from "../types/_python_types_";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { int } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";

export type Plot = {
  filename: str;
  size: int;
  plot_id: bytes;
  pool_public_key: Optional<G1Element>;
  pool_contract_puzzle_hash: Optional<bytes32>;
  plot_public_key: G1Element;
  file_size: int;
  time_modified: int;
  compression_level: int;
};
