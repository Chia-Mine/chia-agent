import * as WS from "ws";
import { OpenEvent } from "ws";
export declare function open(url: string, timeoutMs?: number): Promise<{
    ws: WS;
    openEvent: OpenEvent;
}>;
