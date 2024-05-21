import {bool, Optional, uint32, uint64} from "../../types/_python_types_";
import {bytes32} from "../../types/blockchain_format/sized_bytes";
import {Program} from "../../types/blockchain_format/program";
import {Coin} from "../../types/blockchain_format/coin";
import {LineageProof} from "../lineage_proof";

export type ProposalInfo = {
  proposal_id: bytes32; // this is launcher_id
  inner_puzzle: Program;
  amount_voted: uint64;
  yes_votes: uint64;
  current_coin: Coin;
  current_innerpuz: Optional<Program>;
  timer_coin: Optional<Coin>; // if this is None then the proposal has finished
  singleton_block_height: uint32; // Block height that current proposal singleton coin was created in
  passed: bool;
  closed: bool;
};

export type DAOInfo = {
  treasury_id: bytes32;
  cat_wallet_id: uint32;
  dao_cat_wallet_id: uint32;
  proposals_list: ProposalInfo[];
  parent_info: Array<[bytes32, Optional<LineageProof>]>; // {coin.name(): LineageProof}
  current_treasury_coin: Optional<Coin>;
  current_treasury_innerpuz: Optional<Program>;
  singleton_block_height: uint32; // the block height that the current treasury singleton was created in
  filter_below_vote_amount: uint64; // we ignore proposals with fewer votes than this - defaults to 1
  assets: Array<Optional<bytes32>>;
  current_height: uint64;
};

export type DAORules = {
  proposal_timelock: uint64;
  soft_close_length: uint64;
  attendance_required: uint64;
  pass_percentage: uint64;
  self_destruct_length: uint64;
  oracle_spend_delay: uint64;
  proposal_minimum_amount: uint64;
};