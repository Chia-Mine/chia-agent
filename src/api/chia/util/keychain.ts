import { bytes, Optional, str } from "../types/_python_types_";
import { PrivateKey } from "../../chia_rs/chia-bls/secret_key";
import { G1Element } from "../../chia_rs/chia-bls/lib";
import { uint32 } from "../../chia_rs/wheel/python/sized_ints";

export type KeyDataSecrets = {
  mnemonic: str[];
  entropy: bytes;
  private_key: PrivateKey;
};

export type KeyData = {
  fingerprint: uint32;
  public_key: G1Element;
  label: Optional<str>;
  secrets: Optional<KeyDataSecrets>;
};
