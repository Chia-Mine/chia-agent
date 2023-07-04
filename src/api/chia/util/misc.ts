import {bytes, uint16} from "../types/_python_types_";

export type VersionBlob = {
  version: uint16
  blob: bytes
};
