export type TLogLevel =
  | "error"
  | "warning"
  | "info"
  | "debug"
  | "trace"
  | "none";

export interface Writer {
  write: (message: string, level?: TLogLevel) => void;
}

const logPriority: Record<TLogLevel, number> = {
  none: 9999,
  error: 5,
  warning: 4,
  info: 3,
  debug: 2,
  trace: 1,
};

class ConsoleWriter implements Writer {
  write(message: string, level?: TLogLevel) {
    switch (level) {
      case "error":
        console.error(message);
        break;
      case "warning":
        console.warn(message);
        break;
      case "info":
        console.info(message);
        break;
      case "debug":
        console.debug(message);
        break;
      case "trace":
        console.trace(message);
        break;
      default:
        console.log(message);
    }
  }
}

class NullWriter implements Writer {
  write(_message: string, _level?: TLogLevel) {
    // Suppress all output
  }
}

// Global defaults
let defaultLogLevel: TLogLevel =
  (process.env.LOG_LEVEL as TLogLevel) || "error";
let defaultWriter: Writer =
  process.env.LOG_SUPPRESS === "true" ? new NullWriter() : new ConsoleWriter();

// Logger instance cache
const loggerCache = new Map<string, Logger>();

// Configuration functions for global defaults
export function setDefaultLogLevel(level: TLogLevel) {
  defaultLogLevel = level;
}

export function getDefaultLogLevel() {
  return defaultLogLevel;
}

export function setDefaultWriter(writer: Writer) {
  defaultWriter = writer;
}

// Factory function with caching
export function getLogger(name: string = "default"): Logger {
  let logger = loggerCache.get(name);
  if (!logger) {
    logger = new Logger(name, defaultLogLevel, defaultWriter);
    loggerCache.set(name, logger);
  }
  return logger;
}

// Clear logger cache (useful for testing)
export function clearLoggerCache() {
  loggerCache.clear();
}

// Helper to create writers
export function createConsoleWriter(): Writer {
  return new ConsoleWriter();
}

export function createNullWriter(): Writer {
  return new NullWriter();
}

function stringify(obj: any, indent?: number) {
  if (typeof obj === "string") {
    return obj;
  } else if (typeof obj === "number") {
    return `${obj}`;
  } else if (typeof obj === "boolean") {
    return `${obj}`;
  } else if (typeof obj === "bigint") {
    return `${obj}`;
  } else if (typeof obj === "symbol") {
    return obj.toString();
  } else if (typeof obj === "undefined") {
    return "undefined";
  } else if (typeof obj === "function") {
    return "[Function]";
  }

  const seen = new WeakSet();
  return JSON.stringify(
    obj,
    (_k, v) => {
      if (typeof v === "object" && v !== null) {
        if (seen.has(v)) {
          return undefined;
        }
        seen.add(v);
      } else if (typeof v === "bigint") {
        return `${v}n`;
      }
      return v;
    },
    indent,
  );
}

class Logger {
  private _name: string;
  private _logLevel: TLogLevel;
  private _writer: Writer;

  constructor(name: string, logLevel: TLogLevel, writer: Writer) {
    this._name = name;
    this._logLevel = logLevel;
    this._writer = writer;
  }

  // Allow changing log level for this specific logger
  public setLogLevel(level: TLogLevel) {
    this._logLevel = level;
  }

  public getLogLevel() {
    return this._logLevel;
  }

  // Allow changing writer for this specific logger
  public setWriter(writer: Writer) {
    this._writer = writer;
  }

  public getWriter() {
    return this._writer;
  }

  public getName() {
    return this._name;
  }

  private _shouldWrite(logLevel: TLogLevel) {
    return logPriority[this._logLevel] <= logPriority[logLevel];
  }

  private _formatMessage(level: TLogLevel, body: string) {
    return `${new Date().toISOString()} [${level.toUpperCase()}] [${this._name}] ${body}`;
  }

  public trace(msg: any) {
    if (this._shouldWrite("trace")) {
      this._writer.write(this._formatMessage("trace", stringify(msg)), "trace");
    }
  }

  public debug(msg: any) {
    if (this._shouldWrite("debug")) {
      this._writer.write(this._formatMessage("debug", stringify(msg)), "debug");
    }
  }

  public info(msg: any) {
    if (this._shouldWrite("info")) {
      this._writer.write(this._formatMessage("info", stringify(msg)), "info");
    }
  }

  public warning(msg: any) {
    if (this._shouldWrite("warning")) {
      this._writer.write(
        this._formatMessage("warning", stringify(msg)),
        "warning",
      );
    }
  }

  public error(msg: any) {
    if (this._shouldWrite("error")) {
      this._writer.write(this._formatMessage("error", stringify(msg)), "error");
    }
  }
}

// For backward compatibility
export function getLogLevel() {
  return getDefaultLogLevel();
}

export function setLogLevel(level: TLogLevel) {
  setDefaultLogLevel(level);
}
