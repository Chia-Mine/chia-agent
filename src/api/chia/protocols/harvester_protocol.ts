import { Optional, str } from "../types/_python_types_";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { uint64, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";

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
