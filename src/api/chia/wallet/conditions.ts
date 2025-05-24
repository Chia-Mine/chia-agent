import { Optional, str } from "../types/_python_types_";
import { uint32, uint64 } from "../../chia_rs/wheel/python/sized_ints";

export type Condition = Record<str, any>;

export type ConditionValidTimes = {
  min_secs_since_created: Optional<uint64>; // ASSERT_SECONDS_RELATIVE
  min_time: Optional<uint64>; // ASSERT_SECONDS_ABSOLUTE
  min_blocks_since_created: Optional<uint32>; // ASSERT_HEIGHT_RELATIVE
  min_height: Optional<uint32>; // ASSERT_HEIGHT_ABSOLUTE
  max_secs_after_created: Optional<uint64>; // ASSERT_BEFORE_SECONDS_RELATIVE
  max_time: Optional<uint64>; // ASSERT_BEFORE_SECONDS_ABSOLUTE
  max_blocks_after_created: Optional<uint32>; // ASSERT_BEFORE_HEIGHT_RELATIVE
  max_height: Optional<uint32>; // ASSERT_BEFORE_HEIGHT_ABSOLUTE
};
