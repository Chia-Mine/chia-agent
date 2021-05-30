# create plots with javascript

This is a simplest code sample to request plot creation to daemon.  
You can modify this script to develop more complex plotter program.

```js
main().catch(e => {
  console.error(e);
});

async function main(){
  const path = require("path");
  const {setLogLevel, getDaemon} = require("chia-agent");
  const {start_plotting} = require("chia-agent/api/ws/daemon");

  setLogLevel("debug"); // none/error/warning/info/debug is available.

  const daemon = getDaemon(); // This is the websocket connection handler
  await daemon.connect(); // connect to local daemon using config file.

  const plot_option = {
    service: "chia plots create",
    delay: 0, // delay in seconds
    parallel: false, // parallel or serialize
    k: 33, // size
    n: 1, // count of creating plot
    queue: "default", // queue name
    t: path.resolve("Z:", "chia_plots"), // tmp dir. Adjust this for your environment.
    t2: path.resolve("Z:", "chia_plots"), // tmp dir 2. Adjust this for your environment.
    d: path.resolve("E:"), // final dir. Adjust this for your environment.
    b: 4600, // memory buffer size
    u: 128, // number of buckets
    r: 2, // number of threads
    // a?: int, // fingerprint
    // f: str, // farmer public key
    // p: str, // pool public key
    // c: str, // pool contract address
    e: false, // false: Not disabling bitfield plotting.
    x: false, // false: Not skipping final dir copy.
    overrideK: false,
  };

  let error;
  const response = await start_plotting(daemon, plot_option).catch(e => {
    error = e;
  });

  if(error){
    console.error("Error:");
    console.error(JSON.stringify(error, null, 2));
  }
  else{
    console.log("Success!");
    console.log(response);
  }

  await daemon.close();
}
```

## Connect to daemon running on remote server.

```js
  const daemon = getDaemon();
  await daemon.connect("wss://<hostname>:<port>"); // <- Specify hostname and port of remote server
```

## Cancel plotting
```js
main().catch(e => {
  console.error(e);
});

async function main() {
  const path = require("path");
  const {setLogLevel, getDaemon} = require("chia-agent");
  const {stop_plotting} = require("chia-agent/api/ws/daemon");

  setLogLevel("debug"); // none/error/warning/info/debug is available.

  const daemon = getDaemon(); // This is the websocket connection handler
  await daemon.connect(); // connect to local daemon using config file.
  
  let error;
  const response = await stop_plotting(daemon, "<plot-id>").catch(e => {
    error = e;
  });

  if(error){
    console.error("Error:");
    console.error(JSON.stringify(error, null, 2));
  }
  else{
    console.log("Success!");
    console.log(response);
  }

  await daemon.close();
}
```

## Farmer public key and Pool public key

In case you want to specify `-p` option for pool public key or `-f` option for farmer public key,  
you need to execute `chia keys show` command to get those key values.
```
PS C:\Users\SomeUser\.chia\mainnet> chia keys show
Showing all public keys derived from your private keys:

Fingerprint: 9937766107
Master public key (m): d6f644b19812e97b5d871658d6d3400ecd4787faeb9b8990c1e7608288664be77257104a58d033bcf1a0e0945ff06468
Farmer public key (m/12381/8444/0/0): 8e07e5bdd64aa37536c1f257a6b44963cc327b7d7dcb2cb47a22073d33414462bfa184487cf372ce0a19dfc83f8336d8
Pool public key (m/12381/8444/1/0): 0fc10e05716f56b665d3692dc9f09e3f2d14868a479fdccaee02e1357a0337cee5a944db65efa29b6eaea163f8b0a137
First wallet address: xch13f5abff5ed39eh9hg60qpzhzmgs73lgvd8a7v5240nxgyat4p00ytzkd99
PS C:\Users\SomeUser\.chia\mainnet>
```

As you see, you get  
farmer public key: `8e07e5bdd64aa37536c1f257a6b44963cc327b7d7dcb2cb47a22073d33414462bfa184487cf372ce0a19dfc83f8336d8`  
pool public key: `0fc10e05716f56b665d3692dc9f09e3f2d14868a479fdccaee02e1357a0337cee5a944db65efa29b6eaea163f8b0a137`

Then just copy and paste those strings as values of `-f`/`-p` options.
```js
  const plot_option = {
    service: "chia plots create",
    delay: 0, // delay in seconds
    parallel: false, // parallel or serialize
    k: 33, // size
    n: 1, // count of creating plot
    queue: "default", // queue name
    t: path.resolve("Z:", "chia_plots"), // tmp dir. Adjust this for your environment.
    t2: path.resolve("Z:", "chia_plots"), // tmp dir 2. Adjust this for your environment.
    d: path.resolve("E:"), // final dir. Adjust this for your environment.
    b: 4600, // memory buffer size
    u: 128, // number of buckets
    r: 2, // number of threads
    // a?: int, // fingerprint
    f: "8e07e5bdd64aa37536c1f257a6b44963cc327b7d7dcb2cb47a22073d33414462bfa184487cf372ce0a19dfc83f8336d8",
    p: "0fc10e05716f56b665d3692dc9f09e3f2d14868a479fdccaee02e1357a0337cee5a944db65efa29b6eaea163f8b0a137",
    // c: str, // pool contract address
    e: false, // false: Not disabling bitfield plotting.
    x: false, // false: Not skipping final dir copy.
    overrideK: false,
  };
  ...
```