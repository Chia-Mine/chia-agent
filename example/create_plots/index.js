main().catch(e => {
  console.error(e);
});

function createPlotOption(opt){
  return {
    service: "chia_plotter",
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
  
  const jobConfigs = [
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("U:"), r: 2, q: "U1", n: 1, delay: 0},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("V:"), r: 2, q: "V1", n: 1, delay: 0},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("U:"), r: 3, q: "U2", n: 1, delay: 0},
    {t: path.resolve("D:", "chia_plot"), d: path.resolve("V:"), r: 3, q: "V2", n: 1, delay: 0},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("V:"), r: 3, q: "V3", n: 1, delay: 0},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("V:"), r: 2, q: "V4", n: 1, delay: 0},
    {t: path.resolve("E:", "chia_plot"), d: path.resolve("V:"), r: 2, q: "V5", n: 1, delay: 0},
    // {t: path.resolve("E:", "chia_plot"), d: path.resolve("V:"), r: 2, q: "V4", n: 1, delay: 30},
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
