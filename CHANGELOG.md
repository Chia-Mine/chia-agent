# Changelog

## [8.0.0]
### Breaking Change
- [`nft_mint_nft`](./src/api/rpc/wallet/README.md#nft_mint_nftagent-params)
  - Renamed `series_number` to `edition_number`.
  - Renamed `series_total` to `edition_total`.
### Added
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`get_current_derivation_index`](./src/api/rpc/wallet/README.md#get_current_derivation_indexagent)
  - [`extend_derivation_index`](./src/api/rpc/wallet/README.md#extend_derivation_indexagent-params)
### Changed
- [`send_transaction`](./src/api/rpc/wallet/README.md#send_transactionagent-params)
  - Added `min_coin_amount` to request parameter
- [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
  - Added `min_coin_amount` to request parameter
- [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
  - Added `min_coin_amount` to request parameter
- [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
  - Added `min_coin_amount` to request parameter
- [`nft_mint_nft`](./src/api/rpc/wallet/README.md#nft_mint_nftagent-params)
  - Renamed `series_number` to `edition_number`.
  - Renamed `series_total` to `edition_total`.
- [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params)
  - Added `min_coin_amount` to request parameter

## [7.0.0]
### Breaking Change
- [`create_new_wallet`](./src/api/rpc/wallet/README.md#create_new_walletagent-params)
  - Renamed `filename` to `backup_data`.
- [`did_get_recovery_list`](./src/api/rpc/wallet/README.md#did_get_recovery_listagent-params)
  - Renamed `recover_list` to `recovery_list`.
- [`did_recovery_spend`](./src/api/rpc/wallet/README.md#did_recovery_spendagent-params)
  - Renamed `attest_filenames` to `attest_data`.
  - Changed the type of `success` response property to `bool` from `SpendBundle`.
  - Added `spend_bundle` to response.
- [`did_create_attest`](./src/api/rpc/wallet/README.md#did_create_attestagent-params)
  - Removed `filename` from request.
  - Added `attest_data` to response.
- [`did_create_backup_file`](./src/api/rpc/wallet/README.md#did_create_backup_fileagent-params)
  - Removed `filename` from request.
  - Added `backup_data` to response.
### Added
- [New Farmer WebSocket API](./src/api/ws/farmer)
  - [`on_proof`](./src/api/ws/farmer/README.md#on_proof)
  - [`on_submitted_partial`](./src/api/ws/farmer/README.md#on_submitted_partial)
- [New Harvester WebSocket API](./src/api/ws/harvester)
  - [`on_farming_info`](./src/api/ws/harvester/README.md#on_farming_info)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`did_set_wallet_name`](./src/api/rpc/wallet/README.md#did_set_wallet_nameagent-params)
  - [`did_get_wallet_name`](./src/api/rpc/wallet/README.md#did_get_wallet_nameagent-params)
  - [`did_update_metadata`](./src/api/rpc/wallet/README.md#did_update_metadataagent-params)
  - [`did_get_metadata`](./src/api/rpc/wallet/README.md#did_get_metadataagent-params)
  - [`did_get_current_coin_info`](./src/api/rpc/wallet/README.md#did_get_current_coin_infoagent-params)
  - [`did_transfer_did`](./src/api/rpc/wallet/README.md#did_transfer_didagent-params)
  - [`nft_mint_nft`](./src/api/rpc/wallet/README.md#nft_mint_nftagent-params)
  - [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
  - [`nft_set_nft_did`](./src/api/rpc/wallet/README.md#nft_set_nft_didagent-params)
  - [`nft_get_by_did`](./src/api/rpc/wallet/README.md#nft_get_by_didagent-params)
  - [`nft_get_wallet_did`](./src/api/rpc/wallet/README.md#nft_get_wallet_didagent-params)
  - [`nft_get_wallets_with_dids`](./src/api/rpc/wallet/README.md#nft_get_wallets_with_didsagent)
  - [`nft_set_nft_status`](./src/api/rpc/wallet/README.md#nft_set_nft_statusagent-params)
  - [`nft_transfer_nft`](./src/api/rpc/wallet/README.md#nft_transfer_nftagent-params)
  - [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
  - [`nft_add_uri`](./src/api/rpc/wallet/README.md#nft_add_uriagent-params)
### Changed
- [`get_reward_targets`](./src/api/rpc/farmer/README.md#get_reward_targetsagent-params)
  - Added `max_ph_to_search` to request parameter
- [`check_delete_key`](./src/api/rpc/wallet/README.md#check_delete_keyagent-params)
  - Added `max_ph_to_search` to request parameter
- [`get_wallets`](./src/api/rpc/wallet/README.md#get_walletsagent-params)
  - Added `include_data` to request parameter
- [`create_new_wallet`](./src/api/rpc/wallet/README.md#create_new_walletagent-params)
  - Added `metadata` and `wallet_name` to request parameter for DID wallet
  - Changed parameter name from `filename` and `backup_data` for request parameter for DID wallet recovery
  - Added NFT Wallet type
- [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
  - Added `driver_dict` to request parameter
- [`get_offer_summary`](./src/api/rpc/wallet/README.md#get_offer_summaryagent-params)
  - Added `infos` to response parameter
- [`did_update_recovery_ids`](./src/api/rpc/wallet/README.md#did_update_recovery_idsagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
- [`did_get_did`](./src/api/rpc/wallet/README.md#did_get_didagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
- [`did_get_recovery_list`](./src/api/rpc/wallet/README.md#did_get_recovery_listagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
  - Renamed `recover_list` to `recovery_list`.
- [`did_recovery_spend`](./src/api/rpc/wallet/README.md#did_recovery_spendagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
  - Renamed `attest_filenames` to `attest_data`.
  - Changed response dict format
- [`did_get_pubkey`](./src/api/rpc/wallet/README.md#did_get_pubkeyagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
- [`did_create_attest`](./src/api/rpc/wallet/README.md#did_create_attestagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
  - Removed `filename` from request.
  - Added `attest_data` to response.
- [`did_get_information_needed_for_recovery`](./src/api/rpc/wallet/README.md#did_get_information_needed_for_recoveryagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
- [`did_create_backup_file`](./src/api/rpc/wallet/README.md#did_create_backup_fileagent-params)
  - Changed the type of `wallet_id` to `uint32` from `int`.
  - Removed `filename` from request.
  - Added `backup_data` to response.
- `TradeRecordConvenience` type at `chia/wallet/trade_record.py` was changed.  
  (Added `infos` property to `summary` dict)  
  As a result, the following APIs are affected:
  - `create_offer_for_ids` of Wallet RPC API
  - `take_offer` of Wallet RPC API
  - `get_offer` of Wallet RPC API
  - `get_all_offers` of Wallet RPC API
- Renamed `DISTRIBUTED_ID` to `DECENTRALIZED_ID` of `WalletType` in `src/api/chia/wallet/util/wallet_type.ts`.
- Added `NFT` to `WalletType` in `src/api/chia/wallet/util/wallet_type.ts`.
### Fixed
- Fixed an issue where README description for `did_get_pubkey` was wrong.
- Fixed an issue where the type of `pubkey` response property for `did_get_pubkey` was wrong.

## [6.0.0]
### Minor Breaking Change
- At chia-blockchain@1.3.5, a farmer websocket API `new_plots` was replaced by  
  `harvester_update` and `harvester_removed`.  
  This change is not critical because in application's point of view it may just miss new plot info but
  farming will continue without problem.
### Removed
- [Farmer WebSocket API](./src/api/ws/farmer)
  - `on_new_plots`
### Added
- [New Farmer WebSocket API](./src/api/ws/farmer)
  - [`harvester_updated`](./src/api/ws/farmer/README.md#on_harvester_update)
  - [`harvester_removed`](./src/api/ws/farmer/README.md#on_harvester_removed)
- [New Farmer RPC API](./src/api/rpc/farmer)
  - [`get_harvesters_summary`](./src/api/rpc/farmer/README.md#get_harvesters_summaryagent)
  - [`get_harvester_plots_valid`](./src/api/rpc/farmer/README.md#get_harvester_plots_validagent-params)
  - [`get_harvester_plots_invalid`](./src/api/rpc/farmer/README.md#get_harvester_plots_invalidagent-params)
  - [`get_harvester_plots_keys_missing`](./src/api/rpc/farmer/README.md#get_harvester_plots_keys_missingagent-params)
  - [`get_harvester_plots_duplicates`](./src/api/rpc/farmer/README.md#get_harvester_plots_duplicatesagent-params)
### Changed
- `Plot` type at `chia/harvester/harvester.py` was changed.  
  (Removed deprecated `plot-seed` and change the type of `time_modified` to `int` from `float`)  
  As a result, the following APIs are affected:
  - `get_plots` of Harvester RPC API
  - `on_get_plots` of Harvester WebSocket API
- [`get_pool_state`](./src/api/rpc/farmer/README.md#get_pool_stateagent)
  - `plot_count` property is added
### Fixed
- Fixed an issue where README description of `get_harvesters`(Farmer RPC API) did not reflect actual API format
- Added missing `get_pool_login_link` of Farmer RPC API to `./src/api/rpc/index.ts`

## [5.0.0]
### Breaking Change
- At chia-blockchain@1.3.4, in `chia/consensus/cost_calculator.py`,  
  `NPCResult.npc_list` was removed and `NPCResult.conds` was added.  
  As a result, the RPC APIs below might be incompatible between `1.3.3` and `1.3.4`.
  - `get_all_mempool_items` Of FullNode RPC API
  - `get_mempool_item_by_tx_id` Of FullNode RPC API
### Added
- [New FullNode RPC API](./src/api/rpc/full_node)
  - [`get_coin_records_by_hint`](./src/api/rpc/full_node/README.md#get_coin_records_by_hintagent-params)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`select_coins`](./src/api/rpc/wallet/README.md#select_coinsagent-params)
  - [`get_stray_cats`](./src/api/rpc/wallet/README.md#get_stray_catsagent)
### Changed
- [FullNode RPC API](./src/api/rpc/full_node)
  - Updated [`get_additions_and_removals`](./src/api/rpc/full_node/README.md#get_additions_and_removalsagent-params)
- [Wallet RPC API](./src/api/rpc/wallet)
  - Updated [`get_wallets`](./src/api/rpc/wallet/README.md#get_walletsagent-params)
  - Updated [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params)
- The following APIs changed because a new property was added to `TradeRecord` class at `chia/wallet/trade_record.py`  
  This is not a breaking change because just adding a property is backward compatible. 
  - [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
  - [`get_offer`](./src/api/rpc/wallet/README.md#get_offeragent-params)
  - [`get_all_offers`](./src/api/rpc/wallet/README.md#get_all_offersagent-params)
### Fixed
- Fixed issues where the following full_node RPC APIs were not exported from `api/rpc/index.ts`.
  - `get_coin_record_by_names`
  - `get_coin_records_by_parent_ids`
- Fixed issues where the following wallet RPC APIs were not exported from `api/rpc/index.ts`.
  - `delete_unconfirmed_transactions`
- Fixed an issue where README description of `get_blockchain_state` of FullNode RPC API was missing some properties.

## [4.0.0]
### Breaking Change
- At chia-blockchain@1.3.0, in `chia/consensus/cost_calculator.py`,  
  `NPCResult.clvm_cost` was renamed to `NPCResult.cost`.  
  As a result, the RPC APIs below might be incompatible between `1.2.11` and `1.3.0`.
  - `get_all_mempool_items` Of FullNode RPC API
  - `get_mempool_item_by_tx_id` Of FullNode RPC API
- In `chia/pools/pool_config.py`,
  `authentication_public_key` was removed from `PoolWalletConfig`.  
  As a result, the RPC APIs below might be incompatible between `1.2.11` and `1.3.0`.
  - `get_pool_state` of Farmer RPC API
- In `chia/types/coin_record.py`, `CoinRecord.spent` was removed and turned into a getter method.  
  As a result, the RPC APIs below might be incompatible between `1.2.11` and `1.3.0`.
  - `get_additions_and_removals` of FullNode RPC API
- Wallet RPC API `create_backup` was removed
- Wallet RPC API `get_discrepancies_for_offer` was removed
- Wallet RPC API `respond_to_offer` was removed
- Wallet RPC API `get_trade` was removed
- Wallet RPC API `get_all_trades` was removed
- Wallet RPC API `cancel_trade` was removed
- Wallet RPC API `cc_set_name` was renamed to `cat_set_name`
- Wallet RPC API `cc_get_name` was renamed to `cat_get_name`
- Wallet RPC API `cc_spend` was renamed to `cat_spend`
- Wallet RPC API `cc_get_colour` was renamed to `cat_get_asset_id`
- The request parameter of Wallet RPC API `create_offer_for_ids` was changed and incompatible with older API.
- The request parameter of Wallet RPC API `create_new_wallet` was changed and incompatible with older API.
### Removed
- Removed `create_backup` of Wallet RPC API
- Removed `get_discrepancies_for_offer` of Wallet RPC API
- Removed `respond_to_offer` of Wallet RPC API
- Removed `get_trade` of Wallet RPC API
- Removed `get_all_trades` of Wallet RPC API
- Removed `cancel_trade` of Wallet RPC API
- Removed `TradeRecordInJson` at `src/api/chia/wallet/util/trade_utils.ts`
### Added
- Added `metrics` service
- [Common RPC API](./src/api/rpc/common)
  - [`get_connections`](./src/api/rpc/common/README.md#get_connectionsagent-params)
  - [`open_connection`](./src/api/rpc/common/README.md#open_connectionagent-params)
  - [`close_connection`](./src/api/rpc/common/README.md#close_connectionagent-params)
  - [`stop_node`](./src/api/rpc/common/README.md#stop_nodeagent)
  - [`get_routes`](./src/api/rpc/common/README.md#get_routesagent)
- [Timelord WebSocket API](./src/api/ws/timelord/README.md#usage)
  - [`finished_pot`](./src/api/ws/timelord/README.md#on_finished_pot)
  - [`new_compact_proof`](./src/api/ws/timelord/README.md#on_new_compact_proof)
  - [`skipping_peak`](./src/api/ws/timelord/README.md#on_skipping_peak)
  - [`new_peak`](./src/api/ws/timelord/README.md#on_new_peak)
- [Crawler RPC API](./src/api/rpc/crawler)
  - [`get_peer_counts`](./src/api/rpc/crawler/README.md#get_peer_countsagent)
  - [`get_ips_after_timestamp`](./src/api/rpc/crawler/README.md#get_ips_after_timestampagent-params)
- [Crawler WebSocket API](./src/api/ws/crawler)
  - [`on_message_from_crawler`](./src/api/ws/crawler/README.md#on_message_from_crawler)
  - [`on_loaded_initial_peers`](./src/api/ws/crawler/README.md#on_loaded_initial_peers)
  - [`on_crawl_batch_completed`](./src/api/ws/crawler/README.md#on_crawl_batch_completed)
- [New farmer WebSocket API](./src/api/ws/farmer)
  - [`get_connections`](./src/api/ws/farmer/README.md#on_get_connections)
- [New FullNode RPC API](./src/api/rpc/full_node)
  - [`get_block_count_metrics`](./src/api/rpc/full_node/README.md#get_block_count_metricsagent)
- [New FullNode WebSocket API](./src/api/ws/full_node)
  - [`get_connections`](./src/api/ws/full_node/README.md#on_get_connections)
  - [`block`](./src/api/ws/full_node/README.md#on_block)
  - [`signage_point`](./src/api/ws/full_node/README.md#on_signage_point)
- [New harvester WebSocket API](./src/api/ws/harvester)
  - [`get_connections`](./src/api/ws/harvester/README.md#on_get_connections)
- [New wallet RPC API](./src/api/rpc/wallet)
  - [`get_logged_in_fingerprint`](./src/api/rpc/wallet/README.md#get_logged_in_fingerprintagent)
  - [`push_tx`](./src/api/rpc/wallet/README.md#push_txagent-params)
  - [`cat_asset_id_to_name`](./src/api/rpc/wallet/README.md#cat_asset_id_to_nameagent-params)
  - [`get_offer_summary`](./src/api/rpc/wallet/README.md#get_offer_summaryagent-params)
  - [`check_offer_validity`](./src/api/rpc/wallet/README.md#check_offer_validityagent-params)
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
  - [`get_offer`](./src/api/rpc/wallet/README.md#get_offeragent-params)
  - [`get_all_offers`](./src/api/rpc/wallet/README.md#get_all_offersagent-params)
  - [`get_offers_count`](./src/api/rpc/wallet/README.md#get_offers_countagent)
  - [`cancel_offer`](./src/api/rpc/wallet/README.md#cancel_offeragent-params)
  - [`get_cat_list`](./src/api/rpc/wallet/README.md#get_cat_listagent)
- [New wallet WebSocket API](./src/api/ws/wallet)
  - [`get_connections`](./src/api/ws/wallet/README.md#on_get_connections)
  - [`sync_changed`](./src/api/ws/wallet/README.md#on_sync_changed_of_wallet)
  - [`coin_added`](./src/api/ws/wallet/README.md#on_coin_added)
- [New daemon API](./src/api/ws/daemon)
  - [`get_version`](./src/api/ws/daemon/README.md#get_versiondaemon)
### Changed
- Renamed `NPCResult.clvm_cost` to `NPCResult.cost`
- Removed `authentication_public_key` from `PoolWalletConfig`
- Set actual value to `destination` property on websocket APIs. (i.e. `wallet_ui`, `metrics`)
- Updated [`get_blockchain_state`](./src/api/rpc/full_node/README.md#get_blockchain_stateagent) of FullNode RPC API
- Updated [`get_blocks`](./src/api/rpc/full_node/README.md#get_blocksagent-params) of FullNode RPC API
- Renamed `cc_set_name` of Wallet RPC API to [`cat_set_name`](./src/api/rpc/wallet/README.md#cat_set_nameagent-params)
- Renamed `cc_get_name` of Wallet RPC API to [`cat_get_name`](./src/api/rpc/wallet/README.md#cat_get_nameagent-params)
- Renamed `cc_spend` of Wallet RPC API to [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
- Renamed `cc_get_colour` of Wallet RPC API to [`cat_get_asset_id`](./src/api/rpc/wallet/README.md#cat_get_asset_idagent-params)
- Updated [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params) of Wallet RPC API
- Updated [`log_in`](./src/api/rpc/wallet/README.md#log_inagent-params) of Wallet RPC API
- Updated [`add_key`](./src/api/rpc/wallet/README.md#add_keyagent-params) of Wallet RPC API
- Updated [`create_new_wallet`](./src/api/rpc/wallet/README.md#create_new_walletagent-params) of Wallet RPC API
- Updated [`get_wallet_balance`](./src/api/rpc/wallet/README.md#get_wallet_balanceagent-params) of Wallet RPC API
- Updated [`get_transaction`](./src/api/rpc/wallet/README.md#get_transactionagent-params) of Wallet RPC API
- Updated [`get_transactions`](./src/api/rpc/wallet/README.md#get_transactionsagent-params) of Wallet RPC API
- Updated [`send_transaction`](./src/api/rpc/wallet/README.md#send_transactionagent-params) of Wallet RPC API
- Updated [`send_transaction_multi`](./src/api/rpc/wallet/README.md#send_transaction_multiagent-params) of Wallet RPC API
- Updated [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params) of Wallet RPC API
- Updated [`pw_join_pool`](./src/api/rpc/wallet/README.md#pw_join_poolagent-params) of Wallet RPC API
- Updated [`pw_self_pool`](./src/api/rpc/wallet/README.md#pw_self_poolagent-params) of Wallet RPC API
- Updated [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params) of Wallet RPC API
- Added `memos` to `TransactionRecord` in `src/api/chia/wallet/transaction_record.ts`.
- Renamed `COLOURED_COIN` to `CAT` of `WalletType` in `src/api/chia/wallet/util/wallet_type.ts`.
### Fixed
- Replaced `unknown` type with actual type for `on_state_changed_of_wallet` in wallet WebSocket API

## [3.0.1]
### Added
- Added `skip_hostname_verification` option for `RPCAgent`
### Fixed
- Fixed an issue where wallet WebSocket message from daemon was not captured.  
  Thank you! @joshpainter

## [3.0.0]
### Minor Breaking Change
- Service name of plotter was changed:  
  `chia plots create` => `chia_plotter`.  
  If you have a code which starts plotting via daemon websocket API, you might write like this:  
  ```typescript
  const {getDaemon} = require("chia-agent");
  const {start_plotting} = require("chia-agent/api/ws");
  const daemon = getDaemon(); // This is the websocket connection handler
  await daemon.connect(); // connect to local daemon using config file.
  const response = await start_plotting(daemon, {service: "chia plots create", ...});
  ```
  On and after chia-blockchain@1.2.11, you must rewrite the last line of the above code like this:  
  ```typescript
  const response = await start_plotting(daemon, {service: "chia_plotter", ...});
  ```
  Please note you need to also update other code lines which refers to old service name(`chia plots create`).
### Changed
- Updated [`start_plotting`](./src/api/ws/daemon/README.md#start_plottingdaemon-params) of Daemon Websocket API
- Updated [`create_new_wallet`](./src/api/rpc/wallet/README.md#create_new_walletagent-params) of Wallet RPC API
- Updated [`get_trade`](./src/api/rpc/wallet/README.md#get_tradeagent-params) of Wallet RPC API
- Updated [`pw_join_pool`](./src/api/rpc/wallet/README.md#pw_join_poolagent-params) of Wallet RPC API
- Updated [`pw_self_pool`](./src/api/rpc/wallet/README.md#pw_self_poolagent-params) of Wallet RPC API
- Updated [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params) of Wallet RPC API
- Updated [`pw_status`](./src/api/rpc/wallet/README.md#pw_statusagent-params) of Wallet RPC API
### Added
- [New daemon api](./src/api/ws/daemon)
  - [`get_plotters`](./src/api/ws/daemon/README.md#get_plottersdaemon)

## [2.0.6]
### Changed
- Updated [`keyring_status`](./src/api/ws/daemon/README.md#keyring_statusdaemon) of Daemon Websocket API
- Updated [`migrate_keyring`](./src/api/ws/daemon/README.md#migrate_keyringdaemon-params)
- Updated [`set_keyring_passphrase`](./src/api/ws/daemon/README.md#set_keyring_passphrasedaemon-params)

## [2.0.5]
### Changed
- Updated [`keyring_status`](./src/api/ws/daemon/README.md#keyring_statusdaemon) of Daemon Websocket API
- Updated [`start_plotting`](./src/api/ws/daemon/README.md#start_plottingdaemon-params) of Daemon Websocket API
### Fixed
- Added missing properties for
  - [`ping`](./src/api/ws/daemon/README.md#pingdaemon)
  - [`start_service`](./src/api/ws/daemon/README.md#start_servicedaemon-params)
  - [`start_plotting`](./src/api/ws/daemon/README.md#start_plottingdaemon-params)
  - [`stop_plotting`](./src/api/ws/daemon/README.md#stop_plottingdaemon-params)
  - [`stop_service`](./src/api/ws/daemon/README.md#stop_servicedaemon-params)
  - [`is_running`](./src/api/ws/daemon/README.md#is_runningdaemon-params)
  - [`exit`](./src/api/ws/daemon/README.md#exitdaemon)
  - [`get_status`](./src/api/ws/daemon/README.md#get_statusdaemon)
  - [`stop_service`](./src/api/ws/daemon/README.md#stop_servicedaemon-params)
### Added
- [New daemon api](./src/api/ws/daemon)
  - [`validate_keyring_passphrase`](./src/api/ws/daemon/README.md#validate_keyring_passphrasedaemon-params)
  - [`migrate_keyring`](./src/api/ws/daemon/README.md#migrate_keyringdaemon-params)
  - [`notify_keyring_migration_completed`](./src/api/ws/daemon/README.md#notify_keyring_migration_completeddaemon-params)
  - [`keyring_status_changed`](./src/api/ws/daemon/README.md#on_keyring_status_changed)
### Deprecated
- `did_spend`  
  Note: `chia-blockchain` no longer responds to `/did_spend` wallet API endpoint on and after 1.2.8.  
  For now, I don't remove `/did_spend` from `chia-agent` but only remove from API document.

## [2.0.4]
This release corresponds to chia-blockchain@1.2.6, which introduced no external API changes.

## [2.0.3]
This release corresponds to chia-blockchain@1.2.5 which only updates install script.  
There are no API changes at all.

## [2.0.2]
### Changed
- Update documents
- Updated [`get_public_keys`](./src/api/rpc/wallet/README.md#get_public_keysagent) of Wallet RPC API
- Updated [`add_key`](./src/api/rpc/wallet/README.md#add_keyagent-params) of Wallet RPC API
- Updated [`delete_all_keys`](./src/api/rpc/wallet/README.md#delete_all_keysagent) of Wallet RPC API
- Updated [`get_initial_freeze_period`](./src/api/rpc/wallet/README.md#get_initial_freeze_period_of_walletagent) of Wallet RPC API
### Added
- [New daemon api](./src/api/ws/daemon)
  - [`add_private_key`](./src/api/ws/daemon/README.md#add_private_keydaemon-params)
  - [`check_keys`](./src/api/ws/daemon/README.md#check_keysdaemon-params)
  - [`delete_all_keys`](./src/api/ws/daemon/README.md#delete_all_keysdaemon-params)
  - [`delete_key_by_fingerprint`](./src/api/ws/daemon/README.md#delete_key_by_fingerprintdaemon-params)
  - [`get_all_private_keys`](./src/api/ws/daemon/README.md#get_all_private_keysdaemon-params)
  - [`get_first_private_key`](./src/api/ws/daemon/README.md#get_first_private_keydaemon-params)
  - [`get_key_for_fingerprint`](./src/api/ws/daemon/README.md#get_key_for_fingerprintdaemon-params)
  - [`is_keyring_locked`](./src/api/ws/daemon/README.md#is_keyring_lockeddaemon)
  - [`keyring_status`](./src/api/ws/daemon/README.md#keyring_statusdaemon)
  - [`remove_keyring_passphrase`](./src/api/ws/daemon/README.md#remove_keyring_passphrasedaemon-params)
  - [`set_keyring_passphrase`](./src/api/ws/daemon/README.md#set_keyring_passphrasedaemon-params)
  - [`unlock_keyring`](./src/api/ws/daemon/README.md#unlock_keyringdaemon-params)
- [New full_node api](./src/api/rpc/full_node)
  - [`get_coin_records_by_name`](./src/api/rpc/full_node/README.md#get_coin_records_by_namesagent-params)

## [2.0.1]
### Added
- [`on_new_plots`](./src/api/ws/farmer/README.md#on_new_plots)

## [2.0.0]
I incremented major version. See "Changed" section for detail.

### Changed
- Rename `CoinSolution` to `CoinSpend` and updated affected API response format.
  - **Note: this introduces breaking changes to some API response format.**  
    For additional information, please see https://github.com/Chia-Network/chia-blockchain/commit/6cf29102f95b410a8c6dc416e612c998bac567fa#comments

### Added
- Added [`get_coin_records_by_parent_ids`](./rpc/full_node/README.md#get_coin_records_by_parent_idsagent-params)

## [1.1.0] - 2021-07-08
### Changed
- Update G1Element/G2Element type to `string` (Serialized hex string representation)
- Updated [`get_private_key`](./src/api/rpc/wallet/README.md#get_private_keyagent-params)

### Added
- [New pool protocol/api](./src/api/rpc/pool)
  - [`pool_info`](./src/api/rpc/pool/README.md#pool_infoagent)
  - [`get_farmer`](./src/api/rpc/pool/README.md#get_farmeragent-params)
  - [`post_farmer`](./src/api/rpc/pool/README.md#post_farmeragent-params)
  - [`put_farmer`](./src/api/rpc/pool/README.md#put_farmeragent-params)
  - [`partial`](./src/api/rpc/pool/README.md#partialagent-params)
  - [`login`](./src/api/rpc/pool/README.md#loginagent-params)
- [New farmer api](./src/api/rpc/farmer)
  - [`get_pool_state`](./src/api/rpc/farmer/README.md#get_pool_stateagent)
  - [`set_payout_instructions`](./src/api/rpc/farmer/README.md#set_payout_instructionsagent-params)
  - [`get_harvesters`](./src/api/rpc/farmer/README.md#get_harvestersagent)
- [New full_node api](./src/api/rpc/full_node)
  - [`get_recent_signage_point_or_eos`](./src/api/rpc/full_node/README.md#get_recent_signage_point_or_eosagent-params)
  - [`get_puzzle_and_solution`](./src/api/rpc/full_node/README.md#get_puzzle_and_solutionagent-params)
- [New wallet api](./src/api/rpc/wallet)
  - [`delete_unconfirmed_transactions`](./src/api/rpc/wallet/README.md#delete_unconfirmed_transactionsagent-params)
  - [`check_delete_key`](./src/api/rpc/wallet/README.md#check_delete_keyagent-params).
  - [`send_transaction_multi`](./src/api/rpc/wallet/README.md#send_transaction_multiagent-params)
  - [`pw_join_pool`](./src/api/rpc/wallet/README.md#pw_join_poolagent-params)
  - [`pw_self_pool`](./src/api/rpc/wallet/README.md#pw_self_poolagent-params)
  - [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params)
  - [`pw_status`](./src/api/rpc/wallet/README.md#pw_statusagent-params)
- Added type [TCreate_New_Pool_WalletRequest](./src/api/rpc/wallet/README.md#create_new_walletagent-params)
- Added type [TCreate_New_Pool_WalletResponse](./src/api/rpc/wallet/README.md#create_new_walletagent-params)
- Added type [PoolWalletInfo](./src/api/chia/wallet/wallet_info.ts)
- Added [BUILD.md](./BUILD.md)

### Fixed
- Fixed RPC API document links
- Fixed the type of `SerializedProgram` to `str`
- Fixed an issue where submodule could not be loaded. e.g. `const {...} = require("chia-agent/api/rpc");`
- Correct type name `TCreate_New_RC_WalletRequest/Response` to `TCreate_New_RL_WalletRequest/Response`
- Fixed wrong `create_new_wallet` request format
- Fixed an issue where array data in YAML file was not parsed as expected.
- Fixed `login` response json of Wallet RPC API
- Fixed `get_private_key` response json of Wallet RPC API
- Fixed `create_offer_for_ids` response json of Wallet RPC API
- Fixed `get_discrepancies_for_offer` response json of Wallet RPC API
- Fixed `did_get_pubkey` response json of Wallet RPC API
- Fixed `did_recovery_spend` response json of Wallet RPC API



## [1.0.1] - 2021-05-19
### Fixed
- Only fixed typo in README.md

## [1.0.0] - 2021-05-19
### Added
- Added new RPC client
- Added new RPC API
- Added new Websocket API
- Added API type definitions
- Added code samples

## [0.0.5] - 2021-05-13
### Changed
- Reorganized internal log level and locations.
- `daemon.connect()` resolves to boolean value indicating whether connecting is success or failure.
- Trying to re-connect to an url which is already active does not output warning anymore.

### Added
- Added types

### Fixed
- Fixed an issue where it could fail to catch response from chia daemon.

## [0.0.4] - 2021-05-13
### Fixed
- Fixed an issue where some requests were not responded by chia daemon.

## [0.0.3] - 2021-05-13
### Changed
- Changed argument order for `daemon.sendMessage` for previous one was not intuitive.

```js
// Old
daemon.sendMessage(get_block_record_by_height_command, destination, data);
// Now
daemon.sendMessage(destination, get_block_record_by_height_command, data);
```

## [0.0.2] - 2021-05-13
### Fixed
- Fixed an issue where it cannot be executed via `npx` command.

## [0.0.1] - 2021-05-13
Initial release.

<!-- [Unreleased]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.1...v0.0.2 -->
[8.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v7.0.0...v8.0.0
[7.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v6.0.0...v7.0.0
[6.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v5.0.0...v6.0.0
[5.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v4.0.0...v5.0.0
[4.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v3.0.1...v4.0.0
[3.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v3.0.0...v3.0.1
[3.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.6...v3.0.0
[2.0.6]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.5...v2.0.6
[2.0.5]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.4...v2.0.5
[2.0.4]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.3...v2.0.4
[2.0.3]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.2...v2.0.3
[2.0.2]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.1...v2.0.2
[2.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v1.1.0...v2.0.0
[1.1.0]: https://github.com/Chia-Mine/chia-agent/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.5...v1.0.0
[0.0.5]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Chia-Mine/chia-agent/releases/tag/v0.0.1
