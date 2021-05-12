# API

## Daemon

A websocket client to connect chia daemon.  
This `Daemon` class is a singleton to prevent multiple useless connections being active.

Please note that you cannot create multiple daemon clients connecting to different url in single nodejs process.  
If you need to do it, please let me know. I'll check whether its merit is considerable than changing code base.

You can generate this `Daemon` client as below.
```js
const {getDaemon} = require("chia-agent");
const daemon = getDaemon();
```

## daemon.connect

Connect to chia daemon via websocket.

If you don't pass any argument, it tries to connect to an url specified in chia configuration file.  
(Note: `chia-agent` cares environment variable `CHIA_ROOT`)
```js
await daemon.connect();
```

You can specify chia daemon url to connect to.
```js
await daemon.connect("wss://hostname:port");
```

## daemon.close

Close active connection.  
If no active connection found, it silently returns.
```js
daemon.close();
```

After socket successfully closes, onClose event will dispatch. You can listen to the event as below:
```js
daemon.addEventListener("close", () => {
  // Do some stuff here.
});
```

## daemon.sendMessage

```js
await daemon.sendMessage(command, destination, data);
```

Send message to chia daemon via websocket.  
You can send message to:
- start/stop/ping services
- schedule plotting

The last one is very powerful.  
You can control plot schedule with monitoring plot creation status precisely in script.  
e.g. Dispatch plot creation just after current plotting goes to phase 2/3/4.

I'm sorry I cannot provide good example right now.  
You can inspect request parameters here in `def start_plotting` at `daemon/server.py`  
https://github.com/Chia-Network/chia-blockchain/blob/1.1.5/chia/daemon/server.py#L512

## daemon.subscribe

Start to monitor message channel via websocket.

```js
await daemon.subscribe(service);
// service: "wallet_ui" or "chia plots create"
```

`wallet_ui`  
Monitor messages sent to update GUI like connecting nodes, last attempted proof, wallet status, etc.

`chia plots create`  
Monitor plot creation progress.

Messages can be monitored after message event listener is added to daemon instance.
```js
// Subscribe message from `origin`.
// origin is "chia_wallet", "chia_farmer", "chia_full_node", "chia plots create", etc.
// If origin is set to `undefined` or "all", all incoming messages are passed to the listener function.
daemon.addMessageListener(origin, (message) => {
  // Content of receiving message depends on origin and command.
  // command is a request type of message. e.g. "get_blockchain_state", "new_farming_info", etc.
});
```

The format of incoming `message` is:
```js
{
  command: string;
  ack: boolean;
  data: any;
  request_id: string;
  destination: string;
  origin: string;
}
```

AFAIK, combinations of origin and command are:
```yaml
chia plots create:
  state_changed
  
chia_farmer:
  new_farming_info
  new_signage_point
  
chia_full_node:
  get_blockchain_state
  get_blocks
  get_connections
  get_unfinished_block_headers
  
chia_wallet:
  get_height_info
  get_sync_status
  state_changed
```

## Log

You can change log level to suppress/output various internal logs.
```js
// Log level can be: "error", "warning", "info", "debug", "none"
// Default log level is "error"
const {setLogLevel} = require("chia-agent");

setLogLevel("debug"); // show all available logs.
setLogLevel("info"); // show except for debug logs.
setLogLevel("warning"); // show warning and error logs.
setLogLevel("error"); // show only error logs.
setLogLevel("none"); // don't show any logs.
```
