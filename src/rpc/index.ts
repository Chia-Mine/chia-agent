import {
  Agent as HttpsAgent,
  request as httpsRequest,
  RequestOptions,
} from "https";
import {
  Agent as HttpAgent,
  OutgoingHttpHeaders,
  request as httpRequest,
} from "http";
import type { checkServerIdentity } from "tls";
import { existsSync, readFileSync } from "fs";
import * as JSONbigBuilder from "@chiamine/json-bigint";
import { getLogger } from "../logger";
import {
  configPath as defaultConfigPath,
  getConfig,
  resolveFromChiaRoot,
  TConfig,
} from "../config/index";
import { APIAgent } from "../agent/index";

const JSONbig = JSONbigBuilder({
  useNativeBigInt: true,
  alwaysParseAsBig: false,
});

type TDestination =
  | "farmer"
  | "harvester"
  | "full_node"
  | "wallet"
  | "data_layer"
  | "daemon"
  | "pool";

export function getConnectionInfoFromConfig(
  destination: TDestination,
  config: TConfig,
) {
  let hostname = "localhost";
  let port = -1;
  if (destination === "daemon") {
    port = +(config["/daemon_port"] as string);
  } else if (destination === "farmer") {
    port = +(config["/farmer/rpc_port"] as string);
  } else if (destination === "harvester") {
    port = +(config["/harvester/rpc_port"] as string);
  } else if (destination === "full_node") {
    port = +(config["/full_node/rpc_port"] as string);
  } else if (destination === "wallet") {
    port = +(config["/wallet/rpc_port"] as string);
  } else if (destination === "data_layer") {
    port = +(config["/data_layer/rpc_port"] as string);
  } else if (destination === "pool") {
    const poolUrl = config["/pool/pool_list/0/pool_url"] as string;
    const regex = /^(https?:\/\/)?([^/:]+):?(\d*)/;
    const match = regex.exec(poolUrl);
    if (match) {
      hostname = match[2];
      port = match[3] ? +match[3] : 80;
    } else {
      getLogger().error("Pool list was not found in config.yaml.");
      throw new Error("Pool list was not found in config.yaml");
    }
  } else {
    throw new Error(`Unknown destination: ${destination}`);
  }

  return { hostname, port };
}

export function getConf(configPath?: string) {
  configPath = configPath || defaultConfigPath;
  if (!existsSync(configPath)) {
    getLogger().error(`chia config file does not exist at: ${configPath}`);
    throw new Error("chia config file Not Found.");
  }

  return getConfig(configPath);
}

export function loadCertFilesFromConfig(config: TConfig) {
  const clientCertPath = resolveFromChiaRoot([
    config["/daemon_ssl/private_crt"],
  ] as string[]);
  const clientKeyPath = resolveFromChiaRoot([
    config["/daemon_ssl/private_key"],
  ] as string[]);
  const caCertPath = resolveFromChiaRoot([
    config["/private_ssl_ca/crt"],
  ] as string[]);

  getLogger().debug(`Loading client cert file from ${clientCertPath}`);
  getLogger().debug(`Loading client key file from ${clientKeyPath}`);
  getLogger().debug(`Loading ca cert file from ${caCertPath}`);

  const getCertOrKey = (path: string) => {
    if (!existsSync(path)) {
      getLogger().error(`ssl crt/key does not exist at: ${path}`);
      throw new Error(`crt/key Not Found at ${path}`);
    }
    return readFileSync(path);
  };

  const clientCert = getCertOrKey(clientCertPath);
  const clientKey = getCertOrKey(clientKeyPath);
  const caCert = getCertOrKey(caCertPath);

  return { clientCert, clientKey, caCert };
}

export type TRPCAgentProps =
  | {
      protocol: "https";
      host: string;
      port: number;
      ca_cert?: string | Buffer;
      client_cert?: string | Buffer;
      client_key?: string | Buffer;
      skip_hostname_verification?: boolean;
      keepAlive?: boolean;
      keepAliveMsecs?: number;
      maxSockets?: number;
      timeout?: number;
    }
  | {
      protocol: "https";
      host: string;
      port: number;
      configPath: string;
      skip_hostname_verification?: boolean;
      keepAlive?: boolean;
      keepAliveMsecs?: number;
      maxSockets?: number;
      timeout?: number;
    }
  | {
      protocol: "http";
      host: string;
      port: number;
      keepAlive?: boolean;
      keepAliveMsecs?: number;
      maxSockets?: number;
      timeout?: number;
    }
  | {
      service: TDestination;
      host?: string;
      port?: number;
      configPath?: string;
      skip_hostname_verification?: boolean;
      keepAlive?: boolean;
      keepAliveMsecs?: number;
      maxSockets?: number;
      timeout?: number;
    }
  | {
      httpsAgent: HttpsAgent;
      skip_hostname_verification?: boolean;
    }
  | {
      httpAgent: HttpAgent;
      host: string;
      port: number;
      skip_hostname_verification?: boolean;
    };

const userAgent = "chia-agent/1.0.0";

export class RPCAgent implements APIAgent {
  protected _protocol: "http" | "https";
  protected _agent: HttpsAgent | HttpAgent;
  protected _skip_hostname_verification: boolean = false;
  protected _host: string = "";
  protected _port: number = 0;

  public constructor(props: TRPCAgentProps) {
    if ("httpsAgent" in props) {
      this._protocol = "https";
      this._agent = props.httpsAgent;
      this._skip_hostname_verification = Boolean(
        props.skip_hostname_verification,
      );
      // Extract host/port from httpsAgent options
      // Note: TypeScript doesn't expose options property, but it exists at runtime
      const agent = this._agent as HttpsAgent & {
        options?: { host?: string; port?: number };
      };
      if (agent.options && agent.options.host && agent.options.port) {
        this._host = agent.options.host;
        this._port = agent.options.port;
        getLogger().debug(
          `Constructing RPCAgent with httpsAgent: ${this._host}:${this._port}`,
        );
      } else {
        getLogger().debug(
          "Constructing RPCAgent with httpsAgent (host/port not available in agent options)",
        );
      }
    } else if ("httpAgent" in props) {
      this._protocol = "http";
      this._agent = props.httpAgent;
      this._host = props.host;
      this._port = props.port;
      this._skip_hostname_verification = Boolean(
        props.skip_hostname_verification,
      );
      getLogger().debug(
        `Constructing RPCAgent with httpAgent: ${this._host}:${this._port}`,
      );
    } else if ("protocol" in props) {
      this._protocol = props.protocol;
      const { host, port } = props;
      let clientCert: string | Buffer | undefined;
      let clientKey: string | Buffer | undefined;
      let caCert: string | Buffer | undefined;

      const keepAlive = props.keepAlive !== false;
      const keepAliveMsecs =
        typeof props.keepAliveMsecs === "number" && props.keepAliveMsecs > 0
          ? props.keepAliveMsecs
          : 1000;
      const maxSockets =
        typeof props.maxSockets === "number" && props.maxSockets > 0
          ? props.maxSockets
          : Infinity;
      const timeout =
        typeof props.timeout === "number" && props.timeout > 0
          ? props.timeout
          : undefined;

      this._host = host;
      this._port = port;

      if (props.protocol === "https") {
        if ("configPath" in props) {
          const config = getConf(props.configPath);
          const certs = loadCertFilesFromConfig(config);
          clientCert = certs.clientCert;
          clientKey = certs.clientKey;
          caCert = certs.caCert;
          this._skip_hostname_verification = Boolean(
            props.skip_hostname_verification,
          );
        } else {
          ({
            client_cert: clientCert,
            client_key: clientKey,
            ca_cert: caCert,
          } = props);
          this._skip_hostname_verification = Boolean(
            props.skip_hostname_verification,
          );
        }

        this._agent = new HttpsAgent({
          host,
          port,
          ca: caCert,
          cert: clientCert,
          key: clientKey,
          rejectUnauthorized: Boolean(caCert) && host !== "localhost",
          keepAlive,
          keepAliveMsecs,
          maxSockets,
          timeout,
        });

        getLogger().debug(
          `Constructed RPCAgent with httpsAgent: ${host}:${port}`,
        );
      } else {
        this._agent = new HttpAgent({
          keepAlive,
          keepAliveMsecs,
          maxSockets,
          timeout,
        });
      }
    } else {
      this._protocol = "https";
      let host: string | undefined;
      let port: number | undefined;
      const keepAlive = props.keepAlive !== false;
      const keepAliveMsecs =
        typeof props.keepAliveMsecs === "number" && props.keepAliveMsecs > 0
          ? props.keepAliveMsecs
          : 1000;
      const maxSockets =
        typeof props.maxSockets === "number" && props.maxSockets > 0
          ? props.maxSockets
          : Infinity;
      const timeout =
        typeof props.timeout === "number" && props.timeout > 0
          ? props.timeout
          : undefined;

      const config = getConf(
        "configPath" in props ? props.configPath : undefined,
      );

      if (props.host && typeof props.port === "number") {
        ({ host, port } = props);
      } else {
        const info = getConnectionInfoFromConfig(props.service, config);
        host = props.host ? props.host : info.hostname;
        port = typeof props.port === "number" ? props.port : info.port;
      }
      getLogger().debug(`Picked ${host}:${port} for ${props.service}`);

      const certs = loadCertFilesFromConfig(config);
      const { clientCert, clientKey, caCert } = certs;
      this._skip_hostname_verification = Boolean(
        props.skip_hostname_verification,
      );

      this._host = host!;
      this._port = port!;

      this._agent = new HttpsAgent({
        host: host,
        port: port,
        ca: caCert,
        cert: clientCert,
        key: clientKey,
        rejectUnauthorized: Boolean(caCert) && host !== "localhost",
        keepAlive,
        keepAliveMsecs,
        maxSockets,
        timeout,
      });
    }
  }

  public async sendMessage<M>(
    destination: string,
    command: string,
    data?: Record<string, unknown>,
  ): Promise<M> {
    // parameter `destination` is not used because target rpc server is determined by url.
    getLogger().debug(
      `Sending RPC message. dest=${destination} command=${command}`,
    );

    return this.request<M>("POST", command, data);
  }

  public async request<R>(method: string, path: string, data?: any) {
    return new Promise((resolve: (v: R) => void, reject) => {
      const body = data ? JSONbig.stringify(data) : "{}";
      const pathname = `/${path.replace(/^\/+/, "")}`;
      const METHOD = method.toUpperCase();
      const headers: OutgoingHttpHeaders = {
        Accept: "application/json, text/plain, */*",
        "User-Agent": userAgent,
      };
      if (this._host) {
        headers.Host = this._host;
      }

      const options: RequestOptions & {
        checkServerIdentity?: typeof checkServerIdentity;
      } = {
        path: pathname,
        method: METHOD,
        agent: this._agent,
        headers,
      };

      // For HTTP protocol, we need to explicitly set hostname and port
      if (this._protocol === "http") {
        options.hostname = this._host;
        options.port = this._port;
      }

      if (this._skip_hostname_verification) {
        options.checkServerIdentity = () => {
          return undefined;
        };
      }

      if (METHOD === "POST" || METHOD === "PUT" || METHOD === "DELETE") {
        options.headers = {
          ...(options.headers || {}),
          "Content-Type": "application/json;charset=utf-8",
          "Content-Length": body.length,
        };
      } else if (METHOD === "GET") {
        // Add query string if `data` is object.
        if (data && typeof data === "object") {
          // Remove string after '?' on path to prevent duplication.
          let p = options.path as string;
          if (/\?/.test(p)) {
            getLogger().warning("querystring in `path` is replaced by `data`");
            p.replace(/\?.*/, "");
          }
          p += "?";
          for (const key in data) {
            if (Object.prototype.hasOwnProperty.call(data, key)) {
              p += `${key}=${data[key]}`;
            }
          }
          options.path = p;
        }
      }

      const transporter =
        this._protocol === "https" ? httpsRequest : httpRequest;

      getLogger().debug(
        `Dispatching RPC ${METHOD} request to ${this._protocol}//${this._host}:${this._port}${options.path}`,
      );

      getLogger().trace(`Request options: ${JSON.stringify(options)}`);
      getLogger().trace(`Request body: ${body}`);

      const req = transporter(options, (res) => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          getLogger().error(`Status not ok: ${res.statusCode}`);
          if (res.statusCode === 404) {
            getLogger().error(
              "Maybe the RPCAgent is connecting to different service against target rpc command.",
            );
            getLogger().error(
              "For example, this happens when invoking 'new_farming_info' rpc command" +
                " to 'full_node' service, which 'farm' service is correct",
            );
            getLogger().error(
              "Check invoking command is correct and connecting service/host is right for the command",
            );
          }
          return reject(new Error(`Status not ok: ${res.statusCode}`));
        }

        const chunks: any[] = [];
        res.on("data", (chunk) => {
          chunks.push(chunk);
          if (chunks.length === 0) {
            getLogger().debug("The first response chunk data arrived");
          }
          getLogger().trace(
            `Response chunk #${chunks.length} - ${chunk.length} bytes: ${chunk.toString()}`,
          );
        });

        res.on("end", () => {
          try {
            if (chunks.length > 0) {
              const entireChunks = Buffer.concat(chunks);
              const serializedData = entireChunks.toString();
              const d = JSONbig.parse(serializedData);
              if (typeof d !== "object" || !d) {
                getLogger().error(
                  `Response is expected to be an object but received: ${serializedData}`,
                );
                return reject(
                  new Error(`Unexpected response format: ${serializedData}`),
                );
              } else if (!Object.prototype.hasOwnProperty.call(d, "success")) {
                getLogger().error("Response has no 'success' property");
                return reject(
                  new Error(
                    `Response has no 'success' property: ${serializedData}`,
                  ),
                );
              }
              if (!d.success) {
                getLogger().info(`API failure: ${d.error}`);
                return reject(d);
              }

              getLogger().debug(
                `RPC response received from ${this._protocol}//${this._host}:${this._port}${options.path}`,
              );
              getLogger().trace(`RPC response data: ${JSON.stringify(d)}`);

              return resolve(d);
            }

            // RPC Server should return response like
            // {origin: string; destination: string; request_id: string; data: any; ...}
            // If no such response is returned, reject it.
            getLogger().error(
              "RPC Server returned no data. This is not expected.",
            );
            reject(new Error("Server responded without expected data"));
          } catch (e) {
            getLogger().error(
              `Failed to parse response data: ${JSON.stringify(e)}`,
            );
            try {
              getLogger().error(Buffer.concat(chunks).toString());
            } catch (_e2) {
              /* Do nothing */
            }

            reject(new Error("Server responded without expected data"));
          }
        });
      });

      req.on("error", (error) => {
        getLogger().error(JSON.stringify(error));
        reject(error);
      });

      if (
        (METHOD === "POST" || METHOD === "PUT" || METHOD === "DELETE") &&
        body
      ) {
        req.write(body);
      }
      req.end();
    });
  }
}

export type TRPCAgent = APIAgent;