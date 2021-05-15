import { ProofOfSpace } from "../../chia/types/blockchain_format/proof_of_space";
import { bool, str, uint64, uint8 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { IAgent } from "../../../agent.type";
export declare const serviceName = "chia_farmer";
export declare type TGetSignagePointRequest = {
    sp_hash: str;
};
export declare type TGetSignagePointResponse = {
    signage_point: {
        challenge_hash: bytes32;
        challenge_chain_sp: bytes32;
        reward_chain_sp: bytes32;
        difficulty: uint64;
        sub_slot_iters: uint64;
        signage_point_index: uint8;
    };
    proofs: [string, ProofOfSpace];
};
export declare function get_signage_point(agent: IAgent, data: TGetSignagePointRequest): Promise<import("../../../agent.type").TMessage<TGetSignagePointResponse>>;
export declare type TGetSignagePointsRequest = {};
export declare type TGetSignagePointsResponse = {
    signage_points: TGetSignagePointResponse[];
};
export declare function get_signage_points(agent: IAgent, data: TGetSignagePointsRequest): Promise<import("../../../agent.type").TMessage<TGetSignagePointsResponse>>;
export declare type TGetRewardTargetRequest = {
    search_for_private_key: bool;
};
export declare type TGetRewardTargetResponse = {
    farmer_target: str;
    pool_target: str;
    have_farmer_sk: bool;
    have_pool_sk: bool;
} | {
    farmer_target: str;
    pool_target: str;
};
export declare function get_reward_targets(agent: IAgent, data: TGetRewardTargetRequest): Promise<import("../../../agent.type").TMessage<TGetRewardTargetResponse>>;
export declare type TSetRewardTargetRequest = {
    farmer_target?: str;
    pool_target?: str;
};
export declare type TSetRewardTargetResponse = {};
export declare function set_reward_targets(agent: IAgent, data: TSetRewardTargetRequest): Promise<import("../../../agent.type").TMessage<TSetRewardTargetResponse>>;
