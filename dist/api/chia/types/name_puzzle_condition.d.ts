import { bytes32 } from "./blockchain_format/sized_bytes";
import { ConditionOpcode } from "./condition_opcodes";
import { ConditionWithArgs } from "./condition_with_args";
export declare type NPC = {
    coin_name: bytes32;
    puzzle_hash: bytes32;
    conditions: Array<[ConditionOpcode, ConditionWithArgs[]]>;
};
