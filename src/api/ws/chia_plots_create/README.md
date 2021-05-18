# Websocket Message from Plotting service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {on_state_changed} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
const unsubscribe = await on_state_changed(daemon, (event) => {
  console.log(e.data);

  // Close connection if you don't need it anymore.
  if(...){
    unsubscribe(); // stop listening to this ws message.
  }
});
// Once daemon is instantiated, you don't need to re-create it.

/*
 * You can connect to other than localhost when you specify websocket server url.
 */
daemon.connect("wss://host.name:1234");
await daemon.subscribe(chia_plots_create_service);
...
```

---

## `on_state_change_of_plots`
###Usage
```typescript
const {getDaemon} = require("chia-agent");
const {on_state_changed_of_plots} = require("chia-agent/api/ws");
const unsubscribe = on_state_changed_of_plots(daemon, (event) => {
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
