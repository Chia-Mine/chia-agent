import {str, uint64} from "../../chia/types/_python_types_";
import type {RPCAgent} from "../../../rpc";
import {
  ErrorResponse,
  GetFarmerResponse,
  GetPoolInfoResponse,
  PostFarmerRequest,
  PostFarmerResponse,
  PostPartialRequest,
  PostPartialResponse,
  PutFarmerRequest,
  PutFarmerResponse
} from "../../chia/protocols/pool_protocol";
import {FarmerRecord} from "../../chia/pool/record";



export type TPoolInfoResponse = GetPoolInfoResponse;
export async function pool_info(agent: RPCAgent){
  return agent.request<TPoolInfoResponse>("GET", "pool_info");
}



export type TGetFarmerRequest = {
  launcher_id: str;
  authentication_token: str;
  signature: str;
};
export type TGetFarmerResponse = GetFarmerResponse;
export async function get_farmer(agent: RPCAgent, data: TGetFarmerRequest){
  return agent.request<TGetFarmerResponse>("GET", "farmer", data);
}



export type TPostFarmerRequest = PostFarmerRequest;
export type TPostFarmerResponse = PostFarmerResponse | ErrorResponse;
export async function post_farmer(agent: RPCAgent, data: TPostFarmerRequest){
  return agent.request<TPostFarmerResponse>("POST", "farmer", data);
}



export type TPutFarmerRequest = PutFarmerRequest;
export type TPutFarmerResponse = PutFarmerResponse | ErrorResponse;
export async function put_farmer(agent: RPCAgent, data: TPutFarmerRequest){
  return agent.request<TPutFarmerResponse>("PUT", "farmer", data);
}



export type TPartialRequest = PostPartialRequest;
export type TPartialResponse = PostPartialResponse | ErrorResponse;
export async function partial(agent: RPCAgent, data: TPartialRequest){
  return agent.request<TPartialResponse>("POST", "partial", data);
}



export type TLoginRequest = {
  launcher_id: str;
  authentication_token: uint64;
  signature: str;
};
export type TLoginResponse = {
  farmer_record: FarmerRecord;
  recent_partials: Array<[uint64, uint64]>; // Array of tuple [timestamp, difficulty]
} | Record<string, never>;
export async function login(agent: RPCAgent, data: TLoginRequest){
  return agent.request<TLoginResponse>("GET", "login", data);
}
