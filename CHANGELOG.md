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
[1.0.1]: https://github.com/Chia-Mine/chia-agent/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.5...v1.0.0
[0.0.5]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.4...v0.0.5
[0.0.4]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.3...v0.0.4
[0.0.3]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.2...v0.0.3
[0.0.2]: https://github.com/Chia-Mine/chia-agent/compare/v0.0.1...v0.0.2
[0.0.1]: https://github.com/Chia-Mine/chia-agent/releases/tag/v0.0.1
