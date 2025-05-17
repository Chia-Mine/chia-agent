export type AddBlockResult =
  | 1 // NEW_PEAK
  | 2 // ADDED_AS_ORPHAN
  | 3 // INVALID_BLOCK
  | 4 // ALREADY_HAVE_BLOCK
  | 5; // DISCONNECTED_BLOCK

// Leave this line for compatibility reason
export type ReceiveBlockResult = AddBlockResult;
