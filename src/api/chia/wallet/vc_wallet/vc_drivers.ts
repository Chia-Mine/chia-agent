import {bytes32} from "../../types/blockchain_format/sized_bytes";
import {Optional} from "../../types/_python_types_";
import {LineageProof} from "../lineage_proof";
import {Coin} from "../../types/blockchain_format/coin";

export type VCLineageProof = LineageProof & {
  parent_proof_hash: Optional<bytes32>;
};

export type VerifiedCredential = {
  coin: Coin
  singleton_lineage_proof: LineageProof
  eml_lineage_proof: VCLineageProof
  launcher_id: bytes32
  inner_puzzle_hash: bytes32
  proof_provider: bytes32
  proof_hash: Optional<bytes32>
};
