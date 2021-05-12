"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogger = exports.setLogLevel = exports.getLogLevel = void 0;
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
    formatMessage(level, body) {
        return `${(new Date()).toLocaleString()} [${level.toUpperCase()}] ${body}`;
    }
    debug(msg) {
        this._writer.write(this.formatMessage("debug", msg));
    }
    info(msg) {
        this._writer.write(this.formatMessage("info", msg));
    }
    warning(msg) {
        this._writer.write(this.formatMessage("warning", msg));
    }
    error(msg) {
        this._writer.write(this.formatMessage("error", msg));
    }
}
