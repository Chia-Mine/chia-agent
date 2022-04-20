# Wallet RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_public_keys} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({
  service: "wallet", // connect to local wallet service using config file.
});
// Then call RPC function
const response = await get_public_keys(agent, {...});



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

## `log_in(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {log_in} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await log_in(agent, params);
```
### params:
```typescript
{
  fingerprint: int;
}
```
### response:
```typescript
{
  fingerprint: int;
} | {
  success: False;
  error: "Unknown Error";
}
```

---

## `get_logged_in_fingerprint(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_logged_in_fingerprint} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_logged_in_fingerprint(agent);
```
### response:
```typescript
{
  fingerprint: Optional<int>;
}
```


---

## `get_public_keys(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_public_keys} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_public_keys(agent);
```
### response:
```typescript
{
  public_key_fingerprints: int[];
} | {
  keyring_is_locked: True;
}
```

---

## `get_private_key(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_private_key} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_private_key(agent, params);
```
### params:
```typescript
{
  fingerprint: int;
}
```
### response:
```typescript
private_key: {
  fingerprint: int;
  sk: str;
  pk: str;
  farmer_pk: str;
  pool_pk: str;
  seed: str;
}
```

---

## `generate_mnemonic(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {generate_mnemonic} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await generate_mnemonic(agent);
```
### response:
```typescript
{
  mnemonic: str[];
}
```

---

## `add_key(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {add_key} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await add_key(agent, params);
```
### params:
```typescript
{
  mnemonic: str[];
}
```
### response:
```typescript
{
  success: false;
  error: str;
  word?: unknown; // @todo replace unknown to actual type
} | {
  fingerprint: int;
}
```

---

## `delete_key(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_key} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await delete_key(agent, params);
```
### params:
```typescript
{
  fingerprint: int;
}
```
### response:
```typescript
{}
```

---

## `check_delete_key(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {check_delete_key} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await check_delete_key(agent, params);
```
### params:
```typescript
{
  fingerprint: int;
}
```
### response:
```typescript
{
  fingerprint: int;
  used_for_farmer_rewards: bool;
  used_for_pool_rewards: bool;
  wallet_balance: bool;
}
```

---

## `delete_all_keys(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_all_keys} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await delete_all_keys(agent);
```
### response:
```typescript
{} | {
  success: False;
  error: str;
}
```
No params nor response 

---

## `get_sync_status(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_sync_status} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_sync_status(agent);
```
### response:
```typescript
{
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
}
```

---

## `get_height_info(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_height_info} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_height_info(agent);
```
### response:
```typescript
{
  height: uint32;
}
```

---

## `push_tx(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {push_tx} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await push_tx(agent, params);
```
### params:
```typescript
{
  spend_bundle: str; // streamable binary in hex string 
}
```
### response:
```typescript
{}
```

---

## `farm_block(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {farm_block} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await farm_block(agent, params);
```
### params:
```typescript
{
  address: str;
}
```
### response:
```typescript
{}
```

---

## `get_initial_freeze_period_of_wallet(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_initial_freeze_period_of_wallet} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_initial_freeze_period_of_wallet(agent);
```
### response:
```typescript
{
  INITIAL_FREEZE_END_TIMESTAMP: 1620061200; // Mon May 03 2021 17:00:00 GMT+0000
}
```

---

## `get_network_info_of_wallet(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_network_info_of_wallet} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_network_info_of_wallet(agent);
```
### response:
```typescript
{
  network_name: str;
  network_prefix: str;
}
```

---

## `get_wallets(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_wallets} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_wallets(agent, params);
```
### params:
```typescript
{
  type?: int;
}
```
### response:
```typescript
{
  wallets: WalletInfo[];
}
```
For content of `WalletInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/wallet_info.ts

---

## `create_new_wallet(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {create_new_wallet} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await create_new_wallet(agent, params);
```
### params:
One of `TCreate_New_CAT_WalletRequest`, `TCreate_New_RL_WalletRequest`, `TCreate_New_DID_WalletRequest`, `TCreate_New_Pool_WalletRequest`
```typescript
type TCreate_New_CAT_WalletRequest = {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "new";
  amount: uint64;
} | {
  fee?: uint64;
  wallet_type: "cat_wallet"
  mode: "existing";
  asset_id: str;
};

type TCreate_New_RL_WalletRequest = {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "admin";
  interval: int;
  limit: int;
  pubkey: str;
  amount: int;
  fee: int;
} | {
  fee?: uint64;
  wallet_type: "rl_wallet";
  rl_type: "user";
};

type TCreate_New_DID_WalletRequest = {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
} | {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "recovery";
  filename: str;
};

type TCreate_New_Pool_WalletRequest = {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "new";
  initial_target_state: {
    state: "SELF_POOLING";
  } | {
    state: "FARMING_TO_POOL";
    target_puzzle_hash: str;
    pool_url: str;
    relative_lock_height: uint32;
  };
  p2_singleton_delayed_ph?: str;
  p2_singleton_delay_time?: uint64;
} | {
  fee?: uint64;
  wallet_type: "pool_wallet";
  mode: "recovery";
};
```
### response:
One of `TCreate_New_CAT_WalletResponse`, `TCreate_New_RL_WalletResponse`, `TCreate_New_DID_WalletResponse`, `TCreate_New_Pool_WalletResponse`
```typescript
type TCreate_New_CAT_WalletResponse = {
  type: uint8;
  asset_id: str;
  wallet_id: uint32;
};

type TCreate_New_RL_WalletResponse = {
  success: bool;
  id: uint32;
  type: uint8;
  origin: Optional<Coin>;
  pubkey: str;
} | {
  id: uint32;
  type: uint8;
  pubkey: str;
};

type TCreate_New_DID_WalletResponse = {
  success: true;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
} | {
  success: true;
  type: uint8;
  my_did: str;
  wallet_id: uint32;
  coin_name: bytes32;
  coin_list: [bytes32, bytes32, uint64];
  newpuzhash: str;
  pubkey: str;
  backup_dids: bytes[];
  num_verifications_required: uint64;
};

type TCreate_New_Pool_WalletResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  launcher_id: str;
  p2_singleton_puzzle_hash: str;
};
```
For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts  
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_wallet_balance(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_wallet_balance} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_wallet_balance(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128; // MEMO: cat_wallet, did_wallet and pool_wallet declare `uint64`. rl_wallet and standard_wallet declare uint128.
    unconfirmed_wallet_balance: uint128;
    spendable_balance: uint128;
    pending_change: uint64;
    max_send_amount: uint64;
    unspent_coin_count: int;
    pending_coin_removal_count: int;
    fingerprint?: int;
  }
}
```

---

## `get_transaction(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_transaction} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_transaction(agent, params);
```
### params:
```typescript
{
  transaction_id: bytes32;
}
```
### response:
```typescript
{
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_transactions(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_transactions} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_transactions(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  start?: int;
  end?: int;
  sort_key?: str;
  reverse?: bool;
  to_address?: str;
}
```
### response:
```typescript
{
  transactions: TransactionRecordConvenience[];
  wallet_id: int;
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_next_address(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_next_address} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_next_address(agent, params);
```
### params:
```typescript
{
  new_address: bool;
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  address: str;
}
```

---

## `send_transaction(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {send_transaction} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await send_transaction(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  amount: int;
  fee: int;
  address: str;
  memos?: str[];
}
```
### response:
```typescript
{
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `send_transaction_multi(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {send_transaction_multi} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await send_transaction_multi(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
}
```
### response:
```typescript
{
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecordConvenience["name"];
}
```
For content of `TAdditions`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

For content of `TCoinAnnouncement`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `TPuzzleAnnouncement`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_transaction_count(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_transaction_count} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_transaction_count(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  count: int;
  wallet_id: int;
}
```

---

## `get_farmed_amount(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_farmed_amount} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_farmed_amount(agent);
```
### response:
```typescript
{
  farmed_amount: int;
  pool_reward_amount: int;
  farmer_reward_amount: int;
  fee_amount: int;
  last_height_farmed: int;
}
```

---

## `create_signed_transaction(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {create_signed_transaction} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await create_signed_transaction(agent, params);
```
### params:
```typescript
{
  additions: TAdditions[];
  fee?: uint64;
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
}
```
### response:
```typescript
{
  signed_tx: TransactionRecordConvenience;
}
```
For content of `TAdditions`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

For content of `TCoinAnnouncement`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `TPuzzleAnnouncement`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/rpc/wallet/index.ts

For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `delete_unconfirmed_transactions(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_unconfirmed_transactions} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await delete_unconfirmed_transactions(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
}
```
### response:
```typescript
{}
```

---

## `select_coins(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {select_coins} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await select_coins(agent, params);
```
### params:
```typescript
{
  amount: uint64;
  wallet_id: uint32;
}
```
### response:
```typescript
{
  coins: Coin[];
}
```
For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

---

## `cat_set_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cat_set_name} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cat_set_name(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  name: str;
}
```
### response:
```typescript
{
  wallet_id: int;
}
```

---

## `cat_asset_id_to_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cat_asset_id_to_name} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cat_asset_id_to_name(agent, params);
```
### params:
```typescript
{
  asset_id: str;
}
```
### response:
```typescript
{
  wallet_id: Optional<uint32>;
  name: str;
}
```


---

## `cat_get_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cat_get_name} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cat_get_name(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_id: int;
  name: str;
}
```


---

## `get_stray_cats(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_stray_cats} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_stray_cats(agent);
```
### response:
```typescript
{
  stray_cats: Array<{
    asset_id: str;
    name: str;
    first_seen_height: int;
    sender_puzzle_hash: str;
  }>;
}
```

---

## `cat_spend(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cat_spend} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cat_spend(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  inner_address: str;
  memos?: str[];
  amount: uint64;
  fee: uint64;
}
```
### response:
```typescript
{
  transaction: TransactionRecordConvenience;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecord` and `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `cat_get_asset_id(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cat_get_asset_id} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cat_get_asset_id(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  asset_id: str;
  wallet_id: int;
}
```

---

## `create_offer_for_ids(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {create_offer_for_ids} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await create_offer_for_ids(agent, params);
```
### params:
```typescript
{
  offer: Record<int, int>;
  fee?: uint64;
  validate_only?: bool;
}
```
### response:
```typescript
{
  offer: str;
  trade_record: TradeRecordConvenience;
}
```
For content of `TradeRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/trade_record.ts

---

## `get_offer_summary(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_offer_summary} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_offer_summary(agent, params);
```
### params:
```typescript
{
  offer: str;
}
```
### response:
```typescript
{
  summary: {
    offered: Record<str, int>;
    requested: Record<str, int>;
    fees: int;
  };
}
```

---

## `check_offer_validity(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {check_offer_validity} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await check_offer_validity(agent, params);
```
### params:
```typescript
{
  offer: str;
}
```
### response:
```typescript
{
  valid: bool;
}
```

---

## `take_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {take_offer} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await take_offer(agent, params);
```
### params:
```typescript
{
  offer: str;
  fee?: uint64;
}
```
### response:
```typescript
{
  trade_record: TradeRecordConvenience;
}
```
For content of `TradeRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/trade_record.ts

---

## `get_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_offer} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_offer(agent, params);
```
### params:
```typescript
{
  trade_id: str;
  file_contents?: bool;
}
```
### response:
```typescript
{
  trade_record: TradeRecordConvenience;
  offer: Optional<str>;
}
```
For content of `TradeRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/trade_record.ts

---

## `get_all_offers(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_all_offers} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_all_offers(agent, params);
```
### params:
```typescript
{
  start?: int;
  end?: int;
  exclude_my_offers?: bool;
  exclude_taken_offers?: bool;
  include_completed?: bool;
  sort_key?: str;
  reverse?: bool;
  file_contents?: bool;
}
```
### response:
```typescript
{
  trade_records: TradeRecordConvenience[];
  offers: Optional<str[]>;
}
```
For content of `TradeRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/trade_record.ts

---

## `get_offers_count(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_offers_count} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_offers_count(agent);
```
### response:
```typescript
{
  total: int;
  my_offers_count: int;
  taken_offers_count: int;
}
```

---

## `cancel_offer(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cancel_offer} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cancel_offer(agent, params);
```
### params:
```typescript
{
  secure: bool;
  trade_id: str;
  fee?: uint64;
}
```
### response:
```typescript
{}
```

---

## `get_cat_list(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_cat_list} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_cat_list(agent);
```
### response:
```typescript
{
  cat_list: CAT[];
}
```
For content of `CAT`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/cat_wallet/cat_constants.ts

---

## `did_update_recovery_ids(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_update_recovery_ids} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_update_recovery_ids(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  new_list: str[];
  num_verifications_required?: uint64;
}
```
### response:
```typescript
{}
```

---

## `did_get_pubkey(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_pubkey} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_pubkey(agent);
```
### response:
```typescript
{
  pubkey: str;
}
```

---

## `did_get_did(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_did(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_id: int;
  my_did: str;
  coin_id?: bytes32;
}
```

---

## `did_recovery_spend(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_recovery_spend} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_recovery_spend(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  attest_filenames: str[];
  pubkey: str;
  puzhash: str;
}
```
### response:
```typescript
{
  success: SpendBundle;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `did_get_recovery_list(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_recovery_list} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_recovery_list(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_id: int;
  recover_list: str[];
  num_required: uint64;
}
```

---

## `did_create_attest(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_create_attest} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_create_attest(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  coin_name: str;
  puzhash: str;
  filename: str;
}
```
### response:
```typescript
{
  message_spend_bundle: str;
  info: [str, str, uint64];
} | {}
```

---

## `did_get_information_needed_for_recovery(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_information_needed_for_recovery} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_information_needed_for_recovery(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
}
```
### response:
```typescript
{
  wallet_id: int;
  my_did: str;
  coin_name: str;
  newpuzhash: Optional<bytes32>;
  pubkey: Optional<bytes>;
  backup_dids: bytes[];
}
```

---

## `did_create_backup_file(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_create_backup_file} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_create_backup_file(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  filename: str;
}
```
### response:
```typescript
{
  wallet_id: int;
}
```

---

## `rl_set_user_info(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {rl_set_user_info} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await rl_set_user_info(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  origin: {
    parent_coin_info: str;
    puzzle_hash: str;
    amount: uint64;
  };
  interval: uint64;
  limit: uint64;
  admin_pubkey: str;
}
```
### response:
```typescript
{}
```

---

## `send_clawback_transaction(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {send_clawback_transaction} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await send_clawback_transaction(agent, params);
```
### params:
```typescript
{
  wallet_id: int;
  fee: int;
}
```
### response:
```typescript
{
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `add_rate_limited_funds(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {add_rate_limited_funds} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await add_rate_limited_funds(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  amount: uint64;
  fee: uint64;
}
```
### response:
```typescript
{
  status: "SUCCESS";
}
```

---

## `pw_join_pool(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pw_join_pool} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await pw_join_pool(agent, params);
```
### params:
```typescript
{
  fee?: uint64;
  wallet_id: uint32;
  target_puzzlehash: string;
  pool_url: Optional<str>;
  relative_lock_height: uint32;
}
```
### response:
```typescript
{
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `pw_self_pool(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pw_self_pool} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await pw_self_pool(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  fee?: uint64;
}
```
### response:
```typescript
{
  total_fee: uint64;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `pw_absorb_rewards(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pw_absorb_rewards} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await pw_absorb_rewards(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  fee?: uint64;
  max_spends_in_tx?: int;
}
```
### response:
```typescript
{
  state: PoolWalletInfo;
  transaction: TransactionRecord;
  fee_transaction: Optional<TransactionRecord>;
} | {
  success: False;
  error: "not_initialized";
};
```
For content of `PoolWalletInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/pools/pool_wallet_info.ts

For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `pw_status(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {pw_status} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await pw_status(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
}
```
### response:
```typescript
{
  state: PoolWalletInfo;
  unconfirmed_transactions: TransactionRecord[];
} | {
  success: False;
  error: "not_initialized";
}
```
For content of `PoolWalletInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/pools/pool_wallet_info.ts

For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts
