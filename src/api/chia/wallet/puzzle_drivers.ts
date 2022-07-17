import {str} from "../types/_python_types_";

export type TDriverDictValue = {
  type: str;
  also?: TDriverDict;
} & Record<str, any>;

export type TDriverDict = Record<str, TDriverDictValue>;
