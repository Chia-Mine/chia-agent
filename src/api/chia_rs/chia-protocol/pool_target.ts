import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {uint32} from "../../chia/types/_python_types_";

export type PoolTarget = {
  puzzle_hash: bytes32; // bytes32
  max_height: uint32; // uint32  # A max height of 0 means it is valid forever
};
