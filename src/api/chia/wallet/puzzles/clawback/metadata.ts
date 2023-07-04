import {bool, uint16, uint64} from "../../../types/_python_types_";
import {bytes32} from "../../../types/blockchain_format/sized_bytes";

export type AutoClaimSettings = {
  enabled: bool;
  tx_fee: uint64;
  min_amount: uint64;
  batch_size: uint16;
};

export type ClawbackMetadata = {
  time_lock: uint64;
  sender_puzzle_hash: bytes32;
  recipient_puzzle_hash: bytes32;
};
