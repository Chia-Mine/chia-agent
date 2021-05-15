import { SpendBundle } from "./spend_bundle";
import { SerializedProgram } from "./blockchain_format/program";
import { Coin } from "./blockchain_format/coin";
import { bytes32 } from "./blockchain_format/sized_bytes";
import { NPCResult } from "../consensus/cost_calculator";
import { uint64 } from "./_python_types_";
export declare type MempoolItem = {
    spend_bundle: SpendBundle;
    fee: uint64;
    npc_result: NPCResult;
    cost: uint64;
    spend_bundle_name: bytes32;
    additions: Coin[];
    removals: Coin[];
    program: SerializedProgram;
};
