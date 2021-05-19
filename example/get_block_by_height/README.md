# get_block_record_by_height

This is just a code sample showing how to use RPC API.

```js
const {RPCAgent, setLogLevel} = require("chia-agent");
const {get_block_record_by_height} = require("chia-agent/api/rpc");

main().catch(e => {
  console.error(e);
});

async function main(){
  setLogLevel("debug"); // none/error/warning/info/debug is available.
  
  const agent = new RPCAgent({service: "full_node"});
  const res = await get_block_record_by_height(agent, {height: 300000});
  console.log(res);
}

```

The output should be:
```js
{
  block_record: {
    challenge_block_info_hash: '0x560f7774b2e1f5cdb791133a75eb99e155cad1a3b384f65bb70c23def44e9f97',
    challenge_vdf_output: {
      data: '0x0000f3d4715b2dc609f426dbece2c0382054284b05a626bee4fba4af2400dfbcb96f5704a412e052b2268f0e2bc35091cdb112284280ebb6217829d5e933a245aa01ebcb277cf5579ebab606254219770cd63c1f99e2e56d8c9957f5b494cc76dd0a0200'
    },
    deficit: 11,
    farmer_puzzle_hash: '0xfa7abd3e5d046161dbe2d963a0ff242f102ab927f2a9825280ba95eaba21b14e',
    fees: 0,
    finished_challenge_slot_hashes: null,
    finished_infused_challenge_slot_hashes: null,
    finished_reward_slot_hashes: null,
    header_hash: '0x47fffd4d67c7581c36162eaba06ba3335eff9db88ac73d49a66aacc2da29d88e',
    height: 300000,
    infused_challenge_vdf_output: {
      data: '0x0200c91a61a36e4101c7b4f7bd21fee905d49cb588012a014edd082253b9d2a7b639493761d1c5466da45709550ac6e88764ed3611cc4c4522aa1679675dac558f416f558d65dd9c4a7f034788cd6c2763062291bd284ca2724bf101ece530ab445a0100'
    },
    overflow: false,
    pool_puzzle_hash: '0xfa7abd3e5d046161dbe2d963a0ff242f102ab927f2a9825280ba95eaba21b14e',
    prev_hash: '0xc206bd8b7b713489c74fb8d8d78b16db7cc7804341271735a6009a6a47b7634e',
    prev_transaction_block_hash: '0x32ab254a258b2e3d75c34a6681f0cb311dfead26f81d0d61fda3fc7a7e826c2a',
    prev_transaction_block_height: 299998,
    required_iters: 1022181,
    reward_claims_incorporated: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ],
    reward_infusion_new_challenge: '0x0fe8d6eaf06b074d94b74ba33e1f53ff200cafe1e5281c62045cddfd8dd64608',
    signage_point_index: 8,
    sub_epoch_summary_included: null,
    sub_slot_iters: 114819072,
    timestamp: 1621346129,
    total_iters: 969839261925,
    weight: 24291180
  },
  success: true
}
```