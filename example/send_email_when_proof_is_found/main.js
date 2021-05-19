const {getDaemon, setLogLevel} = require("chia-agent");
const {on_new_farming_info} = require("chia-agent/api/ws");
const sendMail = require("./gmail/sendMail");

main().catch(e => {
  console.error(e);
});

async function main(){
  setLogLevel("debug"); // none/error/warning/info/debug is available.
  
  const daemon = getDaemon();
  await daemon.connect();
  
  const unsubscribe = await on_new_farming_info(daemon, async (e) => {
    const {farming_info} = e.data;
    const {challenge_hash, passed_filter, proofs, total_plots, timestamp} = farming_info;
    const date = new Date(timestamp*1000);
  
    console.log(`${challenge_hash.substr(0, 32)}... ${passed_filter}/${total_plots} ${proofs} ${date.toLocaleTimeString()}`);
  
    if(proofs > 0){
      // Send email with Gmail
      const subject = "[Chia] A proof has been found!";
      const mailBody = "Go check your wallet to see your earning";
      const from = "XXX <xxx@xxx.xxx>"; // Edit here
      const to = "YYY <yyy@yyy.yyy>"; // Edit here
      await sendMail(subject, mailBody, from, to).catch(error => {
        console.error("Failed to send email");
        console.error(JSON.stringify(error));
      });
    }
  });
}
