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
  description: str; // "(example) The Reference Pool allows you to pool with low fees, paying out daily using Chia."
  fee: str; // "0.01"
  logo_url: str; // "https://www.chia.net/img/chia_logo.svg"
  minimum_difficulty: uint64; // 10
  name: str; // "The Reference Pool"
  protocol_version: str; // "1.0"
  relative_lock_height: uint32; // 100
  target_puzzle_hash: str; // "0x344587cf06a39db471d2cc0..."
}
```

---

## `partials(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {partials} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({service: "pool"});
const response = await partials(agent, params);
```
### params:
```typescript
{
  payload: {
    proof_of_space: {
      challenge: bytes32; // "0xe0e55d45eef8d..."
      pool_contract_puzzle_hash: bytes32; // "0x9e3e9b37b54cf..."
      plot_public_key: G1Element; // "0xa7ad70989cc8f18e..."
      size: uint8; // number like 32
      proof: bytes; // "0xb2cd6374c8db249..."
    };
  };
  sp_hash: str; // "0x4c52796ca4f..."
  end_of_sub_slot: bool; // true|false
  suggested_difficulty: uint64; // 10 
  singleton_genesis: str; // "0xae4ef3b9b..."
  owner_public_key: str; // "0x84c3fcf9d5581c1..."
  pool_payout_instructions: str; // "0xc2b08e41d766..."
  authentication_key_info: {
    authentication_public_key: str; // "0x970e181ae45435ae..."
    authentication_public_key_timestamp: uint64; // 1621854388
  };
  auth_key_and_partial_aggregate_signature: str; // "0xa078dc1462bb..."
}
```
### response:
```typescript
{
  points_balance: uint64; // 1130
  current_difficulty: uint64; // 10
} | {
  error_code: int; // 4
  error_message: str; // "Invalid proof of space"
}
```

---

## `login(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {login} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({service: "pool"});
const response = await partials(login, params);
```
### params:
```typescript
{
  singleton_genesis: str;
  login_code: str;
  timestamp: uint32;
  authentication_pk: str;
  signature: str;
}
```
### response:
```
<The format of a response is determined by pool operator>
```
