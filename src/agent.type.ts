import {TMessage} from "./api/chia-agent/";

export interface IAgent {
  sendMessage: (destination: string, command: string, data?: Record<string, unknown>) => Promise<TMessage>;
}
