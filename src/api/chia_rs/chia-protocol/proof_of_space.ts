import { bytes32 } from "../wheel/python/sized_bytes";
import { bytes, Optional } from "../../chia/types/_python_types_";
import { G1Element } from "../chia-bls/lib";
import { uint16, uint8 } from "../wheel/python/sized_ints";

export type ProofOfSpace = {
  challenge: bytes32; // byte32
  pool_public_key: Optional<G1Element>; // Optional[G1Element]
  pool_contract_puzzle_hash: Optional<bytes32>; // Optional[bytes32]
  plot_public_key: G1Element; // G1Element
  version: uint8; // uint8 // 0 for v1 proof-of-space and 1 for v2
  // These are set for v2 proofs and all zero for v1 proofs
  plot_index: uint16; // uint16
  meta_group: uint8; // uint8
  strength: uint8; // uint8
  // this is set for v1 proofs, and zero for v2 proofs
  size: uint8; // uint8
  proof: bytes; // bytes
};
