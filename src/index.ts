import {getDaemon} from "./daemon/index";
import {setLogLevel} from "./logger";

async function main(){
  setLogLevel("debug");
  
  const daemon = getDaemon();
  await daemon.connect();
  
  const res = await daemon.subscribe("wallet_ui");
  daemon.addMessageListener("chia_farmer", (e) => {
    console.log("message!", e);
  });
  
  setTimeout(() => {
    daemon.close();
  }, 40*1000);
}

main();
