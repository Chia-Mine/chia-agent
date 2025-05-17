import { bytes, uint32, uint64 } from "../types/_python_types_";
import { bytes32 } from "../types/blockchain_format/sized_bytes";

export type Notification = {
  id: bytes32;
  message: bytes;
  amount: uint64;
  height: uint32;
};
