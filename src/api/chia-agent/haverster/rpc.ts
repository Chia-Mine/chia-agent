import {bytes, float, G1Element, int, Optional, str} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";

export type Plot = {
  filename: str;
  size: int;
  "plot-seed": bytes;
  pool_public_key: Optional<G1Element>;
  pool_contract_puzzle_hash: Optional<bytes32>;
  plot_public_key: G1Element;
  file_size: int;
  time_modified: float;
};

export const get_plots = "get_plots";
export type TGetPlotsRequest = {
};
export type TGetPlotsResponse = {
  plots: Plot[];
  failed_to_open_filenames: str[];
  not_found_filenames: str[];
};




export const refresh_plots = "refresh_plots";
export type TRefreshPlotsRequest = {
};
export type TRefreshPlotsResponse = {
};




export const delete_plot = "delete_plot";
export type TDeletePlotRequest = {
  filename: str;
};
export type TDeletePlotResponse = {
};




export const add_plot_directory = "add_plot_directory";
export type TAddPlotDirectoryRequest = {
  dirname: str;
};
export type TAddPlotDirectoryResponse = {
};




export const get_plot_directories = "get_plot_directories";
export type TGetPlotDirectoriesRequest = {
};
export type TGetPlotDirectoriesResponse = {
  directories: str[];
};




export const remove_plot_directory = "remove_plot_directory";
export type TRemovePlotDirectoryRequest = {
  dirname: str;
};
export type TRemovePlotDirectoryResponse = {
};




