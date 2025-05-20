import { bool, Optional, str, uint32, uint64 } from "../types/_python_types_";

export type Mirror = {
  coin_id: str;
  launcher_id: str;
  amount: uint64;
  urls: str[];
  ours: bool;
  confirmed_at_height: Optional<uint32>;
};
