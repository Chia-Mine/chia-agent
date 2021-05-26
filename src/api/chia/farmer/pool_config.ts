import {G1Element, G2Element, str, uint64} from "../types/_python_types_";
import {bytes32} from "../types/blockchain_format/sized_bytes";

export type PoolConfig = {
  pool_url: str
  pool_payout_instructions: str
  target_puzzle_hash: bytes32
  singleton_genesis: bytes32
  owner_public_key: G1Element
  authentication_public_key: G1Element
  authentication_public_key_timestamp: uint64
  authentication_key_info_signature: G2Element
};