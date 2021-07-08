/// <reference types="node" />
import { Agent as HttpsAgent } from "https";
import { Agent as HttpAgent } from "http";
import { TConfig } from "../config/index";
import { RpcMessage } from "../api/rpc/index";
declare type TDestination = "farmer" | "harvester" | "full_node" | "wallet" | "daemon" | "pool";
export declare function getConnectionInfoFromConfig(destination: TDestination, config: TConfig): {
    hostname: string;
    port: number;
};
export declare type TRPCAgentProps = {
    protocol: "https";
    host: string;
    port: number;
    ca_cert?: string | Buffer;
    client_cert?: string | Buffer;
    client_key?: string | Buffer;
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
    protected _caCert?: string | Buffer;
    protected _clientCert?: string | Buffer;
    protected _clientKey?: string | Buffer;
    protected _agent: HttpsAgent | HttpAgent;
    constructor(props: TRPCAgentProps);
    protected _getConfig(configPath?: string): TConfig;
    protected _loadCertFilesFromConfig(config: TConfig): {
        clientCert: Buffer;
        clientKey: Buffer;
        caCert: Buffer;
    };
    sendMessage<M extends RpcMessage = RpcMessage>(destination: string, command: string, data?: Record<string, unknown>): Promise<M>;
    request<R>(method: string, path: string, data?: any): Promise<R>;
}
export declare type TRPCAgent = InstanceType<typeof RPCAgent>;
export {};
