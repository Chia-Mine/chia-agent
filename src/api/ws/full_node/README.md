# Websocket Message from Full Node service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {chia_full_node_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
await daemon.subscribe("wallet_ui"); // capture messages sent for GUI
daemon.addMessageListener(chia_full_node_service, (event) => {
  // Capturing broadcasted messages from the service.
  if(event.command === "get_blockchain_state"){
    console.log(e.data);
  }
  
  // Close connection if you don't need it anymore.
  if(...){
    daemon.close();
  }
});
// Once daemon is instantiated, you don't need to re-create it.

// Do some closing stuff.
daemon.onClose((e) => {
  ...
});

/*
 * You can connect to other than localhost when you specify websocket server url.
 */
daemon.connect("wss://host.name:1234");
await daemon.subscribe(xxxxx);
...
```

---

## command: `get_blockchain_state`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

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
