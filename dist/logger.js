"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.setLogLevel = exports.getLogLevel = void 0;
const logPriority = {
    "none": 9999,
    "error": 4,
    "warning": 3,
    "info": 2,
    "debug": 1,
};
class ConsoleWriter {
    write(message) {
        console.log(message);
    }
}
let currentLogLevel = "error";
function getLogLevel() { return currentLogLevel; }
exports.getLogLevel = getLogLevel;
function setLogLevel(logLevel) { return currentLogLevel = logLevel; }
exports.setLogLevel = setLogLevel;
const loggers = {};
function getLogger(writer) {
    const w = writer || "console";
    const logger = loggers[w];
    if (logger && logger.loglevel === currentLogLevel) {
        return logger;
    }
    return loggers[w] = Logger.getLogger(currentLogLevel, w);
}
exports.getLogger = getLogger;
class Logger {
    constructor(logLevel, writer) {
        this.loglevel = "error";
        if (writer === "console") {
            this._writer = new ConsoleWriter();
        }
        else if (writer) {
            this._writer = writer;
        }
        else {
            this._writer = new ConsoleWriter();
        }
        this.loglevel = logLevel;
    }
    static getLogger(logLevel, writer) {
        return new Logger(logLevel, writer);
    }
    setLogLevel(level) {
        this.loglevel = level;
    }
    shouldWrite(logLevel) {
        return logPriority[this.loglevel] <= logPriority[logLevel];
    }
    formatMessage(level, body) {
        return `${(new Date()).toLocaleString()} [${level.toUpperCase()}] ${body}`;
    }
    debug(msg) {
        if (this.shouldWrite("debug")) {
            this._writer.write(this.formatMessage("debug", msg));
        }
    }
    info(msg) {
        if (this.shouldWrite("info")) {
            this._writer.write(this.formatMessage("info", msg));
        }
    }
    warning(msg) {
        if (this.shouldWrite("warning")) {
            this._writer.write(this.formatMessage("warning", msg));
        }
    }
    error(msg) {
        if (this.shouldWrite("error")) {
            this._writer.write(this.formatMessage("error", msg));
        }
    }
}
