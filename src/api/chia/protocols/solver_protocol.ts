import { bytes } from "../types/_python_types_";

export type SolverInfo = {
  partial_proof: bytes;
};

export type SolverResponse = {
  partial_proof: bytes;
  proof: bytes;
};
