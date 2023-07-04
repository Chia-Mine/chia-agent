import {uint32} from "../../types/_python_types_";
import {VerifiedCredential} from "./vc_drivers";

export type VCRecord = {
  vc: VerifiedCredential;
  confirmed_at_height: uint32;  // 0 == pending confirmation
};
