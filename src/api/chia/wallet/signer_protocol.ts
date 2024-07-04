import {bytes, str, uint64} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {Program} from "../types/blockchain_format/program";

export type Coin = {
  parent_coin_id: bytes32;
  puzzle_hash: bytes32;
  amount: uint64;
};

export type Spend = {
  coin: Coin;
  puzzle: Program;
  solution: Program;
};

export type TransactionInfo = {
  spends: Spend[];
}

export type SigningTarget = {
  fingerprint: bytes;
  message: bytes;
  hook: bytes32;
};

export type SumHint = {
  fingerprints: bytes[];
  synthetic_offset: bytes;
  final_pubkey: bytes;
};

export type PathHint = {
  root_fingerprint: bytes;
  path: uint64[];
};

export type KeyHints = {
  sum_hints: SumHint[];
  path_hints: PathHint[];
};

export type SigningInstructions = {
  key_hints: KeyHints;
  targets: SigningTarget[];
};

export type UnsignedTransaction = {
  transaction_info: TransactionInfo;
  signing_instructions: SigningInstructions;
};

export type SigningResponse = {
  signature: bytes;
  hook: bytes32;
};

export type Signature = {
  type: str;
  signature: bytes;
};

export type SignedTransaction = {
  transaction_info: TransactionInfo;
  signatures: Signature[];
};
