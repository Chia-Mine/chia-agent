import {str, uint16} from "../../chia/types/_python_types_";
import {TRPCAgent} from "../../../rpc/index";
import {TConnectionGeneral} from "../../types";
import {TConnectionFullNode} from "../../ws/full_node/index";

export const chia_common_service = "";
export type chia_common_service = typeof chia_common_service;

export const get_connections_command = "get_connections";
export type get_connections_command = typeof get_connections_command;
export type TGetConnectionsRequest = {
  node_type?: str;
};
export type TGetConnectionsResponse = {
  connections: TConnectionGeneral[] | TConnectionFullNode[];
};
export async function get_connections(agent: TRPCAgent, params: TGetConnectionsRequest) {
  return agent.sendMessage<TGetConnectionsResponse>(chia_common_service, get_connections_command, params);
}


export const open_connection_command = "open_connection";
export type open_connection_command = typeof open_connection_command;
export type TOpenConnectionRequest = {
  host: str;
  port: uint16;
};
export type TOpenConnectionResponse = {};
export async function open_connection(agent: TRPCAgent, params: TOpenConnectionRequest) {
  return agent.sendMessage<TOpenConnectionResponse>(chia_common_service, open_connection_command, params);
}


export const close_connection_command = "close_connection";
export type close_connection_command = typeof close_connection_command;
export type TCloseConnectionRequest = {
  node_id: str;
};
export type TCloseConnectionResponse = {};
export async function close_connection(agent: TRPCAgent, params: TCloseConnectionRequest) {
  return agent.sendMessage<TCloseConnectionResponse>(chia_common_service, close_connection_command, params);
}


export const stop_node_command = "stop_node";
export type stop_node_command = typeof stop_node_command;
export type TStopNodeResponse = {};
export async function stop_node(agent: TRPCAgent) {
  return agent.sendMessage<TStopNodeResponse>(chia_common_service, stop_node_command);
}


export const get_routes_command = "get_routes";
export type get_routes_command = typeof get_routes_command;
export type TGetRoutesResponse = {
  routes: str[];
};
export async function get_routes(agent: TRPCAgent) {
  return agent.sendMessage<TGetRoutesResponse>(chia_common_service, get_routes_command);
}
