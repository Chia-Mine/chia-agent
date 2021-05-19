const {RPCAgent, setLogLevel} = require("chia-agent");
const {get_block_record_by_height} = require("chia-agent/api/rpc");

main().catch(e => {
  console.error(e);
});

async function main(){
  setLogLevel("debug"); // none/error/warning/info/debug is available.
  
  const agent = new RPCAgent({destination: "full_node"});
  const res = await get_block_record_by_height(agent, {height: 300000});
  console.log(res);
}
