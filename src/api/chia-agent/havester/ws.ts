import {Plot} from "./rpc";

export const get_plots = "get_plots";
export type TGetPlotsBroadCast = {
  plots: Plot[];
  failed_to_open_filenames: string[];
  not_found_filenames: string[];
};
