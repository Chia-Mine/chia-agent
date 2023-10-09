import {uint32, uint8} from "../../types/_python_types_";

export const WalletType = {
// # Wallet Types
  STANDARD_WALLET: 0,
  // RATE_LIMITED: 1, // Deprecated at chia-blockchain@1.6.1
  ATOMIC_SWAP: 2,
  AUTHORIZED_PAYEE: 3,
  MULTI_SIG: 4,
  CUSTODY: 5,
  CAT: 6,
  RECOVERABLE: 7,
  DECENTRALIZED_ID: 8,
  POOLING_WALLET: 9,
  NFT: 10,
  DATA_LAYER: 11,
  DATA_LAYER_OFFER: 12,
  VC: 13,
  CRCAT: 57,
} as const;

export const CoinType = {
  NORMAL: 0,
  CLAWBACK: 1,
  CRCAT_PENDING: 2,
  CRCAT: 3,
} as const;

export type StreamableWalletIdentifier = {
  id: uint32;
  type: uint8;
};
