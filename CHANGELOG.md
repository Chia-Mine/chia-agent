## Update anchor
https://github.com/Chia-Network/chia-blockchain/compare/cd78b0e99f199ed97a357775234ae2de0f7eb8b3...pools.2021-may-25

## [1.1.0-beta.8] (Changes from 1.1.0-beta.7)
### Added
- Added new full_node API [`get_puzzle_and_solution`](./src/api/rpc/full_node/README.md#get_puzzle_and_solutionagent-params)

### Fixed
- Fixed the type of `SerializedProgram` to `str`

## [1.1.0-beta.7] (Changes from 1.1.0-beta.6)
### Fixed
- Fixed an issue where submodule could not be loaded. e.g. `const {...} = require("chia-agent/api/rpc");`

## [1.1.0-beta.6] (Changes from 1.1.0-beta.5)
### Changed
- Update unknown types in `PoolState`.

### Fixed
- Fixed `login` response json of Wallet RPC API 
- Fixed `get_private_key` response json of Wallet RPC API
- Fixed `create_offer_for_ids` response json of Wallet RPC API
- Fixed `get_discrepancies_for_offer` response json of Wallet RPC API
- Fixed `did_get_pubkey` response json of Wallet RPC API
- Fixed `did_recovery_spend` response json of Wallet RPC API

## [1.1.0-beta.5] (Changes from 1.1.0-beta.4)
### Changed
- Changed an API endpoint name from `pw_collect_self_pooling_rewards` to `pw_absorb_rewards`

## [1.1.0-beta]
### Added
- [New pool protocol/api](./src/api/rpc/pool)
  - [`pool_info`](./src/api/rpc/pool/README.md#pool_infoagent)
  - [`partials`](./src/api/rpc/pool/README.md#partialsagent-params)
  - [`login`](./src/api/rpc/pool/README.md#loginagent-params)
- [New farmer api](./src/api/rpc/farmer)
  - [`get_pool_state`](./src/api/rpc/farmer/README.md#get_pool_stateagent)
  - [`set_pool_payout_instructions`](./src/api/rpc/farmer/README.md#set_pool_payout_instructionsagent-params)
  - [`get_plots`](./src/api/rpc/farmer/README.md#get_plotsagent)
- [New full_node api](./src/api/rpc/full_node)
  - [`get_recent_signage_point_or_eos`](./src/api/rpc/full_node/README.md#get_recent_signage_point_or_eosagent-params)
  - [`get_puzzle_and_solution`](./src/api/rpc/full_node/README.md#get_puzzle_and_solutionagent-params)
- [New wallet api](./src/api/rpc/wallet)
  - [`send_transaction_multi`](./src/api/rpc/wallet/README.md#send_transaction_multiagent-params)
  - [`pw_join_pool`](./src/api/rpc/wallet/README.md#pw_join_poolagent-params)
  - [`pw_self_pool`](./src/api/rpc/wallet/README.md#pw_self_poolagent-params)
  - [`pw_absorb_rewards`](./src/api/rpc/wallet/README.md#pw_absorb_rewardsagent-params)
  - [`pw_status`](./src/api/rpc/wallet/README.md#pw_statusagent-params)
  
- Added BUILD.md

### Fixed
- Correct type name `TCreate_New_RC_WalletRequest/Response` to `TCreate_New_RL_WalletRequest/Response`
- Fixed wrong structure of `TPartialsRequest`
- Fixed wrong `create_new_wallet` request format
- Fixed an issue where array data in YAML file was not parsed as expected.


## [1.0.1] - 2021-05-19
### Fixed
- Only fixed typo in README.md

## [1.0.0] - 2021-05-19
### Added
- Added new RPC client
- Added new RPC API
- Added new Websocket API
- Added API type definitions
- Added code samples

## [0.0.5] - 2021-05-13
### Changed
- Reorganized internal log level and locations.
- `daemon.connect()` resolves to boolean value indicating whether connecting is success or failure.
- Trying to re-connect to an url which is already active does not output warning anymore.

### Added
- Added types

### Fixed
- Fixed an issue where it could fail to catch response from chia daemon.

## [0.0.4] - 2021-05-13
### Fixed
- Fixed an issue where some requests were not responded by chia daemon.

## [0.0.3] - 2021-05-13
### Changed
- Changed argument order for `daemon.sendMessage` for previous one was not intuitive.

```js
// Old
daemon.sendMessage(get_block_record_by_height_command, destination, data);
// Now
daemon.sendMessage(destination, get_block_record_by_height_command, data);
```

## [0.0.2] - 2021-05-13
### Fixed
- Fixed an issue where it cannot be executed via `npx` command.

## [0.0.1] - 2021-05-13
Initial release.

<!-- [Unreleased]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.1...v0.0.2 -->
[1.1.0-beta.8]: https://github.com/Chia-Mine/chia-agent/compare/2aea73f07b40f0a256e55805b84d189a6c67ea3b...v1.1.0
[1.1.0-beta.7]: https://github.com/Chia-Mine/chia-agent/compare/1d5065fcd0b1b673fd7c7e042205ca34bbc66836...2aea73f07b40f0a256e55805b84d189a6c67ea3b
[1.1.0-beta.6]: https://github.com/Chia-Mine/chia-agent/compare/18eb244e4adef48b7c8a6ed70719230fc237f6b4...1d5065fcd0b1b673fd7c7e042205ca34bbc66836
[1.1.0-beta.5]: https://github.com/Chia-Mine/chia-agent/compare/97bd55fe016f52c4a5fce313bd1e7cb8a26fa7e0...18eb244e4adef48b7c8a6ed70719230fc237f6b4
[1.1.0-beta]: https://github.com/Chia-Mine/chia-agent/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.5...v1.0.0
[0.0.5]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Chia-Mine/chia-agent/releases/tag/v0.0.1
