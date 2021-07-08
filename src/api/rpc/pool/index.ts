import {str, uint64} from "../../chia/types/_python_types_";
import {TRPCAgent} from "../../../rpc";
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
import {FarmerRecord} from "../../chia/pool/store";



export type TPoolInfoResponse = GetPoolInfoResponse;
export async function pool_info(agent: TRPCAgent){
  return agent.request<TPoolInfoResponse>("GET", "pool_info");
}



export type TGetFarmerRequest = {
  launcher_id: str;
  authentication_token: str;
  signature: str;
};
export type TGetFarmerResponse = GetFarmerResponse;
export async function get_farmer(agent: TRPCAgent, data: TGetFarmerRequest){
  return agent.request<TGetFarmerResponse>("GET", "farmer");
}



export type TPostFarmerRequest = PostFarmerRequest;
export type TPostFarmerResponse = PostFarmerResponse | ErrorResponse;
export async function post_farmer(agent: TRPCAgent, data: TPostFarmerRequest){
  return agent.request<TPostFarmerResponse>("POST", "farmer");
}



export type TPutFarmerRequest = PutFarmerRequest;
export type TPutFarmerResponse = PutFarmerResponse | ErrorResponse;
export async function put_farmer(agent: TRPCAgent, data: TPutFarmerRequest){
  return agent.request<TPutFarmerResponse>("PUT", "farmer");
}



export type TPartialRequest = PostPartialRequest;
export type TPartialResponse = PostPartialResponse | ErrorResponse;
export async function partial(agent: TRPCAgent, data: TPartialRequest){
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
} | { };
export async function login(agent: TRPCAgent, data: TLoginRequest){
  return agent.request<TLoginResponse>("GET", "login", data);
}
