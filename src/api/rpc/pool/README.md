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
Past testnet implementation is this case. Connection between pool and client does not require any certificates thus not secure.  

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
  name: str; // "The Reference Pool"
  logo_url: str; // "https://www.chia.net/img/chia_logo.svg"
  minimum_difficulty: uint64; // 10
  relative_lock_height: uint32; // 100
  protocol_version: str; // "1.0"
  fee: str; // "0.01"
  description: str; // "(example) The Reference Pool allows you to pool with low fees, paying out daily using Chia."
  target_puzzle_hash: bytes32; // "0x344587cf06a39db471d2cc0..."
  authentication_token_timeout: uint8;
}
```

---

## `get_farmer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_farmer} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
const response = await get_farmer(agent, params);
```
### params
```typescript
{
  launcher_id: str;
  authentication_token: str;
  signature: str;
}
```
### response:
```typescript
{
  authentication_public_key: G1Element;
  payout_instructions: str;
  current_difficulty: uint64;
  current_points: uint64;
}
```

---

## `post_farmer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {post_farmer} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
const response = await post_farmer(agent, params);
```
### params
```typescript
{
  payload: {
    launcher_id: bytes32;
    authentication_token: uint64;
    authentication_public_key: G1Element;
    payout_instructions: str;
    suggested_difficulty: Optional<uint64>;
  };
  signature: G2Element;
}
```
### response:
```typescript
{
  welcome_message: str;
} | {
  error_code: uint16;
  error_message: Optional<str>;
}
```
For content of `G1Element` / `G2Element`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/_python_types_.ts  

---

## `put_farmer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {put_farmer} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
const response = await put_farmer(agent, params);
```
### params
```typescript
{
  payload: {
    launcher_id: bytes32;
    authentication_token: uint64;
    authentication_public_key: Optional<G1Element>;
    payout_instructions: Optional<str>;
    suggested_difficulty: Optional<uint64>;
  };
  signature: G2Element;
}
```
### response:
```typescript
{
  authentication_public_key: Optional<bool>;
  payout_instructions: Optional<bool>;
  suggested_difficulty: Optional<bool>;
} | {
  error_code: uint16;
  error_message: Optional<str>;
}
```
For content of `G1Element` / `G2Element`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/_python_types_.ts

---

## `partial(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {partial} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
const response = await partial(agent, params);
```
### params:
```typescript
{
  payload: {
    launcher_id: bytes32;
    authentication_token: uint64;
    proof_of_space: ProofOfSpace;
    sp_hash: bytes32;
    end_of_sub_slot: bool;
    harvester_id: bytes32;
  };
  aggregate_signature: G2Element;
}
```
### response:
```typescript
{
  new_difficulty: uint64;
} | {
  error_code: int; // 4
  error_message: str; // "Invalid proof of space"
}
```
For content of `G2Element`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/_python_types_.ts
For content of `ProofOfSpace`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/proof_of_space.ts

---

## `login(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {login} = require("chia-agent/api/rpc/pool");
const agent = new RPCAgent(connectionInfo);
const response = await login(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
  authentication_token: uint64;
  signature: str;
}
```
### response:
```typescript
{
  farmer_record: FarmerRecord;
  recent_partials: Array<[uint64, uint64]>; // Array of tuple [timestamp, difficulty]
} | { };
```
