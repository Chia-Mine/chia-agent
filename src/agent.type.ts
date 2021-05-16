import {RpcMessage} from "./api/chia-agent/rpc";

export interface IAgent {
  sendMessage: (destination: string, command: string, data?: Record<string, unknown>) => Promise<RpcMessage>;
}
