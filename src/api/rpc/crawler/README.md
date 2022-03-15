# Crawler RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_ips_after_timestamp} = require("chia-agent/api/rpc/crawler");
const agent = new RPCAgent({
  service: "crawler", // connect to local crawler service using config file.
});
// Then call RPC function
const response = await get_ips_after_timestamp(agent, {...});

// Once agent is instantiated, you can re-use it everytime you want to request crawler API.



/*
 * You can instantiate `agent` with hostname/port.
 * See https://github.com/Chia-Mine/chia-agent/blob/main/src/rpc/index.ts
 */
const agent = new RPCAgent({
  protocol: "https",
  host: "aaa.bbb.ccc",
  port: 8559,
  ca_cert: fs.readFileSync(...),
  client_cert: fs.readFileSync(...),
  client_key: fs.readFileSync(...),
});
```

---

## `get_peer_counts(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_peer_counts} = require("chia-agent/api/rpc/crawler");
const agent = new RPCAgent({service: "crawler"});
const response = await get_peer_counts(agent);
```
### response:
```typescript
{
  peer_counts: {
    total_last_5_days: int;
    reliable_nodes: int;
    ipv4_last_5_days: bytes32;
    ipv6_last_5_days: uint64;
    versions: Record<str, int>;
  };
}
```

---

## `get_ips_after_timestamp(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_ips_after_timestamp} = require("chia-agent/api/rpc/crawler");
const agent = new RPCAgent({service: "crawler"});
const response = await get_ips_after_timestamp(agent, params);
```
### params:
```typescript
{
  after: int;
  offset?: int;
  limit?: int;
}
```
### response:
```typescript
{
  ips: str[];
  total: int;
}
```
