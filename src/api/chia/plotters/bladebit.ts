import {bool, str} from "../types/_python_types_";

export const display_name = "BladeBit Plotter";

export type bladebit_install_info = {
  display_name: typeof display_name,
  version?: str,
  installed: bool,
  can_install?: bool;
  bladebit_memory_warning?: str;
  cuda_support: bool;
};
