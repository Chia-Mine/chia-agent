import { FullBlock } from "../../chia/types/full_block";
import { BlockRecord } from "../../chia/consensus/block_record";
import { bool, float, int, Optional, str, uint128, uint32, uint64 } from "../../chia/types/_python_types_";
import { UnfinishedHeaderBlock } from "../../chia/types/unfinished_header_block";
import { CoinRecord } from "../../chia/types/coin_record";
import { SpendBundle } from "../../chia/types/spend_bundle";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { MempoolItem } from "../../chia/types/mempool_item";
import { TRPCAgent } from "../../../rpc";
import { EndOfSubSlotBundle } from "../../chia/types/end_of_slot_bundle";
import { SignagePoint } from "../../chia/full_node/signage_point";
export declare const chia_full_node_service = "chia_full_node";
export declare type chia_full_node_service = typeof chia_full_node_service;
export declare const get_blockchain_state_command = "get_blockchain_state";
export declare type get_blockchain_state_command = typeof get_blockchain_state_command;
export declare type TGetBlockchainStateRequest = {};
export declare type TGetBlockchainStateResponse = {
    blockchain_state: {
        peak: Optional<BlockRecord>;
        genesis_challenge_initialized: bool;
        sync: {
            sync_mode: bool;
            synced: bool;
            sync_tip_height: Optional<uint32>;
            sync_progress_height: uint32;
        };
        difficulty: uint64;
        sub_slot_iters: uint64;
        space: uint128;
        mempool_size: int;
    };
};
export declare function get_blockchain_state(agent: TRPCAgent): Promise<TGetBlockchainStateResponse>;
export declare const get_block_command = "get_block";
export declare type get_block_command = typeof get_block_command;
export declare type TGetBlockRequest = {
    header_hash: str;
};
export declare type TGetBlockResponse = {
    block: FullBlock;
};
export declare function get_block(agent: TRPCAgent, data: TGetBlockRequest): Promise<TGetBlockResponse>;
export declare const get_blocks_command = "get_blocks";
export declare type get_blocks_command = typeof get_blocks_command;
export declare type TGetBlocksRequest = {
    start: int;
    end: int;
    exclude_header_hash?: bool;
};
export declare type TGetBlocksResponse = {
    blocks: FullBlock[] | Array<FullBlock & {
        header_hash: str;
    }>;
};
export declare function get_blocks(agent: TRPCAgent, data: TGetBlocksRequest): Promise<TGetBlocksResponse>;
export declare const get_block_record_by_height_command = "get_block_record_by_height";
export declare type get_block_record_by_height_command = typeof get_block_record_by_height_command;
export declare type TGetBlockRecordByHeightRequest = {
    height: int;
};
export declare type TGetBlockRecordByHeightResponse = {
    block_record: Optional<BlockRecord>;
};
export declare function get_block_record_by_height(agent: TRPCAgent, data: TGetBlockRecordByHeightRequest): Promise<TGetBlockRecordByHeightResponse>;
export declare const get_block_record_command = "get_block_record";
export declare type get_block_record_command = typeof get_block_record_command;
export declare type TGetBlockRecordRequest = {
    header_hash: str;
};
export declare type TGetBlockRecordResponse = {
    block_record: BlockRecord;
};
export declare function get_block_record(agent: TRPCAgent, data: TGetBlockRecordRequest): Promise<TGetBlockRecordResponse>;
export declare const get_block_records_command = "get_block_records";
export declare type get_block_records_command = typeof get_block_records_command;
export declare type TGetBlockRecordsRequest = {
    start: int;
    end: int;
};
export declare type TGetBlockRecordsResponse = {
    block_records: BlockRecord[];
};
export declare function get_block_records(agent: TRPCAgent, data: TGetBlockRecordsRequest): Promise<TGetBlockRecordsResponse>;
export declare const get_unfinished_block_headers_command = "get_unfinished_block_headers";
export declare type get_unfinished_block_headers_command = typeof get_unfinished_block_headers_command;
export declare type TGetUnfinishedBlockHeadersRequest = {};
export declare type TGetUnfinishedBlockHeadersResponse = {
    headers: UnfinishedHeaderBlock[];
};
export declare function get_unfinished_block_headers(agent: TRPCAgent): Promise<TGetUnfinishedBlockHeadersResponse>;
export declare const get_network_space_command = "get_network_space";
export declare type get_network_space_command = typeof get_network_space_command;
export declare type TGetNetworkSpaceRequest = {
    newer_block_header_hash: str;
    older_block_header_hash: str;
};
export declare type TGetNetworkSpaceResponse = {
    space: uint128;
};
export declare function get_network_space(agent: TRPCAgent, data: TGetNetworkSpaceRequest): Promise<TGetNetworkSpaceResponse>;
export declare const get_additions_and_removals_command = "get_additions_and_removals";
export declare type get_additions_and_removals_command = typeof get_additions_and_removals_command;
export declare type TGetAdditionsAndRemovalsRequest = {
    header_hash: str;
};
export declare type TGetAdditionsAndRemovalsResponse = {
    additions: CoinRecord[];
    removals: CoinRecord[];
};
export declare function get_additions_and_removals(agent: TRPCAgent, data: TGetAdditionsAndRemovalsRequest): Promise<TGetAdditionsAndRemovalsResponse>;
export declare const get_initial_freeze_period_command_of_full_node = "get_initial_freeze_period";
export declare type get_initial_freeze_period_command_of_full_node = typeof get_initial_freeze_period_command_of_full_node;
export declare type TGetInitialFreezePeriodRequestOfFullNode = {};
export declare type TGetInitialFreezePeriodResponseOfFullNode = {
    INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export declare function get_initial_freeze_period_of_full_node(agent: TRPCAgent): Promise<TGetInitialFreezePeriodResponseOfFullNode>;
export declare const get_network_info_command_of_full_node = "get_network_info";
export declare type get_network_info_command_of_full_node = typeof get_network_info_command_of_full_node;
export declare type TGetNetworkInfoRequestOfFullNode = {};
export declare type TGetNetworkInfoResponseOfFullNode = {
    network_name: str;
    network_prefix: str;
};
export declare function get_network_info_of_full_node(agent: TRPCAgent): Promise<TGetNetworkInfoResponseOfFullNode>;
export declare const get_recent_signage_point_or_eos_command = "get_recent_signage_point_or_eos";
export declare type get_recent_signage_point_or_eos_command = typeof get_recent_signage_point_or_eos_command;
export declare type TGetRecentSignagePointOrEOSCommandRequest = {
    sp_hash: str;
    challenge_hash: str;
} | {};
export declare type TGetRecentSignagePointOrEOSCommandResponse = {
    eos: EndOfSubSlotBundle;
    time_received: float;
    reverted: bool;
} | {
    signage_point: SignagePoint;
    time_received: float;
    reverted: bool;
};
export declare function get_recent_signage_point_or_eos(agent: TRPCAgent, data: TGetRecentSignagePointOrEOSCommandRequest): Promise<TGetRecentSignagePointOrEOSCommandResponse>;
export declare const get_coin_records_by_puzzle_hash_command = "get_coin_records_by_puzzle_hash";
export declare type get_coin_records_by_puzzle_hash_command = typeof get_coin_records_by_puzzle_hash_command;
export declare type TGetCoinRecordsByPuzzleHashRequest = {
    puzzle_hash: str;
    start_height: uint32;
    end_height: uint32;
    include_spent_coins: bool;
};
export declare type TGetCoinRecordsByPuzzleHashResponse = {
    coin_records: CoinRecord[];
};
export declare function get_coin_records_by_puzzle_hash(agent: TRPCAgent, data: TGetCoinRecordsByPuzzleHashRequest): Promise<TGetCoinRecordsByPuzzleHashResponse>;
export declare const get_coin_records_by_puzzle_hashes_command = "get_coin_records_by_puzzle_hashes";
export declare type get_coin_records_by_puzzle_hashes_command = typeof get_coin_records_by_puzzle_hashes_command;
export declare type TGetCoinRecordsByPuzzleHashesRequest = {
    puzzle_hashes: str[];
    start_height: uint32;
    end_height: uint32;
    include_spent_coins: bool;
};
export declare type TGetCoinRecordsByPuzzleHashesResponse = {
    coin_records: CoinRecord[];
};
export declare function get_coin_records_by_puzzle_hashes(agent: TRPCAgent, data: TGetCoinRecordsByPuzzleHashesRequest): Promise<TGetCoinRecordsByPuzzleHashesResponse>;
export declare const get_coin_record_by_name_command = "get_coin_record_by_name";
export declare type get_coin_record_by_name_command = typeof get_coin_record_by_name_command;
export declare type TGetCoinRecordByNameRequest = {
    name: str;
};
export declare type TGetCoinRecordByNameResponse = {
    coin_record: CoinRecord;
};
export declare function get_coin_record_by_name(agent: TRPCAgent, data: TGetCoinRecordByNameRequest): Promise<TGetCoinRecordByNameResponse>;
export declare const push_tx_command = "push_tx";
export declare type push_tx_command = typeof push_tx_command;
export declare type TPushTxRequest = {
    spend_bundle: SpendBundle;
};
export declare type TPushTxResponse = {
    status: str;
};
export declare function push_tx(agent: TRPCAgent, data: TPushTxRequest): Promise<TPushTxResponse>;
export declare const get_all_mempool_tx_ids_command = "get_all_mempool_tx_ids";
export declare type get_all_mempool_tx_ids_command = typeof get_all_mempool_tx_ids_command;
export declare type TGetAllMempoolTxIdsRequest = {};
export declare type TGetAllMempoolTxIdsResponse = {
    tx_ids: bytes32[];
};
export declare function get_all_mempool_tx_ids(agent: TRPCAgent): Promise<TGetAllMempoolTxIdsResponse>;
export declare const get_all_mempool_items_command = "get_all_mempool_items";
export declare type get_all_mempool_items_command = typeof get_all_mempool_items_command;
export declare type TGetAllMempoolItemsRequest = {};
export declare type TGetAllMempoolItemsResponse = {
    mempool_items: Record<string, MempoolItem>;
};
export declare function get_all_mempool_items(agent: TRPCAgent): Promise<TGetAllMempoolItemsResponse>;
export declare const get_mempool_item_by_tx_id_command = "get_mempool_item_by_tx_id";
export declare type get_mempool_item_by_tx_id_command = typeof get_mempool_item_by_tx_id_command;
export declare type TGetMempoolItemByTxIdRequest = {
    tx_id: str;
};
export declare type TGetMempoolItemByTxIdResponse = {
    mempool_item: MempoolItem;
};
export declare function get_mempool_item_by_tx_id(agent: TRPCAgent, data: TGetMempoolItemByTxIdRequest): Promise<TGetMempoolItemByTxIdResponse>;
