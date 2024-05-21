import {bool, int, str} from "../types/_python_types_";
import {Condition, ConditionValidTimes} from "../wallet/conditions";
import {TXConfigLoader, TXEndpointForCompat} from "../wallet/util/tx_config";

export type ExtraCondition = {
  opcode: str | int;
  args: Condition;
};

export type TXEndpointRequest = {
  wallet_type: str;
  extra_conditions?: ExtraCondition[];
  push?: bool;
}
& TXConfigLoader
& TXEndpointForCompat
& Partial<ConditionValidTimes>
;
