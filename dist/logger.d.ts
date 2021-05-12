export declare type TLogLevel = "error" | "warning" | "info" | "debug";
export declare type TDestination = "console";
export declare type Writer = {
    write: (message: string) => void;
};
export declare function getLogLevel(): TLogLevel;
export declare function setLogLevel(logLevel: TLogLevel): TLogLevel;
export declare function getLogger(writer?: TDestination): Logger;
declare class Logger {
    loglevel: TLogLevel;
    protected _writer: Writer;
    protected constructor(logLevel: TLogLevel, writer?: TDestination | Writer);
    static getLogger(logLevel: TLogLevel, writer?: TDestination): Logger;
    setLogLevel(level: TLogLevel): void;
    formatMessage(level: TLogLevel, body: string): string;
    debug(msg: string): void;
    info(msg: string): void;
    warning(msg: string): void;
    error(msg: string): void;
}
export {};
