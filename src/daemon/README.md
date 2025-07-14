# Daemon

A websocket client for connecting to chia daemon.  
This `Daemon` class is a singleton to prevent multiple useless connections being active at once.

Please note that you cannot create multiple daemon clients connecting to different url in single nodejs process.  
If you need to do it, please let me know. I'll check whether its merit is considerable than changing entire code base.

You can generate this `Daemon` client as below.
```js
const {getDaemon} = require("chia-agent");
const daemon = getDaemon();
```

## daemon.connect(url?: string, options?: ConnectOptions)

Connect to chia daemon via websocket with automatic retry and optional auto-reconnection support.

If you don't pass any argument, it tries to connect to an url specified in chia configuration file.
(Note: `chia-agent` cares environment variable `CHIA_ROOT`)
```js
await daemon.connect();
```

You can specify chia daemon url to connect to.
```js
await daemon.connect("wss://hostname:port");
```

Connect with custom options:
```js
await daemon.connect("wss://hostname:port", {
  timeoutMs: 50000,
  autoReconnect: false,  // Disable auto-reconnection
  retryOptions: {
    maxAttempts: 3,
    initialDelay: 2000,
    maxDelay: 10000,
    backoffMultiplier: 2
  }
});
```

### `url`
Optional. A URL to the daemon server to connect.  
The default url is `wss://{DAEMON_HOST}:{DAEMON_PORT}` where
`DAEMON_HOST` is `ui.daemon_host` and `DAEMON_PORT`  is `ui.daemon_port` in `$CHIA_ROOT/config/config.yaml`  
(Usually `wss://localhost:55400`)

### `options`
Optional. Connection configuration options.

```typescript
interface ConnectOptions {
  timeoutMs?: number;        // Connection timeout in milliseconds
  autoReconnect?: boolean;   // Enable/disable auto-reconnection (default: true)
  retryOptions?: {           // Retry configuration for both connection and reconnection
    maxAttempts?: number;    // Maximum retry attempts (default: 5)
    initialDelay?: number;   // Initial delay in ms (default: 1000)
    maxDelay?: number;       // Maximum delay in ms (default: 30000)
    backoffMultiplier?: number; // Exponential backoff multiplier (default: 1.5)
  };
}
```

The connection will automatically retry with exponential backoff if it fails. The same retry configuration is used for both initial connection attempts and reconnection attempts after disconnection.

## daemon.close()

Close active connection.  
If no active connection found, it silently returns without error.
```js
daemon.close();
```

After socket successfully closes, onClose event will dispatch. You can listen to the event as below:
```js
daemon.addEventListener("close", () => {
  // Do some stuff here.
});
```

## daemon.subscribe(service: string)

Start to monitor message channel via websocket.

```js
await daemon.subscribe(service);
// service: "wallet_ui", "metrics" or "chia_plotter"
```

`wallet_ui`  
Monitor messages sent to update GUI like connecting nodes, last attempted proof, wallet status, etc.

`metrics`  
Monitor messages to measure internal app states.

`chia_plotter`  
Monitor plot creation progress.

Messages can be monitored after message event listener is added to daemon instance.
```js
// Subscribe message from `origin`.
// origin is "chia_wallet", "chia_farmer", "chia_full_node", "chia_plotter", etc.
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
  data: any; // depends on command
  request_id: string;
  destination: string;
  origin: string;
}
```

## daemon.sendMessage(destination: string, command: string, data?: object, timeoutMs?: number)

Send a message to a specific service and wait for response.

```js
const response = await daemon.sendMessage("chia_full_node", "get_blockchain_state", {});
```

### `destination`
Required. The target service to send the message to (e.g., "chia_full_node", "chia_wallet").

### `command`
Required. The command to execute (e.g., "get_blockchain_state", "get_wallet_balance").

### `data`
Optional. The data payload for the command. Defaults to an empty object.

### `timeoutMs`
Optional. Message timeout in milliseconds. If the response doesn't arrive within this time, the promise will be rejected with a timeout error. Default is 30000ms (30 seconds).

## Event Handling

The daemon supports several event types for monitoring connection status:

### Connection Events

```js
// Connection opened
daemon.addEventListener("open", (event) => {
  if (event.type === "reconnected") {
    console.log("Successfully reconnected to daemon");
  } else {
    console.log("Connected to daemon");
  }
});

// Connection error
daemon.addEventListener("error", (event) => {
  if (event.message === "Max reconnection attempts reached") {
    console.error("Failed to reconnect after maximum attempts");
  } else {
    console.error("WebSocket error:", event.error);
  }
});

// Connection closed
daemon.addEventListener("close", (event) => {
  console.log(`Connection closed: code=${event.code}, reason=${event.reason}`);
});

// Message received
daemon.addEventListener("message", (event) => {
  console.log("Raw message received:", event.data);
});
```

### Removing Event Listeners

```js
const listener = (event) => console.log(event);
daemon.addEventListener("open", listener);
// Later...
daemon.removeEventListener("open", listener);
```
