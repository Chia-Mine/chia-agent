const {getDaemon, setLogLevel} = require("chia-agent");
const sendMail = require("./gmail/sendMail");

main().catch(e => {
  console.error(e);
});

async function main(){
  setLogLevel("debug"); // none/error/warning/info/debug is available.
  
  const daemon = getDaemon();
  
  await daemon.connect();
  // By subscribing "wallet_ui", you can monitor messages sent for GUI.
  // Available subscription will be provided later.
  await daemon.subscribe("wallet_ui");
  
  // Detailed API specification will be provided later.
  daemon.addMessageListener("chia_farmer", async (e) => {
    if(e.command === "new_farming_info"){
      const {farming_info} = e.data;
      const {challenge_hash, passed_filter, proofs, total_plots, timestamp} = farming_info;
      const date = new Date(timestamp*1000);
      
      console.log(`${challenge_hash.substr(0, 32)}... ${passed_filter}/${total_plots} ${proofs} ${date.toLocaleTimeString()}`);
      
      if(proofs > 0){
        // You can implement some code here to send email.
        const subject = "[Chia] Proof has been found!";
        const mailBody = "Go check your wallet to see your earning";
        const from = "XXX <xxx@xxx.xxx>"; // Edit here
        const to = "YYY <yyy@yyy.yyy>"; // Edit here
        await sendMail(subject, mailBody, from, to);
      }
    }
  });

//  You can implement onClose event handler.
  process.addListener("SIGTERM", onTerminate);
  process.addListener("SIGINT", onTerminate);
  async function onTerminate(){
    console.log("Terminating process. Please wait for a moment...");
    
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
    }, 15*1000);
  }
}
