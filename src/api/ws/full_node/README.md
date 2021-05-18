# Websocket Message from Full Node service

## Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_get_blockchain_state} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

const unsubscribe = await on_get_blockchain_state(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

## `on_get_blockchain_state`
###Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_get_blockchain_state} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_get_blockchain_state(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

### event:
```typescript
{
  origin: "chia_full_node";
  command: "get_blockchain_state";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
```typescript
{
  blockchain_state: {
    peak: BlockRecord;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: uint32;
      sync_progress_height: uint32;
    };
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
  }
}
```
