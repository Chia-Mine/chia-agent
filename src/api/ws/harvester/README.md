# Websocket Message from Harvester service

## Usage
You need to create Websocket connection before subscribing websocket messages.  
```js
const {getDaemon} = require("chia-agent");
const {chia_harvester_service} = require("chia-agent/api/ws");
const daemon = getDaemon(); // This is the websocket connection handler
await daemon.connect(); // connect to local daemon using config file.
await daemon.subscribe("wallet_ui"); // capture messages sent for GUI
daemon.addMessageListener(chia_harvester_service, (event) => {
  // Capturing broadcasted messages from the service.
  if(event.command === "get_plots"){
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
await daemon.subscribe(xxxxx);
...
```

---

## command: `get_plots`
Format of`event` object in  
`addMessageListener(chia_plots_create_service, (event) => {...});"`

### event:
```typescript
{
  origin: "chia_harvester";
  command: "get_plots";
  ack: boolean;
  data: /*See below*/;
  request_id: string;
  destination: string;
}
```
### data:
```typescript
{
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
}
```
For content of `Plot`,  
see https://github.com/Chia-Mine/chia-agent/blob/main/src/api/chia/harvester/harvester.ts
