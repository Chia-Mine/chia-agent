export const chia_wallet_service = "chia_wallet";
export type chia_wallet_service = typeof chia_wallet_service;

export const state_changed_command = "state_changed";
export type state_changed_command = typeof state_changed_command;
export type TStateChangedBroadCast = {
  state: unknown;
  wallet_id?: unknown;
  additional_data?: unknown;
};
