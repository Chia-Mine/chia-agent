import {bytes32} from "./sized_bytes";
import {uint32} from "../_python_types_";

export type PoolTarget = {
  puzzle_hash: bytes32; // bytes32
  max_height: uint32; // uint32  # A max height of 0 means it is valid forever
};
