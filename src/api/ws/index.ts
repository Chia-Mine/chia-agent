import {GetMessageType} from "../types";
import type {
  chia_farmer_service,
  get_connections_command as get_connections_farmer_command,
  new_farming_info_command,
  new_signage_point_command,
  harvester_update_command,
  harvester_removed_command,
  proof_command,
  submitted_partial_command,
  TGetConnectionsBroadCast as TGetConnectionsFarmerBroadCast,
  TNewFarmingInfoBroadCast,
  TNewSignagePointBroadCast,
  THarvesterUpdateBroadCast,
  THarvesterRemovedBroadCast,
  TProofBroadCast,
  TSubmittedPartialBroadCast,
} from "./farmer/index";
export {
  chia_farmer_service,
  TChiaFarmerBroadcast,
  TGetConnectionsBroadCast as TGetConnectionsFarmerBroadCast,
  TNewSignagePointBroadCast,
  TNewFarmingInfoBroadCast,
  THarvesterUpdateBroadCast,
  THarvesterRemovedBroadCast,
  TProofBroadCast,
  TSubmittedPartialBroadCast,
  on_message_from_farmer,
  on_get_connections as on_get_connections_farmer,
  on_new_farming_info,
  on_new_signage_point,
  on_harvester_update,
  on_harvester_removed,
  on_proof,
  on_submitted_partial,
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
  farming_info_command,
  TGetConnectionsBroadCast as TGetConnectionsHarvesterBroadCast,
  TGetPlotsBroadCast,
  TFarmingInfoBroadCast,
} from "./harvester/index";
export {
  chia_harvester_service,
  TGetConnectionsBroadCast as TGetConnectionsHarvesterBroadCast,
  TChiaHarvesterBroadcast,
  TGetPlotsBroadCast,
  TFarmingInfoBroadCast,
  on_message_from_harvester,
  on_get_connections as on_get_connections_harvester,
  on_get_plots,
  on_farming_info,
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
  TExitResponse,
  get_status_command,
  TGetStatusResponse,
  get_version_command,
  TGetVersionResponse,
  get_plotters_command,
  TGetPlottersResponse,
  running_services_command,
  TRunningServicesResponse,
  is_running_command,
  TIsRunningResponse,
  add_private_key_command,
  TAddPrivateKeyResponse,
  check_keys_command,
  TCheckKeysResponse,
  delete_all_keys_command,
  TDeleteAllKeysResponse,
  delete_key_by_fingerprint_command,
  TDeleteKeyByFingerprintResponse,
  get_all_private_keys_command,
  TGetAllPrivateKeysResponse,
  get_first_private_key_command,
  TGetFirstPrivateKeyResponse,
  get_key_for_fingerprint_command,
  TGetKeyForFingerprintResponse,
  get_key_command,
  TGetKeyResponse,
  get_keys_command,
  TGetKeysResponse,
  set_label_command,
  TSetLabelResponse,
  delete_label_command,
  TDeleteLabelResponse,
  is_keyring_locked_command,
  TIsKeyringLockedResponse,
  keyring_status_command,
  TKeyringStatusResponse,
  unlock_keyring_command,
  TUnlockKeyringResponse,
  set_keyring_passphrase_command,
  TSetKeyringPassphraseResponse,
  remove_keyring_passphrase_command,
  TRemoveKeyringPassphraseResponse,
  ping_command,
  TPingResponse,
  register_service_command,
  TRegisterServiceResponse,
  start_plotting_command,
  TStartPlottingResponse,
  start_service_command,
  TStartServiceResponse,
  stop_plotting_command,
  TStopPlottingResponse,
  stop_service_command,
  TStopServiceResponse,
  migrate_keyring_command,
  TMigrateKeyringResponse,
  notify_keyring_migration_completed_command,
  TNotifyKeyringMigrationCompletedResponse,
  keyring_status_changed_command,
  TKeyringStatusChangedBroadCast,
  validate_keyring_passphrase_command,
  TValidateKeyringPassphraseResponse,
} from "./daemon/index";
export {
  daemon_service,
  register_service,
  TRegisterServiceRequest,
  TRegisterServiceResponse,
  start_service,
  TStartServiceRequest,
  TStartServiceResponse,
  start_plotting,
  TStartPlottingResponse,
  TStartPlottingRequest,
  stop_service,
  TStopServiceResponse,
  TStopServiceRequest,
  stop_plotting,
  TStopPlottingRequest,
  TStopPlottingResponse,
  exit,
  TExitRequest,
  TExitResponse,
  get_status,
  TGetStatusRequest,
  TGetStatusResponse,
  get_version,
  TGetVersionRequest,
  TGetVersionResponse,
  get_plotters,
  TGetPlottersRequest,
  TGetPlottersResponse,
  running_services,
  TRunningServicesResponse,
  is_running,
  TIsRunningRequest,
  TIsRunningResponse,
  add_private_key,
  TAddPrivateKeyRequest,
  TAddPrivateKeyResponse,
  check_keys,
  TCheckKeysRequest,
  TCheckKeysResponse,
  delete_all_keys,
  TDeleteAllKeysRequest,
  TDeleteAllKeysResponse,
  delete_key_by_fingerprint,
  TDeleteKeyByFingerprintRequest,
  TDeleteKeyByFingerprintResponse,
  get_all_private_keys,
  TGetAllPrivateKeysRequest,
  TGetAllPrivateKeysResponse,
  get_first_private_key,
  TGetFirstPrivateKeyRequest,
  TGetFirstPrivateKeyResponse,
  get_key_for_fingerprint,
  TGetKeyForFingerprintRequest,
  TGetKeyForFingerprintResponse,
  get_key,
  TGetKeyRequest,
  TGetKeyResponse,
  get_keys,
  TGetKeysRequest,
  TGetKeysResponse,
  set_label,
  TSetLabelRequest,
  TSetLabelResponse,
  delete_label,
  TDeleteLabelRequest,
  TDeleteLabelResponse,
  is_keyring_locked,
  TIsKeyringLockedResponse,
  on_keyring_status_changed,
  TKeyringStatusChangedBroadCast,
  keyring_status,
  TKeyringStatusResponse,
  unlock_keyring,
  TUnlockKeyringRequest,
  TUnlockKeyringResponse,
  migrate_keyring,
  TMigrateKeyringRequest,
  TMigrateKeyringResponse,
  set_keyring_passphrase,
  TSetKeyringPassphraseRequest,
  TSetKeyringPassphraseResponse,
  remove_keyring_passphrase,
  TRemoveKeyringPassphraseRequest,
  TRemoveKeyringPassphraseResponse,
  notify_keyring_migration_completed,
  TNotifyKeyringMigrationCompletedRequest,
  TNotifyKeyringMigrationCompletedResponse,
  ping,
  TPingRequest,
  TPingResponse,
  validate_keyring_passphrase,
  TValidateKeyringPassphraseRequest,
  TValidateKeyringPassphraseResponse,
  TPlotQueue,
} from "./daemon/index";


export type WsFarmerMessage =
  GetMessageType<chia_farmer_service, new_farming_info_command, TNewFarmingInfoBroadCast>
  | GetMessageType<chia_farmer_service, new_signage_point_command, TNewSignagePointBroadCast>
  | GetMessageType<chia_farmer_service, harvester_update_command, THarvesterUpdateBroadCast>
  | GetMessageType<chia_farmer_service, harvester_removed_command, THarvesterRemovedBroadCast>
  | GetMessageType<chia_farmer_service, get_connections_farmer_command, TGetConnectionsFarmerBroadCast>
  | GetMessageType<chia_farmer_service, proof_command, TProofBroadCast>
  | GetMessageType<chia_farmer_service, submitted_partial_command, TSubmittedPartialBroadCast>
  ;

export type WsFullNodeMessage =
  GetMessageType<chia_full_node_service, get_blockchain_state_command, TGetBlockchainStateBroadCast>
  | GetMessageType<chia_full_node_service, block_command, TBlockBroadCast>
  | GetMessageType<chia_full_node_service, signage_point_command, TSignagePointBroadCast>
  | GetMessageType<chia_full_node_service, get_connections_full_node_command, TGetConnectionsFullNodeBroadCast>
  ;

export type WsHarvesterMessage =
  GetMessageType<chia_harvester_service, get_plots_command, TGetPlotsBroadCast>
  | GetMessageType<chia_harvester_service, farming_info_command, TFarmingInfoBroadCast>
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
  | GetMessageType<daemon_service, running_services_command, TRunningServicesResponse>
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
  | GetMessageType<daemon_service, get_key_command, TGetKeyResponse>
  | GetMessageType<daemon_service, get_keys_command, TGetKeysResponse>
  | GetMessageType<daemon_service, set_label_command, TSetLabelResponse>
  | GetMessageType<daemon_service, delete_label_command, TDeleteLabelResponse>
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
