import {bytes,} from "./_python_types_";
import {ConditionOpcode} from "./condition_opcode";

export type ConditionWithArgs = {
  opcode: ConditionOpcode;
  vars: bytes[];
};
