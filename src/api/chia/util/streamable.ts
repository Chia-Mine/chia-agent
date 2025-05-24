import { bytes } from "../types/_python_types_";
import { uint16 } from "../../chia_rs/wheel/python/sized_ints";

export type VersionedBlob = {
  version: uint16;
  blob: bytes;
};
