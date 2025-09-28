import { SpendBundleConditions } from "../../chia_rs/chia-consensus/owned_conditions";
import { Optional } from "../types/_python_types_";
import { uint16 } from "../../chia_rs/wheel/python/sized_ints";

export type NPCResult = {
  error: Optional<uint16>;
  conds: Optional<SpendBundleConditions>;
};
