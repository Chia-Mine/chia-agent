# Wallet RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {get_public_keys} = require("chia-agent/api/rpc");
const agent = new RPCAgent({
  destination: "wallet", // connect to local wallet service using config file.
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
### params:
```typescript
{
  fingerprint: int;
  type: "skip";
  host: str;
} | {
  fingerprint: int;
  type: "restore_backup";
  host: str;
  file_path: str;
}
```
### response:
```typescript
{
  fingerprint: int;
} | {
  success: False;
  error: "not_initialized" | "Unknown Error";
} | {
  success: False;
  error: "not_initialized";
  backup_info: BackupInfo;
  backup_path: str;
}
```
For content of `BackupInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/util/backup_utils.ts

---

## `get_public_keys(agent)`
### response
```typescript
{
  public_key_fingerprints: int[];
}
```

---

## `get_private_key(agent, params)`
### params:
```typescript
{
  fingerprint: int;
}
```
### response
```typescript
private_key: {
  fingerprint: int;
  sk: str;
  pk: str;
  seed: str;
}
```

---

## `generate_mnemonic(agent)`
### response
```typescript
{
  mnemonic: str[];
}
```

---

## `add_key(agent, params)`
### params:
```typescript
{
  mnemonic: str[];
  type: "new_wallet" | "skip";
} | {
  mnemonic: str[];
  type: "restore_backup";
  file_path: str;
}
```
### response
```typescript
{
  success: false;
  error: str;
  word: unknown; // @todo replace unknown to actual type
} | {
  fingerprint: int;
}
```

---

## `delete_key(agent, params)`
### params:
```typescript
{
  fingerprint: int;
}
```
### response
```typescript
{}
```

---

## `delete_all_keys(agent)`
### response
```typescript
{}
```
No input nor response 

---

## `get_sync_status(agent)`
### response
```typescript
{
  synced: bool;
  syncing: bool;
  genesis_initialized: bool;
}
```

---

## `get_height_info(agent)`
### response
```typescript
{
  height: uint32;
}
```

---

## `farm_block(agent, params)`
### params:
```typescript
{
  address: str;
}
```
### response
```typescript
{}
```

---

## `get_initial_freeze_period(agent)`
### response
```typescript
{
  INITIAL_FREEZE_END_TIMESTAMP: uint64;
}
```

---

## `get_network_info(agent)`
### response
```typescript
{
  network_name: str;
  network_prefix: str;
}
```

---

## `get_wallets(agent)`
### response
```typescript
{
  wallets: WalletInfo[];
}
```
For content of `WalletInfo`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/wallet_info.ts

---

## `create_new_wallet(agent, params)`
### params:
One of `TCreate_New_CC_WalletRequest`, `TCreate_New_RC_WalletRequest`, `TCreate_New_DID_WalletRequest`
```typescript
type TCreate_New_CC_WalletRequest = {
  host: str;
  wallet_type: "cc_wallet"
  mode: "new";
  amount: uint64;
} | {
  host: str;
  wallet_type: "cc_wallet"
  mode: "existing";
  colour: str;
};

type TCreate_New_RC_WalletRequest = {
  host: str;
  wallet_type: "rc_wallet";
  rl_type: "admin";
  interval: int;
  limit: int;
  pubkey: str;
  amount: int;
  fee: int;
} | {
  host: str;
  wallet_type: "rc_wallet";
  rl_type: "user";
};

type TCreate_New_DID_WalletRequest = {
  host: str;
  wallet_type: "did_wallet";
  did_type: "new";
  backup_dids: str[];
  num_of_backup_ids_needed: uint64;
  amount: int;
} | {
  host: str;
  wallet_type: "did_wallet";
  did_type: "recovery";
  filename: str;
};
```
### response
One of `TCreate_New_CC_WalletResponse`, `TCreate_New_RC_WalletResponse`, `TCreate_New_DID_WalletResponse`
```typescript
type TCreate_New_CC_WalletResponse = {
  type: uint8;
  colour: str;
  wallet_id: uint32;
} | {
  type: uint8;
};

type TCreate_New_RC_WalletResponse = {
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
```
For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

---

## `get_wallet_balance(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_balance: {
    wallet_id: uint32;
    confirmed_wallet_balance: uint128;
      unconfirmed_wallet_balance: uint128;
      spendable_balance: uint128;
      pending_change: uint64;
      max_send_amount: uint64;
      unspent_coin_count: int;
    pending_coin_removal_count: int;
  }
}
```

---

## `get_transaction(agent, params)`
### params:
```typescript
{
  transaction_id: bytes32;
}
```
### response
```typescript
{
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_transactions(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  start?: int;
  end?: int;
}
```
### response
```typescript
{
  transactions: Array<TransactionRecord & {to_address: string}>;
  wallet_id: int;
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `get_next_address(agent, params)`
### params:
```typescript
{
  new_address: bool;
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_id: uint32;
  address: str;
}
```

---

## `send_transaction(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  amount: int;
  fee: int;
  address: str;
}
```
### response
```typescript
{
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `create_backup(agent, params)`
### params:
```typescript
{
  file_path: str;
}
```
### response
```typescript
{}
```

---

## `get_transaction_count(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_id: int;
  count: int;
}
```

---

## `get_farmed_amount(agent)`
### response
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
### params:
```typescript
{
  additions: Array<{
    amount: uint64;
    puzzle_hash: str;
  }>;
  fee?: uint64;
  coins?: Coin[];
}
```
### response
```typescript
{
  signed_tx: TransactionRecord;
}
```
For content of `Coin`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/blockchain_format/coin.ts

For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `cc_set_name(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  name: str;
}
```
### response
```typescript
{
  wallet_id: int;
}
```

---

## `cc_get_name(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_id: int;
  name: str;
}
```

---

## `cc_spend(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  inner_address: str;
  amount: int;
  fee?: uint64;
}
```
### response
```typescript
{
  transaction: TransactionRecord;
  transaction_id: TransactionRecord["name"];
}
```
For content of `TransactionRecord`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/wallet/transaction_record.ts

---

## `cc_get_colour(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  colour: str;
  wallet_id: int;
}
```

---

## `create_offer_for_ids(agent, params)`
### params:
```typescript
{
  ids: Record<int, int>;
  filename: str;
}
```
### response
```typescript
{
  discrepancies: Optional<Record<str, int>>;
}
```

---

## `get_discrepancies_for_offer(agent, params)`
### params:
```typescript
{
  filename: str;
}
```
### response
```typescript
{}
```

---

## `respond_to_offer(agent, params)`
### params:
```typescript
{
  filename: str;
}
```
### response
```typescript
{}
```

---

## `get_trade(agent, params)`
### params:
```typescript
{
  trade_id: bytes;
}
```
### response
```typescript
{
  trade: {
    trade_id: str;
    sent: uint32;
    my_offer: bool;
    created_at_time: uint64;
    accepted_at_time: Optional<uint64>;
    confirmed_at_index: uint32;
    status: str;
    offer_dict: Optional<Record<str, int>>;
  }
}
```

---

## `get_all_trades(agent)`
### response
```typescript
{
  trades: Array<{
    trade_id: str;
    sent: uint32;
    my_offer: bool;
    created_at_time: uint64;
    accepted_at_time: Optional<uint64>;
    confirmed_at_index: uint32;
    status: str;
    offer_dict: Optional<Record<str, int>>;
  }>;
}
```

---

## `cancel_trade(agent, params)`
### params:
```typescript
{
  secure: bool;
  trade_id: str;
}
```
### response
```typescript
{}
```

---

## `did_update_recovery_ids(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  new_list: str[];
  num_verifications_required?: uint64;
}
```
### response
```typescript
{}
```

---

## `did_spend(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  puzzlehash: bytes32;
}
```
### response
```typescript
{}
```

---

## `did_get_pubkey(agent, params)`
### response
```typescript
{
  pubkey: str;
}
```

---

## `did_get_did(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_id: int;
  my_did: str;
  coin_id?: bytes32;
}
```

---

## `did_recovery_spend(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  attest_filenames: str[];
  pubkey: str;
  puzhash: str;
}
```
### response
```typescript
{
  success: SpendBundle;
}
```
For content of `SpendBundle`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/types/spend_bundle.ts

---

## `did_get_recovery_list(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
```typescript
{
  wallet_id: int;
  recover_list: str[];
  num_required: uint64;
}
```

---

## `did_create_attest(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  coin_name: str;
  puzhash: str;
  filename: str;
}
```
### response
```typescript
{
  message_spend_bundle: str;
  info: [str, str, uint64];
} | {}
```

---

## `did_get_information_needed_for_recovery(agent, params)`
### params:
```typescript
{
  wallet_id: int;
}
```
### response
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
### params:
```typescript
{
  wallet_id: int;
  filename: str;
}
```
### response
```typescript
{
  wallet_id: int;
}
```

---

## `rl_set_user_info(agent, params)`
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
### response
```typescript
{}
```

---

## `send_clawback_transaction(agent, params)`
### params:
```typescript
{
  wallet_id: int;
  fee: int;
}
```
### response
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
### params:
```typescript
{
  wallet_id: uint32;
  amount: uint64;
  fee: uint64;
}
```
### response
```typescript
{
  status: "SUCCESS";
}
```