export type ReceiveBlockResult =
  1 // NEW_PEAK
  | 2 // ADDED_AS_ORPHAN
  | 3 // INVALID_BLOCK
  | 4 // ALREADY_HAVE_BLOCK
  | 5 // DISCONNECTED_BLOCK
;
