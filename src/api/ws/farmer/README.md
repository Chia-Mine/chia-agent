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

### `on_harvester_update`
Capture broadcast message of command `on_harvester_update` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_harvester_update} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_harvester_update(daemon, (event) => {
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
  command: "harvester_update";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  connection: {
    node_id: bytes32;
    host: str;
    port: int;
  };
  plots: int;
  failed_to_open_filenames: int;
  no_key_filenames: int;
  duplicates: int;
  total_plot_size: int;
  syncing: {
    initial: bool;
    plot_files_processed: uint32;
    plot_files_total: uint32;
  } | None;
  last_sync_time: Optional<float>;
}
```
For content of `Plot`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/protocols/harvester_protocol.ts

---

### `on_harvester_removed`
Capture broadcast message of command `on_harvester_removed` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_harvester_removed} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_harvester_removed(daemon, (event) => {
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
  command: "harvester_removed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  node_id: bytes32;
}
```

---

### `on_proof`
Capture broadcast message of command `on_proof` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_proof} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_proof(daemon, (event) => {
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
  command: "proof";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  proof: DeclareProofOfSpace;
  passed_filter: bool;
}
```
For content of `DeclareProofOfSpace`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/protocols/farmer_protocol.ts

---

### `on_submitted_partial`
Capture broadcast message of command `on_proof` from `chia_farmer` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_submitted_partial} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_submitted_partial(daemon, (event) => {
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
  command: "submitted_partial";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  launcher_id: str;
  pool_url: str;
  current_difficulty: uint64;
  points_acknowledged_since_start: uint64;
  points_acknowledged_24h: Array<[float, uint64]>; // [(time.time(), new_difficulty)]
}
```
