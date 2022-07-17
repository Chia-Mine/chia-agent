# Websocket Message from Harvester service

### `on_message_from_harvester`
Capture all broadcast messages coming from `chia_harvester` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_message_from_harvester} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `chia_harvester`
const unsubscribe = await on_message_from_harvester(daemon, (event) => {
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
Capture broadcast message of command `get_connections` from `chia_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_get_connections} = require("chia-agent/api/ws/harvester");

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
  origin: "chia_harvester";
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

### `on_get_plots`
Capture broadcast message of command `get_plots` from `chia_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_get_plots} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_plots(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_harvester";
  command: "get_plots";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
}
```
For content of `Plot`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/harvester/harvester.ts

---

### `on_farming_info`
Capture broadcast message of command `farming_info` from `chia_harvester` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_farming_info} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_farming_info(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_harvester";
  command: "farming_info";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  challenge_hash: str;
  total_plots: int;
  found_proofs: int;
  eligible_plots: int;
  time: float;
}
```
