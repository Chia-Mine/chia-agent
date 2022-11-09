import {bytes, G1Element, PrivateKey, Optional, str, uint32} from "../types/_python_types_";

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
