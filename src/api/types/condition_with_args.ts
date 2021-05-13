import {ConditionOpcode} from "./condition_opcodes";
import {bytes} from "./unclassified_type";

export type ConditionWithArgs = {
  opcode: ConditionOpcode;
  vars: bytes[];
};