import {WsMessage} from "./ws";
import {RpcMessage} from "./rpc";

export type TMessage = WsMessage | RpcMessage;
export * from "./ws";
export * from "./rpc";
