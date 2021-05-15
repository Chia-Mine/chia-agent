import { bytes, float, G1Element, int, Optional, str } from "../../chia/types/_python_types_";
import { bytes32 } from "../../chia/types/blockchain_format/sized_bytes";
export declare type Plot = {
    filename: str;
    size: int;
    "plot-seed": bytes;
    pool_public_key: Optional<G1Element>;
    pool_contract_puzzle_hash: Optional<bytes32>;
    plot_public_key: G1Element;
    file_size: int;
    time_modified: float;
};
export declare const get_plots = "get_plots";
export declare type TGetPlotsRequest = {};
export declare type TGetPlotsResponse = {
    plots: Plot[];
    failed_to_open_filenames: str[];
    not_found_filenames: str[];
};
export declare const refresh_plots = "refresh_plots";
export declare type TRefreshPlotsRequest = {};
export declare type TRefreshPlotsResponse = {};
export declare const delete_plot = "delete_plot";
export declare type TDeletePlotRequest = {
    filename: str;
};
export declare type TDeletePlotResponse = {};
export declare const add_plot_directory = "add_plot_directory";
export declare type TAddPlotDirectoryRequest = {
    dirname: str;
};
export declare type TAddPlotDirectoryResponse = {};
export declare const get_plot_directories = "get_plot_directories";
export declare type TGetPlotDirectoriesRequest = {};
export declare type TGetPlotDirectoriesResponse = {
    directories: str[];
};
export declare const remove_plot_directory = "remove_plot_directory";
export declare type TRemovePlotDirectoryRequest = {
    dirname: str;
};
export declare type TRemovePlotDirectoryResponse = {};
