import { bytes32 } from "../wheel/python/sized_bytes";
import { bytes, Optional } from "../../chia/types/_python_types_";
import { G1Element } from "../chia-bls/lib";
import { uint8 } from "../wheel/python/sized_ints";

export type ProofOfSpace = {
  challenge: bytes32; // byte32
  pool_public_key: Optional<G1Element>; // Optional[G1Element]
  pool_contract_puzzle_hash: Optional<bytes32>; // Optional[bytes32]
  plot_public_key: G1Element; // G1Element
  size: uint8; // uint8
  proof: bytes; // bytes
};
