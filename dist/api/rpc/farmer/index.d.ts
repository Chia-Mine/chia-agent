import { ProofOfSpace } from "../../chia/types/blockchain_format/proof_of_space";
import { bool, int, Optional, str, uint16, uint64, uint8 } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { TRPCAgent } from "../../../rpc/index";
import { TPoolInfoResponse } from "../pool/index";
import { PoolWalletConfig } from "../../chia/pools/pool_config";
import { RespondPlots } from "../../chia/protocols/harvester_protocol";
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
export declare type PoolState = {
    points_found_since_start: int;
    points_found_24h: unknown[];
    points_acknowledged_since_start: int;
    points_acknowledged_24h: unknown[];
    current_points_balance: int;
    current_difficulty: int;
    pool_errors_24h: unknown[];
    pool_info: TPoolInfoResponse;
    pool_config: PoolWalletConfig;
    p2_singleton_puzzle_hash: str;
};
export declare const get_pool_state_command = "get_pool_state";
export declare type get_pool_state_command = typeof get_pool_state_command;
export declare type TGetPoolStateRequest = {};
export declare type TGetPoolStateResponse = {
    pool_state: PoolState[];
};
export declare function get_pool_state(agent: TRPCAgent): Promise<TSetRewardTargetResponse>;
export declare const set_pool_payout_instructions_command = "set_pool_payout_instructions";
export declare type set_pool_payout_instructions_command = typeof set_pool_payout_instructions_command;
export declare type TSetPoolPayoutInstructionsRequest = {
    launcher_id: str;
    pool_payout_instructions: str;
};
export declare type TSetPoolPayoutInstructionsResponse = {};
export declare function set_pool_payout_instructions(agent: TRPCAgent, params: TSetPoolPayoutInstructionsRequest): Promise<TSetPoolPayoutInstructionsResponse>;
export declare type RequestPlotsResponse = {
    type: 68;
    id: Optional<uint16>;
    data: RespondPlots;
};
export declare const get_plots_command = "get_plots";
export declare type get_plots_command = typeof get_plots_command;
export declare type TGetPlotsRequest = {};
export declare type TGetPlotsResponse = {
    [peer_host_port: string]: RequestPlotsResponse;
};
export declare function get_plots(agent: TRPCAgent): Promise<TGetPlotsResponse>;
