# Changelog

## [11.1.1]
Just updated documents.
You don't need to update `chia-agent` from `11.1.0` for `chia-blockchain@1.8.1` because there are no API changes.

## [11.1.0]
### Changed
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`get_wallet_balance`](./src/api/rpc/wallet/README.md#get_wallet_balanceagent-params)
    - Part of response properties are replaced by `Balance` type.  
    (* No new properties were added and no properties were removed to the response. Just part of props were managed separately)
  - [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
    - Added `extra_delta`, `tail_reveal` and `tail_solution` to request parameter.
  - In `chia/wallet/nft_wallet/nft_info.py`, `nft_coin_confirmation_height` was added to `NFTInfo`.  
    As a result of this change, the responses from following RPC API is affected.
    - ['nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
- Updated `yaml` to `2.2.2`
### Added
- [New DataLayer RPC API](./src/api/ws/wallet)
  - [`check_plugins`](./src/api/rpc/data_layer/README.md#check_pluginsagent)
### Fixed
- Added missing `get_sync_status` to `README.md` for RPC APIs
- Added missing property `launcher_id` to `dl_history` in DataLayer RPC API

## [11.0.0]
### Breaking change
JSONified `MempoolItem` replaced original `MempoolItem` in `chia/types/mempool_items.py`
for 2 RPC API responses listed below.  
As a result of this change, `removals` was added and `height_added_to_mempool`/`assert_height` were removed
from those RPC API responses.
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_all_mempool_items`](./src/api/rpc/full_node/README.md#get_all_mempool_itemsagent)
  - [`get_mempool_item_by_tx_id`](./src/api/rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)
### Changed
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_blockchain_state`](./src/api/rpc/full_node/README.md#get_blockchain_stateagent)
    - The type of `mempool_fees` was changed to `int` from `Mojos`(`uint64`)
  - [`get_fee_estimate`](./src/api/rpc/full_node/README.md#get_fee_estimateagent-params)
    - The type of `mempool_fees` was changed to `int` from `Mojos`(`uint64`)
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`send_transaction`](./src/api/rpc/wallet/README.md#send_transactionagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`sign_message_by_address`](./src/api/rpc/wallet/README.md#sign_message_by_addressagent-params)
    - Added `is_hex` to request parameter
  - [`sign_message_by_id`](./src/api/rpc/wallet/README.md#sign_message_by_idagent-params)
    - Added `is_hex` to request parameter
  - [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
    - Added `reuse_puzhash` to request parameter
  - [`did_update_recovery_ids`](./src/api/rpc/wallet/README.md#did_update_recovery_idsagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`did_get_info`](./src/api/rpc/wallet/README.md#did_get_infoagent-params)
    - Added `solution` to response
  - [`did_update_metadata`](./src/api/rpc/wallet/README.md#did_update_metadataagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`did_transfer_did`](./src/api/rpc/wallet/README.md#did_transfer_didagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_mint_nft`](./src/api/rpc/wallet/README.md#nft_mint_nftagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_set_nft_did`](./src/api/rpc/wallet/README.md#nft_set_nft_didagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_set_did_bulk`](./src/api/rpc/wallet/README.md#nft_set_did_bulkagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_transfer_bulk`](./src/api/rpc/wallet/README.md#nft_transfer_bulkagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_transfer_nft`](./src/api/rpc/wallet/README.md#nft_transfer_nftagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_add_uri`](./src/api/rpc/wallet/README.md#nft_add_uriagent-params)
    - Added `reuse_puzhash` to request parameter
  - [`nft_mint_bulk`](./src/api/rpc/wallet/README.md#nft_mint_bulkagent-params)
    - Added `reuse_puzhash` to request parameter
- [Wallet WebSocket API](./src/api/ws/wallet)
  - [`on_state_changed_of_wallet`](./src/api/ws/wallet/README.md#on_state_changed_of_wallet)
    - Added `wallet_removed` to state list
    - Added `error` and `status` property to `tx_update` state changed event

In `chia/wallet/nft_wallet/nft_info.py`, `nft_id` was added to `NftInfo`.  
As a result of this change, the responses from following RPC APIs are affected.
- [Wallet RPC API](./src/api/rpc/full_node)
  - [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
  - [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
### Added
- [New FullNode(Simulator) RPC API](./src/api/rpc/full_node)  
  Big thanks to [Dishwasha](https://github.com/Dishwasha) for a PR for new Simulator API!
  - [`get_all_blocks`](./src/api/rpc/full_node/README.md#get_all_blocksagent-params)
  - [`farm_block`](./src/api/rpc/full_node/README.md#farm_blockagent-params)
  - [`set_auto_farming`](./src/api/rpc/full_node/README.md#set_auto_farmingagent-params)
  - [`get_auto_farming`](./src/api/rpc/full_node/README.md#get_auto_farmingagent-params)
  - [`get_farming_ph`](./src/api/rpc/full_node/README.md#get_farming_phagent-params)
  - [`get_all_coins`](./src/api/rpc/full_node/README.md#get_all_coinsagent-params)
  - [`get_all_puzzle_hashes`](./src/api/rpc/full_node/README.md#get_all_puzzle_hashesagent-params)
  - [`revert_blocks`](./src/api/rpc/full_node/README.md#revert_blocksagent-params)
  - [`reorg_blocks`](./src/api/rpc/full_node/README.md#reorg_blocksagent-params)
- [New Farmer WebSocket API](./src/api/ws/farmer)
  - [`on_add_connection`](./src/api/ws/farmer/README.md#on_add_connection)
  - [`on_close_connection`](./src/api/ws/farmer/README.md#on_close_connection)
- [New Harvester WebSocket API](./src/api/ws/harvester)
  - [`on_add_connection`](./src/api/ws/harvester/README.md#on_add_connection)
  - [`on_close_connection`](./src/api/ws/harvester/README.md#on_close_connection)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`set_wallet_resync_on_startup`](./src/api/rpc/wallet/README.md#set_wallet_resync_on_startupagent-params)
  - [`get_transaction_memo`](./src/api/rpc/wallet/README.md#get_transaction_memoagent-params)
  - [`nft_count_nfts`](./src/api/rpc/wallet/README.md#nft_count_nftsagent-params)
- [New Wallet WebSocket API](./src/api/ws/wallet)
  - [`on_add_connection`](./src/api/ws/wallet/README.md#on_add_connection)
  - [`on_close_connection`](./src/api/ws/wallet/README.md#on_close_connection)
### Fixed
- [Farmer WebSocket API](./src/api/ws/farmer)
  - [`on_submitted_partial`](./src/api/ws/farmer/README.md#on_submitted_partial)
    - Fixed an issue where `on_submitted_partial` was not working 
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`verify_signature`](./src/api/rpc/wallet/README.md#verify_signatureagent-params)
    - Fixed an issue where `verify_signature` was not exposed via `require("chia-agent/api/rpc")`
- [Wallet WebSocket API](./src/api/ws/wallet)
  - [`on_sync_changed`](./src/api/ws/wallet/README.md#on_sync_changed)
    - Fixed an issue where `on_sync_changed` was defined as `on_sync_changed_of_wallet`
  - [`on_coin_added`](./src/api/ws/wallet/README.md#on_coin_added)
    - Fixed a typo. (WsCoindAddedMessage -> WsCoinAddedMessage)
    - Fixed an issue where `on_coin_added` was defined as `on_coin_added_of_wallet`

## [10.1.0]
### Indirect Change
In `chia/types/mempool_items.py`, `assert_height` was added to `MempoolItem`.  
As a result of this change, the responses from following RPC APIs are affected.  
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_all_mempool_items`](./src/api/rpc/full_node/README.md#get_all_mempool_itemsagent)
  - [`get_mempool_item_by_tx_id`](./src/api/rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)
### Added
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`get_timestamp_for_height`](./src/api/rpc/wallet/README.md#get_timestamp_for_heightagent)
  - [`nft_transfer_bulk`](./src/api/rpc/wallet/README.md#nft_transfer_bulkagent-params)
### Changed
- [Common RPC API](./src/api/rpc/common)
  - [`open_connection`](./src/api/rpc/common/README.md#open_connectionagent-params)
    - Added `success` to response
    - Added `error` to response when `success` is `False`
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_blockchain_state`](./src/api/rpc/full_node/README.md#get_blockchain_stateagent)
    - Added `mempool_fees` to response
  - [`get_fee_estimate`](./src/api/rpc/full_node/README.md#get_fee_estimateagent-params)
    - Added `spend_type` to request parameter
    - Added `spend_count` to request parameter
    - Added `mempool_fees` to response
    - Added `num_spends` to response
    - Added `last_block_cost` to response
    - Added `fees_last_block` to response
    - Added `fee_rate_last_block` to response
    - Added `last_tx_block_height` to response
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`get_notifications`](./src/api/rpc/wallet/README.md#get_notificationsagent-params)
    - Added `height` to response
  - [`verify_signature`](./src/api/rpc/wallet/README.md#verify_signatureagent-params)
    - Added `signing_mode` to request parameter
  - [`sign_message_by_address`](./src/api/rpc/wallet/README.md#sign_message_by_addressagent-params)
    - Added `signing_mode` to response
  - [`sign_message_by_id`](./src/api/rpc/wallet/README.md#sign_message_by_idagent-params)
    - Added `None` type to `latest_coin_id` in response
    - Added `signing_mode` to response
  - [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
    - Added `coins` to response
  - [`get_offer_summary`](./src/api/rpc/wallet/README.md#get_offer_summaryagent-params)
    - Added `id` to response
  - [`check_offer_validity`](./src/api/rpc/wallet/README.md#check_offer_validityagent-params)
    - Added `id` to response
  - [`did_message_spend`](./src/api/rpc/wallet/README.md#did_message_spendagent-params)
    - Removed error response
  - [`nft_set_did_bulk`](./src/api/rpc/wallet/README.md#nft_set_did_bulkagent-params)
    - Added `tx_num to response
  - [`nft_get_wallet_did`](./src/api/rpc/wallet/README.md#nft_get_wallet_didagent-params)
    - Removed error response
  - [`nft_set_nft_status`](./src/api/rpc/wallet/README.md#nft_set_nft_statusagent-params)
    - Removed error response
### Fixed
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_blockchain_state`](./src/api/rpc/full_node/README.md#get_blockchain_stateagent)
    - Changed the type of `mempool_size` in response from `int` to `CLVMCost`(actually `uint64`)
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`nft_set_did_bulk`](./src/api/rpc/wallet/README.md#nft_set_did_bulkagent-params)
    - Fixed missing export and entry in [README](./src/api/README.md)
  - [`verify_signature`](./src/api/rpc/wallet/README.md#verify_signatureagent-params)
    - Added missing `message` to request parameter

## [10.0.0]
### Breaking change
In `chia/types/mempool_items.py`, `removals` of `MempoolItem` is now flagged as `@property`.
As a result of this, `removals` of `MempoolItem` is removed from 2 RPC API responses listed below.
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_all_mempool_items`](./src/api/rpc/full_node/README.md#get_all_mempool_itemsagent)
  - [`get_mempool_item_by_tx_id`](./src/api/rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)
### Minor breaking change
- Response params of`keyring_status` daemon WebSocket API below are deprecated
  - `needs_migration`
  - `can_remove_legacy_keys`
### Removed
- [Daemon WebSocket API](./src/api/ws/daemon)  
  (Code will remain awhile on chia-agent for backward compatibility. Only document is removed for now.)
  - Removed `migrate_keyring`
  - Removed `notify_keyring_migration_completed`
### Added
- [New DataLayer RPC API](./src/api/rpc/data_layer)
  - [`get_sync_status`](./src/api/rpc/data_layer/README.md#get_sync_statusagent-params)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`get_spendable_coins`](./src/api/rpc/wallet/README.md#get_spendable_coinsagent-params)
  - [`get_coin_records_by_names`](./src/api/rpc/wallet/README.md#get_coin_records_by_namesagent-params)
  - [`verify_signature`](./src/api/rpc/wallet/README.md#verify_signatureagent-params)
  - [`did_message_spend`](./src/api/rpc/wallet/README.md#did_message_spendagent-params)
  - [`did_get_info`](./src/api/rpc/wallet/README.md#did_get_infoagent-params)
  - [`did_find_lost_did`](./src/api/rpc/wallet/README.md#did_find_lost_didagent-params)
  - [`nft_set_did_bulk`](./src/api/rpc/wallet/README.md#nft_set_did_bulkagent-params)
### Changed
- [Daemon WebSocket API](./src/api/ws/daemon)
  - [`keyring_status`](./src/api/ws/daemon/README.md#keyring_statusdaemon)
    - Removed `needs_migration` from response
    - Removed `can_remove_legacy_keys` from response
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_mempool_item_by_tx_id`](./src/api/rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)
    - Added `include_pending` to request parameter
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`send_transaction`](./src/api/rpc/wallet/README.md#send_transactionagent-params)
    - Added `max_coin_amount` to request parameter
    - Added `exclude_coin_amounts` to request parameter
    - Added `exclude_coin_ids` to request parameter
  - [`send_transaction_multi`](./src/api/rpc/wallet/README.md#send_transaction_multiagent-params)
    - Added `max_coin_amount` to request parameter
    - Added `exclude_coin_amounts` to request parameter
    - Added parameters for cat spends.
  - [`select_coins`](./src/api/rpc/wallet/README.md#select_coinsagent-params)
    - Added `max_coin_amount` to request parameter
    - Added `exclude_coin_amounts` to request parameter
  - [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
    - Added `additions` to request parameter
    - Added `max_coin_amount` to request parameter
    - Added `exclude_coin_amounts` to request parameter
    - Added `exclude_coin_ids` to request parameter
  - [`sign_message_by_id`](./src/api/rpc/wallet/README.md#sign_message_by_idagent-params)
    - Added `latest_coin_id` to request parameter
  - [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idssagent-params)
    - Added `max_coin_amount` to request parameter
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
    - Added `max_coin_amount` to request parameter
  - [`nft_mint_nft`](./src/api/rpc/wallet/README.md#nft_mint_nftagent-params)
    - Added `nft_id` to return parameter
  - [`nft_mint_bulk`](./src/api/rpc/wallet/README.md#nft_mint_bulkagent-params)
    - Added `nft_id_list` to return parameter
  - [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params)
    - Added `max_coin_amount` to return parameter
    - Added `exclude_coin_amounts` to return parameter
- [Wallet WebSocket API](./src/api/ws/wallet)
  - [`state_changed`](./src/api/ws/wallet/README.md#onstatechangedofwallet)
    - Added `new_on_chain_notification` state.
- `TBladeBitParams` has been renamed to `TBladeBitRamParams`
  - `plot_type: "ramplot"` has been added
- `TBladeBit2Params` has been renamed to `TBladeBitDiskParams`
  - `plot_type: "diskplot"` has been added
  - `plotter` type has been converted to `"bladebit"` from `"bladebit2"`
- Eased type requirement of `daemon.sendMessage()` and `agent.sendMessage()`  
  You can request **RPC** API on Daemon WebSocket channel like this:
```typescript
const {getDaemon} = require("chia-agent");
const {get_harvesters_summary} = require("chia-agent/api/rpc/farmer");
const daemon = getDaemon();
await daemon.connect();
res = await get_harvesters_summary(daemon);
// or specify service name and API command
res = await daemon.sendMessage("chia_farmer", "get_harvesters_summary");
/*
{
  ack: true,
  command: 'get_harvesters_summary',
  data: { harvesters: [ [Object] ], success: true },
  destination: 'chia_agent',
  origin: 'chia_farmer',
  request_id: '4e31c04df234538901d9270932d04301b5b3a1a895d762144400852b8167973f'
}
 */
```
  Please note that when you use RPC API, you can directly request to the RPC endpoint of the service(full_node/farmer/...).
  However, when you request RPC API on Daemon WebSocket channel, you get a response from the service
  which the daemon is connecting to.
  In other word, you can choose the exact ip:port of a service if you use RPC API,
  while it is the daemon which chooses the services it connects to if you use Daemon WebSocket channel.
### Fixed
- [FullNode RPC API](./src/api/rpc/full_node)
  - [`get_blockchain_state`](./src/api/rpc/full_node/README.md#get_blockchain_stateagent)
    - Made `sync_tip_height` as `uint32`(previously `Optional<uint32>`) because `None` value would never be set
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`send_transaction_multi`](./src/api/rpc/wallet/README.md#send_transaction_multiagent-params)
    - Added missing `min_coin_amount` to request parameter
    - Added missing `exclude_coins` to request parameter
  - [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
    - Added missing `solver` to request parameter
  - [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params)
    - Added missing `wallet_id` to return parameter in README
    - Added missing `exclude_coins` to return parameter in README

## [9.2.0]
### Minor breaking change
- `add_private_key` daemon WebSocket API now deprecated `passphrase` request param  
  and added `label` param.
- `program` property was removed from `MempoolItem` class.  
  See [MempoolItem](./src/api/chia/types/mempool_item.ts) for more detail.  
  This impacts on API response below:
  - [`get_all_mempool_items`](./src/api/rpc/full_node/README.md#get_all_mempool_itemsagent)
    of FullNode RPC API
  - [`get_mempool_item_by_tx_id`](./src/api/rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)
    of FullNode RPC API
### Removed
- [Wallet RPC API](./src/api/rpc/wallet)  
  (Code will remain awhile on chia-agent for backward compatibility. Only document is removed for now.)
  - Removed `rl_set_user_info`
  - Removed `send_clawback_transaction`
  - Removed `add_rate_limited_funds`
  - Removed RL Wallet type from `create_new_wallet` API
- Removed `RATE_LIMITED` from [`WalletType`](./src/api/chia/wallet/util/wallet_types.ts)
### Added 
- [New Daemon WebSocket API](./src/api/ws/daemon)
  - [`get_key`](./src/api/ws/daemon/README.md#get_keydaemon-params)
  - [`get_keys`](./src/api/ws/daemon/README.md#get_keysdaemon-params)
  - [`set_label`](./src/api/ws/daemon/README.md#set_labeldaemon-params)
  - [`delete_label`](./src/api/ws/daemon/README.md#delete_labeldaemon-params)
  - [`running_services`](./src/api/ws/daemon/README.md#running_servicesdaemon)
  - Added support for Bladebit2 plotting option
- [New FullNode RPC API](./src/api/rpc/full_node)
  - [`get_fee_estimate`](./src/api/rpc/full_node/README.md#get_fee_estimateagent-params)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`push_transactions`](./src/api/rpc/wallet/README.md#push_transactionsagent-params)
  - [`get_notifications`](./src/api/rpc/wallet/README.md#get_notificationsagent-params)
  - [`delete_notifications`](./src/api/rpc/wallet/README.md#delete_notificationsagent-params)
  - [`send_notification`](./src/api/rpc/wallet/README.md#send_notificationagent-params)
  - [`sign_message_by_address`](./src/api/rpc/wallet/README.md#sign_message_by_addressagent-params)
  - [`sign_message_by_id`](./src/api/rpc/wallet/README.md#sign_message_by_idagent-params)
  - [`nft_calculate_royalties`](./src/api/rpc/wallet/README.md#nft_calculate_royaltiesagent-params)
  - [`nft_mint_bulk`](./src/api/rpc/wallet/README.md#nft_mint_bulkagent-params)
### Changed
- [Daemon WebSocket API](./src/api/ws/daemon)
  - [`add_private_key`](./src/api/ws/daemon/README.md#add_private_keydaemon-params)
    - Removed `passphrase` request parameter
    - Added `label` request parameter
- [DataLayer RPC API](./src/api/rpc/data_layer)
  - [`get_value`](./src/api/rpc/data_layer/README.md#get_valueagent-params)
    - Added `root_hash` request parameter
- [FullNode RPC API](./src/api/rpc/full_node)
  - `program` property was removed from `MempoolItem` class.  
    See [MempoolItem](./src/api/chia/types/mempool_item.ts) for more detail.
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
    - Made `wallet_id` optional request parameter
    - Added `start_index`, `num`, `ignore_size_limit` request parameters
  - [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
    - Added `ignore_size_limit` request parameters
  - [`nft_add_uri`](./src/api/rpc/wallet/README.md#nft_add_uriagent-params)
    - Removed error response
  - [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params)
    - Added `signed_txs` to response
- [Common RPC API](./src/api/rpc/common)
  - [`healthz`](./src/api/rpc/common/README.md#healthzagent)
    - Changed `success` type to `True` from `"true"`
- `p2_address`, `minter_did`, `off_chain_metadata` were added to `NFTInfo` class.  
  This impacts on API response below:
  - [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
  - [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
### Fixed
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`nft_set_nft_did`](./src/api/rpc/wallet/README.md#nft_set_nft_didagent-params)
    - Fixed an issue where `did_id` request param was described to be required
- [Common RPC API](./src/api/rpc/common)
  - [`get_routes`](./src/api/rpc/common/README.md#get_routesagent)
    - Added missing `success` response parameter.

## [9.1.0]
### Added
- Added Common RPC API Error format description and type
- [New DataLayer RPC API](./src/api/rpc/data_layer)
  - [`create_data_store`](./src/api/rpc/data_layer/README.md#create_data_storeagent-params)
  - [`get_owned_stores`](./src/api/rpc/data_layer/README.md#get_owned_storesagent)
  - [`batch_update`](./src/api/rpc/data_layer/README.md#batch_updateagent-params)
  - [`get_value`](./src/api/rpc/data_layer/README.md#get_valueagent-params)
  - [`get_keys`](./src/api/rpc/data_layer/README.md#get_keysagent-params)
  - [`get_keys_values`](./src/api/rpc/data_layer/README.md#get_keys_valuesagent-params)
  - [`get_ancestors`](./src/api/rpc/data_layer/README.md#get_ancestorsagent-params)
  - [`get_root`](./src/api/rpc/data_layer/README.md#get_rootagent-params)
  - [`get_local_root`](./src/api/rpc/data_layer/README.md#get_local_rootagent-params)
  - [`get_roots`](./src/api/rpc/data_layer/README.md#get_rootsagent-params)
  - [`delete_key`](./src/api/rpc/data_layer/README.md#delete_keyagent-params)
  - [`insert`](./src/api/rpc/data_layer/README.md#insertagent-params)
  - [`subscribe`](./src/api/rpc/data_layer/README.md#subscribeagent-params)
  - [`unsubscribe`](./src/api/rpc/data_layer/README.md#unsubscribeagent-params)
  - [`add_mirror`](./src/api/rpc/data_layer/README.md#add_mirroragent-params)
  - [`delete_mirror`](./src/api/rpc/data_layer/README.md#delete_mirroragent-params)
  - [`get_mirrors`](./src/api/rpc/data_layer/README.md#get_mirrorsagent-params)
  - [`remove_subscriptions`](./src/api/rpc/data_layer/README.md#remove_subscriptionsagent-params)
  - [`subscriptions`](./src/api/rpc/data_layer/README.md#subscriptionsagent)
  - [`get_kv_diff`](./src/api/rpc/data_layer/README.md#get_kv_diffagent-params)
  - [`get_root_history`](./src/api/rpc/data_layer/README.md#get_root_historyagent-params)
  - [`add_missing_files`](./src/api/rpc/data_layer/README.md#add_missing_filesagent-params)
  - [`make_offer`](./src/api/rpc/data_layer/README.md#make_offeragent-params)
  - [`take_offer`](./src/api/rpc/data_layer/README.md#take_offeragent-params)
  - [`verify_offer`](./src/api/rpc/data_layer/README.md#verify_offeragent-params)
  - [`cancel_offer`](./src/api/rpc/data_layer/README.md#cancel_offeragent-params)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`create_new_dl`](./src/api/rpc/wallet/README.md#create_new_dlagent-params)
  - [`dl_track_new`](./src/api/rpc/wallet/README.md#dl_track_newagent-params)
  - [`dl_stop_tracking`](./src/api/rpc/wallet/README.md#dl_stop_trackingagent-params)
  - [`dl_latest_singleton`](./src/api/rpc/wallet/README.md#dl_latest_singletonagent-params)
  - [`dl_singletons_by_root`](./src/api/rpc/wallet/README.md#dl_singletons_by_rootagent-params)
  - [`dl_update_root`](./src/api/rpc/wallet/README.md#dl_update_rootagent-params)
  - [`dl_update_multiple`](./src/api/rpc/wallet/README.md#dl_update_multipleagent-params)
  - [`dl_history`](./src/api/rpc/wallet/README.md#dl_historyagent-params)
  - [`dl_owned_singletons`](./src/api/rpc/wallet/README.md#dl_owned_singletonsagent-params)
  - [`dl_get_mirrors`](./src/api/rpc/wallet/README.md#dl_get_mirrorsagent-params)
  - [`dl_new_mirror`](./src/api/rpc/wallet/README.md#dl_new_mirroragent-params)
  - [`dl_delete_mirror`](./src/api/rpc/wallet/README.md#dl_delete_mirroragent-params)
- [New Wallet WebSocket API](./src/api/ws/wallet)
  - Added `offer_added`, `offer_cancelled` to `state_changed` event.
### Changed
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`get_offer_summary`](./src/api/rpc/wallet/README.md#get_offer_summaryagent-params)
    - Added `advanced` request parameter
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
    - Added `solver` request parameter

## [9.0.1]
### Fixed
- Fixed an issue where wallet `state_changed` events(notified via WebSocket API) below were missing.
  - did_coin_added
  - nft_coin_added
  - nft_coin_removed
  - nft_coin_updated
  - nft_coin_did_set

## [9.0.0]
### Breaking Change
`series_total` and `series_number` in `NFTInfo` class have been renamed to `edition_total` and `edition_number`  
(defined in `chia/wallet/nft_wallet/nft_info.py`.)  
As a result, the following Wallet RPC APIs in `chia-blockchain@1.5.1` become not compatible with `chia-blockchain@1.5.0`
- [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
  - `nft_info.series_total` was renamed to `nft_info.edition_total`
  - `nft_info.series_number` was renamed to `nft_info.edition_number`
- [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
  - `nft_list.series_total` was renamed to `nft_list.edition_total`
  - `nft_list.series_number` was renamed to `nft_list.edition_number`
### Added
- [New FullNode RPC API](./src/api/rpc/full_node)
  - [`get_block_spends`](./src/api/rpc/full_node/README.md#get_block_spendsagent-params)
- [New Wallet RPC API](./src/api/rpc/wallet)
  - [`cancel_offers`](./src/api/rpc/wallet/README.md#cancel_offersagent-params)
### Changed
- [Farmer RPC API](./src/api/rpc/farmer)
  - [`get_harvester_plots_valid`](./src/api/rpc/farmer/README.md#get_harvester_plots_validagent-params)
  - [`get_harvester_plots_invalid`](./src/api/rpc/farmer/README.md#get_harvester_plots_invalidagent-params)
  - [`get_harvester_plots_keys_missing`](./src/api/rpc/farmer/README.md#get_harvester_plots_keys_missingagent-params)
  - [`get_harvester_plots_duplicates`](./src/api/rpc/farmer/README.md#get_harvester_plots_duplicatesagent-params)
    - Changed type of `page` to `uint32` from `int`
    - Changed type of `page_size` to `uint32` from `int`
- [Wallet RPC API](./src/api/rpc/wallet)
  - [`get_wallets`](./src/api/rpc/wallet/README.md#get_walletsagent-params)
    - Added `fingerprint` to response
  - [`create_new_wallet`](./src/api/rpc/wallet/README.md#create_new_walletagent-params)
    - Added new error response
  - [`get_wallet_balance`](./src/api/rpc/wallet/README.md#get_wallet_balanceagent-params)
    - Added `wallet_type` to response
    - Added `asset_id` to response
  - [`send_transaction`](./src/api/rpc/wallet/README.md#send_transactionagent-params)
    - Changed request type of `wallet_id` to `uint32` from `int`
    - Changed request type of `min_coin_amount` to `uint64` from `uint128`
  - [`select_coins`](./src/api/rpc/wallet/README.md#select_coinsagent-params)
    - Added `min_coin_amount` to request.
    - Added `excluded_coins` to request.
  - [`cat_set_name`](./src/api/rpc/wallet/README.md#cat_set_nameagent-params)
    - Changed type of `wallet_id` to `uint32` from `int`
  - [`cat_get_name`](./src/api/rpc/wallet/README.md#cat_get_nameagent-params)
    - Changed type of `wallet_id` to `uint32` from `int`
  - [`cat_spend`](./src/api/rpc/wallet/README.md#cat_spendagent-params)
    - Changed type of `wallet_id` to `uint32` from `int`
    - Changed request type of `min_coin_amount` to `uint64` from `uint128`
  - [`cat_get_asset_id`](./src/api/rpc/wallet/README.md#cat_get_asset_idagent-params)
    - Changed type of `wallet_id` to `uint32` from `int`
  - [`create_offer_for_ids`](./src/api/rpc/wallet/README.md#create_offer_for_idsagent-params)
    - Changed request type of `min_coin_amount` to `uint64` from `uint128`
  - [`take_offer`](./src/api/rpc/wallet/README.md#take_offeragent-params)
    - Changed request type of `min_coin_amount` to `uint64` from `uint128`
  - [`send_clawback_transaction`](./src/api/rpc/wallet/README.md#send_clawback_transactionagent-params)
    - Changed type of `wallet_id` to `uint32` from `int`
  - [`create_signed_transaction`](./src/api/rpc/wallet/README.md#create_signed_transactionagent-params)
    - Changed request type of `min_coin_amount` to `uint64` from `uint128`
    - Added `excluded_coins` to request.
  - [`pw_self_pool`](./src/api/rpc/wallet/README.md#pw_self_poolagent-params)
  - [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params)
  - [`pw_status`](./src/api/rpc/wallet/README.md#pw_statusagent-params)
    - Removed error response
  - [`nft_get_info`](./src/api/rpc/wallet/README.md#nft_get_infoagent-params)
    - `nft_info.series_total` was renamed to `nft_info.edition_total`
    - `nft_info.series_number` was renamed to `nft_info.edition_number`
  - [`nft_get_nfts`](./src/api/rpc/wallet/README.md#nft_get_nftsagent-params)
    - `nft_list.series_total` was renamed to `nft_list.edition_total`
    - `nft_list.series_number` was renamed to `nft_list.edition_number`
- [Wallet WebSocket API](./src/api/ws/wallet)
  - Added `added_stray_cat`, `new_derivation_index` events
### Fixed
- Fixed an issue where type information of `get_puzzle_and_solution` was missing.
- Fixed an issue where event destination of `sync_changed` and `coin_added` Wallet WebSocket API was not correct.
- Fixed an issue where `healthz` common RPC API was missing.

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
[11.1.0]: https://github.com/Chia-Mine/chia-agent/compare/v11.1.0...v11.1.1
[11.1.0]: https://github.com/Chia-Mine/chia-agent/compare/v11.0.0...v11.1.0
[11.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v10.1.0...v11.0.0
[10.1.0]: https://github.com/Chia-Mine/chia-agent/compare/v10.0.0...v10.1.0
[10.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v9.2.0...v10.0.0
[9.2.0]: https://github.com/Chia-Mine/chia-agent/compare/v9.1.0...v9.2.0
[9.1.0]: https://github.com/Chia-Mine/chia-agent/compare/v9.0.1...v9.1.0
[9.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v9.0.0...v9.0.1
[9.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v8.0.0...v9.0.0
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
