import { bytes, float, G1Element, int, Optional, str } from "../types/_python_types_";
import { bytes32 } from "../types/blockchain_format/sized_bytes";
export declare type Plot = {
    filename: str;
    size: int;
    "plot-seed": bytes;
    plot_id: bytes;
    pool_public_key: Optional<G1Element>;
    pool_contract_puzzle_hash: Optional<bytes32>;
    plot_public_key: G1Element;
    file_size: int;
    time_modified: float;
};
