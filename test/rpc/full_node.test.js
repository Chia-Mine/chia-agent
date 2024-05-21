const {RPCAgent} = require("../../build");
const {get_network_info} = require("../../build/api/rpc/common");

test("get_network_info", async () => {
  const agent = new RPCAgent({service: "full_node"});
  const response = await get_network_info(agent);
  expect(response).toHaveProperty("network_name");
  expect(response).toHaveProperty("network_prefix");
}, 15000);
