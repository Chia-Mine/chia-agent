# Pool API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {pool_info} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent({
  protocol: "https", // or "http"
  host: "some.pool.com",
  port: 8443,
});


// Then call RPC function
const response = await pool_info(agent);

// Once agent is instantiated, you can re-use it everytime you want to request farmer API.
```

### Note  
Unlike other RPC services like `farmer`, `harvester`, `wallet`, `full_node`, pool servers may be completely external and untrusted.  
Additionally, actual pool implementation depends on pool operators.  
They may use self-signed certificate and requires root CA cert on connection, or may restrict access by requesting client cert signed by shared private CA.

#### Case1: Connect via HTTP without TLS certs
Current testnet implementation is this case. Connection between pool and client does not require any certificates thus not secure.  

```js
const {RPCAgent} = require("chia-agent");
const agent = new RPCAgent({
  protocol: "http",
  host: "some.pool.com",
  port: 80,
});
```

#### Case2: Connect via HTTPS with server certs signed by public known CA and WITHOUT client auth
This may be the most popular case after the pool protocol releases to mainnet.  
This is as simple as case1 because it does not require private root CA certs nor client certs.
```js
const {RPCAgent} = require("chia-agent");
const agent = new RPCAgent({
  protocol: "https",
  host: "some.pool.com",
  port: 443,
});
```

#### Case3: Connect via HTTPS with server certs signed by private CA and WITH client auth
The case for private pool. Sounds like VIP only.  
In this case, you need to have the private root CA certs, your client certs signed by the private CA.

If you don't have valid client certs authorized by those private pool servers, https connection to those pools will be rejected.
```js
const {RPCAgent} = require("chia-agent");
const agent = new RPCAgent({
  protocol: "https",
  host: "private.pool.com",
  port: 10443,
  ca_cert: fs.readFileSync("/path/to/ca/cert"),
  client_cert: fs.readFileSync("/path/to/public/client/cert"),
  client_key: fs.readFileSync("/path/to/private/client/key"),
});
```

---

## `pool_info(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pool_info} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
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
const agent = new RPCAgent(connectionInfo);
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
const agent = new RPCAgent(connectionInfo);
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
