import {bytes32} from "../types/blockchain_format/sized_bytes";
import {bool, float, int, None, Optional, str, uint32} from "../types/_python_types_";
import {Plot} from "../protocols/harvester_protocol";
import {HarvestingMode} from "../plotting/util";

export type MayBeSummary<S, O> = S extends true ? int : O;

export type Receiver<SUMMARY extends boolean = false> = {
  connection: {
    node_id: bytes32;
    host: str;
    port: int;
    // The type of `port` here might be `str` but I found out that it is `int`.
    // See https://github.com/aio-libs/aiohttp/blob/0215cdd4275ea0150f169545b25b66e1f5dc69f0/aiohttp/client_reqrep.py#L140
    // https://github.com/aio-libs/aiohttp/blob/0215cdd4275ea0150f169545b25b66e1f5dc69f0/aiohttp/client_exceptions.py#L215
  };
  plots: MayBeSummary<SUMMARY, Plot[]>;
  failed_to_open_filenames: MayBeSummary<SUMMARY, str[]>;
  no_key_filenames: MayBeSummary<SUMMARY, str[]>;
  duplicates: MayBeSummary<SUMMARY, str[]>;
  total_plot_size: int;
  total_effective_plot_size: int;
  syncing: {
    initial: bool;
    plot_files_processed: uint32;
    plot_files_total: uint32;
  } | None;
  last_sync_time: Optional<float>;
  harvesting_mode: Optional<HarvestingMode>;
};
