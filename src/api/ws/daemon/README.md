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


## `ping(agent)`
### response:
```typescript
{
  value: str;
}
```

---

## `start_service(agent, params)`
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

## `start_plotting(agent, params)`
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

## `stop_plotting(agent, params)`
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

## `stop_service(agent, params)`
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

## `is_running(agent, params)`
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

## `exit(agent)`
### response:
```typescript
{}
```

---

## `register_service(agent, params)`
### params:
```typescript
{
  service: str;
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

## `get_status(agent)`
### response:
```typescript
{
  genesis_initialized: True;
}
```
