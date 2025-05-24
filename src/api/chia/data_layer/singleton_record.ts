import { bool } from "../types/_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { LineageProof } from "../wallet/lineage_proof";

export type SingletonRecord = {
  coin_id: bytes32;
  launcher_id: bytes32;
  root: bytes32;
  inner_puzzle_hash: bytes32;
  confirmed: bool;
  confirmed_at_height: uint32;
  lineage_proof: LineageProof;
  generation: uint32;
  timestamp: uint64;
};
