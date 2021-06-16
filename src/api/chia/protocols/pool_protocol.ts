import {bool, G1Element, G2Element, Optional, str, uint16, uint32, uint64, uint8} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";
import {ProofOfSpace} from "../types/blockchain_format/proof_of_space";

export const PoolErrorCode = {
  REVERTED_SIGNAGE_POINT: 1,
  TOO_LATE: 2,
  NOT_FOUND: 3,
  INVALID_PROOF: 4,
  PROOF_NOT_GOOD_ENOUGH: 5,
  INVALID_DIFFICULTY: 6,
  INVALID_SIGNATURE: 7,
  SERVER_EXCEPTION: 8,
  INVALID_P2_SINGLETON_PUZZLE_HASH: 9,
  FARMER_NOT_KNOWN: 10,
  FARMER_ALREADY_KNOWN: 11,
  INVALID_AUTHENTICATION_TOKEN: 12,
  INVALID_PAYOUT_INSTRUCTIONS: 13,
  INVALID_SINGLETON: 14,
  DELAY_TIME_TOO_SHORT: 15,
  REQUEST_FAILED: 16,
};

export type AuthenticationPayload = {
  method_name: str;
  launcher_id: bytes32;
  target_puzzle_hash: bytes32;
  authentication_token: uint64;
};

export type GetPoolInfoResponse = {
  name: str;
  logo_url: str;
  minimum_difficulty: uint64;
  relative_lock_height: uint32;
  protocol_version: str;
  fee: str;
  description: str;
  target_puzzle_hash: bytes32;
  authentication_token_timeout: uint8;
};

export type PostPartialPayload = {
  launcher_id: bytes32;
  authentication_token: uint64;
  proof_of_space: ProofOfSpace;
  sp_hash: bytes32;
  end_of_sub_slot: bool;
  harvester_id: bytes32;
};

export type PostPartialRequest = {
  payload: PostPartialPayload;
  aggregate_signature: G2Element;
};

export type PostPartialResponse = {
  new_difficulty: uint64;
};

export type GetFarmerResponse = {
  authentication_public_key: G1Element;
  payout_instructions: str;
  current_difficulty: uint64;
  current_points: uint64;
};

export type PostFarmerPayload = {
  launcher_id: bytes32;
  authentication_token: uint64;
  authentication_public_key: G1Element;
  payout_instructions: str;
  suggested_difficulty: Optional<uint64>;
};

export type PostFarmerRequest = {
  payload: PostFarmerPayload;
  signature: G2Element;
};

export type PostFarmerResponse = {
  welcome_message: str;
};

export type PutFarmerPayload = {
  launcher_id: bytes32;
  authentication_token: uint64;
  authentication_public_key: Optional<G1Element>;
  payout_instructions: Optional<str>;
  suggested_difficulty: Optional<uint64>;
};

export type PutFarmerRequest = {
  payload: PutFarmerPayload;
  signature: G2Element;
};

export type PutFarmerResponse = {
  authentication_public_key: Optional<bool>;
  payout_instructions: Optional<bool>;
  suggested_difficulty: Optional<bool>;
};

export type ErrorResponse = {
  error_code: uint16;
  error_message: Optional<str>;
};
