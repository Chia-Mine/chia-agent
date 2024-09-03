import {bool, False, int, str, True} from "../types/_python_types_";
import {Condition, ConditionValidTimes} from "../wallet/conditions";
import {TXConfigLoader, TXEndpointForCompat} from "../wallet/util/tx_config";
import {UnsignedTransaction} from "../wallet/signer_protocol";

export type ExtraCondition = {
  opcode: str | int;
  args: Condition;
};

export type TranslationLayerKey = "CHIP-0028";

export type CHIP0029 = { "CHIP-0029"?: True } | { "CHIP-0029"?: False };

export type Marshall = {
  translation?: TranslationLayerKey;
} & CHIP0029;

export type TXEndpointRequest = {
  wallet_type: str;
  extra_conditions?: ExtraCondition[];
  push?: bool;
  merge_spends?: bool;
  sign?: bool;
  translation?: TranslationLayerKey;
}
& CHIP0029
& TXConfigLoader
& TXEndpointForCompat
& Partial<ConditionValidTimes>
;

export type CHIP0029UnsignedTransaction<T extends TXEndpointRequest> = T extends {"CHIP-0029"?: True}
  ? str[] : UnsignedTransaction[];

export type TxeResp<Req extends TXEndpointRequest, Res> = Res &
{
  unsigned_transactions: CHIP0029UnsignedTransaction<Req>;
};
