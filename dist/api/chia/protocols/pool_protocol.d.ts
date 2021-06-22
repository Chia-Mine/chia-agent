import { bool, G1Element, G2Element, Optional, str, uint16, uint32, uint64, uint8 } from "../types/_python_types_";
import { bytes32 } from "../types/blockchain_format/sized_bytes";
import { ProofOfSpace } from "../types/blockchain_format/proof_of_space";
export declare const PoolErrorCode: {
    REVERTED_SIGNAGE_POINT: number;
    TOO_LATE: number;
    NOT_FOUND: number;
    INVALID_PROOF: number;
    PROOF_NOT_GOOD_ENOUGH: number;
    INVALID_DIFFICULTY: number;
    INVALID_SIGNATURE: number;
    SERVER_EXCEPTION: number;
    INVALID_P2_SINGLETON_PUZZLE_HASH: number;
    FARMER_NOT_KNOWN: number;
    FARMER_ALREADY_KNOWN: number;
    INVALID_AUTHENTICATION_TOKEN: number;
    INVALID_PAYOUT_INSTRUCTIONS: number;
    INVALID_SINGLETON: number;
    DELAY_TIME_TOO_SHORT: number;
    REQUEST_FAILED: number;
};
export declare type AuthenticationPayload = {
    method_name: str;
    launcher_id: bytes32;
    target_puzzle_hash: bytes32;
    authentication_token: uint64;
};
export declare type GetPoolInfoResponse = {
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
export declare type PostPartialPayload = {
    launcher_id: bytes32;
    authentication_token: uint64;
    proof_of_space: ProofOfSpace;
    sp_hash: bytes32;
    end_of_sub_slot: bool;
    harvester_id: bytes32;
};
export declare type PostPartialRequest = {
    payload: PostPartialPayload;
    aggregate_signature: G2Element;
};
export declare type PostPartialResponse = {
    new_difficulty: uint64;
};
export declare type GetFarmerResponse = {
    authentication_public_key: G1Element;
    payout_instructions: str;
    current_difficulty: uint64;
    current_points: uint64;
};
export declare type PostFarmerPayload = {
    launcher_id: bytes32;
    authentication_token: uint64;
    authentication_public_key: G1Element;
    payout_instructions: str;
    suggested_difficulty: Optional<uint64>;
};
export declare type PostFarmerRequest = {
    payload: PostFarmerPayload;
    signature: G2Element;
};
export declare type PostFarmerResponse = {
    welcome_message: str;
};
export declare type PutFarmerPayload = {
    launcher_id: bytes32;
    authentication_token: uint64;
    authentication_public_key: Optional<G1Element>;
    payout_instructions: Optional<str>;
    suggested_difficulty: Optional<uint64>;
};
export declare type PutFarmerRequest = {
    payload: PutFarmerPayload;
    signature: G2Element;
};
export declare type PutFarmerResponse = {
    authentication_public_key: Optional<bool>;
    payout_instructions: Optional<bool>;
    suggested_difficulty: Optional<bool>;
};
export declare type ErrorResponse = {
    error_code: uint16;
    error_message: Optional<str>;
};
