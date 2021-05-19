import { ClassgroupElement } from "./classgroup";
import { bytes32 } from "./sized_bytes";
import { bool, bytes, uint64, uint8 } from "../_python_types_";
export declare type VDFInfo = {
    challenge: bytes32;
    number_of_iterations: uint64;
    output: ClassgroupElement;
};
export declare type VDFProof = {
    witness_type: uint8;
    witness: bytes;
    normalized_to_identity: bool;
};
