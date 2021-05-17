import { RpcMessage } from "./api/rpc";
export interface IAgent {
    sendMessage: (destination: string, command: string, data?: Record<string, unknown>) => Promise<RpcMessage>;
}
