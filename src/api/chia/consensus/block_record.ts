import {bytes32} from "../types/blockchain_format/sized_bytes";
import {ClassgroupElement} from "../types/blockchain_format/classgroup";
import {Coin} from "../types/blockchain_format/coin";
import {SubEpochSummary} from "../types/blockchain_format/sub_epoch_summary";
import {bool, Optional, uint128, uint32, uint64, uint8} from "../types/_python_types_";

export type BlockRecord = {
  header_hash: bytes32; // bytes32
  prev_hash: bytes32; // bytes32  # Header hash of the previous block
  height: uint32; // uint32
  weight: uint128; // uint128  # Total cumulative difficulty of all ancestor blocks since genesis
  total_iters: uint128; // uint128  # Total number of VDF iterations since genesis, including this block
  signage_point_index: uint8; // uint8
  challenge_vdf_output: ClassgroupElement; // ClassgroupElement  # This is the intermediary VDF output at ip_iters in challenge chain
  infused_challenge_vdf_output: Optional<ClassgroupElement>; // Optional[ClassgroupElement]  # This is the intermediary VDF output at ip_iters in infused cc, iff deficit <= 3
  reward_infusion_new_challenge: bytes32; // bytes32  # The reward chain infusion output, input to next VDF
  challenge_block_info_hash: bytes32; // bytes32  # Hash of challenge chain data, used to validate end of slots in the future
  sub_slot_iters: uint64; // uint64  # Current network sub_slot_iters parameter
  pool_puzzle_hash: bytes32; // bytes32  # Need to keep track of these because Coins are created in a future block
  farmer_puzzle_hash: bytes32; // bytes32
  required_iters: uint64; // uint64  # The number of iters required for this proof of space
  deficit: uint8; // uint8  # A deficit of 16 is an overflow block after an infusion. Deficit of 15 is a challenge block
  overflow: bool; // bool
  prev_transaction_block_height: uint32; // uint32
  
  // # Transaction block (present iff is_transaction_block)
  timestamp: Optional<uint64>; // Optional[uint64]
  prev_transaction_block_hash: Optional<bytes32>; // Optional[bytes32]  # Header hash of the previous transaction block
  fees: Optional<uint64>; // Optional[uint64]
  reward_claims_incorporated: Optional<Coin[]>; // Optional[List[Coin]]
  
  // # Slot (present iff this is the first SB in sub slot)
  finished_challenge_slot_hashes: Optional<bytes32[]>; // Optional[List[bytes32]]
  finished_infused_challenge_slot_hashes: Optional<bytes32[]>; // Optional[List[bytes32]]
  finished_reward_slot_hashes: Optional<bytes32[]>; // Optional[List[bytes32]]
  
  // # Sub-epoch (present iff this is the first SB after sub-epoch)
  sub_epoch_summary_included: Optional<SubEpochSummary>; // Optional[SubEpochSummary]  
};
