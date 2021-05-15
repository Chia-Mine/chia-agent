import {ProofOfSpace} from "../../chia/types/blockchain_format/proof_of_space";
import {NewSignagePoint} from "../../chia/protocols/farmer_protocol";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {uint32, uint64} from "../../chia/types/_python_types_";

export const new_farming_info = "new_farming_info";
export type TNewFarmingInfoBroadCast = {
  farming_info: {
    challenge_hash: bytes32;
    signage_point: bytes32;
    passed_filter: uint32;
    proofs: uint32;
    total_plots: uint32;
    timestamp: uint64;
  }
};

export const new_signage_point = "new_signage_point";
export type TNewSignagePointBroadCast = {
  proofs: ProofOfSpace[];
  signage_point: NewSignagePoint;
};
