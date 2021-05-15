import {GetMessageType} from "../types";

import {
  chia_farmer_service,
  get_reward_targets_command,
  get_signage_point_command,
  get_signage_points_command,
  set_reward_targets_command,
  TGetRewardTargetResponse,
  TGetSignagePointResponse,
  TGetSignagePointsResponse,
  TSetRewardTargetResponse,
} from "./farmer";

export {
  TGetRewardTargetRequest,
  TGetSignagePointRequest,
  TGetSignagePointsRequest,
  TSetRewardTargetRequest,
} from "./farmer";

import {
  chia_full_node_service,
  get_additions_and_removals_command,
  get_all_mempool_items_command,
  get_all_mempool_tx_ids_command,
  get_block_command,
  get_block_record_by_height_command,
  get_block_record_command,
  get_block_records_command,
  get_blockchain_state_command,
  get_blocks_command,
  get_coin_record_by_name_command,
  get_coin_records_by_puzzle_hash_command,
  get_coin_records_by_puzzle_hashes_command,
  get_initial_freeze_period_command,
  get_mempool_item_by_tx_id_command,
  get_network_info_command,
  get_network_space_command,
  get_unfinished_block_headers_command,
  push_tx_command,
  TGetAdditionsAndRemovalsRequest,
  TGetAdditionsAndRemovalsResponse,
  TGetAllMempoolItemsRequest,
  TGetAllMempoolItemsResponse,
  TGetAllMempoolTxIdsRequest,
  TGetAllMempoolTxIdsResponse,
  TGetBlockRecordByHeightRequest,
  TGetBlockRecordByHeightResponse,
  TGetBlockRecordRequest,
  TGetBlockRecordResponse,
  TGetBlockRecordsRequest,
  TGetBlockRecordsResponse,
  TGetBlockRequest,
  TGetBlockResponse,
  TGetBlockchainStateRequest,
  TGetBlockchainStateResponse,
  TGetBlocksRequest,
  TGetBlocksResponse,
  TGetCoinRecordByNameRequest,
  TGetCoinRecordByNameResponse,
  TGetCoinRecordsByPuzzleHashRequest,
  TGetCoinRecordsByPuzzleHashResponse,
  TGetCoinRecordsByPuzzleHashesRequest,
  TGetCoinRecordsByPuzzleHashesResponse,
  TGetInitialFreezePeriodRequest,
  TGetInitialFreezePeriodResponse,
  TGetMempoolItemByTxIdRequest,
  TGetMempoolItemByTxIdResponse,
  TGetNetworkInfoRequest,
  TGetNetworkInfoResponse,
  TGetNetworkSpaceRequest,
  TGetNetworkSpaceResponse,
  TGetUnfinishedBlockHeadersRequest,
  TGetUnfinishedBlockHeadersResponse,
  TPushTxRequest,
  TPushTxResponse,
} from "./full_node";

export {
  TGetAdditionsAndRemovalsRequest,
  TGetAdditionsAndRemovalsResponse,
  TGetAllMempoolItemsRequest,
  TGetAllMempoolItemsResponse,
  TGetAllMempoolTxIdsRequest,
  TGetAllMempoolTxIdsResponse,
  TGetBlockRecordByHeightRequest,
  TGetBlockRecordByHeightResponse,
  TGetBlockRecordRequest,
  TGetBlockRecordResponse,
  TGetBlockRecordsRequest,
  TGetBlockRecordsResponse,
  TGetBlockRequest,
  TGetBlockResponse,
  TGetBlockchainStateRequest,
  TGetBlockchainStateResponse,
  TGetBlocksRequest,
  TGetBlocksResponse,
  TGetCoinRecordByNameRequest,
  TGetCoinRecordByNameResponse,
  TGetCoinRecordsByPuzzleHashRequest,
  TGetCoinRecordsByPuzzleHashResponse,
  TGetCoinRecordsByPuzzleHashesRequest,
  TGetCoinRecordsByPuzzleHashesResponse,
  TGetInitialFreezePeriodRequest,
  TGetInitialFreezePeriodResponse,
  TGetMempoolItemByTxIdRequest,
  TGetMempoolItemByTxIdResponse,
  TGetNetworkInfoRequest,
  TGetNetworkInfoResponse,
  TGetNetworkSpaceRequest,
  TGetNetworkSpaceResponse,
  TGetUnfinishedBlockHeadersRequest,
  TGetUnfinishedBlockHeadersResponse,
  TPushTxRequest,
  TPushTxResponse,
} from "./full_node";

import {
  chia_harvester_service,
  add_plot_directory_command,
  delete_plot_command,
  get_plot_directories_command,
  get_plots_command,
  refresh_plots_command,
  remove_plot_directory_command,
  TAddPlotDirectoryResponse,
  TDeletePlotResponse,
  TGetPlotDirectoriesResponse,
  TGetPlotsResponse,
  TRefreshPlotsResponse,
  TRemovePlotDirectoryResponse,
} from "./havester";

export {
  TAddPlotDirectoryRequest,
  TAddPlotDirectoryResponse,
  TDeletePlotRequest,
  TDeletePlotResponse,
  TGetPlotDirectoriesRequest,
  TGetPlotDirectoriesResponse,
  TGetPlotsRequest,
  TGetPlotsResponse,
  TRefreshPlotsRequest,
  TRefreshPlotsResponse,
  TRemovePlotDirectoryRequest,
  TRemovePlotDirectoryResponse,
} from "./havester";

export type RpcFarmerMessageType =
  GetMessageType<chia_farmer_service, get_reward_targets_command, TGetRewardTargetResponse>
  | GetMessageType<chia_farmer_service, get_signage_point_command, TGetSignagePointResponse>
  | GetMessageType<chia_farmer_service, get_signage_points_command, TGetSignagePointsResponse>
  | GetMessageType<chia_farmer_service, set_reward_targets_command, TSetRewardTargetResponse>
;

export type RpcFullNodeMessageType =
  GetMessageType<chia_full_node_service, get_additions_and_removals_command, TGetAdditionsAndRemovalsResponse>
  | GetMessageType<chia_full_node_service, get_all_mempool_items_command, TGetAllMempoolItemsResponse>
  | GetMessageType<chia_full_node_service, get_all_mempool_tx_ids_command, TGetAllMempoolTxIdsResponse>
  | GetMessageType<chia_full_node_service, get_block_command, TGetBlockResponse>
  | GetMessageType<chia_full_node_service, get_block_record_by_height_command, TGetBlockRecordByHeightResponse>
  | GetMessageType<chia_full_node_service, get_block_record_command, TGetBlockRecordResponse>
  | GetMessageType<chia_full_node_service, get_block_records_command, TGetBlockRecordsResponse>
  | GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateResponse>
  | GetMessageType<chia_full_node_service, get_blocks_command, TGetBlocksResponse>
  | GetMessageType<chia_full_node_service, get_coin_record_by_name_command, TGetCoinRecordByNameResponse>
  | GetMessageType<chia_full_node_service, get_coin_records_by_puzzle_hash_command, TGetCoinRecordsByPuzzleHashResponse>
  | GetMessageType<chia_full_node_service, get_coin_records_by_puzzle_hashes_command, TGetCoinRecordsByPuzzleHashesResponse>
  | GetMessageType<chia_full_node_service, get_initial_freeze_period_command, TGetInitialFreezePeriodResponse>
  | GetMessageType<chia_full_node_service, get_mempool_item_by_tx_id_command, TGetMempoolItemByTxIdResponse>
  | GetMessageType<chia_full_node_service, get_network_info_command, TGetNetworkInfoResponse>
  | GetMessageType<chia_full_node_service, get_network_space_command, TGetNetworkSpaceResponse>
  | GetMessageType<chia_full_node_service, get_unfinished_block_headers_command, TGetUnfinishedBlockHeadersResponse>
  | GetMessageType<chia_full_node_service, push_tx_command, TPushTxResponse>
;

export type RpcHarvesterMessageType =
  GetMessageType<chia_harvester_service, add_plot_directory_command, TAddPlotDirectoryResponse>
  | GetMessageType<chia_harvester_service, delete_plot_command, TDeletePlotResponse>
  | GetMessageType<chia_harvester_service, get_plot_directories_command, TGetPlotDirectoriesResponse>
  | GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsResponse>
  | GetMessageType<chia_harvester_service, refresh_plots_command, TRefreshPlotsResponse>
  | GetMessageType<chia_harvester_service, remove_plot_directory_command, TRemovePlotDirectoryResponse>
;

export type RpcMessageType = RpcFarmerMessageType | RpcFullNodeMessageType | RpcHarvesterMessageType;
