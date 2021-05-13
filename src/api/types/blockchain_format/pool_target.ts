import {uint32} from "./ints";
import {bytes32} from "./sized_bytes";

export type PoolTarget = {
  puzzle_hash: bytes32; // bytes32
  max_height: uint32; // uint32  # A max height of 0 means it is valid forever
};
