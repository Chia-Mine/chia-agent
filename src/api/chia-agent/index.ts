import {WsMessage} from "./ws";
import {RpcMessageType} from "./rpc";

export type TMessage = WsMessage | RpcMessageType;