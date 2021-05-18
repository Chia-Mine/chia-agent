# Websocket Message from Farmer service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {chia_farmer_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
await daemon.subscribe("wallet_ui"); // capture messages sent for GUI
daemon.addMessageListener(chia_farmer_service, (event) => {
  // Capturing broadcasted messages from the service.
  if(event.command === "new_farming_info"){
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

## command: `new_farming_info`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

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

## command: `new_signage_point`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

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
