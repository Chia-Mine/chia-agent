import { str, uint64 } from "../../chia/types/_python_types_";
import { TRPCAgent } from "../../../rpc";
import { ErrorResponse, GetFarmerResponse, GetPoolInfoResponse, PostFarmerRequest, PostFarmerResponse, PostPartialRequest, PostPartialResponse, PutFarmerRequest, PutFarmerResponse } from "../../chia/protocols/pool_protocol";
import { FarmerRecord } from "../../chia/pool/store";
export declare type TPoolInfoResponse = GetPoolInfoResponse;
export declare function pool_info(agent: TRPCAgent): Promise<GetPoolInfoResponse>;
export declare type TGetFarmerRequest = {
    launcher_id: str;
    target_puzzle_hash: str;
    authentication_token: str;
    signature: str;
};
export declare type TGetFarmerResponse = GetFarmerResponse;
export declare function get_farmer(agent: TRPCAgent, data: TGetFarmerRequest): Promise<GetFarmerResponse>;
export declare type TPostFarmerRequest = PostFarmerRequest;
export declare type TPostFarmerResponse = PostFarmerResponse | ErrorResponse;
export declare function post_farmer(agent: TRPCAgent, data: TPostFarmerRequest): Promise<TPostFarmerResponse>;
export declare type TPutFarmerRequest = PutFarmerRequest;
export declare type TPutFarmerResponse = PutFarmerResponse | ErrorResponse;
export declare function put_farmer(agent: TRPCAgent, data: TPutFarmerRequest): Promise<TPutFarmerResponse>;
export declare type TPartialRequest = PostPartialRequest;
export declare type TPartialResponse = PostPartialResponse | ErrorResponse;
export declare function partial(agent: TRPCAgent, data: TPartialRequest): Promise<TPartialResponse>;
export declare type TLoginRequest = {
    launcher_id: str;
    target_puzzle_hash: str;
    authentication_token: uint64;
    signature: str;
};
export declare type TLoginResponse = {
    farmer_record: FarmerRecord;
    recent_partials: Array<[uint64, uint64]>;
} | {};
export declare function login(agent: TRPCAgent, data: TLoginRequest): Promise<TLoginResponse>;
