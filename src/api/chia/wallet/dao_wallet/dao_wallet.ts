import {bool, bytes, int, None} from "../../types/_python_types_";
import {Program} from "../../types/blockchain_format/program";
import {DAORules} from "./dao_info";

// Return type of get_proposal_state
export type ProposalState = {
  total_votes_needed: int;
  yes_votes_needed: int;
  blocks_needed: int;
  passed: bool;
  closable: bool;
  closed: bool | None;
};

// Return type of parse_proposal
export type ParsedProposalSpend = {
  state: ProposalState;
  proposal_type: "s";
  proposed_puzzle_reveal: Program;
  xch_conditions: Array<{puzzle_hash: bytes; amount: int}>;
  asset_conditions: Array<{asset_id: bytes; condition: Array<{ puzzle_hash: bytes; amount: int}>;}>;
} & ({
  mint_amount: int;
  new_cat_puzhash: bytes;
} | object);

// Return type of parse_proposal
export type ParsedProposalUpdate = {
  state: ProposalState;
  proposal_type: "u";
  dao_rules: DAORules;
};
