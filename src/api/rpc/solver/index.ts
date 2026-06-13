import { bool } from "../../chia/types/_python_types_";
import { TRPCAgent } from "../../../rpc/index";
import { TDaemon } from "../../../daemon/index";
import { GetMessageType, ResType } from "../../types";

export const chia_solver_service = "chia_solver";
export type chia_solver_service = typeof chia_solver_service;

export const get_state_command = "get_state";
export type get_state_command = typeof get_state_command;
export type TGetStateResponse = {
  started: bool;
};
export type WsGetStateMessage = GetMessageType<
  chia_solver_service,
  get_state_command,
  TGetStateResponse
>;
export async function get_state<T extends TRPCAgent | TDaemon>(agent: T) {
  type R = ResType<T, TGetStateResponse, WsGetStateMessage>;
  return agent.sendMessage<R>(chia_solver_service, get_state_command);
}

export type RpcSolverMessage = TGetStateResponse;

export type RpcSolverMessageOnWs = WsGetStateMessage;
