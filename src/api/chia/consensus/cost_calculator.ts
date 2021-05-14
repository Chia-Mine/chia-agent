import {NPC} from "../types/name_puzzle_condition";
import {Optional, uint16, uint64} from "../types/_python_types_";

export type NPCResult = {
  error: Optional<uint16>;
  npc_list: NPC[];
  clvm_cost: uint64; //  # CLVM cost only, cost of conditions and tx size is not included
};