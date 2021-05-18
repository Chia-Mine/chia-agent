# Websocket Message from Plotting service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {on_state_changed_of_plots} = require("chia-agent/api/ws");

const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.

const unsubscribe = await on_state_changed_of_plots(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
...
```

---

## `on_state_change_of_plots`
###Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_state_changed_of_plots} = require("chia-agent/api/ws");

const daemon = getDaemon();
await daemon.connect();
const unsubscribe = await on_state_changed_of_plots(daemon, (event) => {
  // Format of `event` object is desribed below.
  ...
});
...
unsubscribe(); // Stop subscribing messages
```
### event:
```typescript
{
  origin: "chia plots create";
  command: "state_changed";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
```typescript
{
  state: "log_changed"|"state_changed";
  queue: Array<{
    id: str;
    queue: str;
    size: int;
    parallel: bool;
    delay: int;
    state: str;
    error: Optional<str>;
    deleted: bool;
    log_new: str;
    log?: str;
  }>;
}
```
