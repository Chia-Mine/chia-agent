# Daemon Websocket API

## Usage
You need to create Websocket connection before subscribing websocket messages.  
Unlike other websocket APIs, daemon websocket API is based on `request/response` manner rather than `subscribe/listen`.
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
  value: str;
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
const response = await start_service(daemon, {service: "farmer"});
```
### params:
```typescript
{
  service: str;
  testing?: bool;
}
```
### response:
```typescript
{
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
  // f: str; // farmer public key. Not available at this time.
  // p: str; // pool public key. Not available at this time.
  // c: str; // pool contract address. Not available at this time.
  e: bool; // disable bitfield plotting
  x: bool; // exclude final dir. Skips adding [final dir] to harvester for farming
  overrideK: bool; // Set true only if you want to use k < 32
}
```
### response:
```typescript
{
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
{}
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
  service: str;
}
```
### response:
```typescript
{}
```

---

## `is_running(daemon, params)`
### Usage
```js
const {getDaemon} = require("chia-agent");
const {is_running} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const response = await is_running(daemon, {service: "farmer"});
```
### params:
```typescript
{
  service: str;
}
```
### response:
```typescript
{
  service_name: str;
  is_running: bool;
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
{}
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
  genesis_initialized: True;
}
```
