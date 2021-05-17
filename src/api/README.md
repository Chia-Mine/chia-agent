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
