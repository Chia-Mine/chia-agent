#!/usr/bin/env node
import {getDaemon} from "../daemon/index";
import {setLogLevel} from "../logger";
import {on_new_farming_info} from "../api/ws/farmer/index";

setLogLevel("error");

const exeCommand = "npx chia-agent"
const argv = process.argv.slice(2);
const usage = `Usage:
${exeCommand} farm monitor
(*) This command is experimental. Will improved in few weeks`;

if(argv.length < 1){
  console.log(usage);
  process.exit(1);
}

const command = argv[0];

if(command === "farm"){
  const subCommand = argv[1];
  if(subCommand === "monitor"){
    (async function(){
      const daemon = getDaemon();
      await daemon.connect();
      await daemon.subscribe("wallet_ui");
    
      let sumPassedFilter = 0;
      let sumTotalPlot = 0;
      let sumTotalProof = 0;
    
      const unsubscribe = await on_new_farming_info(daemon, (e) => {
        if(e.command === "new_farming_info"){
          const {farming_info} = e.data;
          const {challenge_hash, passed_filter, proofs, total_plots, timestamp} = farming_info;
          const date = new Date(Number(timestamp)*1000);
          console.log(`${challenge_hash.substr(0, 32)}... ${passed_filter}/${total_plots} ${proofs} ${date.toLocaleTimeString()}`);
    
          sumPassedFilter += passed_filter;
          sumTotalPlot += total_plots;
          sumTotalProof += proofs;
        }
      });
    
      const onTerminate = async () => {
        console.log("Terminating process...");
  
        unsubscribe();
        
        const percentage = Math.round((sumPassedFilter/sumTotalPlot)*10000)/100;
        console.log(`total passed_filters: ${sumPassedFilter}`);
        console.log(`total_plots: ${sumTotalPlot}`);
        console.log(`total passed filters(%): ${percentage}%`);
        console.log(`total_proofs: ${sumTotalProof}`);
  
        let timer: ReturnType<typeof setTimeout>|null = null;
        daemon.addEventListener("close", () => {
          if(timer) clearTimeout(timer);
          process.exit(0);
        });
        await daemon.close();
  
        timer = setTimeout(() => {
          console.error("Closing request timed out.");
          timer = null;
          process.exit(1);
        }, 15*1000);
      };
      process.addListener("SIGTERM", onTerminate);
      process.addListener("SIGINT", onTerminate);
    })();
  }
  else{
    console.log(usage);
    process.exit(1);
  }
}
else{
  console.log(usage);
  process.exit(1);
}
