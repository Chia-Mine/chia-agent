import { bool, bytes, Optional, str } from "../types/_python_types_";
import { uint32, uint64, uint8 } from "../../chia_rs/wheel/python/sized_ints";
import { Coin } from "../types/blockchain_format/coin";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { ClawbackMetadata } from "./puzzles/clawback/metadata";
import { ConditionValidTimes } from "./conditions";
import { WalletSpendBundle } from "./wallet_spend_bundle";

export type TransactionRecordOld = {
  confirmed_at_height: uint32;
  created_at_time: uint64;
  to_puzzle_hash: bytes32;
  amount: uint64;
  fee_amount: uint64;
  confirmed: bool;
  sent: uint32;
  spend_bundle: Optional<WalletSpendBundle>;
  additions: Coin[];
  removals: Coin[];
  wallet_id: uint32;

  // # Represents the list of peers that we sent the transaction to, whether each one
  // # included it in the mempool, and what the error message (if any) was
  sent_to: Array<[string, uint8, string | undefined]>; // List[Tuple[str, uint8, Optional[str]]]
  trade_id: Optional<bytes32>;
  type: uint32; // # TransactionType
  name: bytes32;
  memos: Array<[bytes32, bytes[]]>;
};

export type TransactionRecord = TransactionRecordOld & {
  valid_times: ConditionValidTimes;
};

export type TransactionRecordConvenience = {
  to_address: str;
  memos: Record<str, str>;
} & TransactionRecord;

export type TransactionRecordConvenienceWithMetadata = {
  metadata: ClawbackMetadata & {
    coin_id: str;
    spent: bool;
  };
} & TransactionRecordConvenience;
