import { VDFInfo, VDFProof } from "../types/blockchain_format/vdf";
import { Optional } from "../types/_python_types_";
export declare type SignagePoint = {
    cc_vdf: Optional<VDFInfo>;
    cc_proof: Optional<VDFProof>;
    rc_vdf: Optional<VDFInfo>;
    rc_proof: Optional<VDFProof>;
};
