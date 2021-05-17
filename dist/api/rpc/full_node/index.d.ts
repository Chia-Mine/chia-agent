import { FullBlock } from "../../chia/types/full_block";
import { BlockRecord } from "../../chia/consensus/block_record";
import { bool, int, Optional, str, uint128, uint32, uint64 } from "../../chia/types/_python_types_";
import { UnfinishedHeaderBlock } from "../../chia/types/unfinished_header_block";
import { CoinRecord } from "../../chia/types/coin_record";
import { SpendBundle } from "../../chia/types/spend_bundle";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { MempoolItem } from "../../chia/types/mempool_item";
import { IAgent } from "../../../agent.type";
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
export declare function get_blockchain_state(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_blockchain_state", TGetBlockchainStateResponse>>;
export declare const get_block_command = "get_block";
export declare type get_block_command = typeof get_block_command;
export declare type TGetBlockRequest = {
    header_hash: str;
};
export declare type TGetBlockResponse = {
    block: FullBlock;
};
export declare function get_block(agent: IAgent, data: TGetBlockRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_block", TGetBlockResponse>>;
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
export declare function get_blocks(agent: IAgent, data: TGetBlocksRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_blocks", TGetBlocksResponse>>;
export declare const get_block_record_by_height_command = "get_block_record_by_height";
export declare type get_block_record_by_height_command = typeof get_block_record_by_height_command;
export declare type TGetBlockRecordByHeightRequest = {
    height: int;
};
export declare type TGetBlockRecordByHeightResponse = {
    block_record: Optional<BlockRecord>;
};
export declare function get_block_record_by_height(agent: IAgent, data: TGetBlockRecordByHeightRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_block_record_by_height", TGetBlockRecordByHeightResponse>>;
export declare const get_block_record_command = "get_block_record";
export declare type get_block_record_command = typeof get_block_record_command;
export declare type TGetBlockRecordRequest = {
    header_hash: str;
};
export declare type TGetBlockRecordResponse = {
    block_record: BlockRecord;
};
export declare function get_block_record(agent: IAgent, data: TGetBlockRecordRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_block_record", TGetBlockRecordResponse>>;
export declare const get_block_records_command = "get_block_records";
export declare type get_block_records_command = typeof get_block_records_command;
export declare type TGetBlockRecordsRequest = {
    start: int;
    end: int;
};
export declare type TGetBlockRecordsResponse = {
    block_records: BlockRecord[];
};
export declare function get_block_records(agent: IAgent, data: TGetBlockRecordsRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_block_records", TGetBlockRecordsResponse>>;
export declare const get_unfinished_block_headers_command = "get_unfinished_block_headers";
export declare type get_unfinished_block_headers_command = typeof get_unfinished_block_headers_command;
export declare type TGetUnfinishedBlockHeadersRequest = {};
export declare type TGetUnfinishedBlockHeadersResponse = {
    headers: UnfinishedHeaderBlock[];
};
export declare function get_unfinished_block_headers(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_unfinished_block_headers", TGetUnfinishedBlockHeadersResponse>>;
export declare const get_network_space_command = "get_network_space";
export declare type get_network_space_command = typeof get_network_space_command;
export declare type TGetNetworkSpaceRequest = {
    newer_block_header_hash: str;
    older_block_header_hash: str;
};
export declare type TGetNetworkSpaceResponse = {
    space: uint128;
};
export declare function get_network_space(agent: IAgent, data: TGetNetworkSpaceRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_network_space", TGetNetworkSpaceResponse>>;
export declare const get_additions_and_removals_command = "get_additions_and_removals";
export declare type get_additions_and_removals_command = typeof get_additions_and_removals_command;
export declare type TGetAdditionsAndRemovalsRequest = {
    header_hash: str;
};
export declare type TGetAdditionsAndRemovalsResponse = {
    additions: CoinRecord[];
    removals: CoinRecord[];
};
export declare function get_additions_and_removals(agent: IAgent, data: TGetAdditionsAndRemovalsRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_additions_and_removals", TGetAdditionsAndRemovalsResponse>>;
export declare const get_initial_freeze_period_command = "get_initial_freeze_period";
export declare type get_initial_freeze_period_command = typeof get_initial_freeze_period_command;
export declare type TGetInitialFreezePeriodRequest = {};
export declare type TGetInitialFreezePeriodResponse = {
    INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export declare function get_initial_freeze_period(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_initial_freeze_period", TGetInitialFreezePeriodResponse>>;
export declare const get_network_info_command = "get_network_info";
export declare type get_network_info_command = typeof get_network_info_command;
export declare type TGetNetworkInfoRequest = {};
export declare type TGetNetworkInfoResponse = {
    network_name: str;
    network_prefix: str;
};
export declare function get_network_info(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_network_info", TGetNetworkInfoResponse>>;
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
export declare function get_coin_records_by_puzzle_hash(agent: IAgent, data: TGetCoinRecordsByPuzzleHashRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_coin_records_by_puzzle_hash", TGetCoinRecordsByPuzzleHashResponse>>;
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
export declare function get_coin_records_by_puzzle_hashes(agent: IAgent, data: TGetCoinRecordsByPuzzleHashesRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_coin_records_by_puzzle_hashes", TGetCoinRecordsByPuzzleHashesResponse>>;
export declare const get_coin_record_by_name_command = "get_coin_record_by_name";
export declare type get_coin_record_by_name_command = typeof get_coin_record_by_name_command;
export declare type TGetCoinRecordByNameRequest = {
    name: str;
};
export declare type TGetCoinRecordByNameResponse = {
    coin_record: CoinRecord;
};
export declare function get_coin_record_by_name(agent: IAgent, data: TGetCoinRecordByNameRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_coin_record_by_name", TGetCoinRecordByNameResponse>>;
export declare const push_tx_command = "push_tx";
export declare type push_tx_command = typeof push_tx_command;
export declare type TPushTxRequest = {
    spend_bundle: SpendBundle;
};
export declare type TPushTxResponse = {
    status: str;
};
export declare function push_tx(agent: IAgent, data: TPushTxRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "push_tx", TPushTxResponse>>;
export declare const get_all_mempool_tx_ids_command = "get_all_mempool_tx_ids";
export declare type get_all_mempool_tx_ids_command = typeof get_all_mempool_tx_ids_command;
export declare type TGetAllMempoolTxIdsRequest = {};
export declare type TGetAllMempoolTxIdsResponse = {
    tx_ids: bytes32[];
};
export declare function get_all_mempool_tx_ids(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_all_mempool_tx_ids", TGetAllMempoolTxIdsResponse>>;
export declare const get_all_mempool_items_command = "get_all_mempool_items";
export declare type get_all_mempool_items_command = typeof get_all_mempool_items_command;
export declare type TGetAllMempoolItemsRequest = {};
export declare type TGetAllMempoolItemsResponse = {
    mempool_items: Record<string, MempoolItem>;
};
export declare function get_all_mempool_items(agent: IAgent): Promise<import("../../types").GetMessageType<"chia_full_node", "get_all_mempool_items", TGetAllMempoolItemsResponse>>;
export declare const get_mempool_item_by_tx_id_command = "get_mempool_item_by_tx_id";
export declare type get_mempool_item_by_tx_id_command = typeof get_mempool_item_by_tx_id_command;
export declare type TGetMempoolItemByTxIdRequest = {
    tx_id: str;
};
export declare type TGetMempoolItemByTxIdResponse = {
    mempool_item: MempoolItem;
};
export declare function get_mempool_item_by_tx_id(agent: IAgent, data: TGetMempoolItemByTxIdRequest): Promise<import("../../types").GetMessageType<"chia_full_node", "get_mempool_item_by_tx_id", TGetMempoolItemByTxIdResponse>>;
