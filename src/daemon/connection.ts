import {readFileSync} from "fs";
import {getConfig, defaultDaemonCertPath, defaultDaemonKeyPath, getPathFromConfig} from "../config";
import * as WS from "ws";
import {OpenEvent} from "ws";

function create(url: string) {
  const config = getConfig();
  const daemonCertPath = getPathFromConfig("/daemon_ssl/private_crt") || defaultDaemonCertPath;
  const daemonKeyPath = getPathFromConfig("/daemon_ssl/private_key") || defaultDaemonKeyPath;
  
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

export function open(url: string, timeoutMs?: number): Promise<{ ws: WS, openEvent: OpenEvent }> {
  return new Promise((resolve, reject) => {
    const ws = create(url);
    let timer: ReturnType<typeof setTimeout> | null = null;
    timeoutMs = typeof timeoutMs === "number" ? timeoutMs : defaultTimeoutInMs;
    
    timer = setTimeout(() => {
      timer = null;
      reject("Timeout");
    }, timeoutMs);
    
    ws.onopen = (openEvent) => {
      if (timer !== null) {
        clearTimeout(timer);
        timer = null;
        resolve({ws, openEvent});
      }
    };
  });
}