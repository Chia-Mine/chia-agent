import { FullBlock } from "../../chia/types/full_block";
import { BlockRecord } from "../../chia/consensus/block_record";
import { bool, int, Optional, str, uint128, uint32, uint64 } from "../../chia/types/_python_types_";
import { UnfinishedHeaderBlock } from "../../chia/types/unfinished_header_block";
import { CoinRecord } from "../../chia/types/coin_record";
import { SpendBundle } from "../../chia/types/spend_bundle";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
import { MempoolItem } from "../../chia/types/mempool_item";
export declare const serviceName = "chia_full_node";
export declare const get_blockchain_state = "get_blockchain_state";
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
export declare const get_block = "get_block";
export declare type TGetBlockRequest = {
    header_hash: str;
};
export declare type TGetBlockResponse = {
    block: FullBlock;
};
export declare const get_blocks = "get_blocks";
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
export declare const get_block_record_by_height = "get_block_record_by_height";
export declare type TGetBlockRecordByHeightRequest = {
    height: int;
};
export declare type TGetBlockRecordByHeightResponse = {
    block_record: Optional<BlockRecord>;
};
export declare const get_block_record = "get_block_record";
export declare type TGetBlockRecordRequest = {
    header_hash: str;
};
export declare type TGetBlockRecordResponse = {
    block_record: BlockRecord;
};
export declare const get_block_records = "get_block_records";
export declare type TGetBlockRecordsRequest = {
    start: int;
    end: int;
};
export declare type TGetBlockRecordsResponse = {
    block_records: BlockRecord[];
};
export declare const get_unfinished_block_headers = "get_unfinished_block_headers";
export declare type TGetUnfinishedBlockHeadersRequest = {};
export declare type TGetUnfinishedBlockHeadersResponse = {
    headers: UnfinishedHeaderBlock[];
};
export declare const get_network_space = "get_network_space";
export declare type TGetNetworkSpaceRequest = {
    newer_block_header_hash: str;
    older_block_header_hash: str;
};
export declare type TGetNetworkSpaceResponse = {
    space: uint128;
};
export declare const get_additions_and_removals = "get_additions_and_removals";
export declare type TGetAdditionsAndRemovalsRequest = {
    header_hash: str;
};
export declare type TGetAdditionsAndRemovalsResponse = {
    additions: CoinRecord[];
    removals: CoinRecord[];
};
export declare const get_initial_freeze_period = "get_initial_freeze_period";
export declare type TGetInitialFreezePeriodRequest = {};
export declare type TGetInitialFreezePeriodResponse = {
    INITIAL_FREEZE_END_TIMESTAMP: uint64;
};
export declare const get_network_info = "get_network_info";
export declare type TGetNetworkInfoRequest = {};
export declare type TGetNetworkInfoResponse = {
    network_name: str;
    network_prefix: str;
};
export declare const get_coin_records_by_puzzle_hash = "get_coin_records_by_puzzle_hash";
export declare type TGetCoinRecordsByPuzzleHashRequest = {
    puzzle_hash: str;
    start_height: uint32;
    end_height: uint32;
    include_spent_coins: bool;
};
export declare type TGetCoinRecordsByPuzzleHashResponse = {
    coin_records: CoinRecord[];
};
export declare const get_coin_records_by_puzzle_hashes = "get_coin_records_by_puzzle_hashes";
export declare type TGetCoinRecordsByPuzzleHashesRequest = {
    puzzle_hashes: str[];
    start_height: uint32;
    end_height: uint32;
    include_spent_coins: bool;
};
export declare type TGetCoinRecordsByPuzzleHashesResponse = {
    coin_records: CoinRecord[];
};
export declare const get_coin_record_by_name = "get_coin_record_by_name";
export declare type TGetCoinRecordByNameRequest = {
    name: str;
};
export declare type TGetCoinRecordByNameResponse = {
    coin_record: CoinRecord;
};
export declare const push_tx = "push_tx";
export declare type TPushTxRequest = {
    spend_bundle: SpendBundle;
};
export declare type TPushTxResponse = {
    status: str;
};
export declare const get_all_mempool_tx_ids = "get_all_mempool_tx_ids";
export declare type TGetAllMempoolTxIdsRequest = {};
export declare type TGetAllMempoolTxIdsResponse = {
    tx_ids: bytes32[];
};
export declare const get_all_mempool_items = "get_all_mempool_items";
export declare type TGetAllMempoolItemsRequest = {};
export declare type TGetAllMempoolItemsResponse = {
    mempool_items: Record<string, MempoolItem>;
};
export declare const get_mempool_item_by_tx_id = "get_mempool_item_by_tx_id";
export declare type TGetMempoolItemByTxIdRequest = {
    tx_id: str;
};
export declare type TGetMempoolItemByTxIdResponse = {
    mempool_item: MempoolItem;
};
