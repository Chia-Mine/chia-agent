import {bytes32} from "./sized_bytes";
import {bytes, G1Element} from "../unclassified_type";
import {uint8} from "./ints";

export type ProofOfSpace = {
  challenge: bytes32; // byte32
  pool_public_key?: G1Element; // Optional[G1Element]
  pool_contract_puzzle_hash?: bytes32; // Optional[bytes32]
  plot_public_key: G1Element; // G1Element
  size: uint8; // uint8
  proof: bytes; // bytes
};
