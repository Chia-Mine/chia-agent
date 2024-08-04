import {readFileSync, existsSync} from "fs";
import {defaultDaemonCertPath, defaultDaemonKeyPath, getPathFromConfig} from "../config";
import * as WS from "ws";
import {Event} from "ws";
import {getLogger} from "../logger";

function create(url: string) {
  const daemonCertPath = getPathFromConfig("/daemon_ssl/private_crt") || defaultDaemonCertPath;
  const daemonKeyPath = getPathFromConfig("/daemon_ssl/private_key") || defaultDaemonKeyPath;
  
  if(!existsSync(daemonCertPath)){
    getLogger().error("daemon cert file was not found at: " + daemonCertPath);
    throw new Error("Cert file not found");
  }
  if(!existsSync(daemonCertPath)){
    getLogger().error("daemon key file was not found at: " + daemonCertPath);
    throw new Error("Key file not found");
  }
  
  const cert = readFileSync(daemonCertPath);
  const key = readFileSync(daemonKeyPath);
  const options = {
    cert,
    key,
    rejectUnauthorized: false,
  };
  
  return new WS(url, options);
}

const defaultTimeoutInMs = 50000;

export function open(url: string, timeoutMs?: number): Promise<{ ws: WS, openEvent: Event }> {
  return new Promise((resolve, reject) => {
    const ws = create(url);
    let timer: ReturnType<typeof setTimeout> | null = null;
    timeoutMs = typeof timeoutMs === "number" ? timeoutMs : defaultTimeoutInMs;
    
    timer = setTimeout(() => {
      timer = null;
      
      getLogger().error("Request to open connection timed out");
      reject("Timeout");
    }, timeoutMs);
    
    ws.onopen = (openEvent) => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        resolve({ws, openEvent});
      }
    };
    
    ws.onerror = (err) => reject(err);
  });
}
