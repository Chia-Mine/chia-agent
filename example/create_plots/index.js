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
    // a?: int, // fingerprint. The value is given by `chia keys show`
    // f: str, // farmer public key. See `chia keys show` for farmer public key.
    // p: str, // pool public key. See `chia keys show` for pool public key.
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
