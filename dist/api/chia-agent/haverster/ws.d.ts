import { Plot } from "./rpc";
export declare const get_plots = "get_plots";
export declare type TGetPlots = {
    plots: Plot[];
    failed_to_open_filenames: string[];
    not_found_filenames: string[];
};
