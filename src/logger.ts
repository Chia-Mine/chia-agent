export type TLogLevel =
  | "error"
  | "warning"
  | "info"
  | "debug"
  | "trace"
  | "none";

const LOG_LEVELS = [
  "error",
  "warning",
  "info",
  "debug",
  "trace",
  "none",
] as const;

export function isValidLogLevel(level: string): level is TLogLevel {
  return LOG_LEVELS.includes(level.toLowerCase() as TLogLevel);
}

export function normalizeLogLevel(level: string): TLogLevel | null {
  const normalized = level.toLowerCase();
  if (isValidLogLevel(normalized)) {
    return normalized as TLogLevel;
  }
  return null;
}

export interface Writer {
  write: (message: string, level?: TLogLevel) => void;
}

export interface LogContext {
  timestamp: Date;
  level: TLogLevel;
  loggerName: string;
  message: string;
}

export type LogFormatter = (context: LogContext) => string;

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
let defaultLogLevel: TLogLevel = "error";
if (process.env.LOG_LEVEL) {
  const normalizedLevel = normalizeLogLevel(process.env.LOG_LEVEL);
  if (normalizedLevel) {
    defaultLogLevel = normalizedLevel;
  } else {
    console.warn(
      `Invalid LOG_LEVEL environment variable: ${process.env.LOG_LEVEL}. Using default: error`,
    );
  }
}
let defaultWriter: Writer =
  process.env.LOG_SUPPRESS === "true" ? new NullWriter() : new ConsoleWriter();

// Logger instance cache
const loggerCache = new Map<string, Logger>();

// Configuration functions for global defaults
export function setDefaultLogLevel(level: TLogLevel): void {
  // Normalize for JavaScript users who might pass uppercase
  const normalized = normalizeLogLevel(level);
  if (!normalized) {
    throw new Error(
      `Invalid log level: ${level}. Valid levels are: ${LOG_LEVELS.join(", ")}`,
    );
  }
  defaultLogLevel = normalized;
}

export function getDefaultLogLevel(): TLogLevel {
  return defaultLogLevel;
}

export function setDefaultWriter(writer: Writer): void {
  defaultWriter = writer;
}

export function setDefaultFormatter(formatter: LogFormatter): void {
  defaultFormatter = formatter;
}

export function getDefaultFormatter(): LogFormatter {
  return defaultFormatter;
}

export const DEFAULT_LOGGER_NAME = "default";

// Default formatter
export const defaultLogFormatter: LogFormatter = (
  context: LogContext,
): string => {
  const timestamp = context.timestamp.toISOString();
  const levelStr = context.level.toUpperCase();
  const nameStr =
    context.loggerName === DEFAULT_LOGGER_NAME
      ? ""
      : ` [${context.loggerName}]`;
  return `${timestamp} [${levelStr}]${nameStr} - ${context.message}`;
};

// Simple formatter without timestamp
export const simpleLogFormatter: LogFormatter = (
  context: LogContext,
): string => {
  const levelStr = context.level.toUpperCase();
  const nameStr =
    context.loggerName === DEFAULT_LOGGER_NAME
      ? ""
      : `[${context.loggerName}] `;
  return `[${levelStr}] ${nameStr}${context.message}`;
};

// JSON formatter
export const jsonLogFormatter: LogFormatter = (context: LogContext): string => {
  return JSON.stringify({
    timestamp: context.timestamp.toISOString(),
    level: context.level,
    logger: context.loggerName,
    message: context.message,
  });
};

let defaultFormatter: LogFormatter = defaultLogFormatter;

// Factory function with caching
export function getLogger(name: string = DEFAULT_LOGGER_NAME): Logger {
  let logger = loggerCache.get(name);
  if (!logger) {
    logger = new Logger(name, defaultLogLevel, defaultWriter, defaultFormatter);
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

export function stringify(obj: any, indent?: number) {
  if (typeof obj === "string") {
    return obj;
  } else if (typeof obj === "number") {
    return `${obj}`;
  } else if (typeof obj === "boolean") {
    return `${obj}`;
  } else if (typeof obj === "bigint") {
    return `${obj}n`;
  } else if (typeof obj === "symbol") {
    return obj.toString();
  } else if (typeof obj === "undefined") {
    return "undefined";
  } else if (typeof obj === "function") {
    return "[Function]";
  } else if (obj === null) {
    return "null";
  }

  try {
    // Deep clone the object while removing circular references
    const seen = new WeakSet();

    const deepCloneWithoutCircular = (value: any, path: string[] = []): any => {
      // Handle primitives and null
      if (value === null || typeof value !== "object") {
        if (typeof value === "bigint") {
          return `${value}n`;
        } else if (typeof value === "function") {
          return "[Function]";
        } else if (typeof value === "symbol") {
          return value.toString();
        }
        return value;
      }

      // Check for circular reference
      if (seen.has(value)) {
        return undefined; // This will cause the property to be omitted
      }

      seen.add(value);

      try {
        // Handle arrays
        if (Array.isArray(value)) {
          const clonedArray: any[] = [];
          for (let i = 0; i < value.length; i++) {
            const clonedValue = deepCloneWithoutCircular(value[i], [
              ...path,
              String(i),
            ]);
            if (clonedValue !== undefined) {
              clonedArray.push(clonedValue);
            }
          }
          return clonedArray;
        }

        // Handle objects
        const cloned: any = {};
        for (const key in value) {
          if (Object.prototype.hasOwnProperty.call(value, key)) {
            const clonedValue = deepCloneWithoutCircular(value[key], [
              ...path,
              key,
            ]);
            if (clonedValue !== undefined) {
              cloned[key] = clonedValue;
            }
          }
        }
        return cloned;
      } finally {
        // Remove from seen set when we're done processing this level
        seen.delete(value);
      }
    };

    const clonedObj = deepCloneWithoutCircular(obj);
    return JSON.stringify(clonedObj, null, indent);
  } catch (error) {
    const msg =
      error && typeof error === "object" && "message" in error
        ? error.message
        : "Unknown error";
    return `[Error stringifying object: ${msg}]`;
  }
}

export class Logger {
  private _name: string;
  private _logLevel: TLogLevel;
  private _writer: Writer;
  private _formatter: LogFormatter;

  constructor(
    name: string,
    logLevel: TLogLevel,
    writer: Writer,
    formatter?: LogFormatter,
  ) {
    // Normalize for JavaScript users who might pass uppercase
    const normalized = normalizeLogLevel(logLevel);
    if (!normalized) {
      throw new Error(
        `Invalid log level: ${logLevel}. Valid levels are: ${LOG_LEVELS.join(", ")}`,
      );
    }
    this._name = name;
    this._logLevel = normalized;
    this._writer = writer;
    this._formatter = formatter || defaultFormatter;
  }

  // Allow changing log level for this specific logger
  public setLogLevel(level: TLogLevel) {
    // Normalize for JavaScript users who might pass uppercase
    const normalized = normalizeLogLevel(level);
    if (!normalized) {
      throw new Error(
        `Invalid log level: ${level}. Valid levels are: ${LOG_LEVELS.join(", ")}`,
      );
    }
    this._logLevel = normalized;
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

  public setFormatter(formatter: LogFormatter) {
    this._formatter = formatter;
  }

  public getFormatter() {
    return this._formatter;
  }

  private _shouldWrite(logLevel: TLogLevel) {
    return logPriority[this._logLevel] <= logPriority[logLevel];
  }

  private _formatMessage(level: TLogLevel, body: string) {
    const context: LogContext = {
      timestamp: new Date(),
      level,
      loggerName: this._name,
      message: body,
    };
    return this._formatter(context);
  }

  public trace(msg: any | (() => any)) {
    if (this._shouldWrite("trace")) {
      const message = typeof msg === "function" ? msg() : msg;
      this._writer.write(
        this._formatMessage("trace", stringify(message)),
        "trace",
      );
    }
  }

  public debug(msg: any | (() => any)) {
    if (this._shouldWrite("debug")) {
      const message = typeof msg === "function" ? msg() : msg;
      this._writer.write(
        this._formatMessage("debug", stringify(message)),
        "debug",
      );
    }
  }

  public info(msg: any | (() => any)) {
    if (this._shouldWrite("info")) {
      const message = typeof msg === "function" ? msg() : msg;
      this._writer.write(
        this._formatMessage("info", stringify(message)),
        "info",
      );
    }
  }

  public warning(msg: any | (() => any)) {
    if (this._shouldWrite("warning")) {
      const message = typeof msg === "function" ? msg() : msg;
      this._writer.write(
        this._formatMessage("warning", stringify(message)),
        "warning",
      );
    }
  }

  public error(msg: any | (() => any)) {
    if (this._shouldWrite("error")) {
      const message = typeof msg === "function" ? msg() : msg;
      this._writer.write(
        this._formatMessage("error", stringify(message)),
        "error",
      );
    }
  }
}

// For backward compatibility
export function getLogLevel(): TLogLevel {
  return getDefaultLogLevel();
}

export function setLogLevel(level: TLogLevel): void {
  // Normalize for JavaScript users who might pass uppercase
  const normalized = normalizeLogLevel(level);
  if (!normalized) {
    throw new Error(
      `Invalid log level: ${level}. Valid levels are: ${LOG_LEVELS.join(", ")}`,
    );
  }
  setDefaultLogLevel(normalized);
}
