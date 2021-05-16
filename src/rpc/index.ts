import {Agent as HttpsAgent, request as httpsRequest} from "https";
import {Agent as HttpAgent, OutgoingHttpHeaders, request as httpRequest} from "http";
import {existsSync, readFileSync} from "fs";
import {IAgent} from "../agent.type";
import {getLogger} from "../logger";
import {configPath as defaultConfigPath, getConfig, resolveFromChiaRoot, TConfig} from "../config/index";
import {TMessage} from "../api/chia-agent";

type TDestination = "farmer"|"harvester"|"full_node"|"wallet"|"daemon"

export function getConnectionInfoFromConfig(destination: TDestination, config: TConfig){
  const hostname = "localhost";
  let port = -1;
  if(destination === "daemon"){
    port = +(config["/daemon_port"] as string);
  }
  else if(destination === "farmer"){
    port = +(config["/farmer/rpc_port"] as string);
  }
  else if(destination === "harvester"){
    port = +(config["/harvester/rpc_port"] as string);
  }
  else if(destination === "full_node"){
    port = +(config["/full_node/rpc_port"] as string);
  }
  else if(destination === "wallet"){
    port = +(config["/wallet/rpc_port"] as string);
  }
  else{
    throw new Error(`Unknown destination: ${destination}`);
  }
  
  return {hostname, port};
}

export type TRPCAgentProps = {
  protocol: "https";
  host: string;
  port: number;
  ca_cert: string|Buffer;
  client_cert: string|Buffer;
  client_key: string|Buffer;
} | {
  protocol: "https";
  host: string;
  port: number;
  configPath: string;
} | {
  protocol: "http";
  host: string;
  port: number;
} | {
  destination: TDestination;
  configPath?: string;
};

const userAgent = "chia-agent/1.0.0";

export class RPCAgent implements IAgent {
  protected _protocol: "http"|"https";
  protected _hostname: string;
  protected _port: number;
  protected _caCert: string|Buffer = "";
  protected _clientCert: string|Buffer = "";
  protected _clientKey: string|Buffer = "";
  protected _agent: HttpsAgent|HttpAgent;
  
  public constructor(props: TRPCAgentProps) {
    if("protocol" in props){
      this._protocol = props.protocol;
      this._hostname = props.host;
      this._port = props.port;
  
      if(props.protocol === "https"){
        if("configPath" in props){
          const config = this._getConfig(props.configPath);
          const certs = this._loadCertFilesFromConfig(config);
          this._clientCert = certs.clientCert;
          this._clientKey = certs.clientKey;
          this._caCert = certs.caCert;
        }
        else{
          this._caCert = props.ca_cert;
          this._clientCert = props.client_cert;
          this._clientKey = props.client_key;
        }
    
        this._agent = new HttpsAgent({
          host: this._hostname,
          port: this._port,
          ca: this._caCert,
          cert: this._clientCert,
          key: this._clientKey,
          rejectUnauthorized: Boolean(this._caCert) && this._hostname !== "localhost",
        });
      }
      else{
        this._agent = new HttpAgent();
      }
    }
    else{
      this._protocol = "https";
  
      const config = this._getConfig("configPath" in props ? props.configPath : undefined);
      const {hostname, port} = getConnectionInfoFromConfig(props.destination, config);
      getLogger().debug(`Picked ${hostname}:${port} for ${props.destination}`);
      
      this._hostname = hostname;
      this._port = port;
  
      const certs = this._loadCertFilesFromConfig(config);
      this._clientCert = certs.clientCert;
      this._clientKey = certs.clientKey;
      this._caCert = certs.caCert;
  
      this._agent = new HttpsAgent({
        host: this._hostname,
        port: this._port,
        ca: this._caCert,
        cert: this._clientCert,
        key: this._clientKey,
        rejectUnauthorized: Boolean(this._caCert) && this._hostname !== "localhost",
      });
    }
  }
  
  protected _getConfig(configPath?: string){
    configPath = configPath || defaultConfigPath;
    if (!existsSync(configPath)) {
      getLogger().error(`chia config file does not exist at: ${configPath}`)
      throw new Error("chia config file Not Found.");
    }
  
    return getConfig(configPath);
  }
  
  protected _loadCertFilesFromConfig(config: TConfig){
    const clientCertPath = resolveFromChiaRoot([config["/daemon_ssl/private_crt"]] as string[]);
    const clientKeyPath = resolveFromChiaRoot([config["/daemon_ssl/private_key"]] as string[]);
    const caCertPath = resolveFromChiaRoot([config["/private_ssl_ca/crt"]] as string[]);
    
    getLogger().debug(`Loading client cert file from ${clientCertPath}`);
    getLogger().debug(`Loading client key file from ${clientKeyPath}`);
    getLogger().debug(`Loading ca cert file from ${caCertPath}`);
  
    const getCertOrKey = (path: string) => {
      if (!existsSync(path)) {
        getLogger().error(`ssl crt/key does not exist at: ${path}`)
        throw new Error(`crt/key Not Found at ${path}`);
      }
      return readFileSync(path);
    };
  
    const clientCert = getCertOrKey(clientCertPath);
    const clientKey = getCertOrKey(clientKeyPath);
    const caCert = getCertOrKey(caCertPath);
    
    return {clientCert, clientKey, caCert};
  }
  
  public async sendMessage(destination: string, command: string, data?: Record<string, unknown>): Promise<TMessage> {
    // parameter `destination` is not used because target rpc server is determined by url.
    getLogger().debug(`Sending message. dest=${destination} command=${command}`);
    
    return this.post(command, data);
  }
  
  public post(path: string, data: any){
    return new Promise((resolve: (v: TMessage) => void, reject) => {
      const body = data ? JSON.stringify(data) : "{}";
      
      const pathname = `/${path.replace(/^\/+/, "")}`;
      
      const options = {
        protocol: this._protocol + ":", // nodejs's https module requires protocol to include ':'.
        hostname: this._hostname,
        port: `${this._port}`,
        path: pathname,
        pathname,
        method: "POST",
        agent: this._agent,
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json;charset=utf-8",
          "User-Agent": userAgent,
          "Content-Length": body.length,
        } as OutgoingHttpHeaders,
      };
      
      const transporter = this._protocol === "https" ? httpsRequest : httpRequest;
      
      getLogger().debug(`Requesting to ${options.protocol}//${options.hostname}:${options.port}${options.path}`);
      
      const req = transporter(options, (res) => {
        if(!res.statusCode || res.statusCode < 200 || res.statusCode >= 300){
          getLogger().error(`Status not ok: ${res.statusCode}`);
          return reject(new Error(`Status not ok: ${res.statusCode}`));
        }
        
        const chunks: any[] = [];
        res.on("data", chunk => {
          chunks.push(chunk);
          getLogger().debug(`Response chunk data arrived`);
        });
        
        res.on("end", () => {
          try{
            if(chunks.length > 0){
              const data = JSON.parse(Buffer.concat(chunks).toString());
              return resolve(data);
            }
            
            // RPC Server should return response like
            // {origin: string; destination: string; request_id: string; data: any; ...}
            // If no such response is returned, reject it.
            getLogger().error(`RPC Server returned no data. This is not expected.`);
            reject(new Error("Server responded without expected data"));
          }
          catch (e) {
            getLogger().error(`Failed to parse response data`);
            try{
              getLogger().error(Buffer.concat(chunks).toString());
            }
            catch(_){}
  
            reject(new Error("Server responded without expected data"));
          }
        });
      });
      
      req.on("error", error => {
        getLogger().error(JSON.stringify(error));
        reject(error);
      });
      
      if(body){
        req.write(body);
      }
      req.end();
    });
  }
}