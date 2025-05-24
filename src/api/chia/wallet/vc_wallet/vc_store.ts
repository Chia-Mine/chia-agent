import { uint32 } from "../../../chia_rs/wheel/python/sized_ints";
import { VerifiedCredential } from "./vc_drivers";

export type VCRecord = {
  vc: VerifiedCredential;
  confirmed_at_height: uint32; // 0 == pending confirmation
};
