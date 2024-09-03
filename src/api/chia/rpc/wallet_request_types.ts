import {bool, str, uint32} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {Notification} from "../wallet/notification_store";
import {SignedTransaction, SigningInstructions, SigningResponse, Spend} from "../wallet/signer_protocol";
import {Marshall} from "./util";

export type GetNotifications = {
  ids?: bytes32[];
  start?: uint32;
  end?: uint32;
};

export type GetNotificationsResponse = {
  notifications: Notification[];
};

export type GatherSigningInfo = {
  spends: Spend[];
};

export type GatherSigningInfoCHIP0029 = {
  spends: str[];
} & Marshall;

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
  spends: str[];
  signing_responses: str[];
} & Marshall;

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
  signed_transactions: str[];
} & Marshall;

export type SubmitTransactionsResponse = {
  mempool_ids: bytes32[];
};

export type SubmitTransactionsResponseCHIP0029 = {
  mempool_ids: str[];
};

export type ExecuteSigningInstructions = {
  signing_instructions: SigningInstructions;
  partial_allowed: bool;
};

export type ExecuteSigningInstructionsCHIP0029 = {
  signing_instructions: str;
  partial_allowed: bool;
} & Marshall;

export type ExecuteSigningInstructionsResponse = {
  signing_responses: SigningResponse[];
};

export type ExecuteSigningInstructionsResponseCHIP0029 = {
  signing_responses: str[];
};
