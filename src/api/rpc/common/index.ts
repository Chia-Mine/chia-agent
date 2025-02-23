import {bool, False, str, True, uint16} from "../../chia/types/_python_types_";
import {TRPCAgent} from "../../../rpc/index";
import {GetMessageType, ResType, TConnectionGeneral} from "../../types";
import {TConnectionFullNode} from "../../ws/full_node/index";
import {TDaemon} from "../../../daemon/index";

export const chia_common_service = "";
export type chia_common_service = typeof chia_common_service;


export const get_network_info_command = "get_network_info";
export type get_network_info_command = typeof get_network_info_command;
export type TGetNetworkInfoResponse = {
  success: True;
  network_name: str;
  network_prefix: str;
  genesis_challenge: str;
};
export type WsGetNetworkInfoMessage = GetMessageType<chia_common_service, get_network_info_command, TGetNetworkInfoResponse>;

export async function get_network_info<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetNetworkInfoResponse, WsGetNetworkInfoMessage>;
  return agent.sendMessage<R>(chia_common_service, get_network_info_command);
}


export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsRequest = {
  node_type?: str;
};
export type TGetConnectionsResponse = {
  connections: TConnectionGeneral[] | TConnectionFullNode[];
};
export type WsGetConnectionsMessage = GetMessageType<chia_common_service, get_connections_command, TGetConnectionsResponse>;
export async function get_connections<T extends TRPCAgent|TDaemon>(agent: T, params: TGetConnectionsRequest) {
  type R = ResType<T, TGetConnectionsResponse, WsGetConnectionsMessage>;
  return agent.sendMessage<R>(chia_common_service, get_connections_command, params);
}


export const open_connection_command = "open_connection";
export type open_connection_command = typeof open_connection_command;
export type TOpenConnectionRequest = {
  host: str;
  port: uint16;
};
export type TOpenConnectionResponse = {
  success: False;
  error: str;
} | {
  success: True;
};
export type WsOpenConnectionMessage = GetMessageType<chia_common_service, open_connection_command, TOpenConnectionResponse>;
export async function open_connection<T extends TRPCAgent|TDaemon>(agent: T, params: TOpenConnectionRequest) {
  type R = ResType<T, TOpenConnectionResponse, WsOpenConnectionMessage>;
  return agent.sendMessage<R>(chia_common_service, open_connection_command, params);
}


export const close_connection_command = "close_connection";
export type close_connection_command = typeof close_connection_command;
export type TCloseConnectionRequest = {
  node_id: str;
};
export type TCloseConnectionResponse = Record<string, never>;
export type WsCloseConnectionMessage = GetMessageType<chia_common_service, close_connection_command, TCloseConnectionResponse>;
export async function close_connection<T extends TRPCAgent|TDaemon>(agent: T, params: TCloseConnectionRequest) {
  type R = ResType<T, TCloseConnectionResponse, WsCloseConnectionMessage>;
  return agent.sendMessage<R>(chia_common_service, close_connection_command, params);
}


export const stop_node_command = "stop_node";
export type stop_node_command = typeof stop_node_command;
export type TStopNodeResponse = Record<string, never>;
export type WsStopNodeMessage = GetMessageType<chia_common_service, stop_node_command, TStopNodeResponse>;
export async function stop_node<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TStopNodeResponse, WsStopNodeMessage>;
  return agent.sendMessage<R>(chia_common_service, stop_node_command);
}


export const get_routes_command = "get_routes";
export type get_routes_command = typeof get_routes_command;
export type TGetRoutesResponse = {
  success: True;
  routes: str[];
};
export type WsGetRoutesMessage = GetMessageType<chia_common_service, get_routes_command, TGetRoutesResponse>;
export async function get_routes<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, TGetRoutesResponse, WsGetRoutesMessage>;
  return agent.sendMessage<R>(chia_common_service, get_routes_command);
}


export const get_version_command = "get_version";
export type get_version_command = typeof get_version_command;
export type TGetVersionResponse = {
  version: str;
};
export type WsGetVersionMessage = GetMessageType<chia_common_service, get_version_command, TGetVersionResponse>;
export async function get_version<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetVersionResponse, WsGetVersionMessage>;
  return agent.sendMessage<R>(chia_common_service, get_version_command);
}


export const healthz_command = "healthz";
export type healthz_command = typeof healthz_command;
export type THealthzResponse = {
  success: True;
};
export type WsHealthzMessage = GetMessageType<chia_common_service, healthz_command, THealthzResponse>;
export async function healthz<T extends TRPCAgent|TDaemon>(agent: T) {
  type R = ResType<T, THealthzResponse, WsHealthzMessage>;
  return agent.sendMessage<R>(chia_common_service, healthz_command);
}


export const get_log_level_command = "get_log_level";
export type get_log_level_command = typeof get_log_level_command;
export type TGetLogLevelResponse = {
  success: True;
  level: str;
  available_levels: str[];
};
export type WsGetLogLevelMessage = GetMessageType<chia_common_service, get_log_level_command, TGetLogLevelResponse>;

export async function get_log_level<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetLogLevelResponse, WsGetLogLevelMessage>;
  return agent.sendMessage<R>(chia_common_service, get_log_level_command);
}


export const set_log_level_command = "set_log_level";
export type set_log_level_command = typeof set_log_level_command;
export type TSetLogLevelRequest = {
  level: str;
};
export type TSetLogLevelResponse = TGetLogLevelResponse & {
  success: bool;
  errors: str[];
};
export type WsSetLogLevelMessage = GetMessageType<chia_common_service, set_log_level_command, TSetLogLevelResponse>;
export async function set_log_level<T extends TRPCAgent | TDaemon>(agent: T, params: TSetLogLevelRequest) {
  type R = ResType<T, TSetLogLevelResponse, WsSetLogLevelMessage>;
  return agent.sendMessage<R>(chia_common_service, set_log_level_command, params);
}


export const reset_log_level_command = "reset_log_level";
export type reset_log_level_command = typeof reset_log_level_command;
export type TResetLogLevelResponse = TSetLogLevelResponse;
export type WsResetLogLevelMessage = GetMessageType<chia_common_service, reset_log_level_command, TResetLogLevelResponse>;

export async function reset_log_level<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TResetLogLevelResponse, WsResetLogLevelMessage>;
  return agent.sendMessage<R>(chia_common_service, reset_log_level_command);
}

export type RpcCommonMessage =
  TGetNetworkInfoResponse
  | TGetConnectionsResponse
  | TOpenConnectionResponse
  | TCloseConnectionResponse
  | TStopNodeResponse
  | TGetRoutesResponse
  | TGetVersionResponse
  | THealthzResponse
  | TGetLogLevelResponse
  | TSetLogLevelResponse
  | TResetLogLevelResponse
;

export type RpcCommonMessageOnWs =
  WsGetNetworkInfoMessage
  | WsGetConnectionsMessage
  | WsOpenConnectionMessage
  | WsCloseConnectionMessage
  | WsStopNodeMessage
  | WsGetRoutesMessage
  | WsGetVersionMessage
  | WsHealthzMessage
  | WsGetLogLevelMessage
  | WsSetLogLevelMessage
  | WsResetLogLevelMessage
;
