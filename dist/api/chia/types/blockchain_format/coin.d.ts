import { bytes32 } from "./sized_bytes";
import { uint64 } from "../_python_types_";
export declare type Coin = {
    parent_coin_info: bytes32;
    puzzle_hash: bytes32;
    amount: uint64;
};
