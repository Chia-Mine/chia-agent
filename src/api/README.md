# API

There are 2 kinds of APIs in chia.  
`Websocket API` and `RPC API`.

### Websocket API
Used to connect to chia `daemon`.  
With websocket API, you can request chia daemon to start/stop plotting or other services.

Additionally, Websocket API can be used to capture broadcast messages like:
- Plotting progress
- Farming info such as passed filter, proofs found, etc.

### RPC API
Unlike Websocket API, RPC API is used to send message directly to chia services like `farmer`, `harvester`, `full_node`, `wallet`.

#### [Farmer RPC API](./rpc/farmer/README.md#usage)
- [`get_signage_point`](./rpc/farmer/README.md#get_signage_pointagent-params)
- [`get_signage_points`](./rpc/farmer/README.md#get_signage_pointsagent)
- [`get_reward_targets`](./rpc/farmer/README.md#get_reward_targetsagent-params)
- [`set_reward_targets`](./rpc/farmer/README.md#set_reward_targetsagent-params)

#### [Full Node RPC API](./rpc/full_node/README.md#usage)
- [`get_blockchain_state`](./rpc/full_node/README.md#get_blockchain_stateagent)
- [`get_block`](./rpc/full_node/README.md#get_blockagent-params)
- [`get_blocks`](./rpc/full_node/README.md#get_blocksagent-params)
- [`get_block_record_by_height`](./rpc/full_node/README.md#get_block_record_by_heightagent-params)
- [`get_block_record`](./rpc/full_node/README.md#get_block_recordagent-params)
- [`get_block_records`](./rpc/full_node/README.md#get_block_recordsagent-params)
- [`get_unfinished_block_headers`](./rpc/full_node/README.md#get_unfinished_block_headersagent)
- [`get_network_space`](./rpc/full_node/README.md#get_network_spaceagent-params)
- [`get_additions_and_removals`](./rpc/full_node/README.md#get_additions_and_removalsagent-params)
- [`get_initial_freeze_period`](./rpc/full_node/README.md#get_initial_freeze_periodagent)
- [`get_network_info`](./rpc/full_node/README.md#get_network_infoagent)
- [`get_coin_records_by_puzzle_hash`](./rpc/full_node/README.md#get_coin_records_by_puzzle_hashagent-params)
- [`get_coin_records_by_puzzle_hashes`](./rpc/full_node/README.md#get_coin_records_by_puzzle_hashesagent-params)
- [`get_coin_record_by_name`](./rpc/full_node/README.md#get_coin_record_by_nameagent-params)
- [`push_tx`](./rpc/full_node/README.md#push_txagent-params)
- [`get_all_mempool_tx_ids`](./rpc/full_node/README.md#get_all_mempool_tx_idsagent)
- [`get_all_mempool_items`](./rpc/full_node/README.md#get_all_mempool_itemsagent)
- [`get_mempool_item_by_tx_id`](./rpc/full_node/README.md#get_mempool_item_by_tx_idagent-params)

#### [Harvester RPC API](./rpc/harvester/README.md#usage)
- [`get_plots`](./rpc/harvester/README.md#xxxxxx)
- [`refresh_plots`](./rpc/harvester/README.md#xxxxxx)
- [`delete_plot`](./rpc/harvester/README.md#xxxxxx)
- [`add_plot_directory`](./rpc/harvester/README.md#xxxxxx)
- [`get_plot_directories`](./rpc/harvester/README.md#xxxxxx)
- [`remove_plot_directory`](./rpc/harvester/README.md#xxxxxx)

#### [Wallet RPC API](./rpc/wallet/README.md#usage)
- [`log_in`](./rpc/wallet/README.md#log_inagent-params)
- [`get_public_keys`](./rpc/wallet/README.md#get_public_keysagent)
- [`get_private_key`](./rpc/wallet/README.md#get_private_keyagent-params)
- [`generate_mnemonic`](./rpc/wallet/README.md#generate_mnemonicagent)
- [`add_key`](./rpc/wallet/README.md#add_keyagent-params)
- [`delete_key`](./rpc/wallet/README.md#delete_keyagent-params)
- [`delete_all_keys`](./rpc/wallet/README.md#delete_all_keysagent)
- [`get_sync_status`](./rpc/wallet/README.md#get_sync_statusagent)
- [`get_height_info`](./rpc/wallet/README.md#get_height_infoagent)
- [`farm_block`](./rpc/wallet/README.md#farm_blockagent-params)
- [`get_initial_freeze_period`](./rpc/wallet/README.md#get_initial_freeze_periodagent)
- [`get_network_info`](./rpc/wallet/README.md#get_network_infoagent)
- [`get_wallets`](./rpc/wallet/README.md#get_walletsagent)
- [`create_new_wallet`](./rpc/wallet/README.md#create_new_walletagent-params)
- [`get_wallet_balance`](./rpc/wallet/README.md#get_wallet_balanceagent-params)
- [`get_transaction`](./rpc/wallet/README.md#get_transactionagent-params)
- [`get_transactions`](./rpc/wallet/README.md#get_transactionsagent-params)
- [`get_next_address`](./rpc/wallet/README.md#get_next_addressagent-params)
- [`send_transaction`](./rpc/wallet/README.md#send_transactionagent-params)
- [`create_backup`](./rpc/wallet/README.md#create_backupagent-params)
- [`get_transaction_count`](./rpc/wallet/README.md#get_transaction_countagent-params)
- [`get_farmed_amount`](./rpc/wallet/README.md#get_farmed_amountagent)
- [`create_signed_transaction`](./rpc/wallet/README.md#create_signed_transactionagent-params)
- [`cc_set_name`](./rpc/wallet/README.md#cc_set_nameagent-params)
- [`cc_get_name`](./rpc/wallet/README.md#cc_get_nameagent-params)
- [`cc_spend`](./rpc/wallet/README.md#cc_spendagent-params)
- [`cc_get_colour`](./rpc/wallet/README.md#cc_get_colouragent-params)
- [`create_offer_for_ids`](./rpc/wallet/README.md#create_offer_for_idsagent-params)
- [`get_discrepancies_for_offer`](./rpc/wallet/README.md#get_discrepancies_for_offeragent-params)
- [`respond_to_offer`](./rpc/wallet/README.md#respond_to_offeragent-params)
- [`get_trade`](./rpc/wallet/README.md#get_tradeagent-params)
- [`get_all_trades`](./rpc/wallet/README.md#get_all_tradesagent)
- [`cancel_trade`](./rpc/wallet/README.md#cancel_tradeagent-params)
- [`did_update_recovery_ids`](./rpc/wallet/README.md#did_update_recovery_idsagent-params)
- [`did_spend`](./rpc/wallet/README.md#did_spendagent-params)
- [`did_get_pubkey`](./rpc/wallet/README.md#did_get_pubkeyagent)
- [`did_get_did`](./rpc/wallet/README.md#did_get_didagent-params)
- [`did_recovery_spend`](./rpc/wallet/README.md#did_recovery_spendagent-params)
- [`did_get_recovery_list`](./rpc/wallet/README.md#did_get_recovery_listagent-params)
- [`did_create_attest`](./rpc/wallet/README.md#did_create_attestagent-params)
- [`did_get_information_needed_for_recovery`](./rpc/wallet/README.md#did_get_information_needed_for_recoveryagent-params)
- [`did_create_backup_file`](./rpc/wallet/README.md#did_create_backup_fileagent-params)
- [`rl_set_user_info`](./rpc/wallet/README.md#rl_set_user_infoagent-params)
- [`send_clawback_transaction`](./rpc/wallet/README.md#send_clawback_transactionagent-params)
- [`add_rate_limited_funds`](./rpc/wallet/README.md#add_rate_limited_fundsagent-params)
