import { TDaemon } from "../../../daemon/index";
import { GetMessageType } from "../../types";
export declare const chia_wallet_service = "chia_wallet";
export declare type chia_wallet_service = typeof chia_wallet_service;
export declare const state_changed_command_of_wallet = "state_changed";
export declare type state_changed_command_of_wallet = typeof state_changed_command_of_wallet;
export declare type TStateChangedBroadCastOfWallet = {
    state: unknown;
    wallet_id?: unknown;
    additional_data?: unknown;
};
export declare function on_state_changed_of_wallet(daemon: TDaemon, callback: (e: GetMessageType<chia_wallet_service, state_changed_command_of_wallet, TStateChangedBroadCastOfWallet>) => unknown): Promise<() => void>;
export declare type chia_wallet_commands = state_changed_command_of_wallet;
export declare type TChiaWalletBroadcast = TStateChangedBroadCastOfWallet;
export declare function on_message_from_wallet(daemon: TDaemon, callback: (e: GetMessageType<chia_wallet_service, chia_wallet_commands, TChiaWalletBroadcast>) => unknown): Promise<() => void>;
