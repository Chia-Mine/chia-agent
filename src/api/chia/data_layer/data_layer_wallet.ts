import { bool, Optional, str } from "../types/_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";

export type Mirror = {
  coin_id: str;
  launcher_id: str;
  amount: uint64;
  urls: str[];
  ours: bool;
  confirmed_at_height: Optional<uint32>;
};
