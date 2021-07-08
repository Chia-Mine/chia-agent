import { ProofOfSpace } from "../../chia/types/blockchain_format/proof_of_space";
import { bool, int, str, uint64, uint8 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { TRPCAgent } from "../../../rpc/index";
import { RespondPlots } from "../../chia/protocols/harvester_protocol";
import { PoolState } from "../../chia/farmer/farmer";
export declare const chia_farmer_service = "chia_farmer";
export declare type chia_farmer_service = typeof chia_farmer_service;
export declare const get_signage_point_command = "get_signage_point";
export declare type get_signage_point_command = typeof get_signage_point_command;
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
export declare function get_signage_point(agent: TRPCAgent, params: TGetSignagePointRequest): Promise<TGetSignagePointResponse>;
export declare const get_signage_points_command = "get_signage_points";
export declare type get_signage_points_command = typeof get_signage_points_command;
export declare type TGetSignagePointsRequest = {};
export declare type TGetSignagePointsResponse = {
    signage_points: TGetSignagePointResponse[];
};
export declare function get_signage_points(agent: TRPCAgent): Promise<TGetSignagePointsResponse>;
export declare const get_reward_targets_command = "get_reward_targets";
export declare type get_reward_targets_command = typeof get_reward_targets_command;
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
export declare function get_reward_targets(agent: TRPCAgent, params: TGetRewardTargetRequest): Promise<TGetRewardTargetResponse>;
export declare const set_reward_targets_command = "set_reward_targets";
export declare type set_reward_targets_command = typeof set_reward_targets_command;
export declare type TSetRewardTargetRequest = {
    farmer_target?: str;
    pool_target?: str;
};
export declare type TSetRewardTargetResponse = {};
export declare function set_reward_targets(agent: TRPCAgent, params: TSetRewardTargetRequest): Promise<TSetRewardTargetResponse>;
export declare const get_pool_state_command = "get_pool_state";
export declare type get_pool_state_command = typeof get_pool_state_command;
export declare type TGetPoolStateRequest = {};
export declare type TGetPoolStateResponse = {
    pool_state: PoolState[];
};
export declare function get_pool_state(agent: TRPCAgent): Promise<TSetRewardTargetResponse>;
export declare const set_payout_instructions_command = "set_payout_instructions";
export declare type set_payout_instructions_command = typeof set_payout_instructions_command;
export declare type TSetPayoutInstructionsRequest = {
    launcher_id: str;
    payout_instructions: str;
};
export declare type TSetPayoutInstructionsResponse = {};
export declare function set_pool_payout_instructions(agent: TRPCAgent, params: TSetPayoutInstructionsRequest): Promise<TSetPayoutInstructionsResponse>;
export declare type HarvesterObject = RespondPlots & {
    connection: {
        node_id: str;
        host: str;
        port: int;
    };
};
export declare const get_harvesters_command = "get_harvesters";
export declare type get_harvesters_command = typeof get_harvesters_command;
export declare type TGetHarvestersRequest = {};
export declare type TGetHarvestersResponse = {
    harvesters: HarvesterObject[];
};
export declare function get_harvesters(agent: TRPCAgent): Promise<TGetHarvestersResponse>;
export declare const get_pool_login_link_command = "get_pool_login_link";
export declare type get_pool_login_link_command = typeof get_pool_login_link_command;
export declare type TGetPoolLinkRequest = {
    launcher_id: str;
};
export declare type TGetPoolLinkResponse = {
    login_link: str;
};
export declare function get_pool_login_link(agent: TRPCAgent, params: TGetPoolLinkRequest): Promise<TGetPoolLinkResponse>;
