import {bool, bytes, Optional, str, uint16, uint32, uint64} from "../../types/_python_types_";
import {bytes32} from "../../types/blockchain_format/sized_bytes";

export type NFTInfo = {
  nft_id: str;
  launcher_id: bytes32;
  nft_coin_id: bytes32;
  nft_coin_confirmation_height: uint32;
  owner_did: Optional<bytes32>;
  royalty_percentage: Optional<uint16>;
  royalty_puzzle_hash: Optional<bytes32>;
  data_uris: str[];
  data_hash: bytes;
  metadata_uris: str[];
  metadata_hash: bytes;
  license_uris: str[];
  license_hash: bytes;
  edition_total: uint64;
  edition_number: uint64;
  updater_puzhash: bytes32;
  chain_info: str;
  mint_height: uint32;
  supports_did: bool;
  p2_address: bytes32;
  pending_transaction: bool;
  minter_did: Optional<bytes32>;
  launcher_puzhash: bytes32;
  off_chain_metadata: Optional<str>;
};