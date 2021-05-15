"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConditionOpcodes = void 0;
exports.ConditionOpcodes = {
    // # UNKNOWN is ascii "0"
    UNKNOWN: "0",
    // # AGG_SIG is ascii "1"
    // # the conditions below require bls12-381 signatures
    AGG_SIG_UNSAFE: "1",
    AGG_SIG_ME: "2",
    // # the conditions below reserve coin amounts and have to be accounted for in output totals
    CREATE_COIN: "3",
    RESERVE_FEE: "4",
    // # the conditions below deal with announcements, for inter-coin communication
    CREATE_COIN_ANNOUNCEMENT: "12",
    ASSERT_COIN_ANNOUNCEMENT: "13",
    CREATE_PUZZLE_ANNOUNCEMENT: "14",
    ASSERT_PUZZLE_ANNOUNCEMENT: "15",
    // # the conditions below let coins inquire about themselves
    ASSERT_MY_COIN_ID: "22",
    ASSERT_MY_PARENT_ID: "23",
    ASSERT_MY_PUZZLEHASH: "24",
    ASSERT_MY_AMOUNT: "25",
    // # the conditions below ensure that we're "far enough" in the future
    // # wall-clock time
    ASSERT_SECONDS_RELATIVE: "32",
    ASSERT_SECONDS_ABSOLUTE: "33",
    // # block index
    ASSERT_HEIGHT_RELATIVE: "34",
    ASSERT_HEIGHT_ABSOLUTE: "35",
};
