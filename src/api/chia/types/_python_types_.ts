export type G1Element = string; // Hex string representing G1Element like "0xa7ad70989cc8f18e..."
export type G2Element = string; // Hex string representing G2Element
export type PrivateKey = string;  // Hex string

export type bytes = string; // Hex string

export type int = number;
export type int8 = number;
export type uint8 = number;
export type int16 = number;
export type uint16 = number;
export type int32 = number;
export type uint32 = number;
export type int64 = number | bigint;
export type uint64 = number | bigint;
export type uint128 = number | bigint;
export type int512 = number | bigint;

export type float = number;

export type str = string;
export type bool = boolean;

export type True = true;
export type False = false;
export type None = null;

export type Optional<T> = T | None;
