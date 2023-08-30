# Data Layer RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {create_data_store} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({
  service: "data_layer", // connect to local farmer service using config file.
});
// Then call RPC function
const response = await create_data_store(agent, {...});

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

## `create_data_store(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {create_data_store} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await create_data_store(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
}
```
### response:
```typescript
{
  txs: TransactionRecord[];
  id: str;
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_owned_stores(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_owned_stores} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_owned_stores(agent);
```
### response:
```typescript
{
  store_ids: str[];
}
```

---

## `batch_update(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {batch_update} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await batch_update(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  changelist: Array<{
    key: str;
    reference_node_hash?: str;
    side?: 0|1;
    value?: str;
  }>;
  id: str;
}
```
### response:
```typescript
{
  tx_id: bytes32;
}
```

---

## `get_value(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_value} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_value(agent, params);
```
### params:
```typescript
{
  id: str;
  key: str;
  root_hash?: str;
}
```
### response:
```typescript
{
  value: str|None;
}
```

---

## `get_keys(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_keys} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_keys(agent, params);
```
### params:
```typescript
{
  id: str;
  root_hash?: str;
}
```
### response:
```typescript
{
  keys: str[];
}
```

---

## `get_keys_values(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_keys_values} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_keys_values(agent, params);
```
### params:
```typescript
{
  id: str;
  root_hash?: str;
}
```
### response:
```typescript
{
  keys_values: Array<{
    hash: str;
    key: str;
    value: str;
  }>;
}
```

---

## `get_ancestors(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_ancestors} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_ancestors(agent, params);
```
### params:
```typescript
{
  id: str;
  hash: str;
}
```
### response:
```typescript
{
  ancestors: Array<{
    hash: str;
    left_hash: str;
    right_hash: str;
  }>;
}
```

---

## `get_root(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_root} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_root(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  hash: bytes32;
  confirmed: bool;
  timestamp: uint64;
}
```

---

## `get_local_root(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_local_root} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_local_root(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  hash: bytes32|None;
}
```

---

## `get_roots(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_roots} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_roots(agent, params);
```
### params:
```typescript
{
  ids: str[];
}
```
### response:
```typescript
{
  root_hashes: Array<{
    id: bytes32;
    hash: bytes32;
    confirmed: bool;
    timestamp: uint64;
  }>;
}
```

---

## `delete_key(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_key} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await delete_key(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  key: str;
  id: str;
}
```
### response:
```typescript
{
  tx_id: bytes32;
}
```

---

## `insert(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {insert} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await insert(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  key: str;
  value: str;
  id: str;
}
```
### response:
```typescript
{
  tx_id: bytes32;
}
```

---

## `subscribe(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {subscribe} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await subscribe(agent, params);
```
### params:
```typescript
{
  id: str;
  urls: str[];
}
```
### response:
```typescript
{
}
```

---

## `unsubscribe(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {unsubscribe} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await unsubscribe(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
}
```

---

## `add_mirror(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {add_mirror} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await add_mirror(agent, params);
```
### params:
```typescript
{
  id: str;
  urls: str[];
  amount: uint64;
  fee?: uint64;
}
```
### response:
```typescript
{
}
```

---

## `delete_mirror(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_mirror} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await delete_mirror(agent, params);
```
### params:
```typescript
{
  coin_id: str;
  fee?: uint64;
}
```
### response:
```typescript
{
}
```

---

## `get_mirrors(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_mirrors} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_mirrors(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  mirrors: Array<{
    coin_id: str;
    launcher_id: str;
    amount: uint64;
    urls: str[];
    ours: bool;
  }>;
}
```

---

## `remove_subscriptions(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {remove_subscriptions} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await remove_subscriptions(agent, params);
```
### params:
```typescript
{
  id: str;
  urls: str[];
}
```
### response:
```typescript
{
}
```

---

## `subscriptions(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {subscriptions} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await subscriptions(agent);
```
### response:
```typescript
{
  store_ids: str[];
}
```

---

## `get_kv_diff(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_kv_diff} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_kv_diff(agent, params);
```
### params:
```typescript
{
  id: str;
  hash_1: str;
  hash_2: str;
}
```
### response:
```typescript
{
  diff: Array<{
    type: str;
    key: str;
    value: str;
  }>;
}
```

---

## `get_root_history(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_root_history} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_root_history(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  root_history: Array<{
    root_hash: bytes32;
    confirmed: bool;
    timestamp: uint64;
  }>;
}
```

---

## `add_missing_files(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {add_missing_files} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await add_missing_files(agent, params);
```
### params:
```typescript
{
  ids?: str[];
  overwrite?: bool;
  foldername?: str;
}
```
### response:
```typescript
{
}
```

---

## `make_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {make_offer} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await make_offer(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  maker: OfferStoreMarshalled;
  taker: OfferStoreMarshalled;
}
```
### response:
```typescript
{
  success: bool;
  offer: OfferMarshalled;
}
```
For content of `OfferStoreMarshalled` and `OfferMarshalled`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer.util.ts

---

## `take_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {take_offer} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await take_offer(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  offer: OfferMarshalled;
}
```
### response:
```typescript
{
  success: bool;
  trade_id: str;
}
```
For content of `OfferMarshalled`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer.util.ts

---

## `verify_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {verify_offer} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await verify_offer(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  offer: OfferMarshalled;
}
```
### response:
```typescript
{
  success: bool;
  valid: bool;
  error: Optional<str>;
  fee: Optional<uint64>;
}
```

---

## `cancel_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cancel_offer} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await cancel_offer(agent, params);
```
### params:
```typescript
{
  trade_id: str;
  secure: bool;
  fee?: uint64;
}
```
### response:
```typescript
{
  success: bool;
}
```

---

## `get_sync_status(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {get_sync_status} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await get_sync_status(agent, params);
```
### params:
```typescript
{
  id: str;
}
```
### response:
```typescript
{
  sync_status: SyncStatus;
}
```
For content of `SyncStatus`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer.util.ts

---

## `check_plugins(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {check_plugins} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await check_plugins(agent, params);
```
### response:
```typescript
PluginStatusMarshalled
```
For content of `PluginStatusMarshalled`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer.util.ts

---

## `clear_pending_roots(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {clear_pending_roots} = require("chia-agent/api/rpc/data_layer");
const agent = new RPCAgent({service: "data_layer"});
const response = await clear_pending_roots(agent, params);
```
### params:
```typescript
{
  store_id: str;
}
```
### response:
```typescript
{
  success: bool;
  root: Optional<RootMarshalled>;
}
```
For content of `RootMarshalled`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer.util.ts
