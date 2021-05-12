export type TLogLevel = "error"|"warning"|"info"|"debug"|"none";
export type TDestination = "console";
export type Writer = {
  write: (message: string) => void;
};

const logPriority: Record<TLogLevel, number> = {
  "none": 9999,
  "error": 4,
  "warning": 3,
  "info": 2,
  "debug": 1,
};

class ConsoleWriter implements Writer {
  write(message: string){
    console.log(message);
  }
}

let currentLogLevel: TLogLevel = "error";
export function getLogLevel(){ return currentLogLevel; }
export function setLogLevel(logLevel: TLogLevel){ return currentLogLevel = logLevel; }

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
  
  public debug(msg: string){
    if(this.shouldWrite("debug")){
      this._writer.write(this.formatMessage("debug", msg));
    }
  }
  
  public info(msg: string){
    if(this.shouldWrite("info")){
      this._writer.write(this.formatMessage("info", msg));
    }
  }
  
  public warning(msg: string){
    if(this.shouldWrite("warning")){
      this._writer.write(this.formatMessage("warning", msg));
    }
  }
  
  public error(msg: string){
    if(this.shouldWrite("error")){
      this._writer.write(this.formatMessage("error", msg));
    }
  }
}

