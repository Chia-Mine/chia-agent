# Websocket Message from Wallet service

### `on_message_from_wallet`
Capture all broadcast messages coming from `chia_wallet` service.

#### Usage
You need to create Websocket connection before subscribing websocket messages.
```js
const {getDaemon} = require("chia-agent");
const {on_message_from_wallet} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

// Capture all messages from `chia_harvester`
const unsubscribe = await on_message_from_wallet(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_state_changed_of_wallet`
Capture broadcast message of command `state_changed` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_state_changed_of_wallet} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_state_changed_of_wallet(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
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
#### data:
```typescript
{
  state: unknown;
  wallet_id?: unknown;
  additional_data?: unknown;
}
```
@TODO Replace `unknown` to actual type.