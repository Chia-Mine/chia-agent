import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { bool, bytes, uint64, uint8 } from "../../chia/types/_python_types_";
import { ClassgroupElement } from "./classgroup";

export type VDFInfo = {
  challenge: bytes32; // bytes32  # Used to generate the discriminant (VDF group)
  number_of_iterations: uint64; // uint64
  output: ClassgroupElement;
};

export type VDFProof = {
  witness_type: uint8; // uint8
  witness: bytes; // bytes
  normalized_to_identity: bool; // bool
};
