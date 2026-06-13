# Solver RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_state} = require("chia-agent/api/rpc/solver");
const agent = new RPCAgent({
  service: "solver", // connect to local solver service using config file.
});
// Then call RPC function
const response = await get_state(agent);

// Once agent is instantiated, you can re-use it everytime you want to request solver API.



/*
 * You can instantiate `agent` with hostname/port.
 * See https://github.com/Chia-Mine/chia-agent/blob/main/src/rpc/index.ts
 */
const agent = new RPCAgent({
  protocol: "https",
  host: "aaa.bbb.ccc",
  port: 8667,
  ca_cert: fs.readFileSync(...),
  client_cert: fs.readFileSync(...),
  client_key: fs.readFileSync(...),
});
```

---

## `get_state(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_state} = require("chia-agent/api/rpc/solver");
const agent = new RPCAgent({service: "solver"});
const response = await get_state(agent);
```
### response:
```typescript
{
  started: bool;
}
```
