export type TLogLevel = "error"|"warning"|"info"|"debug"|"none";
export type TDestination = "console";
export type Writer = {
  write: (message: string) => void;
};

const logPriority: Record<TLogLevel, number> = {
  none: 9999,
  error: 4,
  warning: 3,
  info: 2,
  debug: 1,
};

class ConsoleWriter implements Writer {
  write(message: string){
    console.log(message);
  }
}

let currentLogLevel: TLogLevel = "error";
export function getLogLevel(){ return currentLogLevel; }
export function setLogLevel(logLevel: TLogLevel){ return currentLogLevel = logLevel; }

function stringify(obj: any, indent?: number){
  if(typeof obj === "string"){
    return obj;
  }
  else if(typeof obj === "number"){
    return `${obj}`;
  }
  else if(typeof obj === "boolean"){
    return `${obj}`;
  }
  else if(typeof obj === "bigint"){
    return `${obj}`;
  }
  else if(typeof obj === "symbol"){
    return obj.toString();
  }
  else if(typeof obj === "undefined"){
    return "undefined";
  }
  else if(typeof obj === "function"){
    return "[Function]";
  }
  
  const seen = new WeakSet();
  return JSON.stringify(obj, (k, v) => {
    if(typeof v === "object" && v !== null){
      if(seen.has(v)){
        return undefined;
      }
      seen.add(v);
    }
    else if(typeof v === "bigint"){
      return `${v}n`;
    }
    return v;
  }, indent);
}

const loggers: Partial<Record<TDestination, Logger>> = {};

export function getLogger(writer?: TDestination){
  const w = writer || "console";
  
  const logger = loggers[w];
  if(logger && logger.loglevel === currentLogLevel){
    return logger;
  }
  
  return loggers[w] = Logger.getLogger(currentLogLevel, w);
}

class Logger {
  public loglevel: TLogLevel = "error";
  protected _writer: Writer;
  
  protected constructor(logLevel: TLogLevel, writer?: TDestination|Writer) {
    if(writer === "console"){
      this._writer = new ConsoleWriter();
    }
    else if(writer){
      this._writer = writer;
    }
    else{
      this._writer = new ConsoleWriter();
    }
    
    this.loglevel = logLevel;
  }
  
  public static getLogger(logLevel: TLogLevel, writer?: TDestination){
    return new Logger(logLevel, writer);
  }
  
  public setLogLevel(level: TLogLevel){
    this.loglevel = level;
  }
  
  public shouldWrite(logLevel: TLogLevel){
    return logPriority[this.loglevel] <= logPriority[logLevel];
  }
  
  public formatMessage(level: TLogLevel, body: string){
    return `${(new Date()).toLocaleString()} [${level.toUpperCase()}] ${body}`;
  }
  
  public debug(msg: any){
    if(this.shouldWrite("debug")){
      this._writer.write(this.formatMessage("debug", stringify(msg)));
    }
  }
  
  public info(msg: any){
    if(this.shouldWrite("info")){
      this._writer.write(this.formatMessage("info", stringify(msg)));
    }
  }
  
  public warning(msg: any){
    if(this.shouldWrite("warning")){
      this._writer.write(this.formatMessage("warning", stringify(msg)));
    }
  }
  
  public error(msg: any){
    if(this.shouldWrite("error")){
      this._writer.write(this.formatMessage("error", stringify(msg)));
    }
  }
}

