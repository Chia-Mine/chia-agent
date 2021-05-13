import {uint16, uint64} from "../blockchain_format/ints";
import {NPC} from "./name_puzzle_condition";

export type NPCResult = {
  error?: uint16;
  npc_list: NPC[];
  clvm_cost: uint64; //  # CLVM cost only, cost of conditions and tx size is not included
};