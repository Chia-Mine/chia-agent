# Farmer RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_signage_point} = require("chia-agent/api/rpc");
const agent = new RPCAgent({
  service: "farmer", // connect to local farmer service using config file.
});
// Then call RPC function
const response = await get_signage_point(agent, {...});

// Once agent is instantiated, you can re-use it everytime you want to request farmer API.



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

## `get_signage_point(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_signage_point} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await get_signage_point(agent, {sp_hash: "..."});
```
### params:
```typescript
{
  sp_hash: str;
}
```
### response:
```typescript
{
  signage_point: {
    challenge_hash: bytes32;
    challenge_chain_sp: bytes32;
    reward_chain_sp: bytes32;
    difficulty: uint64;
    sub_slot_iters: uint64;
    signage_point_index: uint8;
  };
  proofs: [string, ProofOfSpace];
}
```
For content of `ProofOfSpace`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/proof_of_space.ts

---

## `get_signage_points(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_signage_points} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await get_signage_points(agent);
```
### response:
```typescript
{
  signage_points: `Array of get_signage_point() result described above`;
}
```

---

## `get_reward_targets(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_reward_targets} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await get_reward_targets(agent, {search_for_private_key: true});
```
### params:
```typescript
{
  search_for_private_key: bool;
}
```
### response:
```typescript
{
  farmer_target: str;
  pool_target: str;
  have_farmer_sk: bool;
  have_pool_sk: bool;
} | {
  farmer_target: str;
  pool_target: str;
}
```

---

## `set_reward_targets(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {set_reward_targets} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await set_reward_targets(agent, {...});
```
### params:
```typescript
{
  farmer_target?: str;
  pool_target?: str;
}
```
### response:
```typescript
{}
```

---

## `get_pool_state(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_pool_state} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await get_pool_state(agent);
```
### response:
```typescript
{
  pool_state: PoolState[];
}
```
For content of `PoolState`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/farmer/index.ts

---

## `set_pool_payout_instructions(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {set_pool_payout_instructions} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await set_pool_payout_instructions(agent, {...});
```
### params:
```typescript
{
  singleton_genesis: str;
  pool_payout_instructions: str;
}
```
### response:
```typescript
{}
```

---

## `get_plots(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_plots} = require("chia-agent/api/rpc");
const agent = new RPCAgent({service: "farmer"});
const response = await get_plots(agent);
```
### response:
```typescript
{
  [peer_host_port: string]: RequestPlotsResponse;
}
```
For content of `RequestPlotsResponse`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/farmer/index.ts
