import {bool, G1Element, int, Optional, PrivateKey, str, uint16, uint32, uint64} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {Notification} from "../wallet/notification_store";
import {
  SignedTransaction,
  SigningInstructions,
  SigningResponse,
  Spend,
  UnsignedTransaction
} from "../wallet/signer_protocol";
import {Marshall} from "./util";
import {TransactionRecord} from "../wallet/transaction_record";

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

export type TransactionEndpointRequest = {
  fee: uint64;
  push?: bool;
};

export type TransactionEndpointResponse = {
  unsigned_transactions: UnsignedTransaction[];
  transactions: TransactionRecord[];
};

export type TransactionEndpointResponseCHIP0029 = {
  unsigned_transactions: str[];
  transactions: str[];
};

export type SplitCoins = TransactionEndpointRequest & {
  wallet_id: uint32;
  number_of_coins: uint16;
  amount_per_coin: uint64;
  target_coin_id: bytes32;
} & Marshall;

export type SplitCoinsResponse = TransactionEndpointResponse;
export type SplitCoinsResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

export type CombineCoins = TransactionEndpointRequest & {
  wallet_id: uint32;
  number_of_coins: uint16;
  largest_first: bool;
  target_coin_ids: bytes32[];
  target_coin_amount?: uint64;
  coin_num_limit: uint16;
} & Marshall;

export type CombineCoinsResponse = TransactionEndpointResponse;
export type CombineCoinsResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

export type LogIn = {
  fingerprint: uint32;
};

export type LogInResponse = {
  fingerprint: uint32;
};

export type GetLoggedInFingerprintResponse = {
  fingerprint: Optional<uint32>;
};

export type GetPublicKeysResponse = {
  keyring_is_locked: bool;
  public_key_fingerprints?: uint32[];
};

export type GetPrivateKeyRequest = {
  fingerprint: uint32;
};

export type GetPrivateKeyFormat = {
  fingerprint: uint32;
  sk: PrivateKey;
  pk: G1Element;
  farmer_pk: G1Element;
  pool_pk: G1Element;
  seed: Optional<str>;
};

export type GetPrivateKeyResponse = {
  private_key: GetPrivateKeyFormat;
};

export type GenerateMnemonicResponse = {
  mnemonic: str[];
};

export type AddKeyRequest = {
  mnemonic: str[];
};

export type AddKeyResponse = {
  fingerprint: uint32;
};

export type DeleteKeyRequest = {
  fingerprint: uint32;
};

export type CheckDeleteKeyRequest = {
  fingerprint: uint32;
  max_ph_to_search?: uint32;
};
export type CheckDeleteKeyResponse = {
  fingerprint: uint32;
  used_for_farmer_rewards: bool;
  used_for_pool_rewards: bool;
  wallet_balance: bool;
};
