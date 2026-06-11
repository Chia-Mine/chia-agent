import { bytes } from "../types/_python_types_";
import { uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { PartialProof } from "../../chia_rs/chia-protocol/partial_proof";

export type SolverInfo = {
  partial_proof: PartialProof;
  plot_id: bytes32;
  strength: uint8;
  size: uint8;
};

export type SolverResponse = {
  partial_proof: PartialProof;
  proof: bytes;
};
