## [Notice] Pool API is being implemented
Pool API reference for `chia-agent` is [here](https://github.com/Chia-Mine/chia-agent/tree/v1.1.0/src/api/rpc/pool)

Beta version of the npm module can be installed as below:
```
npm install chia-agent@beta
# or
yarn add chia-agent@beta
```

---

# chia-agent
[![npm version](https://badge.fury.io/js/chia-agent.svg)](https://badge.fury.io/js/chia-agent) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

chia rpc/websocket client library for NodeJS.  
Supports all RPC/Websocket API available at `chia 1.1.x`.  

you can develop your own nodejs script with `chia-agent` to:
- retrieve latest data from RPC servers like `farmer`, `harvester`, `full_node`, `wallet`.
- send email when proof is found.
- trigger scripts when target event is observed.
- start/stop services.
- write program to schedule plotting with javascript.
- etc, etc, etc

## Install
```
npm install chia-agent
# or
yarn add chia-agent
```

## API
There are 2 kinds of APIs in chia.  
`RPC API` and `Websocket API`.

### RPC API
RPC API is used to send message directly to chia services like `farmer`, `harvester`, `full_node`, `wallet`.

RPC API is just an async function in a traditional request/response style.

```js
const {RPCAgent, setLogLevel} = require("chia-agent");
const {get_plots} = require("chia-agent/api/rpc");
setLogLevel("debug");

const agent = new RPCAgent({
  service: "harvester",
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

### Websocket API
Websocket API is used to connect to chia `daemon`.

With websocket API, you can request chia daemon to start/stop plotting or other services,  
or capture various broadcast messages like:
- Plotting progress
- Farming info such as passed filter, proofs found, etc.

```js
const {getDaemon, setLogLevel} = require("chia-agent");
const {on_new_farming_info} = require("chia-agent/api/ws");

setLogLevel("debug");

const daemon = getDaemon();
await daemon.connect(); // connect to local farm service using config file.
const unsubscribe = await on_new_farming_info(daemon, (e) => {
  console.log(e.data);
})

setTimeout(async () => {
  unsubscribe(); // Stop capturing message
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

## API Reference
[See Documentation here](https://github.com/Chia-Mine/chia-agent/blob/main/src/api/README.md)

## Examples
[See documentation here](https://github.com/Chia-Mine/chia-agent/blob/main/example)

## API Compatibility Memo
Current version of `chia-agent` follows API defined at commit [`9e9097b116...`](https://github.com/Chia-Network/chia-blockchain/tree/9e9097b11688e52ee13683533d1ad273d231a1ee) in `chia 1.1.6`.

When original RPC/Websocket server API changes, those changes must be imported to this repository.  
To check API update, check the link below.  
If you notice `chia/rpc/*_rpc_api.py` and/or `chia/daemon/server.py` are listed in the link, please let me know.  

https://github.com/Chia-Network/chia-blockchain/compare/9e9097b11688e52ee13683533d1ad273d231a1ee...main  

## Donation
For continuous development, please support me with donation
`xch1wqpcvquv98qmeh9hg6wqpzhzmgs73lgvd8a7v5240nxgyat4p0sq4gdzyy`
