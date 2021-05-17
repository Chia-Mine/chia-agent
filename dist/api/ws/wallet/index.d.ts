export declare const chia_wallet_service = "chia_wallet";
export declare type chia_wallet_service = typeof chia_wallet_service;
export declare const state_changed_command = "state_changed";
export declare type state_changed_command = typeof state_changed_command;
export declare type TStateChangedBroadCast = {
    state: unknown;
    wallet_id?: unknown;
    additional_data?: unknown;
};
