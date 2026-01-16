import { bool, False, str, True } from "../types/_python_types_";
import { TXConfigLoader, TXEndpointForCompat } from "../wallet/util/tx_config";
import { ConditionValidTimes } from "../wallet/conditions";
import { UnsignedTransaction } from "../wallet/signer_protocol";
import { ExtraCondition, TranslationLayerKey } from "./util";

export type TXEndpointRequestBase = {
  wallet_type?: str;
  extra_conditions?: ExtraCondition[];
  push?: bool;
  merge_spends?: bool;
  sign?: bool;
  translation?: TranslationLayerKey;
} & TXConfigLoader &
  TXEndpointForCompat &
  Partial<ConditionValidTimes>;

export type TXEndpointRequest = TXEndpointRequestBase &
  ({ "CHIP-0029": True } | { "CHIP-0029"?: False });

export type CHIP0029UnsignedTransaction<T extends TXEndpointRequest> =
  T extends { "CHIP-0029": True } ? str[] : UnsignedTransaction[];

export type TxeResp<Req extends TXEndpointRequest, Res> = {
  unsigned_transactions: CHIP0029UnsignedTransaction<Req>;
} & Res;
