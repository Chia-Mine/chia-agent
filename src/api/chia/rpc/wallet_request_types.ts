import {bool, str, True, uint32} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {Notification} from "../wallet/notification_store";
import {SignedTransaction, SigningInstructions, SigningResponse, Spend} from "../wallet/signer_protocol";

export type GetNotifications = {
  ids?: bytes32[];
  start?: uint32;
  end?: uint32;
  "CHIP-0029": bool;
};

export type GetNotificationsResponse = {
  notifications: Notification[];
};

export type GatherSigningInfo = {
  spends: Spend[];
};

export type GatherSigningInfoCHIP0029 = {
  "CHIP-0029": True;
  spends: str[];
};

export type GatherSigningInfoResponse = {
  signing_instructions: SigningInstructions;
};

export type GatherSigningInfoResponseCHIP0029 = {
  signing_instructions: str;
};

export type ApplySignatures = {
  spends: Spend[];
  signing_responses: SigningResponse[];
};

export type ApplySignaturesCHIP0029 = {
  "CHIP-0029": True;
  spends: str[];
  signing_responses: str[];
};

export type ApplySignaturesResponse = {
  signed_transactions: SignedTransaction[];
};

export type ApplySignaturesResponseCHIP0029 = {
  signed_transactions: str[];
};

export type SubmitTransactions = {
  signed_transactions: SignedTransaction[];
};

export type SubmitTransactionsCHIP0029 = {
  "CHIP-0029": True;
  signed_transactions: str[];
};

export type SubmitTransactionsResponse = {
  mempool_ids: bytes32[];
};

export type SubmitTransactionsResponseCHIP0029 = {
  mempool_ids: str[];
};
