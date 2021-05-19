/// <reference types="node" />
import { Agent as HttpsAgent } from "https";
import { Agent as HttpAgent } from "http";
import { TConfig } from "../config/index";
import { RpcMessage } from "../api/rpc/index";
declare type TDestination = "farmer" | "harvester" | "full_node" | "wallet" | "daemon";
export declare function getConnectionInfoFromConfig(destination: TDestination, config: TConfig): {
    hostname: string;
    port: number;
};
export declare type TRPCAgentProps = {
    protocol: "https";
    host: string;
    port: number;
    ca_cert: string | Buffer;
    client_cert: string | Buffer;
    client_key: string | Buffer;
} | {
    protocol: "https";
    host: string;
    port: number;
    configPath: string;
} | {
    protocol: "http";
    host: string;
    port: number;
} | {
    service: TDestination;
    configPath?: string;
};
export declare class RPCAgent {
    protected _protocol: "http" | "https";
    protected _hostname: string;
    protected _port: number;
    protected _caCert: string | Buffer;
    protected _clientCert: string | Buffer;
    protected _clientKey: string | Buffer;
    protected _agent: HttpsAgent | HttpAgent;
    constructor(props: TRPCAgentProps);
    protected _getConfig(configPath?: string): TConfig;
    protected _loadCertFilesFromConfig(config: TConfig): {
        clientCert: Buffer;
        clientKey: Buffer;
        caCert: Buffer;
    };
    sendMessage<M extends RpcMessage = RpcMessage>(destination: string, command: string, data?: Record<string, unknown>): Promise<M>;
    post(path: string, data: any): Promise<import("../api/rpc/farmer").TGetSignagePointResponse | {
        farmer_target: string;
        pool_target: string;
        have_farmer_sk: boolean;
        have_pool_sk: boolean;
    } | {
        farmer_target: string;
        pool_target: string;
    } | import("../api/rpc/farmer").TGetSignagePointsResponse | import("../api/rpc/farmer").TSetRewardTargetResponse | import("../api/rpc/full_node").TGetAdditionsAndRemovalsResponse | import("../api/rpc/full_node").TGetAllMempoolItemsResponse | import("../api/rpc/full_node").TGetAllMempoolTxIdsResponse | import("../api/rpc/full_node").TGetBlockResponse | import("../api/rpc/full_node").TGetBlockRecordByHeightResponse | import("../api/rpc/full_node").TGetBlockRecordResponse | import("../api/rpc/full_node").TGetBlockRecordsResponse | import("../api/rpc/full_node").TGetBlockchainStateResponse | import("../api/rpc/full_node").TGetBlocksResponse | import("../api/rpc/full_node").TGetCoinRecordByNameResponse | import("../api/rpc/full_node").TGetCoinRecordsByPuzzleHashResponse | import("../api/rpc/full_node").TGetCoinRecordsByPuzzleHashesResponse | import("../api/rpc/full_node").TGetInitialFreezePeriodResponseOfFullNode | import("../api/rpc/full_node").TGetMempoolItemByTxIdResponse | import("../api/rpc/full_node").TGetNetworkInfoResponseOfFullNode | import("../api/rpc/full_node").TGetNetworkSpaceResponse | import("../api/rpc/full_node").TGetUnfinishedBlockHeadersResponse | import("../api/rpc/full_node").TPushTxResponse | import("../api/rpc/harvester").TAddPlotDirectoryResponse | import("../api/rpc/harvester").TDeletePlotResponse | import("../api/rpc/harvester").TGetPlotDirectoriesResponse | import("../api/rpc/harvester").TGetPlotsResponse | import("../api/rpc/harvester").TRefreshPlotsResponse | import("../api/rpc/harvester").TRemovePlotDirectoryResponse | {
        success: false;
        error: string;
        word: unknown;
    } | {
        fingerprint: number;
    } | import("../api/rpc/wallet").TAddRateLimitedFundsResponse | import("../api/rpc/wallet").TCancelTradeResponse | import("../api/rpc/wallet").TCcGetColourResponse | import("../api/rpc/wallet").TCcGetNameResponse | import("../api/rpc/wallet").TCcSetNameResponse | import("../api/rpc/wallet").TCcSpendResponse | import("../api/rpc/wallet").TCreateBackupResponse | {
        type: number;
        colour: string;
        wallet_id: number;
    } | {
        type: number;
    } | {
        success: boolean;
        id: number;
        type: number;
        origin: import("../api/chia/types/_python_types_").Optional<import("../api/chia/types/blockchain_format/coin").Coin>;
        pubkey: string;
    } | {
        id: number;
        type: number;
        pubkey: string;
    } | {
        success: true;
        type: number;
        my_did: string;
        wallet_id: number;
    } | {
        success: true;
        type: number;
        my_did: string;
        wallet_id: number;
        coin_name: string;
        coin_list: [string, string, number];
        newpuzhash: string;
        pubkey: string;
        backup_dids: string[];
        num_verifications_required: number;
    } | import("../api/rpc/wallet").TCreateOfferForIdsResponse | import("../api/rpc/wallet").TCreateSignedTransactionResponse | import("../api/rpc/wallet").TDeleteAllKeysResponse | import("../api/rpc/wallet").TDeleteKeyResponse | {
        success: true;
        message_spend_bundle: string;
        info: [string, string, number];
    } | {
        success: false;
    } | import("../api/rpc/wallet").TDidCreateBackupFileResponse | import("../api/rpc/wallet").TDidGetDidResponse | import("../api/rpc/wallet").TDidGetInformationNeededForRecoveryResponse | import("../api/rpc/wallet").TDidGetPubkeyResponse | import("../api/rpc/wallet").TDidGetRecoveryListResponse | import("../api/rpc/wallet").TDidRecoverySpendResponse | import("../api/rpc/wallet").TDidSpendResponse | import("../api/rpc/wallet").TDidUpdateRecoveryIdsResponse | import("../api/rpc/wallet").TFarmBlockResponse | import("../api/rpc/wallet").TGenerateMnemonicResponse | import("../api/rpc/wallet").TGetAllTradesResponse | import("../api/rpc/wallet").TGetDiscrepanciesForOfferResponse | import("../api/rpc/wallet").TGetFarmedAmountResponse | import("../api/rpc/wallet").TGetHeightInfoResponse | import("../api/rpc/wallet").TGetInitialFreezePeriodResponseOfWallet | import("../api/rpc/wallet").TGetNetworkInfoResponseOfWallet | import("../api/rpc/wallet").TGetNextAddressResponse | import("../api/rpc/wallet").TGetPrivateKeyResponse | import("../api/rpc/wallet").TGetPublicKeysResponse | import("../api/rpc/wallet").TGetSyncStatusResponse | import("../api/rpc/wallet").TGetTradeResponse | import("../api/rpc/wallet").TGetTransactionResponse | import("../api/rpc/wallet").TGetTransactionCountResponse | import("../api/rpc/wallet").TGetTransactionsResponse | import("../api/rpc/wallet").TGetWalletBalanceResponse | import("../api/rpc/wallet").TGetWalletsResponse | {
        fingerprint: number;
    } | {
        success: false;
        error: "not_initialized" | "Unknown Error";
    } | {
        success: false;
        error: "not_initialized";
        backup_info: import("../api/chia/wallet/util/backup_utils").BackupInfo;
        backup_path: string;
    } | import("../api/rpc/wallet").TResponseToOfferResponse | import("../api/rpc/wallet").TRlSetUserInfoResponse | import("../api/rpc/wallet").TSendClawbackTransactionResponse | import("../api/rpc/wallet").TSendTransactionResponse>;
}
export declare type TRPCAgent = InstanceType<typeof RPCAgent>;
export {};
