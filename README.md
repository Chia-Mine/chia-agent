# chia-agent
[![npm version](https://badge.fury.io/js/chia-agent.svg)](https://badge.fury.io/js/chia-agent) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Websocket/RCP client for chia running for NodeJS.  
`chia-agent` supports all available RPC/Websocket API which chia service/daemon return.  
\* API available at chia 1.1.x is supported for now.  

## Install

```
npm install chia-agent
# or
yarn add chia-agent
```

## What `chia-agent` can do.

For example, you can develop your own nodejs script to:
- Send email when proof is found.
- Get customizable stats report.
- Trigger your scripts when target event is observed.
- start/stop services.
- manage/schedule plotting with script.
- etc



## API

There are 2 kinds of APIs in chia.  
`Websocket API` and `RPC API`.

### Websocket API
Used to connect to chia daemon.  
With websocket API, you can request chia daemon to start/stop plotting or other services.

Additionally, Websocket API can be used to capture broadcast messages like:  
- Plotting progress
- Farming info such as passed filter, proofs found, etc.

```js
const {getDaemon, setLogLevel} = require("chia-agent");
const {new_farming_info_command, chia_farmer_service} = require("chia-agent/api/ws/farmer");

setLogLevel("debug");

const daemon = getDaemon();
await daemon.connect();
await daemon.subscribe("wallet_ui"); // Capture messages sent to GUI (wallet_ui).
daemon.addMessageListener("all", (e) => {
  if(e.origin === chia_farmer_service && e.command === new_farming_info_command){
    console.log(e.data);
  }
});

setTimeout(() => {
  daemon.close();
}, 30*1000); // Disconnect after 30s passed.

/*
// sample output
{
  farming_info: {
    challenge_hash: '0x07228cf04e8877797adc1e0605018007def282548f009564b00286886e23e88b',
    passed_filter: 0,
    proofs: 0,
    signage_point: '0xfe1272a8e6659c0a3875cac37f8b170f1f85d47fecfee36d825dfae0b2a73a31',
    timestamp: 1621255822,
    total_plots: 299
  },
  success: true
}
 */
```


### RPC API
Unlike Websocket API, RPC API is used to send message directly to chia services like `farmer`, `harvester`, `full_node`, `wallet`.

```js
const {RPCAgent, setLogLevel} = require("chia-agent");
const {get_plots} = require("chia-agent/api/rpc");
setLogLevel("debug");

const agent = new RPCAgent({
  destination: "harvester",
});

const res = await get_plots(agent);
console.log(res.plots[0]);

/*
// sample output
{
  file_size: 108875876912,
  filename: 'M:\\plot-k32-yyyy-mm-dd-xx-xx-xxxxxxxxxxxxxxxxxxxxxxxxx.plot',
  'plot-seed': '0x3098da093...',
  plot_public_key: '0x934a93489...',
  pool_contract_puzzle_hash: null,
  pool_public_key: '0xb0aa9485c0d...',
  size: 32,
  time_modified: 1619540745.1640463
}
*/
```

## Examples
[See documentation here](https://github.com/Chia-Mine/chia-agent/blob/main/example)


## API Reference
[See Documentation here](https://github.com/Chia-Mine/chia-agent/blob/main/api)
