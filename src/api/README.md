# API

There are 2 kinds of APIs in chia.  
`RPC API` and `Websocket API`

### RPC API
RPC API is used to send message directly to chia services like `farmer`, `harvester`, `full_node`,
`wallet`, `data_layer`, `crawler`.

RPC API is just an async function with a traditional request/response style.

### [RPCAgent](../rpc/README.md)
See how to instantiate RPCAgent before requesting RPC API [**>>here**](../rpc/README.md).


### Common RPC API Error Response
If an exception is raised in RPC server, error response will be returned in the following format:
```typescript
{
  error: string;
  success: false;
}
```
In order to keep description simple, the above error response is omitted in RPC API documents below.

#### [Farmer RPC API](./rpc/farmer/README.md#usage)
- [`get_reward_targets`](./rpc/farmer/README.md#get_reward_targetsagent-params)
- [`get_signage_point`](./rpc/farmer/README.md#get_signage_pointagent-params)
- [`get_signage_points`](./rpc/farmer/README.md#get_signage_pointsagent)
- [`set_reward_targets`](./rpc/farmer/README.md#set_reward_targetsagent-params)
- [`get_pool_state`](./rpc/farmer/README.md#get_pool_stateagent)
- [`set_payout_instructions`](./rpc/farmer/README.md#set_payout_instructionsagent-params)
- [`get_harvesters`](./rpc/farmer/README.md#get_harvestersagent)
- [`get_harvesters_summary`](./rpc/farmer/README.md#get_harvesters_summaryagent)
- [`get_harvester_plots_valid`](./rpc/farmer/README.md#get_harvester_plots_validagent-params)
- [`get_harvester_plots_invalid`](./rpc/farmer/README.md#get_harvester_plots_invalidagent-params)
- [`get_harvester_plots_keys_missing`](./rpc/farmer/README.md#get_harvester_plots_keys_missingagent-params)
- [`get_harvester_plots_duplicates`](./rpc/farmer/README.md#get_harvester_plots_duplicatesagent-params)
- [`get_pool_login_link`](./rpc/farmer/README.md#get_pool_login_linkagent-params)

#### [Full Node RPC API](./rpc/full_node/README.md#usage)
- [`get_blockchain_state`](./rpc/full_node/README.md#get_blockchain_stateagent)
- [`get_block`](./rpc/full_node/README.md#get_blockagent-params)
- [`get_blocks`](./rpc/full_node/README.md#get_blocksagent-params)
- [`get_block_count_metrics`](./rpc/full_node/README.md#get_block_count_metricsagent)
- [`get_block_record_by_height`](./rpc/full_node/README.md#get_block_record_by_heightagent-params)
- [`get_block_record`](./rpc/full_node/README.md#get_block_recordagent-params)
- [`get_block_records`](./rpc/full_node/README.md#get_block_recordsagent-params)
- [`get_block_spends`](./rpc/full_node/README.md#get_block_spendsagent-params)
- [`get_unfinished_block_headers`](./rpc/full_node/README.md#get_unfinished_block_headersagent)
- [`get_network_space`](./rpc/full_node/README.md#get_network_spaceagent-params)
- [`get_additions_and_removals`](./rpc/full_node/README.md#get_additions_and_removalsagent-params)
- [`get_initial_freeze_period_of_full_node`](./rpc/full_node/README.md#get_initial_freeze_period_of_full_nodeagent)
- [`get_network_info_of_full_node`](./rpc/full_node/README.md#get_network_info_of_full_nodeagent)
- [`get_recent_signage_point_or_eos`](./rpc/full_node/README.md#get_recent_signage_point_or_eosagent-params)
- [`get_coin_records_by_puzzle_hash`](./rpc/full_node/README.md#get_coin_records_by_puzzle_hashagent-params)
- [`get_coin_records_by_puzzle_hashes`](./rpc/full_node/README.md#get_coin_records_by_puzzle_hashesagent-params)
- [`get_coin_record_by_name`](./rpc/full_node/README.md#get_coin_record_by_nameagent-params)
- [`get_coin_records_by_names`](./rpc/full_node/README.md#get_coin_records_by_namesagent-params)
- [`get_coin_records_by_parent_ids`](./rpc/full_node/README.md#get_coin_records_by_parent_idsagent-params)
- [`get_coin_records_by_hint`](./rpc/full_node/README.md#get_coin_records_by_hintagent-params)
- [`push_tx`](./rpc/full_node/README.md#push_txagent-params)
- [`get_puzzle_and_solution`](./rpc/full_node/README.md#get_puzzle_and_solutionagent-params)
- [`get_all_mempool_tx_ids`](./rpc/full_node/README.md#get_all_mempool_tx_idsagent)
- [`get_all_mempool_items`](./rpc/full_node/README.md#get_all_mempool_itemsagent)
- [`get_mempool_item_by_tx_id`](./rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)

#### [Harvester RPC API](./rpc/harvester/README.md#usage)
- [`get_plots`](./rpc/harvester/README.md#get_plotsagent)
- [`refresh_plots`](./rpc/harvester/README.md#refresh_plotsagent)
- [`delete_plot`](./rpc/harvester/README.md#delete_plotagent-params)
- [`add_plot_directory`](./rpc/harvester/README.md#add_plot_directoryagent-params)
- [`get_plot_directories`](./rpc/harvester/README.md#get_plot_directoriesagent)
- [`remove_plot_directory`](./rpc/harvester/README.md#remove_plot_directoryagent-params)

#### [Wallet RPC API](./rpc/wallet/README.md#usage)
- [`log_in`](./rpc/wallet/README.md#log_inagent-params)
- [`get_logged_in_fingerprint`](./rpc/wallet/README.md#get_logged_in_fingerprintagent)
- [`get_public_keys`](./rpc/wallet/README.md#get_public_keysagent)
- [`get_private_key`](./rpc/wallet/README.md#get_private_keyagent-params)
- [`generate_mnemonic`](./rpc/wallet/README.md#generate_mnemonicagent)
- [`add_key`](./rpc/wallet/README.md#add_keyagent-params)
- [`delete_key`](./rpc/wallet/README.md#delete_keyagent-params)
- [`check_delete_key`](./rpc/wallet/README.md#check_delete_keyagent-params).
- [`delete_all_keys`](./rpc/wallet/README.md#delete_all_keysagent)
- [`get_sync_status`](./rpc/wallet/README.md#get_sync_statusagent)
- [`get_height_info`](./rpc/wallet/README.md#get_height_infoagent)
- [`push_tx`](./rpc/wallet/README.md#push_txagent-params)
- [`farm_block`](./rpc/wallet/README.md#farm_blockagent-params)
- [`get_initial_freeze_period_of_wallet`](./rpc/wallet/README.md#get_initial_freeze_period_of_walletagent)
- [`get_network_info_of_wallet`](./rpc/wallet/README.md#get_network_info_of_walletagent)
- [`get_wallets`](./rpc/wallet/README.md#get_walletsagent-params)
- [`create_new_wallet`](./rpc/wallet/README.md#create_new_walletagent-params)
- [`get_wallet_balance`](./rpc/wallet/README.md#get_wallet_balanceagent-params)
- [`get_transaction`](./rpc/wallet/README.md#get_transactionagent-params)
- [`get_transactions`](./rpc/wallet/README.md#get_transactionsagent-params)
- [`get_next_address`](./rpc/wallet/README.md#get_next_addressagent-params)
- [`send_transaction`](./rpc/wallet/README.md#send_transactionagent-params)
- [`send_transaction_multi`](./rpc/wallet/README.md#send_transaction_multiagent-params)
- [`get_transaction_count`](./rpc/wallet/README.md#get_transaction_countagent-params)
- [`get_farmed_amount`](./rpc/wallet/README.md#get_farmed_amountagent)
- [`create_signed_transaction`](./rpc/wallet/README.md#create_signed_transactionagent-params)
- [`delete_unconfirmed_transactions`](./rpc/wallet/README.md#delete_unconfirmed_transactionsagent-params)
- [`select_coins`](./rpc/wallet/README.md#select_coinsagent-params)
- [`get_current_derivation_index`](./rpc/wallet/README.md#get_current_derivation_indexagent)
- [`extend_derivation_index`](./rpc/wallet/README.md#extend_derivation_indexagent-params)
- [`get_cat_list`](./rpc/wallet/README.md#get_cat_listagent)
- [`cat_set_name`](./rpc/wallet/README.md#cat_set_nameagent-params)
- [`cat_asset_id_to_name`](./rpc/wallet/README.md#cat_asset_id_to_nameagent-params)
- [`cat_get_name`](./rpc/wallet/README.md#cat_get_nameagent-params)
- [`get_stray_cats`](./rpc/wallet/README.md#get_stray_catsagent)
- [`cat_spend`](./rpc/wallet/README.md#cat_spendagent-params)
- [`cat_get_asset_id`](./rpc/wallet/README.md#cat_get_asset_idagent-params)
- [`create_offer_for_ids`](./rpc/wallet/README.md#create_offer_for_idsagent-params)
- [`get_offer_summary`](./rpc/wallet/README.md#get_offer_summaryagent-params)
- [`check_offer_validity`](./rpc/wallet/README.md#check_offer_validityagent-params)
- [`take_offer`](./rpc/wallet/README.md#take_offeragent-params)
- [`get_offer`](./rpc/wallet/README.md#get_offeragent-params)
- [`get_all_offers`](./rpc/wallet/README.md#get_all_offersagent-params)
- [`get_offers_count`](./rpc/wallet/README.md#get_offers_countagent)
- [`cancel_offer`](./rpc/wallet/README.md#cancel_offeragent-params)
- [`cancel_offers`](./rpc/wallet/README.md#cancel_offersagent-params)
- [`did_set_wallet_name`](./rpc/wallet/README.md#did_set_wallet_nameagent-params)
- [`did_get_wallet_name`](./rpc/wallet/README.md#did_get_wallet_nameagent-params)
- [`did_update_recovery_ids`](./rpc/wallet/README.md#did_update_recovery_idsagent-params)
- [`did_update_metadata`](./rpc/wallet/README.md#did_update_metadataagent-params)
- [`did_get_pubkey`](./rpc/wallet/README.md#did_get_pubkeyagent-params)
- [`did_get_did`](./rpc/wallet/README.md#did_get_didagent-params)
- [`did_recovery_spend`](./rpc/wallet/README.md#did_recovery_spendagent-params)
- [`did_get_recovery_list`](./rpc/wallet/README.md#did_get_recovery_listagent-params)
- [`did_get_metadata`](./rpc/wallet/README.md#did_get_metadataagent-params)
- [`did_create_attest`](./rpc/wallet/README.md#did_create_attestagent-params)
- [`did_get_information_needed_for_recovery`](./rpc/wallet/README.md#did_get_information_needed_for_recoveryagent-params)
- [`did_get_current_coin_info`](./rpc/wallet/README.md#did_get_current_coin_infoagent-params)
- [`did_create_backup_file`](./rpc/wallet/README.md#did_create_backup_fileagent-params)
- [`did_transfer_did`](./rpc/wallet/README.md#did_transfer_didagent-params)
- [`nft_mint_nft`](./rpc/wallet/README.md#nft_mint_nftagent-params)
- [`nft_get_nfts`](./rpc/wallet/README.md#nft_get_nftsagent-params)
- [`nft_get_by_did`](./rpc/wallet/README.md#nft_get_by_didagent-params)
- [`nft_set_nft_did`](./rpc/wallet/README.md#nft_set_nft_didagent-params)
- [`nft_set_nft_status`](./rpc/wallet/README.md#nft_set_nft_statusagent-params)
- [`nft_get_wallet_did`](./rpc/wallet/README.md#nft_get_wallet_didagent-params)
- [`nft_get_wallets_with_dids`](./rpc/wallet/README.md#nft_get_wallets_with_didsagent)
- [`nft_get_info`](./rpc/wallet/README.md#nft_get_infoagent-params)
- [`nft_transfer_nft`](./rpc/wallet/README.md#nft_transfer_nftagent-params)
- [`nft_add_uri`](./rpc/wallet/README.md#nft_add_uriagent-params)
- [`rl_set_user_info`](./rpc/wallet/README.md#rl_set_user_infoagent-params)
- [`send_clawback_transaction`](./rpc/wallet/README.md#send_clawback_transactionagent-params)
- [`add_rate_limited_funds`](./rpc/wallet/README.md#add_rate_limited_fundsagent-params)
- [`pw_join_pool`](./rpc/wallet/README.md#pw_join_poolagent-params)
- [`pw_self_pool`](./rpc/wallet/README.md#pw_self_poolagent-params)
- [`pw_absorb_rewards`](./rpc/wallet/README.md#pw_absorb_rewardsagent-params)
- [`pw_status`](./rpc/wallet/README.md#pw_statusagent-params)
- [`create_new_dl`](./rpc/wallet/README.md#create_new_dlagent-params)
- [`dl_track_new`](./rpc/wallet/README.md#dl_track_newagent-params)
- [`dl_stop_tracking`](./rpc/wallet/README.md#dl_stop_trackingagent-params)
- [`dl_latest_singleton`](./rpc/wallet/README.md#dl_latest_singletonagent-params)
- [`dl_singletons_by_root`](./rpc/wallet/README.md#dl_singletons_by_rootagent-params)
- [`dl_update_root`](./rpc/wallet/README.md#dl_update_rootagent-params)
- [`dl_update_multiple`](./rpc/wallet/README.md#dl_update_multipleagent-params)
- [`dl_history`](./rpc/wallet/README.md#dl_historyagent-params)
- [`dl_owned_singletons`](./rpc/wallet/README.md#dl_owned_singletonsagent-params)
- [`dl_get_mirrors`](./rpc/wallet/README.md#dl_get_mirrorsagent-params)
- [`dl_new_mirror`](./rpc/wallet/README.md#dl_new_mirroragent-params)
- [`dl_delete_mirror`](./rpc/wallet/README.md#dl_delete_mirroragent-params)

#### [Pool API](./rpc/pool/README.md#usage)
- [`pool_info`](./rpc/pool/README.md#pool_infoagent)
- [`get_farmer`](./rpc/pool/README.md#get_farmeragent-params)
- [`post_farmer`](./rpc/pool/README.md#post_farmeragent-params)
- [`put_farmer`](./rpc/pool/README.md#put_farmeragent-params)
- [`partial`](./rpc/pool/README.md#partialagent-params)
- [`login`](./rpc/pool/README.md#loginagent-params)

#### [Data Layer API](./rpc/data_layer/README.md#usage)
- [`create_data_store`](./rpc/data_layer/README.md#create_data_storeagent-params)
- [`get_owned_stores`](./rpc/data_layer/README.md#get_owned_storesagent)
- [`batch_update`](./rpc/data_layer/README.md#batch_updateagent-params)
- [`get_value`](./rpc/data_layer/README.md#get_valueagent-params)
- [`get_keys`](./rpc/data_layer/README.md#get_keysagent-params)
- [`get_keys_values`](./rpc/data_layer/README.md#get_keys_valuesagent-params)
- [`get_ancestors`](./rpc/data_layer/README.md#get_ancestorsagent-params)
- [`get_root`](./rpc/data_layer/README.md#get_rootagent-params)
- [`get_local_root`](./rpc/data_layer/README.md#get_local_rootagent-params)
- [`get_roots`](./rpc/data_layer/README.md#get_rootsagent-params)
- [`delete_key`](./rpc/data_layer/README.md#delete_keyagent-params)
- [`insert`](./rpc/data_layer/README.md#insertagent-params)
- [`subscribe`](./rpc/data_layer/README.md#subscribeagent-params)
- [`unsubscribe`](./rpc/data_layer/README.md#unsubscribeagent-params)
- [`add_mirror`](./rpc/data_layer/README.md#add_mirroragent-params)
- [`delete_mirror`](./rpc/data_layer/README.md#delete_mirroragent-params)
- [`get_mirrors`](./rpc/data_layer/README.md#get_mirrorsagent-params)
- [`remove_subscriptions`](./rpc/data_layer/README.md#remove_subscriptionsagent-params)
- [`subscriptions`](./rpc/data_layer/README.md#subscriptionsagent)
- [`get_kv_diff`](./rpc/data_layer/README.md#get_kv_diffagent-params)
- [`get_root_history`](./rpc/data_layer/README.md#get_root_historyagent-params)
- [`add_missing_files`](./rpc/data_layer/README.md#add_missing_filesagent-params)
- [`make_offer`](./rpc/data_layer/README.md#make_offeragent-params)
- [`take_offer`](./rpc/data_layer/README.md#take_offeragent-params)
- [`verify_offer`](./rpc/data_layer/README.md#verify_offeragent-params)
- [`cancel_offer`](./rpc/data_layer/README.md#cancel_offeragent-params)

#### [Crawler RPC API](./rpc/crawler/README.md#usage)
- [`get_peer_counts`](./rpc/crawler/README.md#get_peer_countsagent)
- [`get_ips_after_timestamp`](./rpc/crawler/README.md#get_ips_after_timestampagent-params)

#### [Common RPC API](./rpc/common/README.md#usage)
- [`get_connections`](./rpc/common/README.md#get_connectionsagent-params)
- [`open_connection`](./rpc/common/README.md#open_connectionagent-params)
- [`close_connection`](./rpc/common/README.md#close_connectionagent-params)
- [`stop_node`](./rpc/common/README.md#stop_nodeagent)
- [`get_routes`](./rpc/common/README.md#get_routesagent)

### Websocket API
Websocket API is used to connect to chia `daemon`.  

With websocket API, you can request chia daemon to start/stop plotting or other services,  
or capture various broadcast messages like:  
- Plotting progress
- Farming info such as passed filter, proofs found, etc.

### [Daemon](../daemon/README.md)
See how to get Daemon instance before requesting Websocket API [**>>here**](../daemon/README.md).


#### [daemon](./ws/daemon/README.md#usage) 
- [`add_private_key`](./ws/daemon/README.md#add_private_keydaemon-params)
- [`check_keys`](./ws/daemon/README.md#check_keysdaemon-params)
- [`delete_all_keys`](./ws/daemon/README.md#delete_all_keysdaemon-params)
- [`delete_key_by_fingerprint`](./ws/daemon/README.md#delete_key_by_fingerprintdaemon-params)
- [`get_all_private_keys`](./ws/daemon/README.md#get_all_private_keysdaemon-params)
- [`get_first_private_key`](./ws/daemon/README.md#get_first_private_keydaemon-params)
- [`get_key_for_fingerprint`](./ws/daemon/README.md#get_key_for_fingerprintdaemon-params)
- [`ping`](./ws/daemon/README.md#pingdaemon)
- [`start_service`](./ws/daemon/README.md#start_servicedaemon-params)
- [`start_plotting`](./ws/daemon/README.md#start_plottingdaemon-params)
- [`stop_plotting`](./ws/daemon/README.md#stop_plottingdaemon-params)
- [`stop_service`](./ws/daemon/README.md#stop_servicedaemon-params)
- [`is_running`](./ws/daemon/README.md#is_runningdaemon-params)
- [`is_keyring_locked`](./ws/daemon/README.md#is_keyring_lockeddaemon)
- [`keyring_status`](./ws/daemon/README.md#keyring_statusdaemon)
- [`unlock_keyring`](./ws/daemon/README.md#unlock_keyringdaemon-params)
- [`validate_keyring_passphrase`](./ws/daemon/README.md#validate_keyring_passphrasedaemon-params)
- [`migrate_keyring`](./ws/daemon/README.md#migrate_keyringdaemon-params)
- [`set_keyring_passphrase`](./ws/daemon/README.md#set_keyring_passphrasedaemon-params)
- [`remove_keyring_passphrase`](./ws/daemon/README.md#remove_keyring_passphrasedaemon-params)
- [`notify_keyring_migration_completed`](./ws/daemon/README.md#notify_keyring_migration_completeddaemon-params)
- [`exit`](./ws/daemon/README.md#exitdaemon)
- [`register_service`](./ws/daemon/README.md#register_servicedaemon-params)
- [`get_status`](./ws/daemon/README.md#get_statusdaemon)
- [`get_version`](./ws/daemon/README.md#get_versiondaemon)
- [`get_plotters`](./ws/daemon/README.md#get_plottersdaemon)

Please note that Websocket APIs below is not request/response style but subscribe/listen style.  
You cannot ask services to reply requested data immediately.  
After subscribing message channels like `wallet_ui`, `metrics` or `chia_plotter`,
you need to wait messages in the channel are arrived to your message listener.

#### [daemon](./ws/daemon/README.md#usagesubscription)
- [`keyring_status_changed`](./ws/daemon/README.md#on_keyring_status_changed)

#### [chia_plots_create](./ws/chia_plots_create/README.md#usage)
- [`state_changed`](./ws/chia_plots_create/README.md#on_state_changed_of_plots)

#### [farmer](./ws/farmer/README.md#usage)
- [`get_connections`](./ws/farmer/README.md#on_get_connections)
- [`new_farming_info`](./ws/farmer/README.md#on_new_farming_info)
- [`new_signage_point`](./ws/farmer/README.md#on_new_signage_point)
- [`harvester_updated`](./ws/farmer/README.md#on_harvester_update)
- [`harvester_removed`](./ws/farmer/README.md#on_harvester_removed)
- [`on_proof`](./ws/farmer/README.md#on_proof)
- [`on_submitted_partial`](./ws/farmer/README.md#on_submitted_partial)

#### [full_node](./ws/full_node/README.md#usage)
- [`get_connections`](./ws/full_node/README.md#on_get_connections)
- [`get_blockchain_state`](./ws/full_node/README.md#on_get_blockchain_state)
- [`block`](./ws/full_node/README.md#on_block)
- [`signage_point`](./ws/full_node/README.md#on_signage_point)

#### [harvester](./ws/harvester/README.md#usage)
- [`get_connections`](./ws/harvester/README.md#on_get_connections)
- [`get_plots`](./ws/harvester/README.md#on_get_plots)
- [`on_farming_info`](./ws/harvester/README.md#on_farming_info)

#### [wallet](./ws/wallet/README.md#usage)
- [`get_connections`](./ws/wallet/README.md#on_get_connections)
- [`sync_changed`](./ws/wallet/README.md#on_sync_changed_of_wallet)
- [`state_changed`](./ws/wallet/README.md#on_state_changed_of_wallet)
- [`coin_add`](./ws/wallet/README.md#on_coin_added)

#### [Crawler](./ws/crawler/README.md#usage)
- [`loaded_initial_peers`](./ws/crawler/README.md#on_loaded_initial_peers)
- [`crawl_batch_completed`](./ws/crawler/README.md#on_crawl_batch_completed)

#### [Timelord](./ws/timelord/README.md#usage)
- [`finished_pot`](./ws/timelord/README.md#on_finished_pot)
- [`new_compact_proof`](./ws/timelord/README.md#on_new_compact_proof)
- [`skipping_peak`](./ws/timelord/README.md#on_skipping_peak)
- [`new_peak`](./ws/timelord/README.md#on_new_peak)

### Log

You can change log level to suppress/output various internal logs.
```js
// Log level can be: "error", "warning", "info", "debug", "none"
// Default log level is "error"
const {setLogLevel} = require("chia-agent");

setLogLevel("debug"); // show all available logs.
setLogLevel("info"); // show except for debug logs.
setLogLevel("warning"); // show warning and error logs.
setLogLevel("error"); // show only error logs.
setLogLevel("none"); // don't show any logs.
```
