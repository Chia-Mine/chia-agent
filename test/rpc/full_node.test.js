const {RPCAgent} = require("../../dist");
const {get_network_info_of_full_node} = require("../../dist/api/rpc/full_node");

test("get_network_info_of_full_node", async () => {
  const agent = new RPCAgent({service: "full_node"});
  const response = await get_network_info_of_full_node(agent);
  expect(response).toHaveProperty("network_name");
  expect(response).toHaveProperty("network_prefix");
}, 15000);
