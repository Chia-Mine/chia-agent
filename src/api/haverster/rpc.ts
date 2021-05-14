import {bytes, G1Element} from "../chia/types/_python_types_";
import {bytes32} from "../chia/types/blockchain_format/sized_bytes";

export type Plot = {
  filename: string;
  size: number;
  "plot-seed": bytes;
  pool_public_key?: G1Element;
  pool_contract_puzzle_hash?: bytes32;
  plot_public_key: G1Element;
  file_size: number; // int
  time_modified: number; // float
};

export const get_plots = "get_plots";
export type TGetPlotsRequest = {
};
export type TGetPlotsResponse = {
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
};




export const refresh_plots = "refresh_plots";
export type TRefreshPlotsRequest = {
};
export type TRefreshPlotsResponse = {
};




export const delete_plot = "delete_plot";
export type TDeletePlotRequest = {
  filename: string;
};
export type TDeletePlotResponse = {
};




export const add_plot_directory = "add_plot_directory";
export type TAddPlotDirectoryRequest = {
  dirname: string;
};
export type TAddPlotDirectoryResponse = {
};




export const get_plot_directories = "get_plot_directories";
export type TGetPlotDirectoriesRequest = {
};
export type TGetPlotDirectoriesResponse = {
  directories: string[];
};




export const remove_plot_directory = "remove_plot_directory";
export type TRemovePlotDirectoryRequest = {
  dirname: string;
};
export type TRemovePlotDirectoryResponse = {
};




