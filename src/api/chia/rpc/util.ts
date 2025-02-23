import {int, str, True} from "../types/_python_types_";
import {Condition} from "../wallet/conditions";

export type ExtraCondition = {
  opcode: str | int;
  args: Condition;
};

export type TranslationLayerKey = "CHIP-0028";

export type CHIP0029 = { "CHIP-0029": True };

export type Marshall = {
  translation?: TranslationLayerKey;
} & CHIP0029;

export type MaybeMarshall<T, Res, MarshalledRes> = T extends { "CHIP-0029": True } ? MarshalledRes : Res;
