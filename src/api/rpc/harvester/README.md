# Harvester RPC API

## Usage
You need to create RPC connection before actually sending rpc request to the service.  
Please remember that all rpc API is provided as an async function.
```js
const {RPCAgent} = require("chia-agent");
const {add_plot_directory} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({
  service: "harvester", // connect to local harvester mservice using config file.
});
// Then call RPC function
const response = await add_plot_directory(agent, {...});



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

## `get_plots(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_plots} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await get_plots(agent);
```
### response:
```typescript
{
  plots: Plot[];
  failed_to_open_filenames: str[];
  not_found_filenames: str[];
}
```
For content of `Plot`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/harvester/harvester.ts

---

## `refresh_plots(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {refresh_plots} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await refresh_plots(agent);
```
### response
```typescript
{}
```

---

## `delete_plot(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {delete_plot} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await delete_plot(agent, params);
```
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

## `add_plot_directory(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {add_plot_directory} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await add_plot_directory(agent, params);
```
### params:
```typescript
{
  dirname: str;
}
```
### response
```typescript
{}
```

---

## `get_plot_directories(agent)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {get_plot_directories} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await get_plot_directories(agent);
```
### response
```typescript
{
  directories: str[];
}
```

---

## `remove_plot_directory(agent, params)`
### Usage
```js
const {RPCAgent} = require("chia-agent");
const {remove_plot_directory} = require("chia-agent/api/rpc/harvester");
const agent = new RPCAgent({service: "harvester"});
const response = await remove_plot_directory(agent, params);
```
### params
```typescript
{
  dirname: str;
}
```
### response
```typescript
{}
```
