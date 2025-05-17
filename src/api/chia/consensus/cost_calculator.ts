import { SpendBundleConditions } from "../types/spend_bundle_condition";
import { Optional, uint16 } from "../types/_python_types_";

export type NPCResult = {
  error: Optional<uint16>;
  conds: Optional<SpendBundleConditions>;
};
