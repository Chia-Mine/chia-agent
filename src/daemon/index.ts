import type {CloseEvent, ErrorEvent, MessageEvent, OpenEvent} from "ws";
import * as WS from "ws";
import {randomBytes} from "crypto";
import {getLogger} from "../logger";
import {open} from "./connection";
import {getConfig} from "../config/index";

export type EventType = "open" | "message" | "error" | "close";
export type Event = OpenEvent | MessageEvent | ErrorEvent | CloseEvent;
export type EventListener<T=Event> = (ev: T) => unknown;

type EventListenerOf<T> =
  T extends "open" ? EventListener<OpenEvent>
    : T extends "message" ? EventListener<MessageEvent>
      : T extends "error" ? EventListener<ErrorEvent>
        : T extends "close" ? EventListener<CloseEvent> : never;

export type MessageData = {
  command: string;
  ack: boolean;
  data: any;
  request_id: string;
  destination: string;
  origin: string;
};
export type MessageListener = (data: MessageData) => unknown;

const agentServiceName = "chia_agent";

let socket: Daemon|null = null;

export function getDaemon(){
  if(socket){
    return socket;
  }
  
  return socket = new Daemon();
}

class Daemon {
  protected _socket: WS|null = null;
  protected _connectedUrl: string = "";
  protected _responseQueue: {[request_id: string]: (value: unknown) => void} = {};
  protected _openEventListeners: Array<(e: OpenEvent) => unknown> = [];
  protected _messageEventListeners: Array<(e: MessageEvent) => unknown> = [];
  protected _errorEventListeners: Array<(e: ErrorEvent) => unknown> = [];
  protected _closeEventListeners: Array<(e: CloseEvent) => unknown> = [];
  protected _messageListeners: Record<string, Array<(e: MessageData) => unknown>> = {};
  
  public get connected(){
    return Boolean(this._connectedUrl);
  }
  
  public constructor() {
    this.onOpen = this.onOpen.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onClose = this.onClose.bind(this);
  }
  
  /**
   * Connect to local daemon via websocket.
   * @param url
   */
  public async connect(url?: string) {
    if(!url){
      const config = getConfig();
      const daemonHost = config["/ui/daemon_host"];
      const daemonPort = config["/ui/daemon_port"];
      url = `wss://${daemonHost}:${daemonPort}`;
    }
    
    if(this._connectedUrl === url){
      getLogger().warning(`Already connected to ${url}`);
      return;
    }
    else if(this._connectedUrl){
      getLogger().error(`Connection is still active. Please close living connection first`);
      return;
    }
    
    const result = await open(url);
    this._socket = result.ws;
    this._socket.onerror = this.onError;
    this._socket.onmessage = this.onMessage;
    this._socket.onclose = this.onClose;
    this.onOpen(result.openEvent, url);
  }
  
  public async close(){
    if(!this._socket){
      return;
    }
    
    this._socket.close();
    this._socket = null;
  }
  
  public async sendMessage(command: string, destination: string, data?: Record<string, unknown>){
    return new Promise((resolve, reject) => {
      if(!this.connected || !this._socket){
        getLogger().error("Tried to send message without active connection");
        reject("Not connected");
        return;
      }
      
      let timer: ReturnType<typeof setTimeout>|null = null;
      const message = this.createMessageTemplate(command, destination, data || {});
      const reqId = message.request_id;
      this._responseQueue[reqId] = resolve;
      this._socket.send(JSON.stringify(message));
    });
  }
  
  public createMessageTemplate(command: string, destination: string, data: Record<string, unknown>){
    return {
      command,
      data,
      ack: false,
      origin: agentServiceName,
      destination,
      request_id: randomBytes(32).toString("hex"),
    };
  }
  
  public async subscribe(service: string){
    let error: unknown;
    const result = await this.sendMessage("register_service", "daemon", {service}).catch(e => {
      error = e;
      return null;
    });
    
    if(error){
      getLogger().error("Failed to register agent service to daemon");
      throw new Error("Subscribe failed");
    }
    
    return result;
  }
  
  public addEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>){
    if(type === "open"){
      this._openEventListeners.push(listener as EventListener<OpenEvent>);
    }
    else if(type === "message"){
      this._messageEventListeners.push(listener as EventListener<MessageEvent>);
    }
    else if(type === "error"){
      this._errorEventListeners.push(listener as EventListener<ErrorEvent>);
    }
    else if(type === "close"){
      this._closeEventListeners.push(listener as EventListener<CloseEvent>);
    }
  }
  
  public removeEventListener<T extends EventType>(type: T, listener: EventListenerOf<T>){
    let listeners;
    if(type === "open"){
      listeners = this._openEventListeners;
    }
    else if(type === "message"){
      listeners = this._messageEventListeners;
    }
    else if(type === "error"){
      listeners = this._errorEventListeners;
    }
    else if(type === "close"){
      listeners = this._closeEventListeners;
    }
    else{
      return;
    }
    
    const index = listeners.findIndex((l: unknown) => l === listener);
    if(index > -1){
      listeners.splice(index, 1);
    }
  }
  
  public clearAllEventListeners(){
    this._openEventListeners = [];
    this._messageEventListeners = [];
    this._errorEventListeners = [];
    this._closeEventListeners = [];
  }
  
  /**
   * Add listener for message
   * @param {string} origin - Can be chia_farmer, chia_full_node, chia_wallet, etc.
   * @param listener - Triggered when a message arrives.
   */
  public addMessageListener(origin: string|undefined, listener: MessageListener){
    const o = origin || "all";
    if(!this._messageListeners[o]){
      this._messageListeners[o] = [];
    }
    
    this._messageListeners[o].push(listener);
  }
  
  public removeMessageListener(origin: string, listener: MessageListener){
    const listeners = this._messageListeners[origin];
    if(!listeners){
      return;
    }
    
    const index = listeners.findIndex(l => l === listener);
    if(index > -1){
      listeners.splice(index, 1);
    }
  }
  
  public clearAllMessageListeners(){
    this._messageListeners = {};
  }
  
  protected onOpen(event: OpenEvent, url: string){
    getLogger().info("ws connection opened");
    this._connectedUrl = url;
    this._openEventListeners.forEach(l => l(event));
  }
  
  protected onError(error: ErrorEvent){
    getLogger().error(`ws connection error: ${error.message}`);
    this._errorEventListeners.forEach(l => l(error));
  }
  
  protected onMessage(event: MessageEvent){
    const payload = JSON.parse(event.data as string);
    const {request_id, origin, command} = payload;
    getLogger().debug(`ws message arrived. origin=${origin} command=${command}`);
  
    const resolver = this._responseQueue[request_id];
    if(resolver){
      delete this._responseQueue[request_id];
      resolver(payload);
    }
    
    this._messageEventListeners.forEach(l => l(event));
    for(const o in this._messageListeners){
      if(!this._messageListeners.hasOwnProperty(o)){
        continue;
      }
      
      const listeners = this._messageListeners[o];
      if(origin === o || o === "all"){
        listeners.forEach(l => l(payload));
      }
    }
  }
  
  protected onClose(event: CloseEvent){
    getLogger().info(`Closing ws connection`);
    this._connectedUrl = "";
    this._closeEventListeners.forEach(l => l(event));
  }
}

