# Create multiple plots with javascript

This is a simple code sample to request plots creation to daemon.  
You can modify this script to develop more complex plotter program.

### Prepare
```shell
cd <Wherever directory you want>
npm init . # or 'yarn init . -y'
npm install chia-agent # or 'yarn add chia-agent'
```

Create `index.js` in the directory shown above. 

### index.js
```js
main().catch(e => {
  console.error(e);
});

function createPlotOption(opt){
  return {
    service: "chia plots create",
    delay: ((opt.delay || 0)*60), // delay in seconds
    parallel: false, // parallel or serialize
    k: 32, // size
    n: (opt.n || 1), // count of creating plot
    queue: (opt.q || "default"), // queue name
    t: opt.t, // tmp dir. Adjust this for your environment.
    t2: opt.t, // tmp dir 2. Adjust this for your environment.
    d: opt.d, // final dir. Adjust this for your environment.
    b: 4600, // memory buffer size
    u: 128, // number of buckets
    r: (opt.r || 2), // number of threads
    // a?: int, // fingerprint
    // f: str, // farmer public key
    // p: str, // pool public key
    // c: str, // pool contract address
    e: false, // false: Not disabling bitfield plotting.
    x: false, // false: Not skipping final dir copy.
    overrideK: false,
  };
}

async function main(){
  const path = require("path");
  const {setLogLevel, getDaemon} = require("chia-agent");
  const {start_plotting} = require("chia-agent/api/ws/daemon");

  setLogLevel("debug"); // none/error/warning/info/debug is available.

  const daemon = getDaemon(); // This is the websocket connection handler
  await daemon.connect(); // connect to local daemon using config file.

  ////////////////////////////////
  // MODIFY Plotter params here
  ////////////////////////////////
  const jobConfigs = [
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("S:"), r: 3, q: "S1", n: 1, delay: 0},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("T:"), r: 2, q: "T1", n: 1, delay: 30},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("S:"), r: 3, q: "S2", n: 1, delay: 0},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("T:"), r: 2, q: "T2", n: 1, delay: 30},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("S:"), r: 3, q: "S3", n: 1, delay: 0},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("T:"), r: 2, q: "T3", n: 1, delay: 30},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("S:"), r: 3, q: "S4", n: 1, delay: 0},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("T:"), r: 2, q: "T4", n: 1, delay: 30},
  ];

  let error;
  const jobs = [];

  jobConfigs.forEach(c => {
    const plot_option = createPlotOption(c);
    const job = start_plotting(daemon, plot_option).then(res => {
      console.log("Done!", JSON.stringify(res));
    }).catch(e => {
      error = e;
      console.error("create plot error");
      console.error(e);
    });
    jobs.push(job);
  })

  await Promise.all(jobs).catch(e => error = e);

  if(error){
    console.error("Error:");
    console.error(JSON.stringify(error, null, 2));
  }
  else{
    console.log("Success!");
  }

  await daemon.close();
}
```

### run plotter
```shell
node ./index.js
```


# Connect to daemon running on remote server.
Specify host and port of remote server to `daemon.connect` function as below.
```js
  const daemon = getDaemon();
  await daemon.connect("wss://<hostname>:<port>");
```

# Cancel plotting
Check target task's uuid in plotter log file name. 
```shell
ls -l $CHIAHOME/plotter
```
You can find a bunch of plotter log files like:  
`plotter_log_0cda2be3-88c7-4f9a-ab06-b3dcc5130aac.txt`  
At this specific case, `0cda2be3-88c7-4f9a-ab06-b3dcc5130aac` is the uuid.

Then create a javascript file like below.
```js
// cancel.js
main().catch(e => {
  console.error(e);
});

async function main(){
  const path = require("path");
  const {setLogLevel, getDaemon} = require("chia-agent");
  const {stop_plotting} = require("chia-agent/api/ws/daemon");

  setLogLevel("debug"); // none/error/warning/info/debug is available.

  const daemon = getDaemon(); // This is the websocket connection handler
  await daemon.connect(); // connect to local daemon using config file.

  const cancelingIds = [
    // uuidv4 style plot id. Can only be found in plotter log file name at this time.
    // I submit a PR to get plotter task uuid on requesting start_plotting.
    // https://github.com/Chia-Network/chia-blockchain/pull/6241
    "0cda2be3-88c7-4f9a-ab06-b3dcc5130aac",
  ];

  let error;
  const jobs = [];

  cancelingIds.forEach(id => {
    const job = stop_plotting(daemon, {id: id}).then(res => {
      console.log("Done!", JSON.stringify(res));
    }).catch(e => {
      error = e;
      console.error("cancel plot error");
      console.error(e);
    });
    jobs.push(job);
  })

  await Promise.all(jobs).catch(e => error = e);

  if(error){
    console.error("Error:");
    console.error(JSON.stringify(error, null, 2));
  }
  else{
    console.log("Success!");
  }

  await daemon.close();
}
```
### Run the script to cancel plotter
```shell
node cancel.js
```

# Farmer public key and Pool public key

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