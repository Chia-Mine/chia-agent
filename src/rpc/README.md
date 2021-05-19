# RPCAgent

RPC client for connecting to chia services like `farmer`, `full_node`, `harvester`, `wallet`.  

Once RPCAgent is instantiated, you can use RPC API functions via the agent.
```js
const agent = new RPCAgent({...});
const response1 = await get_public_keys(agent);
const response2 = await get_sync_status(agent);
...
```
---

## new RPCAgent(options)

```js
const {RPCAgent} = require("chia-agent");
const agent = new RPCAgent({...});
```

Instantiate rpc agent with connection option.  
There are several ways to specify connection info.

---

**Case 1** Connect to local rpc server by a service name.  
If `configPath` is omitted, `chia-agent` tries to search from default config file path.
```typescript
options = {
  service: "farmer"|"harvester"|"full_node"|"wallet";
  configPath?: string;
}
```
example
```js
const agent = new RPCAgent({service: "full_node"});
```

---

**Case 2** Specify server by hostname, port and cert/key files.
```typescript
options = {
  protocol: "https";
  host: string;
  port: number;
  ca_cert: string|Buffer;
  client_cert: string|Buffer;
  client_key: string|Buffer;
}
```
example
```js
const agent = new RPCAgent({
  protocol: "https",
  host: "localhost",
  port: 8555,
  ca_cert: fs.readFileSync("..."),
  client_cert: fs.readFileSync("..."),
  clien_key: fs.readFileSync("..."),
});
```

---

**Case 3** Specify hostname, port and config file path for cert data.

```typescript
{
  protocol: "https";
  host: string;
  port: number;
  configPath: string;
}
```
example
```js
const agent = new RPCAgent({
  protocol: "https",
  host: "localhost",
  port: 8555,
  configPath: "...",
});
```

---

**Case 4** Specify hostname, port and config file path.

```typescript
{
  protocol: "http";
  host: string;
  port: number;
}
```
example
```js
const agent = new RPCAgent({
  protocol: "http",
  host: "xxx.yyy.zzz",
  port: 18555,
});
```

