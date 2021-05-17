import { TDaemon } from "../../../daemon/index";
import { bool, int, Optional, str, True } from "../../chia/types/_python_types_";
export declare const daemon_service = "daemon";
export declare type daemon_service = typeof daemon_service;
export declare const ping_command = "ping";
export declare type ping_command = typeof ping_command;
export declare type TPingRequest = {};
export declare type TPingResponse = {
    success: True;
    value: str;
};
export declare function ping(daemon: TDaemon): Promise<import("../types").GetMessageType<"daemon", "ping", TPingResponse>>;
export declare const start_service_command = "start_service";
export declare type start_service_command = typeof start_service_command;
export declare type TStartServiceRequest = {
    service: str;
    testing?: bool;
};
export declare type TStartServiceResponse = {
    success: bool;
    service: str;
    error: Optional<str>;
};
export declare function start_service(daemon: TDaemon, data: TStartServiceRequest): Promise<import("../types").GetMessageType<"daemon", "start_service", TStartServiceResponse>>;
export declare const start_plotting_command = "start_plotting";
export declare type start_plotting_command = typeof start_plotting_command;
export declare type TStartPlottingRequest = {
    service: string;
    delay: int;
    parallel: bool;
    k: int;
    n: int;
    queue: str;
    t: str;
    t2: str;
    d: str;
    b: int;
    u: int;
    r: int;
    a?: int;
    e: bool;
    x: bool;
    overrideK: bool;
};
export declare type TStartPlottingResponse = {
    success: bool;
    service_name: str;
};
export declare function start_plotting(daemon: TDaemon, data: TStartPlottingRequest): Promise<import("../types").GetMessageType<"daemon", "start_plotting", TStartPlottingResponse>>;
export declare const stop_plotting_command = "stop_plotting";
export declare type stop_plotting_command = typeof stop_plotting_command;
export declare type TStopPlottingRequest = {
    id: str;
};
export declare type TStopPlottingResponse = {
    success: bool;
};
export declare function stop_plotting(daemon: TDaemon, data: TStopPlottingRequest): Promise<import("../types").GetMessageType<"daemon", "stop_plotting", TStopPlottingResponse>>;
export declare const stop_service_command = "stop_service";
export declare type stop_service_command = typeof stop_service_command;
export declare type TStopServiceRequest = {
    service: str;
};
export declare type TStopServiceResponse = {};
export declare function stop_service(daemon: TDaemon, data: TStopServiceRequest): Promise<import("../types").GetMessageType<"daemon", "stop_service", TStopServiceResponse>>;
export declare const is_running_command = "is_running";
export declare type is_running_command = typeof is_running_command;
export declare type TIsRunningRequest = {
    service: str;
};
export declare type TIsRunningResponse = {
    success: bool;
    service_name: str;
    is_running: bool;
};
export declare function is_running(daemon: TDaemon, data: TIsRunningRequest): Promise<import("../types").GetMessageType<"daemon", "is_running", TIsRunningResponse>>;
export declare const exit_command = "exit";
export declare type exit_command = typeof exit_command;
export declare type TExitRequest = {};
export declare type TExitResponse = {
    success: bool;
};
export declare function exit(daemon: TDaemon): Promise<import("../types").GetMessageType<"daemon", "exit", TExitResponse>>;
export declare type TPlotQueue = {
    id: str;
    queue: str;
    size: int;
    parallel: bool;
    delay: int;
    state: str;
    error: Optional<str>;
    deleted: bool;
    log_new: str;
    log?: str;
};
export declare const register_service_command = "register_service";
export declare type register_service_command = typeof register_service_command;
export declare type TRegisterServiceRequest = {
    service: str;
};
export declare type TRegisterServiceResponse = {
    success: bool;
} | {
    success: bool;
    service: str;
    queue: TPlotQueue[];
};
export declare function register_service(daemon: TDaemon, data: TRegisterServiceRequest): Promise<import("../types").GetMessageType<"daemon", "register_service", TRegisterServiceResponse>>;
export declare const get_status_command = "get_status";
export declare type get_status_command = typeof get_status_command;
export declare type TGetStatusRequest = {};
export declare type TGetStatusResponse = {
    success: True;
    genesis_initialized: True;
};
export declare function get_status(daemon: TDaemon): Promise<import("../types").GetMessageType<"daemon", "get_status", TGetStatusResponse>>;
