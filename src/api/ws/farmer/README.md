# Websocket Message from Farmer service

## Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_new_farming_info} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

const unsubscribe = await on_new_farming_info(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

## `on_new_farming_info`
###Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_farming_info} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_farming_info(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

### event:
```typescript
{
  origin: "chia_farmer";
  command: "new_farming_info";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
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

## `on_new_signage_point`
###Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_signage_point} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_signage_point(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

### event:
```typescript
{
  origin: "chia_farmer";
  command: "new_signage_point";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
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
