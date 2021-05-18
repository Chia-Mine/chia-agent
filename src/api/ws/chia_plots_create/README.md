# Websocket Message from Plotting service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {chia_plots_create_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
await daemon.subscribe(chia_plots_create_service); // subscribe plotting message
daemon.addMessageListener("all", (event) => {
  // Capturing all broadcasted messages from the service.
  if(event.origin === chia_plots_create_service
    && event.command === "state_changed")
  {
    console.log(e.data);
  }
  
  // Close connection if you don't need it anymore.
  if(...){
    daemon.close();
  }
});
// Once daemon is instantiated, you don't need to re-create it.

// Do some closing stuff.
daemon.onClose((e) => {
  ...
});

/*
 * You can connect to other than localhost when you specify websocket server url.
 */
daemon.connect("wss://host.name:1234");
await daemon.subscribe(chia_plots_create_service);
...
```

---

## command: `state_changed`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

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
