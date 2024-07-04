# Websocket Message from Timelord service

### `on_message_from_timelord`
Capture all broadcast messages coming from `chia_timelord` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_message_from_timelord} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `chia_timelord`
const unsubscribe = await on_message_from_timelord(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_finished_pot`
Capture broadcast message of command `finished_pot` from `chia_timelord` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_finished_pot} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_finished_pot(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_timelord";
  command: "on_finished_pot";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  estimated_ips: float;
  iterations_needed: uint64;
  chain: Chain;
  vdf_info: VDFInfo;
  vdf_proof: VDFProof;
}
```
For content of `Chain`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/timelord/types.ts
For content of `VDFInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia_rs/chia-protocol/vdf.ts
For content of `VDFProof`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia_rs/chia-protocol/vdf.ts

---

### `on_new_compact_proof`
Capture broadcast message of command `new_compact_proof` from `chia_timelord` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_compact_proof} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_compact_proof(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_timelord";
  command: "new_compact_proof";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  header_hash: bytes32;
  height: uint32;
  field_vdf: uint8;
}
```

---

### `on_skipping_peak`
Capture broadcast message of command `skipping_peak` from `chia_timelord` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_skipping_peak} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_skipping_peak(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_timelord";
  command: "skipping_peak";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  height: uint32;
}
```

---

### `on_new_peak`
Capture broadcast message of command `new_peak` from `chia_timelord` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_new_peak} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_new_peak(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_timelord";
  command: "new_peak";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  height: uint32;
}
```
