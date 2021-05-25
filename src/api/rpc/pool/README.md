# Pool API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {pool_info} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({
  service: "pool", // connect to a pool service using config file.
});
// Then call RPC function
const response = await pool_info(agent);

// Once agent is instantiated, you can re-use it everytime you want to request farmer API.



/*
 * You can instantiate `agent` with hostname/port.
 * See https://github.com/Chia-Mine/chia-agent/blob/main/src/rpc/index.ts
 */
const agent = new RPCAgent({
  protocol: "https",
  host: "aaa.bbb.ccc",
  port: 8666,
  ca_cert: fs.readFileSync(...),
  client_cert: fs.readFileSync(...),
  client_key: fs.readFileSync(...),
});
```

---

## `pool_info(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pool_info} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({service: "pool"});
const response = await pool_info(agent);
```
### response:
```typescript
{
  description: str;
  fee: str;
  logo_url: str;
  minimum_difficulty: uint64;
  name: str;
  protocol_version: str;
  relative_lock_height: uint32;
  target_puzzle_hash: str;
}
```

---

## `partials(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {partials} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({service: "pool"});
const response = await partials(agent, {...});
```
### params:
```typescript
{
  payload: {
    proof_of_space: {
      challenge: bytes32;
      pool_contract_puzzle_hash: bytes32;
      plot_public_key: G1Element;
      size: uint8;
      proof: bytes;
    };
  };
  sp_hash: str;
  end_of_sub_slot: bool;
  suggested_difficulty: uint64;
  singleton_genesis: str;
  owner_public_key: str;
  pool_payout_instructions: str;
  authentication_key_info: {
    authentication_public_key: str;
    authentication_public_key_timestamp: uint64;
  };
  auth_key_and_partial_aggregate_signature: str;
}
```
### response:
```typescript
{
  points_balance: uint64;
  current_difficulty: uint64;
} | {
  error_code: int;
  error_message: str;
}
```
