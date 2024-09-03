# Common RPC API

Common RPC APIs are available in all RPC services like full_node, farmer, harvester, wallet, etc.

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_connections} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({
  service: "full_node", // Can be any services. i.e. full_node, farmer, harvester, wallet, crawler
});
// Then call RPC function
const response = await get_connections(agent, {...});

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

## `get_network_info(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_network_info} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "farmer"}); // Can be any service like full_node, harvester, etc...
const response = await get_network_info(agent);
```
### response:
```typescript
{
  success: True;
  network_name: str;
  network_prefix: str;
  genesis_challenge: str;
}
```

---

## `get_connections(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_connections} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "farmer"}); // Can be any service like full_node, harvester, etc...
const response = await get_connections(agent, params);
```
### params:
```typescript
{
  node_type?: str;
}
```
### response:
```typescript
{
  connections: TConnectionGeneral[] | TConnectionFullNode[];
}
```
For content of `TConnectionGeneral`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/types.ts
For content of `TConnectionFullNode`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/ws/full_node/index.ts

---

## `open_connection(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {open_connection} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await open_connection(agent, params);
```
### params:
```typescript
{
  host: str;
  port: uint16;
}
```
### response:
```typescript
{
  success: False;
  error: str;
} | {
  success: True;
}
```

---

## `close_connection(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {close_connection} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await close_connection(agent, params);
```
### params:
```typescript
{
  node_id: str;
}
```
### response:
```typescript
{}
```

---

## `stop_node(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {stop_node} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await stop_node(agent);
```
### response:
```typescript
{}
```

---

## `get_routes(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_routes} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await get_routes(agent);
```
### response:
```typescript
{
  routes: str[];
}
```

---

## `get_version(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_version} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await get_version(agent);
```
### response:
```typescript
{
  version: str;
}
```

---

## `healthz(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {healthz} = require("chia-agent/api/rpc/common");
const agent = new RPCAgent({service: "crawler"}); // Can be any service like full_node, harvester, etc...
const response = await healthz(agent);
```
### response:
```typescript
{
  success: "true";
}
```
