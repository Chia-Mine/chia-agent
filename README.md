**Now supports New Pool API! :tada::tada:**

---

# chia-agent
[![npm version](https://badge.fury.io/js/chia-agent.svg)](https://badge.fury.io/js/chia-agent) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

chia rpc/websocket client library for NodeJS.  
Supports all RPC/Websocket API available at `chia 1.2.7`.  
\(If you need previous version, search for the corresponding release [here](https://github.com/Chia-Mine/chia-agent/releases)\)

you can develop your own nodejs script with `chia-agent` to:
- retrieve latest data from RPC servers like `farmer`, `harvester`, `full_node`, `wallet`, `pool`.
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

## Compatibility
This code is compatible with:  
- [`5d75defa1e2209ab3b74c9210fc32b3efad095e3`](https://github.com/Chia-Network/chia-blockchain/tree/5d75defa1e2209ab3b74c9210fc32b3efad095e3) of [chia-blockchain@1.2.7](https://github.com/Chia-Network/chia-blockchain)  
  - [Diff to the latest chia-blockchain](https://github.com/Chia-Network/chia-blockchain/compare/5d75defa1e2209ab3b74c9210fc32b3efad095e3...main)
- [`32907fb429fead42ce74e62ac1abf87759217c0d`](https://github.com/Chia-Network/pool-reference/tree/32907fb429fead42ce74e62ac1abf87759217c0d) of [pool-reference](https://github.com/Chia-Network/pool-reference)  
  - [Diff to the latest pool-reference](https://github.com/Chia-Network/pool-reference/compare/32907fb429fead42ce74e62ac1abf87759217c0d...main)

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
await daemon.connect(); // connect to local daemon using config file.
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

Here are some of those examples
- [Send email when proof is found](https://github.com/Chia-Mine/chia-agent/blob/main/example/send_email_when_proof_is_found)
- [RPC API code sample to show block record in certain height](https://github.com/Chia-Mine/chia-agent/blob/main/example/get_block_by_height)
- [Create multiple plots with javascript](https://github.com/Chia-Mine/chia-agent/blob/main/example/create_plots)

## Build from source
Once source files is build by `npm run build:prod`, files will be output to `/dist` directory.  
Then the files/directories are published to npm registry.  
Please note it does not upload files in project root to npm registry, but files inside '/dist'.

[Read details here](https://github.com/Chia-Mine/chia-agent/blob/main/BUILD.md)

## Donation
For continuous development, please support me with donation
`xch1wr8g2k7cn55xvepmg480dsu2xhf4rz5ezghwwapulj7jxqcz9ztqqclwdj`
