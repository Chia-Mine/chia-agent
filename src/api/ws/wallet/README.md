# Websocket Message from Wallet service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {chia_wallet_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
await daemon.subscribe("wallet_ui"); // capture messages sent for GUI
daemon.addMessageListener(chia_wallet_service, (event) => {
  // Capturing broadcasted messages from the service.
  if(event.command === "state_changed"){
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

## command: `state_changed`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

### event:
```typescript
{
  origin: "chia_wallet";
  command: "state_changed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
```typescript
{
  state: unknown;
  wallet_id?: unknown;
  additional_data?: unknown;
}
```
@TODO Replace `unknown` to actual type.