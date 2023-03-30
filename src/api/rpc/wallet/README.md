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
  max_ph_to_search?: int;
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

## `set_wallet_resync_on_startup(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {set_wallet_resync_on_startup} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await set_wallet_resync_on_startup(agent, params);
```
### params:
```typescript
{
  enable?: bool;
}
```
### response:
```typescript
{
  success: True;
}
```

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
  spend_bundle: str; // SpendBundle serialized to hex string 
}
```
### response:
```typescript
{}
```

---

## `push_transactions(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {push_transactions} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await push_transactions(agent, params);
```
### params:
```typescript
{
  transactions: str; // TransactionRecord serialized to hex string 
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

## `get_timestamp_for_height(agent)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {get_timestamp_for_height} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_timestamp_for_height(agent);
```

### response:

```typescript
{
  timestamp: uint64;
}
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
  include_data?: bool;
}
```
### response:
```typescript
{
  wallets: WalletInfo[];
  fingerprint?: int;
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
One of `TCreate_New_CAT_WalletRequest`, `TCreate_New_DID_WalletRequest`, `TCreate_New_NFT_WalletRequest`, `TCreate_New_Pool_WalletRequest`
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

type TCreate_New_DID_WalletRequest = {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
  metadata?: Record<str, str>;
  wallet_name?: str;
} | {
  fee?: uint64;
  wallet_type: "did_wallet";
  did_type: "recovery";
  backup_data: str;
};

type TCreate_New_NFT_WalletRequest = {
  fee?: uint64;
  wallet_type: "nft_wallet";
  did_id?: str;
  name?: str;
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
One of `TCreate_New_CAT_WalletResponse`, `TCreate_New_DID_WalletResponse`, `TCreate_New_NFT_WalletResponse`, `TCreate_New_Pool_WalletResponse`, `TCreateWalletErrorResponse`
```typescript
type TCreate_New_CAT_WalletResponse = {
  type: uint8;
  asset_id: str;
  wallet_id: uint32;
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

type TCreate_New_NFT_WalletResponse = {
  success: True;
  type: uint8;
  wallet_id: uint32;
};

type TCreate_New_Pool_WalletResponse = {
  total_fee: uint64;
  transaction: TransactionRecord;
  launcher_id: str;
  p2_singleton_puzzle_hash: str;
};

type TCreateWalletErrorResponse = {
  success: False;
  error: str;
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
    wallet_type: int;
    fingerprint?: int;
    asset_id?: str;
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
  wallet_id: uint32;
  amount: int;
  fee: int;
  address: str;
  memos?: str[];
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coin_ids?: str[];
  reuse_puzhash? : bool;
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
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coins?: Coin[];
  coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
}
|
{
  wallet_id: uint32;
  additions: TAdditions[];
  fee: uint64;
  amount: uint64;
  inner_address: str;
  memos?: str;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coin_ids?: str[];
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
  wallet_id?: uint32;
  additions: TAdditions[];
  fee?: uint64;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  coins?: Coin[];
  exclude_coins?: Coin[];
  coin_announcements?: TCoinAnnouncement[];
  puzzle_announcements?: TPuzzleAnnouncement[];
}
```
### response:
```typescript
{
  signed_txs: TransactionRecordConvenience[];
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
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  excluded_coin_amounts?: uint64[];
  excluded_coins?: Coin[];
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

## `get_spendable_coins(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {get_spendable_coins} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_spendable_coins(agent, params);
```

### params:

```typescript
{
  wallet_id: uint32;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  excluded_coin_amounts?: Optional<uint64[]>;
  excluded_coins?: Coin[];
  excluded_coin_ids?: str[];
}
```

### response:

```typescript
{
  confirmed_records: CoinRecord[];
  unconfirmed_removals: CoinRecord[];
  unconfirmed_additions: Coin[];
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_records.ts
For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

---

## `get_coin_records_by_names(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {get_coin_records_by_names} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_coin_records_by_names(agent, params);
```

### params:

```typescript
{
  names: str[];
  start_height?: uint32;
  end_height?: uint32;
  include_spent_coins?: bool;
}
```

### response:

```typescript
{
  coin_records: CoinRecord[];
}
```
For content of `CoinRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/coin_records.ts

---

## `get_current_derivation_index(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_current_derivation_index} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_current_derivation_index(agent);
```
### response:
```typescript
{
  success: True;
  index: Optional<uint32>;
}
```

---

## `extend_derivation_index(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {extend_derivation_index} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await extend_derivation_index(agent, params);
```
### params:
```typescript
{
  index: uint32;
}
```
### response:
```typescript
{
  success: True;
  index: Optional<uint32>;
}
```

---

## `get_notifications(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_notifications} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_notifications(agent, params);
```
### params:
```typescript
{
  ids?: str[];
  start?: int;
  end?: int;
}
```
### response:
```typescript
{
  notifications: Array<{
    id: str;
    message: str;
    amount: uint64;
    height: uint32;
  }>;
}
```

---

## `delete_notifications(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_notifications} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await delete_notifications(agent, params);
```
### params:
```typescript
{
  ids?: str[];
}
```
### response:
```typescript
{}
```

---

## `send_notification(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {send_notification} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await send_notification(agent, params);
```
### params:
```typescript
{
  target: str;
  message: str;
  amount: uint64;
  fee?: uint64;
}
```
### response:
```typescript
{
  tx: TransactionRecordConvenience;
}
```
For content of `TransactionRecord` and `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `verify_signature(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {verify_signature} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await verify_signature(agent, params);
```
### params:
```typescript
{
  message: str;
  signing_mode?: SigningMode;
  pubkey: str;
  signature: str;
  address?: str;
}
```
### response:
```typescript
{
  isValid: True;
}
|
{
  isValid: False;
  error: str;
}
```
For content of `SigningMode,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/signing_mode.ts

---

## `get_transaction_memo(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_transaction_memo} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await get_transaction_memo(agent, params);
```
### params:
```typescript
{
  transaction_id: str;
}
```
### response:
```typescript
{
  [transaction_id: string]: {
    [coin_id: string]: string[];
  };
}
```

---

## `sign_message_by_address(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {sign_message_by_address} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await sign_message_by_address(agent, params);
```
### params:
```typescript
{
  address: str;
  message: str;
  is_hex?: bool;
}
```
### response:
```typescript
{
  success: True;
  pubkey: str;
  signature: str;
  signing_mode: SigningMode;
}
```
For content of `SigningMode,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/signing_mode.ts

---

## `sign_message_by_id(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {sign_message_by_id} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await sign_message_by_id(agent, params);
```
### params:
```typescript
{
  id: str;
  message: str;
  is_hex? : bool;
}
```
### response:
```typescript
{
  success: False;
  error: str;
}
|
{
  success: True;
  pubkey: str;
  signature: str;
  latest_coin_id: str | None;
  signing_mode: SigningMode;
}
```
For content of `SigningMode,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/signing_mode.ts

---

## `nft_calculate_royalties(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_calculate_royalties} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_calculate_royalties(agent, params);
```
### params:
```typescript
{
  royalty_assets?: Array<{
    asset: str;
    royalty_address: str;
    royalty_percentage: uint16;
  }>;
  fungible_assets?: Array<{
    asset: str;
    amount: uint64
  }>;
}
```
### response:
```typescript
Record<str, Array<{asset: str; address: str; amount: uint64;}>>
```

---

## `nft_mint_bulk(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_mint_bulk} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_mint_bulk(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  royalty_address?: str;
  royalty_percentage?: uint16;
  metadata_list: Array<{
    uris: str[];
    meta_uris: str[];
    license_uris: str[];
    hash: str;
    edition_number?: uint64;
    edition_total?: uint64;
    meta_hash?: str;
    license_hash?: str;
  }>;
  target_list?: str[];
  mint_number_start?: int;
  mint_total?: int;
  xch_coins?: Coin[];
  xch_change_target?: str;
  new_innerpuzhash?: str;
  new_p2_puzhash?: str;
  did_coin?: Coin;
  did_lineage_parent?: str;
  mint_from_did?: bool;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: False;
  error: str;
} | {
  success: True;
  spend_bundle: SpendBundle;
  nft_id_list: str[];
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `nft_set_did_bulk(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_set_did_bulk} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_set_did_bulk(agent, params);
```
### params:
```typescript
{
  nft_coin_list: Array<{ nft_coin_id: str; wallet_id: uint32; }>;
  did_id?: str;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: False;
  error: str;
}
|
{
  success: True;
  wallet_id: uint32[];
  spend_bundle: SpendBundle;
  tx_num: int;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `nft_transfer_bulk(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_transfer_bulk} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_transfer_bulk(agent, params);
```
### params:
```typescript
{
  nft_coin_list: Array<{ nft_coin_id: str; wallet_id: uint32; }>;
  target_address: str;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: False;
  error: str;
}
|
{
  success: True;
  wallet_id: uint32[];
  spend_bundle: SpendBundle;
  tx_num: int;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

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
  wallet_id: uint32;
  name: str;
}
```
### response:
```typescript
{
  wallet_id: uint32;
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  wallet_id: uint32;
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
  wallet_id: uint32;
  additions?: TAdditions[];
  fee: uint64;
  amount: uint64;
  inner_address: str;
  memos?: str[];
  coins ? : Coin[];
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  exclude_coin_amounts?: uint64[];
  exclude_coin_ids?: str[];
  reuse_puzhash?: bool;
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  asset_id: str;
  wallet_id: uint32;
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
  driver_dict?: TDriverDict;
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  solver?: Record<str, any>;
  reuse_puzhash?: bool;
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
For content of `TDriverDict`,   
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/puzzle_drivers.ts
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
  advanced?: bool;
}
```
### response:
```typescript
{
  summary: {
    offered: Record<str, int>;
    requested: Record<str, int>;
    fees: int;
    drivers_dict: TDriverDict;
  };
  id: bytes32;
}
```
For content of `TDriverDict`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/puzzle_drivers.ts

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
  id: bytes32;
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
  min_coin_amount?: uint64;
  max_coin_amount?: uint64;
  solver?: Record<str, any>;
  reuse_puzhash?: bool;
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

## `cancel_offers(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {cancel_offers} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await cancel_offers(agent, params);
```
### params:
```typescript
{
  secure: bool;
  batch_fee?: uint64;
  batch_size?: int;
  cancel_all?: bool;
  asset_id?: str;
}
```
### response:
```typescript
{
  success: True;
}
```

---

## `did_set_wallet_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_set_wallet_name} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_set_wallet_name(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  name: str;
}
```
### response:
```typescript
{
  success: True;
  wallet_id: uint32;
} | {
  success: False;
  error: str;
}
```

---

## `did_get_wallet_name(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_wallet_name} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_wallet_name(agent, params);
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
  success: True;
  wallet_id: uint32;
  name: str;
}
```

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
  wallet_id: uint32;
  new_list: str[];
  num_verifications_required?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{}
```

---

## `did_update_metadata(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_update_metadata} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_update_metadata(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  metadata?: Record<str, str>;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `did_get_pubkey(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_pubkey} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_pubkey(agent);
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
  success: True;
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  wallet_id: uint32;
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
  wallet_id: uint32;
  attest_data: str[];
  pubkey: str;
  puzhash: str;
}
```
### response:
```typescript
{
  success: True;
  spend_bundle: SpendBundle;
} | {
  success: False;
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  recovery_list: str[];
  num_required: uint64;
}
```

---

## `did_get_metadata(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_metadata} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_metadata(agent, params);
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
  success: True;
  wallet_id: uint32;
  metadata: Record<str, str>
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
  wallet_id: uint32;
  coin_name: str;
  puzhash: str;
}
```
### response:
```typescript
{
  success: True;
  message_spend_bundle: str;
  info: [str, str, uint64];
  attest_data: str;
} | {
  success: False;
}
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  my_did: str;
  coin_name: str;
  newpuzhash: Optional<bytes32>;
  pubkey: Optional<bytes>;
  backup_dids: bytes[];
}
```

---

## `did_get_current_coin_info(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_get_current_coin_info} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_current_coin_info(agent, params);
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
  success: True;
  wallet_id: uint32;
  my_did: str;
  did_parent: bytes32;
  did_innerpuz: bytes32;
  did_amount: uint64;
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
  wallet_id: uint32;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  success: True;
  backup_data: str;
}
```

---

## `did_message_spend(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {did_message_spend} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_message_spend(agent, params);
```

### params:

```typescript
{
  wallet_id: uint32;
  coin_announcements: str[];
  puzzle_announcements: str[];
}
```

### response:

```typescript
{
  success: True;
  spend_bundle: SpendBundle;
}
```

---

## `did_get_info(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {did_get_info} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_get_info(agent, params);
```

### params:

```typescript
{
  coin_id: str;
  latest?: bool;
}
```

### response:

```typescript
{
  success: False;
  error: str;
}
|
{
  success: True;
  latest_coin: str;
  p2_address: str;
  public_key: str;
  recovery_list_hash: str;
  num_verification: int;
  metadata: Record<str, str>;
  launcher_id: str;
  full_puzzle: str; // hex bytes of serialized CLVM program
  solution: any;
  hints: str[];
}
```

---

## `did_find_lost_did(agent, params)`

### Usage

```js
const {RPCAgent} = require("chia-agent");
const {did_find_lost_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_find_lost_did(agent, params);
```

### params:

```typescript
{
  coin_id: str;
}
```

### response:

```typescript
{
  success: False;
  error: str;
}
|
{
  success: True;
  latest_coin_id: str;
}
```

---

## `did_transfer_did(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {did_transfer_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await did_transfer_did(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  inner_address: str;
  fee?: uint64;
  with_recovery_info?: bool;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: True;
  transaction: TransactionRecordConvenience;
  transaction_id: bytes32;
}
```
For content of `TransactionRecord` and `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `nft_mint_nft(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_mint_nft} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_mint_nft(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  royalty_address?: str;
  target_address?: str;
  uris: str[]; // Reference: NFTInfo.data_uris at chia/wallet/nft_wallet/nft_info.py
  meta_uris: str[]; // Reference: chia/wallet/nft_wallet/nft_info.py
  license_uris: str[]; // Reference: chia/wallet/nft_wallet/nft_info.py
  hash: str;
  edition_number: uint64;
  edition_total: uint64;
  meta_hash?: str;
  license_hash?: str;
  fee?: uint64;
  did_id?: str;
  royalty_percentage?: uint16;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
  nft_id: Optional<str>;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---
---

## `nft_count_nfts(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_count_nfts} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_count_nfts(agent, params);
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
  success: False;
  error: str;
}
|
{
  wallet_id: uint32;
  success: True;
  count: int;
}
```

---

## `nft_get_nfts(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_get_nfts} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_get_nfts(agent, params);
```
### params:
```typescript
{
  wallet_id?: uint32;
  start_index?: int;
  num?: int;
  ignore_size_limit?: bool;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  success: True;
  nft_list: NFTInfo[];
}
```
For content of `NFTInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/nft_wallet/neft_info.ts

---

## `nft_set_nft_did(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_set_nft_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_set_nft_did(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  did_id?: str;
  nft_coin_id: str;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  success: True;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `nft_get_by_did(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_get_by_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_get_by_did(agent, params);
```
### params:
```typescript
{
  did_id: str;
}
```
### response:
```typescript
{
  wallet_id: uint32;
  success: True;
} | {
  success: False;
  error: str;
}
```

---

## `nft_get_wallet_did(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_get_wallet_did} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_get_wallet_did(agent, params);
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
  did_id: Optional<str>;
  success: True;
}
```

---

## `nft_get_wallets_with_dids(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_get_wallets_with_dids} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_get_wallets_with_dids(agent);
```
### response:
```typescript
{
  success: True;
  nft_wallets: Array<{
    wallet_id: uint32;
    did_id: str;
    did_wallet_id: uint32;
  }>;
}
```

---

## `nft_set_nft_status(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_set_nft_status} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_set_nft_status(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  coin_id: str;
  in_transaction: bool;
}
```
### response:
```typescript
{
  success: True;
}
```

---

## `nft_transfer_nft(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_transfer_nft} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_transfer_nft(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  target_address: str;
  nft_coin_id: str;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
} | {
  success: False;
  error: str;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `nft_get_info(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_get_info} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_get_info(agent, params);
```
### params:
```typescript
{
  coin_id: str;
  latest?: bool;
  ignore_size_limit?: bool;
}
```
### response:
```typescript
{
  success: True;
  nft_info: NFTInfo;
} | {
  success: False;
  error: str;
}
```
For content of `NFTInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/nft_wallet/neft_info.ts

---

## `nft_add_uri(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {nft_add_uri} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await nft_add_uri(agent, params);
```
### params:
```typescript
{
  wallet_id: uint32;
  uri: str;
  key: str;
  nft_coin_id: str;
  fee?: uint64;
  reuse_puzhash?: bool;
}
```
### response:
```typescript
{
  success: True;
  wallet_id: uint32;
  spend_bundle: SpendBundle;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

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
}
```
For content of `PoolWalletInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/pools/pool_wallet_info.ts

For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `create_new_dl(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {create_new_dl} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await create_new_dl(agent, params);
```
### params:
```typescript
{
  root: str;
  fee?: uint64;
}
```
### response:
```typescript
{
  success: False;
  error: str;
} | {
  success: True;
  transactions: TransactionRecordConvenience[];
  launcher_id: bytes32;
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `dl_track_new(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_track_new} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_track_new(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
}
```
### response:
```typescript
{
}
```

---

## `dl_stop_tracking(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_stop_tracking} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_stop_tracking(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
}
```
### response:
```typescript
{
}
```

---

## `dl_latest_singleton(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_latest_singleton} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_latest_singleton(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
  only_confirmed?: bool;
}
```
### response:
```typescript
{
  singleton: Optional<SingletonRecord>;
}
```
For content of `SingletonRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/lineage_proof.ts

---

## `dl_singletons_by_root(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_singletons_by_root} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_singletons_by_root(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
  root: str;
}
```
### response:
```typescript
{
  singletons: SingletonRecord[];
}
```
For content of `SingletonRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/lineage_proof.ts

---

## `dl_update_root(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_update_root} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_update_root(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
  new_root: str;
  fee?: uint64;
}
```
### response:
```typescript
{
  tx_record: TransactionRecordConvenience;
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `dl_update_multiple(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_update_multiple} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_update_multiple(agent, params);
```
### params:
```typescript
{
  updates: Record<str, str>; // {[launcher_id]: root}
}
```
### response:
```typescript
{
  tx_records: TransactionRecordConvenience[];
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `dl_history(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_history} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_history(agent, params);
```
### params:
```typescript
{
  min_generation?: uint32;
  max_generation?: uint32;
  num_results?: uint32;
}
```
### response:
```typescript
{
  history: SingletonRecord[];
  count: int;
}
```
For content of `SingletonRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/lineage_proof.ts

---

## `dl_owned_singletons(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_owned_singletons} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_owned_singletons(agent);
```
### response:
```typescript
{
  singletons: SingletonRecord[];
  count: int;
}
```
For content of `SingletonRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/lineage_proof.ts

---

## `dl_get_mirrors(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_get_mirrors} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_get_mirrors(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
}
```
### response:
```typescript
{
  mirrors: Mirror[];
}
```
For content of `Mirror`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/data_layer/data_layer_wallet.ts

---

## `dl_new_mirror(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_new_mirror} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_new_mirror(agent, params);
```
### params:
```typescript
{
  launcher_id: str;
  amount: uint64;
  urls: str[];
  fee?: uint64;
}
```
### response:
```typescript
{
  transactions: TransactionRecordConvenience[];
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `dl_delete_mirror(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {dl_delete_mirror} = require("chia-agent/api/rpc/wallet");
const agent = new RPCAgent({service: "wallet"});
const response = await dl_delete_mirror(agent, params);
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
  transactions: TransactionRecordConvenience[];
}
```
For content of `TransactionRecordConvenience`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts
