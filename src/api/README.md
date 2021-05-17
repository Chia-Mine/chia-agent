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
