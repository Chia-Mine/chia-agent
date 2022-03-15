# Websocket Message from Farmer service

### `on_message_from_farmer`
Capture all broadcast messages coming from `chia_farmer` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_message_from_farmer} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `chia_farmer`
const unsubscribe = await on_message_from_farmer(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_get_connections`
Capture broadcast message of command `get_connections` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_get_connections} = require("chia-agent/api/ws/farmer");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_connections(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_farmer";
  command: "get_connections";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  connections: TConnectionGeneral[];
}
```
For content of `TConnectionGeneral`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/types.ts

---

### `on_new_farming_info`
Capture broadcast message of command `new_farming_info` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_farming_info} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_farming_info(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_farmer";
  command: "new_farming_info";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  farming_info: {
    challenge_hash: bytes32;
    signage_point: bytes32;
    passed_filter: uint32;
    proofs: uint32;
    total_plots: uint32;
    timestamp: uint64;
  }
}
```

---

### `on_new_signage_point`
Capture broadcast message of command `new_signage_point` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_signage_point} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_signage_point(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_farmer";
  command: "new_signage_point";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  proofs: ProofOfSpace[];
  signage_point: NewSignagePoint;
}
```
For content of `ProofOfSpace`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/proof_of_space.ts

For content of `NewSignagePoint`  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/protocols/farmer_protocol.ts

---

### `on_new_plots`
Capture broadcast message of command `on_new_plots` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_plots} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_plots(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_farmer";
  command: "get_harvesters"; // This is not a typo. See https://github.com/Chia-Network/chia-blockchain/blob/773d692fc5a7ee539392c78902857c3c03e00560/chia/rpc/farmer_rpc_api.py#L50
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  harvesters: HarvesterObject[];
}
```
For content of `HarvesterObject`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/rpc/farmer/index.ts
