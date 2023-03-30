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

### `on_get_connections`
Capture broadcast message of command `get_connections` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_get_connections} = require("chia-agent/api/ws/wallet");

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
  origin: "chia_wallet";
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

### `on_state_changed_of_wallet`
Capture broadcast message of command `state_changed` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_state_changed_of_wallet} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_state_changed_of_wallet(daemon, (event) => {
  // Format of `event` object is described below.
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
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  state: "add_connection" | "new_block" | "wallet_created"
    | "added_stray_cat" | "offer_added" | "offer_cancelled" | "new_on_chain_notification";
} | {
  state: "coin_removed" | "coin_added" | "pending_transaction" | "did_coin_added" | "nft_coin_added"
    | "nft_coin_removed" | "nft_coin_updated" | "nft_coin_did_set" | "wallet_removed";
  wallet_id: uint32;
} | {
  state: "tx_update";
  wallet_id: uint32;
  additional_data: {transaction: TransactionRecord} | {transaction: TransactionRecord; error: str; status: int};
} | {
  state: "new_derivation_index",
    additional_data: {index: uint32};
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

### `on_sync_changed`
Capture broadcast message of command `sync_changed` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_sync_changed} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_sync_changed(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```

#### event:
```typescript
{
  origin: "chia_wallet";
  command: "sync_changed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{}
```

---

### `on_coin_added`
Capture broadcast message of command `coin_added` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_coin_added} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_coin_added(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "chia_wallet";
  command: "coin_added";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  state: "coin_added";
  wallet_id: uint32;
}
```

---

### `on_add_connection`
Capture broadcast message of command `add_connection` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_add_connection} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_add_connection(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "chia_wallet";
  command: "add_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  state: "add_connection";
}
```

---

### `on_close_connection`
Capture broadcast message of command `close_connection` from `chia_wallet` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_close_connection} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_close_connection(daemon, (event) => {
  // Format of `event` object is described below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "chia_wallet";
  command: "close_connection";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "metrics";
}
```
#### data:
```typescript
{
  state: "close_connection";
}
```
