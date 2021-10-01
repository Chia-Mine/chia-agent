# Daemon Websocket API

## Usage
You need to create Websocket connection before subscribing websocket messages.  
Unlike other websocket APIs, daemon websocket API is based on `request/response` style rather than `subscribe/listen`.  
Note: `subscribe/listen` style WebSocket API for daemon was introduced at `chia-blockchain@1.2.7`. See detail [here](./#usagesubscription)
```js
const {getDaemon} = require("chia-agent");
const {start_plotting, is_running} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response1 = await start_plotting(daemon, {...});
const response2 = await is_running(daemon, {...});
await daemon.close();

/*
 * You can connect to other than localhost when you specify websocket server url.
 */
await daemon.connect("wss://host.name:1234");
...
```

---


## `ping(daemon)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {ping} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await ping(daemon);
```
### response:
```typescript
{
  success: bool;
  value: str; // "pong"
}
```

---

## `start_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {start_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await start_service(daemon, {service: "..."});
```
### params:
```typescript
{
  service: TService;
  testing?: bool;
}
```
where `TService` is one of
```typescript
"chia"|"chia_wallet"|"chia_full_node"|"chia_harvester"|"chia_farmer"
  |"chia_introducer"|"chia_timelord"|"chia_timelord_launcher"|"chia_full_node_simulator";
```
### response:
```typescript
{
  success: bool;
  service: str;
  error: Optional<str>;
}
```

---

## `start_plotting(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {start_plotting} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await start_plotting(daemon, {service: "chia plots create", ...});
```
### params:
```typescript
{
  service: "chia plots create";
  delay: int; // delay in seconds
  parallel: bool; // parallel or serialize
  k: int; // size. 32, 33, ...
  n: int; // count of creating plot
  queue: str; // queue name
  t: str; // tmp dir
  t2: str; // tmp dir 2
  d: str; // final dir
  b: int; // memory buffer size in MiB
  u: int; // number of buckets
  r: int; // number of threads
  a?: int; // wallet private key fingerprint
  f?: str; // farmer public key.
  p?: str; // pool public key.
  c?: str; // pool contract address.
  e: bool; // disable bitfield plotting
  x: bool; // exclude final dir. Skips adding [final dir] to harvester for farming
  overrideK: bool; // Set true only if you want to use k < 32
}
```
### response:
```typescript
{
  success: bool;
  ids: str[];
  service_name: str; // should be 'chia plots create'
}
```

---

## `stop_plotting(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {stop_plotting} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await stop_plotting(daemon, {id: "..."});
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  success: bool;
}
```

---

## `stop_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {stop_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await stop_service(daemon, {service: "..."});
```
### params:
```typescript
{
  service: str; // "chia_farmer", "chia_full_node", "chia_harvester", "chia_wallet"
}
```
### response:
```typescript
{
  success: bool;
}
```

---

## `is_running(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {is_running} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await is_running(daemon, {service: "chia_farmer"});
```
### params:
```typescript
{
  service: str; // "chia_farmer", "chia_full_node", "chia_harvester", "chia_wallet"
}
```
### response:
```typescript
{
  success: bool;
  service_name: str;
  is_running: bool;
}
```

---

## `add_private_key(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {add_private_key} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await add_private_key(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  mnemonic?: str;
  passphrase?: str;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `check_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {check_keys} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await check_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  root_path: str;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `delete_all_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {delete_all_keys} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await delete_all_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `delete_key_by_fingerprint(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {delete_key_by_fingerprint} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await delete_key_by_fingerprint(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  fingerprint: int;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  error_details?: {message: str};
}
```

---

## `get_all_private_keys(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {get_all_private_keys} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_all_private_keys(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  private_keys: Array<{pk: str; entropy: str}>;
}
```

---

## `get_first_private_key(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {get_first_private_key} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_first_private_key(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  private_key: {pk: str; entropy: str};
}
```

---

## `get_key_for_fingerprint(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {get_key_for_fingerprint} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_key_for_fingerprint(daemon, params);
```
### params:
```typescript
{
  kc_user?: str;
  kc_testing?: bool;
  fingerprint?: int;
}
```
### response:
```typescript
{
  success: bool;
  error?: str;
  pk: str;
  entropy: str;
}
```

---

## `is_keyring_locked(daemon)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {is_keyring_locked} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await is_keyring_locked(daemon);
```
### response:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
}
```

---

## `keyring_status(daemon)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {keyring_status} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await keyring_status(daemon);
```
### response:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
  passphrase_support_enabled: bool;
  can_save_passphrase: bool;
  user_passphrase_is_set: bool;
  needs_migration: bool;
  passphrase_requirements: {} | {
    is_optional: True;
    min_length: int;
  };
}
```

---

## `unlock_keyring(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {unlock_keyring} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await unlock_keyring(daemon, params);
```
### params:
```typescript
{
  key: string;
}
```
### response:
```typescript
{
  success: bool;
  error: string|None;
}
```

---

## `validate_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {validate_keyring_passphrase} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await validate_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  key: string;
}
```
### response:
```typescript
{
  success: bool;
  error: string|None;
}
```

---

## `migrate_keyring(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {migrate_keyring} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await migrate_keyring(daemon, params);
```
### params:
```typescript
{
  passphrase?: string;
  cleanup_legacy_keyring?: bool;
}
```
### response:
```typescript
{
  success: bool;
  error: string|None;
}
```

---

## `set_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {set_keyring_passphrase} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await set_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  current_passphrase: string;
  new_passphrase: string;
}
```
### response:
```typescript
{
  success: bool;
  error: string;
}
```

---

## `remove_keyring_passphrase(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {remove_keyring_passphrase} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await remove_keyring_passphrase(daemon, params);
```
### params:
```typescript
{
  current_passphrase: str;
}
```
### response:
```typescript
{
  success: bool;
  error: string;
}
```

---

## `notify_keyring_migration_completed(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {notify_keyring_migration_completed} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await notify_keyring_migration_completed(daemon, params);
```
### params:
```typescript
{
  key: str;
}
```
### response:
```typescript
{
  success: bool;
  error: string;
}
```

---

## `exit(daemon)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {exit} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await exit(daemon);
```
### response:
```typescript
{
  success: bool;
}
```

---

## `register_service(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {register_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await register_service(daemon, {service: "wallet_ui"});
```
### params:
```typescript
{
  service: str; // typically "wallet_ui" or "chia plots create"
}
```
### response:
```typescript
{
  success: bool;
} | {
  success: bool;
  service: str;
  queue: Array<{
    id: str;
    queue: str;
    size: int;
    parallel: bool;
    delay: int;
    state: str;
    error: Optional<str>;
    deleted: bool;
    log_new: str;
    log?: str;
  }>;
}
```

---

## `get_status(daemon)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {get_status} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await get_status(daemon);
```
### response:
```typescript
{
  success: bool;
  genesis_initialized: True;
}
```

---

## Usage(Subscription)
Starting from `chia-blockchain@1.2.7`, `subscribe/listen` style WebSocket API was introduced to `daemon` service.  
Here's an example.
```js
const {getDaemon} = require("chia-agent");
const {on_keyring_status_changed} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

const unsubscribe = await on_keyring_status_changed(daemon, (event) => {
  console.log(e.data);
  
  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

### `on_keyring_status_changed`
Capture broadcast message of command `on_keyring_status_changed` from `daemon` service.

#### Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_keyring_status_changed} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_keyring_status_changed(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
#### event:
```typescript
{
  origin: "daemon";
  command: "keyring_status_changed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: "wallet_ui";
}
```
#### data:
```typescript
{
  success: bool;
  is_keyring_locked: bool;
  passphrase_support_enabled: bool;
  user_passphrase_is_set: bool;
  needs_migration: bool;
  passphrase_requirements: {} | {
    is_optional: True;
    min_length: int;
  };
}
```
