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
  memos: Record<str, bytes[]>; // Dict[bytes32, List[bytes]] - keys are 0x-prefixed coin ids
};

export type TransactionRecord = TransactionRecordOld & {
  to_address: str;
  valid_times: ConditionValidTimes;
};

// As of chia-blockchain 2.5.7, RPC responses serialize transaction records with
// the plain streamable `to_json_dict()`; the previous "convenience" format was removed.
/** @deprecated Use {@link TransactionRecord} instead */
export type TransactionRecordConvenience = TransactionRecord;

export type TransactionRecordWithMetadata = TransactionRecord & {
  metadata: Optional<
    ClawbackMetadata & {
      coin_id: str;
      spent: bool;
    }
  >;
};

/** @deprecated Use {@link TransactionRecordWithMetadata} instead */
export type TransactionRecordConvenienceWithMetadata =
  TransactionRecordWithMetadata;
