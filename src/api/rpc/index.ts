import type {
  TGetRewardTargetResponse,
  TGetSignagePointResponse,
  TGetSignagePointsResponse,
  TSetRewardTargetResponse,
  TGetHarvestersResponse,
  TGetHarvestersSummaryResponse,
  TGetHarvesterPlotsValidResponse,
  TGetHarvesterPlotsInvalidResponse,
  TGetHarvesterPlotsKeysMissingResponse,
  TGetHarvesterPlotsDuplicatesResponse,
  TSetPayoutInstructionsResponse,
  TGetPoolStateResponse,
  TGetPoolLinkResponse,
} from "./farmer/index";
export {
  chia_farmer_service,
  TGetRewardTargetRequest,
  TGetRewardTargetResponse,
  get_reward_targets,
  TGetSignagePointRequest,
  TGetSignagePointResponse,
  get_signage_point,
  TGetSignagePointsRequest,
  TGetSignagePointsResponse,
  get_signage_points,
  TSetRewardTargetRequest,
  TSetRewardTargetResponse,
  set_reward_targets,
  TGetHarvestersRequest,
  TGetHarvestersResponse,
  get_harvesters,
  TGetHarvestersSummaryResponse,
  get_harvesters_summary,
  TGetHarvesterPlotsValidRequest,
  TGetHarvesterPlotsValidResponse,
  get_harvester_plots_valid,
  TGetHarvesterPlotsInvalidRequest,
  TGetHarvesterPlotsInvalidResponse,
  get_harvester_plots_invalid,
  TGetHarvesterPlotsKeysMissingRequest,
  TGetHarvesterPlotsKeysMissingResponse,
  get_harvester_plots_keys_missing,
  TGetHarvesterPlotsDuplicatesRequest,
  TGetHarvesterPlotsDuplicatesResponse,
  get_harvester_plots_duplicates,
  TSetPayoutInstructionsRequest,
  TSetPayoutInstructionsResponse,
  set_pool_payout_instructions,
  TGetPoolStateRequest,
  TGetPoolStateResponse,
  get_pool_state,
  TGetPoolLinkRequest,
  TGetPoolLinkResponse,
  get_pool_login_link,
} from "./farmer/index";

import type {
  TGetAdditionsAndRemovalsResponse,
  TGetAllMempoolItemsResponse,
  TGetAllMempoolTxIdsResponse,
  TGetBlockRecordByHeightResponse,
  TGetBlockRecordResponse,
  TGetBlockRecordsResponse,
  TGetBlockSpendsResponse,
  TGetBlockResponse,
  TGetBlockchainStateResponse,
  TGetBlocksResponse,
  TGetBlockCountMetricsResponse,
  TGetRecentSignagePointOrEOSCommandResponse,
  TGetCoinRecordByNameResponse,
  TGetCoinRecordsByNamesResponse,
  TGetCoinRecordsByPuzzleHashResponse,
  TGetCoinRecordsByPuzzleHashesResponse,
  TGetCoinRecordsByParentIdsResponse,
  TGetCoinRecordsByHintResponse,
  TGetInitialFreezePeriodResponseOfFullNode,
  TGetMempoolItemByTxIdResponse,
  TGetNetworkInfoResponseOfFullNode,
  TGetNetworkSpaceResponse,
  TGetUnfinishedBlockHeadersResponse,
  TPushTxResponse,
  TGetPuzzleAndSolutionResponse,
} from "./full_node/index";
export {
  chia_full_node_service,
  TGetAdditionsAndRemovalsRequest,
  TGetAdditionsAndRemovalsResponse,
  get_additions_and_removals,
  TGetAllMempoolItemsRequest,
  TGetAllMempoolItemsResponse,
  get_all_mempool_items,
  TGetAllMempoolTxIdsRequest,
  TGetAllMempoolTxIdsResponse,
  get_all_mempool_tx_ids,
  TGetBlockRecordByHeightRequest,
  TGetBlockRecordByHeightResponse,
  get_block_record_by_height,
  TGetBlockRecordRequest,
  TGetBlockRecordResponse,
  get_block_record,
  TGetBlockRecordsRequest,
  TGetBlockRecordsResponse,
  get_block_records,
  TGetBlockSpendsRequest,
  TGetBlockSpendsResponse,
  get_block_spends,
  TGetBlockRequest,
  TGetBlockResponse,
  get_block,
  TGetBlockchainStateRequest,
  TGetBlockchainStateResponse,
  get_blockchain_state,
  TGetBlocksRequest,
  TGetBlocksResponse,
  get_blocks,
  TGetBlockCountMetricsResponse,
  get_block_count_metrics,
  TGetRecentSignagePointOrEOSCommandRequest,
  TGetRecentSignagePointOrEOSCommandResponse,
  get_recent_signage_point_or_eos,
  TGetCoinRecordsByNamesRequest,
  TGetCoinRecordsByNamesResponse,
  get_coin_records_by_names,
  TGetCoinRecordByNameRequest,
  TGetCoinRecordByNameResponse,
  get_coin_record_by_name,
  TGetCoinRecordsByPuzzleHashRequest,
  TGetCoinRecordsByPuzzleHashResponse,
  get_coin_records_by_puzzle_hash,
  TGetCoinRecordsByPuzzleHashesRequest,
  TGetCoinRecordsByPuzzleHashesResponse,
  get_coin_records_by_puzzle_hashes,
  TGetCoinRecordsByParentIdsRequest,
  TGetCoinRecordsByParentIdsResponse,
  get_coin_records_by_parent_ids,
  TGetCoinRecordsByHintRequest,
  TGetCoinRecordsByHintResponse,
  get_coin_records_by_hint,
  TGetInitialFreezePeriodRequestOfFullNode,
  TGetInitialFreezePeriodResponseOfFullNode,
  get_initial_freeze_period_of_full_node,
  TGetMempoolItemByTxIdRequest,
  TGetMempoolItemByTxIdResponse,
  get_mempool_item_by_tx_id,
  TGetNetworkInfoRequestOfFullNode,
  TGetNetworkInfoResponseOfFullNode,
  get_network_info_of_full_node,
  TGetNetworkSpaceRequest,
  TGetNetworkSpaceResponse,
  get_network_space,
  TGetUnfinishedBlockHeadersRequest,
  TGetUnfinishedBlockHeadersResponse,
  get_unfinished_block_headers,
  TPushTxRequest,
  TPushTxResponse,
  push_tx,
  TGetPuzzleAndSolutionRequest,
  TGetPuzzleAndSolutionResponse,
  get_puzzle_and_solution,
} from "./full_node/index";

import type {
  TAddPlotDirectoryResponse,
  TDeletePlotResponse,
  TGetPlotDirectoriesResponse,
  TGetPlotsResponse,
  TRefreshPlotsResponse,
  TRemovePlotDirectoryResponse,
} from "./harvester/index";
export {
  chia_harvester_service,
  TAddPlotDirectoryRequest,
  TAddPlotDirectoryResponse,
  add_plot_directory,
  TDeletePlotRequest,
  TDeletePlotResponse,
  delete_plot,
  TGetPlotDirectoriesRequest,
  TGetPlotDirectoriesResponse,
  get_plot_directories,
  TGetPlotsRequest,
  TGetPlotsResponse,
  get_plots,
  TRefreshPlotsRequest,
  TRefreshPlotsResponse,
  refresh_plots,
  TRemovePlotDirectoryRequest,
  TRemovePlotDirectoryResponse,
  remove_plot_directory,
} from "./harvester/index";

import type {
  chia_wallet_service,
  TAddKeyResponse,
  TAddRateLimitedFundsResponse,
  TCancelOfferResponse,
  TCancelOffersResponse,
  TCatGetAssetIdResponse,
  TCatGetNameResponse,
  TGetStrayCatsResponse,
  TCatAssetIdToNameResponse,
  TCatSetNameResponse,
  TCatSpendResponse,
  TCheckOfferValidityResponse,
  TCreateNewWalletResponse,
  TCreateOfferForIdsResponse,
  TCreateSignedTransactionResponse,
  TDeleteUnconfirmedTransactionsResponse,
  TSelectCoinsResponse,
  TGetCurrentDerivationIndexResponse,
  TExtendDerivationIndexResponse,
  TDeleteAllKeysResponse,
  TDeleteKeyResponse,
  TDidSetWalletNameResponse,
  TDidGetWalletNameResponse,
  TDidCreateAttestResponse,
  TDidCreateBackupFileResponse,
  TDidTransferDidResponse,
  TDidGetDidResponse,
  TDidGetInformationNeededForRecoveryResponse,
  TDidGetPubkeyResponse,
  TDidGetRecoveryListResponse,
  TDidGetCurrentCoinInfoResponse,
  TDidGetMetadataResponse,
  TDidRecoverySpendResponse,
  TDidSpendResponse,
  TDidUpdateRecoveryIdsResponse,
  TDidUpdateMetadataResponse,
  TNftMintNftResponse,
  TNftGetNftsResponse,
  TNftSetNftDidResponse,
  TNftGetByDidResponse,
  TNftGetWalletDidResponse,
  TNftGetWalletsWithDidsResponse,
  TNftSetNftStatusResponse,
  TNftTransferNftResponse,
  TNftGetInfoResponse,
  TNftAddUriResponse,
  TFarmBlockResponse,
  TGenerateMnemonicResponse,
  TGetAllOffersResponse,
  TGetCatListResponse,
  TGetFarmedAmountResponse,
  TGetHeightInfoResponse,
  TGetInitialFreezePeriodResponseOfWallet,
  TGetLoggedInFingerprintResponse,
  TGetNetworkInfoResponseOfWallet,
  TGetNextAddressResponse,
  TGetOfferResponse,
  TGetOffersCountResponse,
  TGetOfferSummaryResponse,
  TGetPrivateKeyResponse,
  TGetPublicKeysResponse,
  TGetSyncStatusResponse,
  TGetTransactionCountResponse,
  TGetTransactionResponse,
  TGetTransactionsResponse,
  TGetWalletBalanceResponse,
  TGetWalletsResponse,
  TLoginResponse,
  TPushTxResponse as TPushTxResponseOfWallet,
  TPwJoinPoolRequest,
  TPwSelfPoolRequest,
  TPwAbsorbRewardsResponse,
  TPwStatusResponse,
  TRlSetUserInfoResponse,
  TSendClawbackTransactionResponse,
  TSendTransactionResponse,
  TSendTransactionMultiResponse,
  TTakeOfferResponse,
  TPwJoinPoolResponse,
  TPwSelfPoolResponse,
  TCreateNewDlResponse,
  TDlTrackNewResponse,
  TDlStopTrackingResponse,
  TDlLatestSingletonResponse,
  TDlSingletonsByRootResponse,
  TDlUpdateRootResponse,
  TDlUpdateMultipleResponse,
  TDlHistoryResponse,
  TDlOwnedSingletonsResponse,
  TDlGetMirrorsResponse,
  TDlNewMirrorResponse,
  TDlDeleteMirrorResponse,
} from "./wallet/index";
export {
  chia_wallet_service,
  TAddKeyRequest,
  TAddKeyResponse,
  add_key,
  TAddRateLimitedFundsRequest,
  TAddRateLimitedFundsResponse,
  add_rate_limited_funds,
  TAdditions,
  TCancelOfferRequest,
  TCancelOfferResponse,
  cancel_offer,
  TCancelOffersRequest,
  TCancelOffersResponse,
  cancel_offers,
  TCatGetAssetIdRequest,
  TCatGetAssetIdResponse,
  cat_get_asset_id,
  TCatGetNameRequest,
  TCatGetNameResponse,
  cat_get_name,
  TGetStrayCatsResponse,
  get_stray_cats,
  TCatAssetIdToNameRequest,
  TCatAssetIdToNameResponse,
  cat_asset_id_to_name,
  TCatSetNameRequest,
  TCatSetNameResponse,
  cat_set_name,
  TCatSpendRequest,
  TCatSpendResponse,
  cat_spend,
  TCheckOfferValidityRequest,
  TCheckOfferValidityResponse,
  check_offer_validity,
  TCreateNewWalletRequest,
  TCreateNewWalletResponse,
  create_new_wallet,
  TCreateOfferForIdsRequest,
  TCreateOfferForIdsResponse,
  create_offer_for_ids,
  TCreateSignedTransactionRequest,
  TCreateSignedTransactionResponse,
  create_signed_transaction,
  TDeleteUnconfirmedTransactionsRequest,
  TDeleteUnconfirmedTransactionsResponse,
  delete_unconfirmed_transactions,
  TSelectCoinsRequest,
  TSelectCoinsResponse,
  select_coins,
  TGetCurrentDerivationIndexResponse,
  get_current_derivation_index,
  TExtendDerivationIndexRequest,
  TExtendDerivationIndexResponse,
  extend_derivation_index,
  TCreate_New_CAT_WalletRequest,
  TCreate_New_CAT_WalletResponse,
  TCreate_New_DID_WalletRequest,
  TCreate_New_DID_WalletResponse,
  TCreate_New_RL_WalletRequest,
  TCreate_New_RL_WalletResponse,
  TDeleteAllKeysRequest,
  TDeleteAllKeysResponse,
  delete_all_keys,
  TDeleteKeyRequest,
  TDeleteKeyResponse,
  delete_key,
  TDidSetWalletNameRequest,
  TDidSetWalletNameResponse,
  did_set_wallet_name,
  TDidGetWalletNameRequest,
  TDidGetWalletNameResponse,
  did_get_wallet_name,
  TDidCreateAttestRequest,
  TDidCreateAttestResponse,
  did_create_attest,
  TDidCreateBackupFileRequest,
  TDidCreateBackupFileResponse,
  did_create_backup_file,
  TDidTransferDidRequest,
  TDidTransferDidResponse,
  did_transfer_did,
  TDidGetDidRequest,
  TDidGetDidResponse,
  did_get_did,
  TDidGetInformationNeededForRecoveryRequest,
  TDidGetInformationNeededForRecoveryResponse,
  did_get_information_needed_for_recovery,
  TDidGetCurrentCoinInfoRequest,
  TDidGetCurrentCoinInfoResponse,
  did_get_current_coin_info,
  TDidGetPubkeyRequest,
  TDidGetPubkeyResponse,
  did_get_pubkey,
  TDidGetRecoveryListRequest,
  TDidGetRecoveryListResponse,
  did_get_recovery_list,
  TDidGetMetadataRequest,
  TDidGetMetadataResponse,
  did_get_metadata,
  TDidRecoverySpendRequest,
  TDidRecoverySpendResponse,
  did_recovery_spend,
  TDidSpendRequest,
  TDidSpendResponse,
  did_spend,
  TDidUpdateRecoveryIdsRequest,
  TDidUpdateRecoveryIdsResponse,
  did_update_recovery_ids,
  TDidUpdateMetadataRequest,
  TDidUpdateMetadataResponse,
  did_update_metadata,
  TNftMintNftRequest,
  TNftMintNftResponse,
  nft_mint_nft,
  TNftGetNftsRequest,
  TNftGetNftsResponse,
  nft_get_nfts,
  TNftSetNftDidRequest,
  TNftSetNftDidResponse,
  nft_set_nft_did,
  TNftGetByDidRequest,
  TNftGetByDidResponse,
  nft_get_by_did,
  TNftGetWalletDidRequest,
  TNftGetWalletDidResponse,
  nft_get_wallet_did,
  TNftGetWalletsWithDidsResponse,
  nft_get_wallets_with_dids,
  TNftSetNftStatusRequest,
  TNftSetNftStatusResponse,
  nft_set_nft_status,
  TNftTransferNftRequest,
  TNftTransferNftResponse,
  nft_transfer_nft,
  TNftGetInfoRequest,
  TNftGetInfoResponse,
  nft_get_info,
  TNftAddUriRequest,
  TNftAddUriResponse,
  nft_add_uri,
  TFarmBlockRequest,
  TFarmBlockResponse,
  farm_block,
  TGenerateMnemonicRequest,
  TGenerateMnemonicResponse,
  generate_mnemonic,
  TGetAllOffersRequest,
  TGetAllOffersResponse,
  get_all_offers,
  TGetCatListResponse,
  get_cat_list,
  TGetFarmedAmountRequest,
  TGetFarmedAmountResponse,
  get_farmed_amount,
  TGetHeightInfoRequest,
  TGetHeightInfoResponse,
  get_height_info,
  TGetInitialFreezePeriodRequestOfWallet,
  TGetInitialFreezePeriodResponseOfWallet,
  get_initial_freeze_period_of_wallet,
  TGetLoggedInFingerprintResponse,
  get_logged_in_fingerprint,
  TGetOfferRequest,
  TGetOfferResponse,
  get_offer,
  TGetOffersCountResponse,
  get_offers_count,
  TGetOfferSummaryRequest,
  TGetOfferSummaryResponse,
  get_offer_summary,
  TGetNetworkInfoRequestOfWallet,
  TGetNetworkInfoResponseOfWallet,
  get_network_info_of_wallet,
  TGetNextAddressRequest,
  TGetNextAddressResponse,
  get_next_address,
  TGetPrivateKeyRequest,
  TGetPrivateKeyResponse,
  get_private_key,
  TGetPublicKeysRequest,
  TGetPublicKeysResponse,
  get_public_keys,
  TGetSyncStatusRequest,
  TGetSyncStatusResponse,
  get_sync_status,
  TGetTransactionCountRequest,
  TGetTransactionCountResponse,
  get_transaction_count,
  TGetTransactionRequest,
  TGetTransactionResponse,
  get_transaction,
  TGetTransactionsRequest,
  TGetTransactionsResponse,
  get_transactions,
  TGetWalletBalanceRequest,
  TGetWalletBalanceResponse,
  get_wallet_balance,
  TGetWalletsRequest,
  TGetWalletsResponse,
  get_wallets,
  TLoginRequest,
  TLoginResponse,
  log_in,
  TPushTxRequest as TPushTxRequestOfWallet,
  TPushTxResponse as TPushTxResponseOfWallet,
  push_tx as push_tx_wallet,
  TPwJoinPoolRequest,
  TPwJoinPoolResponse,
  pw_join_pool,
  TPwSelfPoolRequest,
  TPwSelfPoolResponse,
  pw_self_pool,
  TPwAbsorbRewardsRequest,
  TPwAbsorbRewardsResponse,
  pw_absorb_rewards,
  TPwStatusRequest,
  TPwStatusResponse,
  pw_status,
  TRlSetUserInfoRequest,
  TRlSetUserInfoResponse,
  rl_set_user_info,
  TSendClawbackTransactionRequest,
  TSendClawbackTransactionResponse,
  send_clawback_transaction,
  TSendTransactionRequest,
  TSendTransactionResponse,
  send_transaction,
  TSendTransactionMultiRequest,
  TSendTransactionMultiResponse,
  send_transaction_multi,
  TTakeOfferRequest,
  TTakeOfferResponse,
  take_offer,
  TCreateNewDlRequest,
  TCreateNewDlResponse,
  create_new_dl,
  TDlTrackNewRequest,
  TDlTrackNewResponse,
  dl_track_new,
  TDlStopTrackingRequest,
  TDlStopTrackingResponse,
  dl_stop_tracking,
  TDlLatestSingletonRequest,
  TDlLatestSingletonResponse,
  dl_latest_singleton,
  TDlSingletonsByRootRequest,
  TDlSingletonsByRootResponse,
  dl_singletons_by_root,
  TDlUpdateRootRequest,
  TDlUpdateRootResponse,
  dl_update_root,
  TDlUpdateMultipleRequest,
  TDlUpdateMultipleResponse,
  dl_update_multiple,
  TDlHistoryRequest,
  TDlHistoryResponse,
  dl_history,
  TDlOwnedSingletonsResponse,
  dl_owned_singletons,
  TDlGetMirrorsRequest,
  TDlGetMirrorsResponse,
  dl_get_mirrors,
  TDlNewMirrorRequest,
  TDlNewMirrorResponse,
  dl_new_mirror,
  TDlDeleteMirrorRequest,
  TDlDeleteMirrorResponse,
  dl_delete_mirror,
} from "./wallet/index";

import {
  TCreateDataStoreResponse,
  TGetOwnedStoresResponse,
  TBatchUpdateResponse,
  TGetValueResponse,
  TGetKeysResponse,
  TGetKeysValuesResponse,
  TGetAncestorsResponse,
  TGetRootResponse,
  TGetLocalRootResponse,
  TGetRootsResponse,
  TDeleteKeyResponse as TDeleteKeyResponseDL,
  TInsertResponse,
  TSubscribeResponse,
  TUnsubscribeResponse,
  TAddMirrorResponse,
  TDeleteMirrorResponse,
  TGetMirrorsResponse,
  TRemoveSubscriptionsResponse,
  TSubscriptionsResponse,
  TGetKvDiffResponse,
  TGetRootHistoryResponse,
  TAddMissingFilesResponse,
  TMakeOfferResponse,
  TTakeOfferResponse as TTakeOfferResponseDL,
  TVerifyOfferResponse,
  TCancelOfferResponse as TCancelOfferResponseDL,
} from "./data_layer/index"
export {
  chia_data_layer_service,
  TCreateDataStoreRequest,
  TCreateDataStoreResponse,
  create_data_store,
  TGetOwnedStoresResponse,
  get_owned_stores,
  TBatchUpdateRequest,
  TBatchUpdateResponse,
  batch_update,
  TGetValueRequest,
  TGetValueResponse,
  get_value,
  TGetKeysRequest,
  TGetKeysResponse,
  get_keys,
  TGetKeysValuesRequest,
  TGetKeysValuesResponse,
  get_keys_values,
  TGetAncestorsRequest,
  TGetAncestorsResponse,
  get_ancestors,
  TGetRootRequest,
  TGetRootResponse,
  get_root,
  TGetLocalRootRequest,
  TGetLocalRootResponse,
  get_local_root,
  TGetRootsRequest,
  TGetRootsResponse,
  get_roots,
  TDeleteKeyRequest as TDeleteKeyDLRequest,
  TDeleteKeyResponse as TDeleteKeyDLResponse,
  delete_key as delete_key_dl,
  TInsertRequest,
  TInsertResponse,
  insert,
  TSubscribeRequest,
  TSubscribeResponse,
  subscribe,
  TUnsubscribeRequest,
  TUnsubscribeResponse,
  unsubscribe,
  TAddMirrorRequest,
  TAddMirrorResponse,
  add_mirror,
  TDeleteMirrorRequest,
  TDeleteMirrorResponse,
  delete_mirror,
  TGetMirrorsRequest,
  TGetMirrorsResponse,
  get_mirrors,
  TRemoveSubscriptionsRequest,
  TRemoveSubscriptionsResponse,
  remove_subscriptions,
  TSubscriptionsResponse,
  subscriptions,
  TGetKvDiffRequest,
  TGetKvDiffResponse,
  get_kv_diff,
  TGetRootHistoryRequest,
  TGetRootHistoryResponse,
  get_root_history,
  TAddMissingFilesRequest,
  TAddMissingFilesResponse,
  add_missing_files,
  TMakeOfferRequest,
  TMakeOfferResponse,
  make_offer,
  TTakeOfferRequest as TTakeOfferRequestDL,
  TTakeOfferResponse as TTakeOfferResponseDL,
  take_offer as take_offer_dl,
  TVerifyOfferRequest,
  TVerifyOfferResponse,
  verify_offer,
  TCancelOfferRequest as TCancelOfferRequestDL,
  TCancelOfferResponse as TCancelOfferResponseDL,
  cancel_offer as cancel_offer_dl,
} from "./data_layer/index"

import type {
  TGetIpsAfterTimestampResponse,
  TGetPeerCountsResponse,
} from "./crawler/index";
export {
  chia_crawler_service,
  TGetIpsAfterTimestampRequest,
  TGetIpsAfterTimestampResponse,
  TGetPeerCountsResponse,
  get_ips_after_timestamp,
  get_peer_counts,
} from "./crawler/index";


import type {
  TGetConnectionsResponse,
  TOpenConnectionResponse,
  TCloseConnectionResponse,
  TStopNodeResponse,
  TGetRoutesResponse,
  THealthzResponse,
} from "./common/index";
export {
  chia_common_service,
  TGetConnectionsRequest,
  TGetConnectionsResponse,
  TOpenConnectionRequest,
  TOpenConnectionResponse,
  TCloseConnectionRequest,
  TCloseConnectionResponse,
  TStopNodeResponse,
  TGetRoutesResponse,
  THealthzResponse,
  get_connections,
  open_connection,
  close_connection,
  stop_node,
  get_routes,
  healthz,
} from "./common/index";


export type RpcFarmerMessage =
  TGetRewardTargetResponse
  | TGetSignagePointResponse
  | TGetSignagePointsResponse
  | TSetRewardTargetResponse
  | TGetHarvestersResponse
  | TGetHarvestersSummaryResponse
  | TGetHarvesterPlotsValidResponse
  | TGetHarvesterPlotsInvalidResponse
  | TGetHarvesterPlotsKeysMissingResponse
  | TGetHarvesterPlotsDuplicatesResponse
  | TSetPayoutInstructionsResponse
  | TGetPoolStateResponse
  | TGetPoolLinkResponse
;
export type RpcFullNodeMessage =
  TGetAdditionsAndRemovalsResponse
  | TGetAllMempoolItemsResponse
  | TGetAllMempoolTxIdsResponse
  | TGetBlockResponse
  | TGetBlockRecordByHeightResponse
  | TGetBlockRecordResponse
  | TGetBlockRecordsResponse
  | TGetBlockSpendsResponse
  | TGetBlockchainStateResponse
  | TGetBlocksResponse
  | TGetBlockCountMetricsResponse
  | TGetRecentSignagePointOrEOSCommandResponse
  | TGetCoinRecordByNameResponse
  | TGetCoinRecordsByNamesResponse
  | TGetCoinRecordsByPuzzleHashResponse
  | TGetCoinRecordsByPuzzleHashesResponse
  | TGetCoinRecordsByParentIdsResponse
  | TGetCoinRecordsByHintResponse
  | TGetInitialFreezePeriodResponseOfFullNode
  | TGetMempoolItemByTxIdResponse
  | TGetNetworkInfoResponseOfFullNode
  | TGetNetworkSpaceResponse
  | TGetUnfinishedBlockHeadersResponse
  | TPushTxResponse
  | TGetPuzzleAndSolutionResponse
;
export type RpcHarvesterMessage =
  TAddPlotDirectoryResponse
  | TDeletePlotResponse
  | TGetPlotDirectoriesResponse
  | TGetPlotsResponse
  | TRefreshPlotsResponse
  | TRemovePlotDirectoryResponse
;
export type RpcWalletMessage =
  TAddKeyResponse
  | TAddRateLimitedFundsResponse
  | TCancelOfferResponse
  | TCancelOffersResponse
  | TCatGetAssetIdResponse
  | TCatGetNameResponse
  | TGetStrayCatsResponse
  | TCatAssetIdToNameResponse
  | TCatSetNameResponse
  | TCatSpendResponse
  | TCheckOfferValidityResponse
  | TCreateNewWalletResponse
  | TCreateOfferForIdsResponse
  | TCreateSignedTransactionResponse
  | TDeleteUnconfirmedTransactionsResponse
  | TSelectCoinsResponse
  | TGetCurrentDerivationIndexResponse
  | TExtendDerivationIndexResponse
  | TDeleteAllKeysResponse
  | TDeleteKeyResponse
  | TDidSetWalletNameResponse
  | TDidGetWalletNameResponse
  | TDidCreateAttestResponse
  | TDidCreateBackupFileResponse
  | TDidTransferDidResponse
  | TDidGetDidResponse
  | TDidGetInformationNeededForRecoveryResponse
  | TDidGetCurrentCoinInfoResponse
  | TDidGetPubkeyResponse
  | TDidGetRecoveryListResponse
  | TDidGetMetadataResponse
  | TDidRecoverySpendResponse
  | TDidSpendResponse
  | TDidUpdateRecoveryIdsResponse
  | TDidUpdateMetadataResponse
  | TNftMintNftResponse
  | TNftGetNftsResponse
  | TNftSetNftDidResponse
  | TNftGetByDidResponse
  | TNftGetWalletDidResponse
  | TNftGetWalletsWithDidsResponse
  | TNftSetNftStatusResponse
  | TNftTransferNftResponse
  | TNftGetInfoResponse
  | TNftAddUriResponse
  | TFarmBlockResponse
  | TGenerateMnemonicResponse
  | TGetAllOffersResponse
  | TGetCatListResponse
  | TGetFarmedAmountResponse
  | TGetHeightInfoResponse
  | TGetInitialFreezePeriodResponseOfWallet
  | TGetLoggedInFingerprintResponse
  | TGetOfferResponse
  | TGetOffersCountResponse
  | TGetOfferSummaryResponse
  | TGetNetworkInfoResponseOfWallet
  | TGetNextAddressResponse
  | TGetPrivateKeyResponse
  | TGetPublicKeysResponse
  | TGetSyncStatusResponse
  | TGetTransactionResponse
  | TGetTransactionCountResponse
  | TGetTransactionsResponse
  | TGetWalletBalanceResponse
  | TGetWalletsResponse
  | TLoginResponse
  | TPushTxResponseOfWallet
  | TPwJoinPoolResponse
  | TPwSelfPoolResponse
  | TPwAbsorbRewardsResponse
  | TPwStatusResponse
  | TRlSetUserInfoResponse
  | TSendClawbackTransactionResponse
  | TSendTransactionResponse
  | TSendTransactionMultiResponse
  | TTakeOfferResponse
  | TCreateNewDlResponse
  | TDlTrackNewResponse
  | TDlStopTrackingResponse
  | TDlLatestSingletonResponse
  | TDlSingletonsByRootResponse
  | TDlUpdateRootResponse
  | TDlUpdateMultipleResponse
  | TDlHistoryResponse
  | TDlOwnedSingletonsResponse
  | TDlGetMirrorsResponse
  | TDlNewMirrorResponse
  | TDlDeleteMirrorResponse
;

export type RpcDataLayerMessage =
  TCreateDataStoreResponse
  | TGetOwnedStoresResponse
  | TBatchUpdateResponse
  | TGetValueResponse
  | TGetKeysResponse
  | TGetKeysValuesResponse
  | TGetAncestorsResponse
  | TGetRootResponse
  | TGetLocalRootResponse
  | TGetRootsResponse
  | TDeleteKeyResponseDL
  | TInsertResponse
  | TSubscribeResponse
  | TUnsubscribeResponse
  | TAddMirrorResponse
  | TDeleteMirrorResponse
  | TGetMirrorsResponse
  | TRemoveSubscriptionsResponse
  | TSubscriptionsResponse
  | TGetKvDiffResponse
  | TGetRootHistoryResponse
  | TAddMissingFilesResponse
  | TMakeOfferResponse
  | TTakeOfferResponseDL
  | TVerifyOfferResponse
  | TCancelOfferResponseDL
;

export type RpcCrawlerMessage = 
  TGetIpsAfterTimestampResponse
  | TGetPeerCountsResponse
;

export type RpcCommonMessage =
  TGetConnectionsResponse
  | TOpenConnectionResponse
  | TCloseConnectionResponse
  | TStopNodeResponse
  | TGetRoutesResponse
  | THealthzResponse
;

export type RpcMessage =
  RpcFarmerMessage
  | RpcFullNodeMessage
  | RpcHarvesterMessage
  | RpcWalletMessage
  | RpcDataLayerMessage
  | RpcCrawlerMessage
  | RpcCommonMessage
;
