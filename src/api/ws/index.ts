import {GetMessageType} from "../types";
import type {
  chia_farmer_service,
  get_connections_command as get_connections_farmer_command,
  new_farming_info_command,
  new_signage_point_command,
  new_plots_command,
  TGetConnectionsBroadCast as TGetConnectionsFarmerBroadCast,
  TNewFarmingInfoBroadCast,
  TNewSignagePointBroadCast,
  TNewPlotsBroadCast,
} from "./farmer/index";
export {
  chia_farmer_service,
  TChiaFarmerBroadcast,
  TGetConnectionsBroadCast as TGetConnectionsFarmerBroadCast,
  TNewSignagePointBroadCast,
  TNewFarmingInfoBroadCast,
  TNewPlotsBroadCast,
  on_message_from_farmer,
  on_get_connections as on_get_connections_farmer,
  on_new_farming_info,
  on_new_signage_point,
  on_new_plots,
} from "./farmer/index";

import type {
  chia_full_node_service,
  get_connections_command as get_connections_full_node_command,
  get_blockchain_state_command,
  block_command,
  signage_point_command,
  TGetConnectionsBroadCast as TGetConnectionsFullNodeBroadCast,
  TGetBlockchainStateBroadCast,
  TBlockBroadCast,
  TSignagePointBroadCast,
} from "./full_node/index";
export {
  chia_full_node_service,
  TChiaFullNodeBroadcast,
  TGetConnectionsBroadCast as TGetConnectionsFullNodeBroadCast,
  TGetBlockchainStateBroadCast,
  TBlockBroadCast,
  TSignagePointBroadCast,
  on_message_from_full_node,
  on_get_connections as on_get_connections_full_node,
  on_get_blockchain_state,
  on_block,
  on_signage_point,
} from "./full_node/index";

import type {
  chia_harvester_service,
  get_connections_command as get_connections_harvester_command,
  get_plots_command,
  TGetConnectionsBroadCast as TGetConnectionsHarvesterBroadCast,
  TGetPlotsBroadCast,
} from "./harvester/index";
export {
  chia_harvester_service,
  TGetConnectionsBroadCast as TGetConnectionsHarvesterBroadCast,
  TChiaHarvesterBroadcast,
  TGetPlotsBroadCast,
  on_message_from_harvester,
  on_get_connections as on_get_connections_harvester,
  on_get_plots, 
} from "./harvester/index";

import type {
  chia_wallet_service,
  get_connections_command as get_connections_wallet_command,
  sync_changed_command_of_wallet,
  state_changed_command_of_wallet,
  coin_added_command_of_wallet,
  TGetConnectionsBroadCast as TGetConnectionsWalletBroadCast,
  TSyncChangedBroadCastOfWallet,
  TStateChangedBroadCastOfWallet,
  TCoinAddedBroadCastOfWallet,
} from "./wallet/index";
export {
  chia_wallet_service,
  TGetConnectionsBroadCast as TGetConnectionsWalletBroadCast,
  TSyncChangedBroadCastOfWallet,
  TStateChangedBroadCastOfWallet,
  TCoinAddedBroadCastOfWallet,
  TChiaWalletBroadcast,
  on_get_connections as on_get_connections_wallet,
  on_sync_changed_of_wallet,
  on_state_changed_of_wallet,
  on_coin_added_of_wallet,
  on_message_from_wallet,
} from "./wallet/index";

import type {
  chia_plotter_service,
  state_changed_command_of_plots,
  TStateChangedBroadCastOfPlots,
} from "./chia_plots_create/index";
export {
  chia_plotter_service,
  state_changed_command_of_plots,
  TStateChangedBroadCastOfPlots,
  on_state_changed_of_plots,
} from "./chia_plots_create/index";

import type {
  chia_crawler_service,
  loaded_initial_peers_command,
  crawl_batch_completed_command,
  TLoadedInitialPeersBroadCast,
  TCrawlBatchCompletedBroadCast,
} from "./crawler/index";
export {
  chia_crawler_service,
  TLoadedInitialPeersBroadCast,
  TCrawlBatchCompletedBroadCast,
  TPeerCounts,
  on_loaded_initial_peers,
  on_crawl_batch_completed,
} from "./crawler/index";

import type {
  chia_timelord_service,
  finished_pot_command,
  new_compact_proof_command,
  skipping_peak_command,
  new_peak_command,
  TFinishedPotBroadCast,
  TNewCompactProofBroadCast,
  TSkippingPeakBroadCast,
  TNewPeakBroadCast,
} from "./timelord/index";
export {
  chia_timelord_service,
  TFinishedPotBroadCast,
  TNewCompactProofBroadCast,
  TSkippingPeakBroadCast,
  TNewPeakBroadCast,
  on_finished_pot,
  on_new_compact_proof,
  on_skipping_peak,
  on_new_peak,
} from "./timelord/index";

import type {
  daemon_service,
  exit_command,
  get_status_command,
  get_version_command,
  get_plotters_command,
  is_running_command,
  add_private_key_command,
  check_keys_command,
  delete_all_keys_command,
  delete_key_by_fingerprint_command,
  get_all_private_keys_command,
  get_first_private_key_command,
  get_key_for_fingerprint_command,
  is_keyring_locked_command,
  keyring_status_command,
  unlock_keyring_command,
  set_keyring_passphrase_command,
  remove_keyring_passphrase_command,
  ping_command,
  register_service_command,
  start_plotting_command,
  start_service_command,
  stop_plotting_command,
  stop_service_command,
  migrate_keyring_command,
  notify_keyring_migration_completed_command,
  keyring_status_changed_command,
  validate_keyring_passphrase_command,
  TExitResponse,
  TGetStatusResponse,
  TGetVersionResponse,
  TGetPlottersResponse,
  TIsRunningResponse,
  TAddPrivateKeyResponse,
  TCheckKeysResponse,
  TDeleteAllKeysResponse,
  TDeleteKeyByFingerprintResponse,
  TGetAllPrivateKeysResponse,
  TGetFirstPrivateKeyResponse,
  TGetKeyForFingerprintResponse,
  TIsKeyringLockedResponse,
  TKeyringStatusResponse,
  TUnlockKeyringResponse,
  TSetKeyringPassphraseResponse,
  TRemoveKeyringPassphraseResponse,
  TPingResponse,
  TRegisterServiceResponse,
  TStartPlottingResponse,
  TStartServiceResponse,
  TStopPlottingResponse,
  TStopServiceResponse,
  TMigrateKeyringResponse,
  TNotifyKeyringMigrationCompletedResponse,
  TKeyringStatusChangedBroadCast,
  TValidateKeyringPassphraseResponse,
} from "./daemon/index";
export {
  daemon_service,
  TRegisterServiceResponse, 
  TStartPlottingResponse, 
  TStartServiceResponse, 
  TStopPlottingResponse, 
  TStopServiceResponse,
  TExitResponse,
  TGetStatusResponse,
  TGetVersionResponse,
  TGetPlottersResponse,
  TIsRunningResponse,
  TAddPrivateKeyResponse,
  TCheckKeysResponse,
  TDeleteAllKeysResponse,
  TDeleteKeyByFingerprintResponse,
  TGetAllPrivateKeysResponse,
  TGetFirstPrivateKeyResponse,
  TGetKeyForFingerprintResponse,
  TIsKeyringLockedResponse,
  TKeyringStatusResponse,
  TUnlockKeyringResponse,
  TMigrateKeyringResponse,
  TSetKeyringPassphraseResponse,
  TRemoveKeyringPassphraseResponse,
  TNotifyKeyringMigrationCompletedResponse,
  TPingResponse,
  TKeyringStatusChangedBroadCast,
  TValidateKeyringPassphraseResponse,
  TStopPlottingRequest,
  TRegisterServiceRequest,
  TPlotQueue,
  TPingRequest,
  TGetStatusRequest,
  TGetVersionRequest,
  TGetPlottersRequest,
  TStartServiceRequest,
  TStartPlottingRequest,
  TStopServiceRequest,
  TIsRunningRequest,
  TAddPrivateKeyRequest,
  TCheckKeysRequest,
  TDeleteAllKeysRequest,
  TDeleteKeyByFingerprintRequest,
  TGetAllPrivateKeysRequest,
  TGetFirstPrivateKeyRequest,
  TGetKeyForFingerprintRequest,
  TUnlockKeyringRequest,
  TMigrateKeyringRequest,
  TSetKeyringPassphraseRequest,
  TRemoveKeyringPassphraseRequest,
  TNotifyKeyringMigrationCompletedRequest,
  TExitRequest,
  TValidateKeyringPassphraseRequest,
  get_status,
  get_version,
  get_plotters,
  ping_command, 
  stop_service, 
  stop_plotting, 
  start_service, 
  exit_command, 
  start_plotting, 
  register_service, 
  ping, 
  is_running,
  add_private_key,
  check_keys,
  delete_all_keys,
  delete_key_by_fingerprint,
  get_all_private_keys,
  get_first_private_key,
  get_key_for_fingerprint,
  is_keyring_locked,
  keyring_status,
  unlock_keyring,
  migrate_keyring,
  set_keyring_passphrase,
  remove_keyring_passphrase,
  notify_keyring_migration_completed,
  exit,
  on_keyring_status_changed,
  validate_keyring_passphrase,
} from "./daemon/index";


export type WsFarmerMessage =
  GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>
  | GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>
  | GetMessageType<chia_farmer_service, new_plots_command, TNewPlotsBroadCast>
  | GetMessageType<chia_farmer_service, get_connections_farmer_command, TGetConnectionsFarmerBroadCast>
  ;

export type WsFullNodeMessage =
  GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>
  | GetMessageType<chia_full_node_service, block_command, TBlockBroadCast>
  | GetMessageType<chia_full_node_service, signage_point_command, TSignagePointBroadCast>
  | GetMessageType<chia_full_node_service, get_connections_full_node_command, TGetConnectionsFullNodeBroadCast>
  ;

export type WsHarvesterMessage =
  GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>
  | GetMessageType<chia_harvester_service, get_connections_harvester_command, TGetConnectionsHarvesterBroadCast>
  ;

export type WsWalletMessage =
  GetMessageType<chia_wallet_service, get_connections_wallet_command, TGetConnectionsWalletBroadCast>
  | GetMessageType<chia_wallet_service, sync_changed_command_of_wallet, TSyncChangedBroadCastOfWallet>
  | GetMessageType<chia_wallet_service, state_changed_command_of_wallet, TStateChangedBroadCastOfWallet>
  | GetMessageType<chia_wallet_service, coin_added_command_of_wallet, TCoinAddedBroadCastOfWallet>
  ;

export type WsPlotsMessage =
  GetMessageType<chia_plotter_service, state_changed_command_of_plots, TStateChangedBroadCastOfPlots>
  ;

export type WsCrawlerMessage =
  GetMessageType<chia_crawler_service, loaded_initial_peers_command, TLoadedInitialPeersBroadCast>
  | GetMessageType<chia_crawler_service, crawl_batch_completed_command, TCrawlBatchCompletedBroadCast>
  ;

export type WsTimelordMessage =
  GetMessageType<chia_timelord_service, finished_pot_command, TFinishedPotBroadCast>
  | GetMessageType<chia_timelord_service, new_compact_proof_command, TNewCompactProofBroadCast>
  | GetMessageType<chia_timelord_service, skipping_peak_command, TSkippingPeakBroadCast>
  | GetMessageType<chia_timelord_service, new_peak_command, TNewPeakBroadCast>
  ;

export type WsDaemonMessage =
  GetMessageType<daemon_service, exit_command, TExitResponse>
  | GetMessageType<daemon_service, get_status_command, TGetStatusResponse>
  | GetMessageType<daemon_service, get_version_command, TGetVersionResponse>
  | GetMessageType<daemon_service, get_plotters_command, TGetPlottersResponse>
  | GetMessageType<daemon_service, is_running_command, TIsRunningResponse>
  | GetMessageType<daemon_service, ping_command, TPingResponse>
  | GetMessageType<daemon_service, register_service_command, TRegisterServiceResponse>
  | GetMessageType<daemon_service, start_plotting_command, TStartPlottingResponse>
  | GetMessageType<daemon_service, start_service_command, TStartServiceResponse>
  | GetMessageType<daemon_service, stop_plotting_command, TStopPlottingResponse>
  | GetMessageType<daemon_service, stop_service_command, TStopServiceResponse>
  | GetMessageType<daemon_service, add_private_key_command, TAddPrivateKeyResponse>
  | GetMessageType<daemon_service, check_keys_command, TCheckKeysResponse>
  | GetMessageType<daemon_service, delete_all_keys_command, TDeleteAllKeysResponse>
  | GetMessageType<daemon_service, delete_key_by_fingerprint_command, TDeleteKeyByFingerprintResponse>
  | GetMessageType<daemon_service, get_all_private_keys_command, TGetAllPrivateKeysResponse>
  | GetMessageType<daemon_service, get_first_private_key_command, TGetFirstPrivateKeyResponse>
  | GetMessageType<daemon_service, get_key_for_fingerprint_command, TGetKeyForFingerprintResponse>
  | GetMessageType<daemon_service, is_keyring_locked_command, TIsKeyringLockedResponse>
  | GetMessageType<daemon_service, keyring_status_command, TKeyringStatusResponse>
  | GetMessageType<daemon_service, unlock_keyring_command, TUnlockKeyringResponse>
  | GetMessageType<daemon_service, validate_keyring_passphrase_command, TValidateKeyringPassphraseResponse>
  | GetMessageType<daemon_service, migrate_keyring_command, TMigrateKeyringResponse>
  | GetMessageType<daemon_service, set_keyring_passphrase_command, TSetKeyringPassphraseResponse>
  | GetMessageType<daemon_service, remove_keyring_passphrase_command, TRemoveKeyringPassphraseResponse>
  | GetMessageType<daemon_service, notify_keyring_migration_completed_command, TNotifyKeyringMigrationCompletedResponse>
  | GetMessageType<daemon_service, keyring_status_changed_command, TKeyringStatusChangedBroadCast>
  ;



export type WsMessage =
  WsFarmerMessage
  | WsFullNodeMessage
  | WsHarvesterMessage
  | WsWalletMessage
  | WsPlotsMessage
  | WsCrawlerMessage
  | WsTimelordMessage
  | WsDaemonMessage
  ;
