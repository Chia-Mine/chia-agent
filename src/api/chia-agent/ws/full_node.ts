import {BlockRecord} from "../../chia/consensus/block_record";
import {bool, int, uint128, uint32, uint64} from "../../chia/types/_python_types_";

export const chia_full_node_service = "chia_full_node";
export type chia_full_node_service = typeof chia_full_node_service;

export const get_blockchain_state_command = "get_blockchain_state";
export type get_blockchain_state_command = typeof get_blockchain_state_command;
export type TGetBlockchainStateBroadCast = {
  blockchain_state: {
    peak: BlockRecord;
    genesis_challenge_initialized: bool;
    sync: {
      sync_mode: bool;
      synced: bool;
      sync_tip_height: uint32;
      sync_progress_height: uint32;
    };
    difficulty: uint64;
    sub_slot_iters: uint64;
    space: uint128;
    mempool_size: int;
  };
};
