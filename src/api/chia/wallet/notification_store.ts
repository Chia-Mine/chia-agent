import { bytes } from "../types/_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";

export type Notification = {
  id: bytes32;
  message: bytes;
  amount: uint64;
  height: uint32;
};
