import {bytes, float, G1Element, int, Optional, str} from "../../chia/types/_python_types_";
import {bytes32} from "../../chia/types/blockchain_format/sized_bytes";
import {IAgent} from "../../../agent.type";

const serviceName = "chia_harvester";

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

export type TGetPlotsRequest = {
};
export type TGetPlotsResponse = {
  plots: Plot[];
  failed_to_open_filenames: str[];
  not_found_filenames: str[];
};
export async function get_plots(agent: IAgent) {
  const command = "get_plots";
  return agent.sendMessage<TGetPlotsResponse>(serviceName, command, {});
}




export type TRefreshPlotsRequest = {
};
export type TRefreshPlotsResponse = {
};
export async function refresh_plots(agent: IAgent) {
  const command = "refresh_plots";
  return agent.sendMessage<TRefreshPlotsResponse>(serviceName, command, {});
}




export type TDeletePlotRequest = {
  filename: str;
};
export type TDeletePlotResponse = {
};
export async function delete_plot(agent: IAgent, data: TDeletePlotRequest) {
  const command = "delete_plot";
  return agent.sendMessage<TDeletePlotResponse>(serviceName, command, data);
}




export type TAddPlotDirectoryRequest = {
  dirname: str;
};
export type TAddPlotDirectoryResponse = {
};
export async function add_plot_directory(agent: IAgent, data: TAddPlotDirectoryRequest) {
  const command = "add_plot_directory";
  return agent.sendMessage<TAddPlotDirectoryResponse>(serviceName, command, data);
}




export type TGetPlotDirectoriesRequest = {
};
export type TGetPlotDirectoriesResponse = {
  directories: str[];
};
export async function get_plot_directories(agent: IAgent) {
  const command = "get_plot_directories";
  return agent.sendMessage<TGetPlotDirectoriesResponse>(serviceName, command, {});
}




export type TRemovePlotDirectoryRequest = {
  dirname: str;
};
export type TRemovePlotDirectoryResponse = {
};
export async function remove_plot_directory(agent: IAgent, data: TRemovePlotDirectoryRequest) {
  const command = "remove_plot_directory";
  return agent.sendMessage<TRemovePlotDirectoryResponse>(serviceName, command, data);
}
