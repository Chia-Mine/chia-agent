# chia-agent
[![npm version](https://badge.fury.io/js/chia-agent.svg)](https://badge.fury.io/js/chia-agent) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Node.JS client for chia daemon.


## What `chia-agent` can do.

`chia-agent` connects to chia daemon via websocket and monitor realtime chia status.  

For example, you can develop your own nodejs script to:  
- Send email when proof is found.
- Get customizable stats report.
- Trigger your scripts when target event is observed.
- start/stop services.
- etc, etc

**I'm working on additional api documentation. Please be patient.**


## Install

```
npm install chia-agent
# or
yarn add chia-agent
```



## Sample Node.js script for sending email when proof is found.
**\*chia daemon must be started in advance.**
Chia daemon automatically starts up when running GUI or 

```js
// sample.js
const {getDaemon, setLogLevel} = require("chia-agent");
setLogLevel("debug"); // none/error/warning/info/debug is avaiable.

const daemon = getDaemon();

(async function(){
  await daemon.connect();
  // By subscribing "wallet_ui", you can monitor messages sent for GUI.
  // Available subscription will be provided later.
  await daemon.subscribe("wallet_ui");

  // Detailed API specification will be provided later.
  daemon.addMessageListener("chia_farmer", (e) => {
    if(e.command === "new_farming_info"){
      const {farming_info} = e.data;
      const {challenge_hash, passed_filter, proofs, total_plots, timestamp} = farming_info;
      const date = new Date(timestamp*1000);

      console.log(`${challenge_hash.substr(0, 32)}... ${passed_filter}/${total_plots} ${proofs} ${date.toLocaleTimeString()}`);
      
      if(proofs > 0){
        // You can send mail here!
      }
    }
  });

})();

//  You can implement onClose event handler.
process.addListener("SIGTERM", onTerminate);
process.addListener("SIGINT", onTerminate);
async function onTerminate(){
  // Do some closing stuff.
  
  let timer = null;
  daemon.addEventListener("close", () => {
    if(timer) clearTimeout(timer);
    process.exit(0);
  });
  await daemon.close();
  
  timer = setTimeout(() => {
    console.error("Closing request timed out.");
    timer = null;
    process.exit(1);
  }, 10*1000);
}
```

## API
[See Document here](https://github.com/Chia-Mine/chia-agent/blob/main/API.md)
