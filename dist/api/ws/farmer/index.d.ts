import { ProofOfSpace } from "../../chia/types/blockchain_format/proof_of_space";
import { NewSignagePoint } from "../../chia/protocols/farmer_protocol";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { uint32, uint64 } from "../../chia/types/_python_types_";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType } from "../../types";
import { TGetHarvestersResponse } from "../../rpc/farmer/index";
export declare const chia_farmer_service = "chia_farmer";
export declare type chia_farmer_service = typeof chia_farmer_service;
export declare const new_farming_info_command = "new_farming_info";
export declare type new_farming_info_command = typeof new_farming_info_command;
export declare type TNewFarmingInfoBroadCast = {
    farming_info: {
        challenge_hash: bytes32;
        signage_point: bytes32;
        passed_filter: uint32;
        proofs: uint32;
        total_plots: uint32;
        timestamp: uint64;
    };
};
export declare function on_new_farming_info(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>) => unknown): Promise<() => void>;
export declare const new_signage_point_command = "new_signage_point";
export declare type new_signage_point_command = typeof new_signage_point_command;
export declare type TNewSignagePointBroadCast = {
    proofs: ProofOfSpace[];
    signage_point: NewSignagePoint;
};
export declare function on_new_signage_point(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>) => unknown): Promise<() => void>;
export declare const new_plots_command = "get_harvesters";
export declare type new_plots_command = typeof new_plots_command;
export declare type TNewPlotsBroadCast = TGetHarvestersResponse;
export declare function on_new_plots(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, new_plots_command, TNewPlotsBroadCast>) => unknown): Promise<() => void>;
export declare type chia_farmer_commands = new_farming_info_command | new_signage_point_command | new_plots_command;
export declare type TChiaFarmerBroadcast = TNewFarmingInfoBroadCast | TNewSignagePointBroadCast | TNewPlotsBroadCast;
export declare function on_message_from_farmer(daemon: TDaemon, callback: (e: GetMessageType<chia_farmer_service, chia_farmer_commands, TChiaFarmerBroadcast>) => unknown): Promise<() => void>;
