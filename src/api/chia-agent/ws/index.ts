import {GetMessageType} from "../types";
import type {
  chia_farmer_service,
  new_farming_info_command,
  new_signage_point_command,
  TNewFarmingInfoBroadCast,
  TNewSignagePointBroadCast,
} from "./farmer";
import type {
  chia_full_node_service,
  get_blockchain_state_command,
  TGetBlockchainStateBroadCast,
} from "./full_node";
import type {
  chia_harvester_service,
  get_plots_command,
  TGetPlotsBroadCast,
} from "./harvester";

export type WsFarmerMessage =
  GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>
  | GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>
  ;

export type WsFullNodeMessage =
  GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>
;

export type WsHarvesterMessage =
  GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>;

export type WsMessage = WsFarmerMessage | WsFullNodeMessage | WsHarvesterMessage;
