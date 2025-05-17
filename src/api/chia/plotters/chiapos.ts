import { bool, str } from "../types/_python_types_";

export const display_name = "Chia Proof of Space";

export type chiapos_install_info = {
  display_name: typeof display_name;
  version: str;
  installed: bool;
};
