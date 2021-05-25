import {bool, bytes, G1Element, int, Optional, str, uint32, uint64, uint8} from "../../chia/types/_python_types_";
import {TRPCAgent} from "../../../rpc/index";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";

export type TPoolInfoResponse = {
  description: str;
  fee: str;
  logo_url: str;
  minimum_difficulty: uint64;
  name: str;
  protocol_version: str;
  relative_lock_height: uint32;
  target_puzzle_hash: str;
};
export async function pool_info(agent: TRPCAgent){
  return agent.request<TPoolInfoResponse>("GET", "pool_info");
}

export type TPartialsRequest = {
  payload: {
    proof_of_space: {
      challenge: bytes32;
      pool_contract_puzzle_hash: bytes32;
      plot_public_key: G1Element;
      size: uint8;
      proof: bytes;
    };
  };
  sp_hash: str;
  end_of_sub_slot: bool;
  suggested_difficulty: uint64;
  singleton_genesis: str;
  owner_public_key: str;
  pool_payout_instructions: str;
  authentication_key_info: {
    authentication_public_key: str;
    authentication_public_key_timestamp: uint64;
  };
  auth_key_and_partial_aggregate_signature: str;
};
export type TPartialsResponse = {
  points_balance: uint64;
  current_difficulty: uint64;
} | {
  error_code: int;
  error_message: str;
};
export async function partials(agent: TRPCAgent, data: TPartialsRequest){
  return agent.request<TPartialsResponse>("POST", "partials", data);
}