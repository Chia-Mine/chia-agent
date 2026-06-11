import { Optional, str } from "../types/_python_types_";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { uint16, uint64, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { PartialProof } from "../../chia_rs/chia-protocol/partial_proof";

export type PartialProofsData = {
  challenge_hash: bytes32;
  sp_hash: bytes32;
  plot_identifier: str;
  partial_proofs: PartialProof[];
  signage_point_index: uint8;
  plot_size: uint8;
  plot_index: uint16;
  meta_group: uint8;
  strength: uint8;
  plot_id: bytes32;
  pool_public_key: Optional<G1Element>;
  pool_contract_puzzle_hash: Optional<bytes32>;
  plot_public_key: G1Element;
};

export type Plot = {
  filename: str;
  // For v2 plots the MSB is set: value = 0x80 | strength. v1 plots keep the plain k-size.
  size: uint8;
  plot_id: bytes32;
  pool_public_key: Optional<G1Element>;
  pool_contract_puzzle_hash: Optional<bytes32>;
  plot_public_key: G1Element;
  file_size: uint64;
  time_modified: uint64;
  compression_level: Optional<uint8>;
};
