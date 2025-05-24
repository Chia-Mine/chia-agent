import { bool, Optional, str } from "../types/_python_types_";
import { PrivateKey } from "../../chia_rs/chia-bls/secret_key";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { uint16, uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";
import { bytes32 } from "../../chia_rs/wheel/python/sized_bytes";
import { Notification } from "../wallet/notification_store";
import {
  SignedTransaction,
  SigningInstructions,
  SigningResponse,
  Spend,
  UnsignedTransaction,
} from "../wallet/signer_protocol";
import { Marshall } from "./util";
import {
  TransactionRecord,
  TransactionRecordConvenience,
} from "../wallet/transaction_record";
import { WalletSpendBundle } from "../wallet/wallet_spend_bundle";
import { TXEndpointRequest } from "./wallet_rpc_api";
import { VCRecord } from "../wallet/vc_wallet/vc_store";

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
  transactions: TransactionRecord[];
};

export type PushTransactions = TransactionEndpointRequest & {
  transactions: Array<TransactionRecord | TransactionRecordConvenience | str>;
  push: Optional<bool>;
} & TXEndpointRequest;

export type PushTransactionsCHIP0029 = PushTransactions & Marshall;

export type PushTransactionsResponse = TransactionEndpointResponse;
export type PushTransactionsResponseCHIP0029 =
  TransactionEndpointResponseCHIP0029;

export type GetTimestampForHeightRequest = {
  height: uint32;
};
export type GetTimestampForHeightRequestCHIP0029 =
  GetTimestampForHeightRequest & Marshall;
export type GetTimestampForHeightResponse = {
  timestamp: uint64;
};

export type SplitCoins = TransactionEndpointRequest & {
  wallet_id: uint32;
  number_of_coins: uint16;
  amount_per_coin: uint64;
  target_coin_id: bytes32;
} & TXEndpointRequest;
export type SplitCoinsCHIP0029 = SplitCoins & Marshall;

export type SplitCoinsResponse = TransactionEndpointResponse;
export type SplitCoinsResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

export type CombineCoins = TransactionEndpointRequest & {
  wallet_id: uint32;
  number_of_coins: uint16;
  largest_first: bool;
  target_coin_ids: bytes32[];
  target_coin_amount?: uint64;
  coin_num_limit: uint16;
} & TXEndpointRequest;
export type CombineCoinsCHIP0029 = CombineCoins & Marshall;

export type CombineCoinsResponse = TransactionEndpointResponse;
export type CombineCoinsResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

export type VCMint = TransactionEndpointRequest & {
  did_id: str;
  target_address: Optional<str>;
} & TXEndpointRequest;
export type VCMintCHIP0029 = VCMint & Marshall;
export type VcMintResponse = TransactionEndpointResponse & {
  vc_record: VCRecord;
};
export type VcMintResponseCHIP0029 = TransactionEndpointResponseCHIP0029 & {
  vc_record: VCRecord;
};

export type VCGet = {
  vc_id: bytes32;
};
export type VCGetCHIP0029 = VCGet & Marshall;
export type VcGetResponse = {
  vc_record: Optional<VCRecord>;
};

export type VcGetList = {
  start: uint32;
  end: uint32;
};
export type VcGetListCHIP0029 = VcGetList & Marshall;

export type VCProofsRPC = {
  key_value_pairs: Array<[str, str]>;
};
export type VCProofWithHash = {
  hash: bytes32;
  proof: Optional<VCProofsRPC>;
};
export type VcRecordWithCoinID = VCRecord & { coin_id: bytes32 };
export type VcGetListResponse = {
  vc_records: VcRecordWithCoinID[];
  proofs: VCProofWithHash[];
};

export type VcSpend = TransactionEndpointRequest & {
  vc_id: bytes32;
  new_puzhash: Optional<bytes32>;
  new_proof_hash: Optional<bytes32>;
  provider_inner_puzhash: Optional<bytes32>;
} & TXEndpointRequest;
export type VcSpendCHIP0029 = VcSpend & Marshall;
export type VcSpendResponse = TransactionEndpointResponse;
export type VcSpendResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

export type VcAddProofs = VCProofsRPC;
export type VcAddProofsCHIP0029 = VCProofsRPC & Marshall;

export type VCGetProofsForRoot = {
  root: bytes32;
};
export type VCGetProofsForRootCHIP0029 = VCGetProofsForRoot & Marshall;

export type VCGetProofsForRootResponse = VCProofsRPC;

export type VcRevoke = TransactionEndpointRequest & {
  vc_parent_id: bytes32;
} & TXEndpointRequest;
export type VcRevokeCHIP0029 = VcRevoke & Marshall;
export type VcRevokeResponse = TransactionEndpointResponse;
export type VcRevokeResponseCHIP0029 = TransactionEndpointResponseCHIP0029;

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

export type SetWalletResyncOnStartup = {
  enable?: bool;
};

export type SetWalletResyncOnStartupCHIP0029 = SetWalletResyncOnStartup &
  Marshall;

export type GetSyncStatus = Marshall;

export type GetSyncStatusResponse = {
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
};

export type GetHeightInfo = Marshall;

export type GetHeightInfoResponse = {
  height: uint32;
};

export type PushTX = {
  spend_bundle: WalletSpendBundle | str;
};

export type PushTXCHIP0029 = PushTX & Marshall;
