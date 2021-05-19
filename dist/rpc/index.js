"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCAgent = exports.getConnectionInfoFromConfig = void 0;
const https_1 = require("https");
const http_1 = require("http");
const fs_1 = require("fs");
const logger_1 = require("../logger");
const index_1 = require("../config/index");
function getConnectionInfoFromConfig(destination, config) {
    const hostname = "localhost";
    let port = -1;
    if (destination === "daemon") {
        port = +config["/daemon_port"];
    }
    else if (destination === "farmer") {
        port = +config["/farmer/rpc_port"];
    }
    else if (destination === "harvester") {
        port = +config["/harvester/rpc_port"];
    }
    else if (destination === "full_node") {
        port = +config["/full_node/rpc_port"];
    }
    else if (destination === "wallet") {
        port = +config["/wallet/rpc_port"];
    }
    else {
        throw new Error(`Unknown destination: ${destination}`);
    }
    return { hostname, port };
}
exports.getConnectionInfoFromConfig = getConnectionInfoFromConfig;
const userAgent = "chia-agent/1.0.0";
class RPCAgent {
    constructor(props) {
        this._caCert = "";
        this._clientCert = "";
        this._clientKey = "";
        if ("protocol" in props) {
            this._protocol = props.protocol;
            this._hostname = props.host;
            this._port = props.port;
            if (props.protocol === "https") {
                if ("configPath" in props) {
                    const config = this._getConfig(props.configPath);
                    const certs = this._loadCertFilesFromConfig(config);
                    this._clientCert = certs.clientCert;
                    this._clientKey = certs.clientKey;
                    this._caCert = certs.caCert;
                }
                else {
                    this._caCert = props.ca_cert;
                    this._clientCert = props.client_cert;
                    this._clientKey = props.client_key;
                }
                this._agent = new https_1.Agent({
                    host: this._hostname,
                    port: this._port,
                    ca: this._caCert,
                    cert: this._clientCert,
                    key: this._clientKey,
                    rejectUnauthorized: Boolean(this._caCert) && this._hostname !== "localhost",
                });
            }
            else {
                this._agent = new http_1.Agent();
            }
        }
        else {
            this._protocol = "https";
            const config = this._getConfig("configPath" in props ? props.configPath : undefined);
            const { hostname, port } = getConnectionInfoFromConfig(props.service, config);
            logger_1.getLogger().debug(`Picked ${hostname}:${port} for ${props.service}`);
            this._hostname = hostname;
            this._port = port;
            const certs = this._loadCertFilesFromConfig(config);
            this._clientCert = certs.clientCert;
            this._clientKey = certs.clientKey;
            this._caCert = certs.caCert;
            this._agent = new https_1.Agent({
                host: this._hostname,
                port: this._port,
                ca: this._caCert,
                cert: this._clientCert,
                key: this._clientKey,
                rejectUnauthorized: Boolean(this._caCert) && this._hostname !== "localhost",
            });
        }
    }
    _getConfig(configPath) {
        configPath = configPath || index_1.configPath;
        if (!fs_1.existsSync(configPath)) {
            logger_1.getLogger().error(`chia config file does not exist at: ${configPath}`);
            throw new Error("chia config file Not Found.");
        }
        return index_1.getConfig(configPath);
    }
    _loadCertFilesFromConfig(config) {
        const clientCertPath = index_1.resolveFromChiaRoot([config["/daemon_ssl/private_crt"]]);
        const clientKeyPath = index_1.resolveFromChiaRoot([config["/daemon_ssl/private_key"]]);
        const caCertPath = index_1.resolveFromChiaRoot([config["/private_ssl_ca/crt"]]);
        logger_1.getLogger().debug(`Loading client cert file from ${clientCertPath}`);
        logger_1.getLogger().debug(`Loading client key file from ${clientKeyPath}`);
        logger_1.getLogger().debug(`Loading ca cert file from ${caCertPath}`);
        const getCertOrKey = (path) => {
            if (!fs_1.existsSync(path)) {
                logger_1.getLogger().error(`ssl crt/key does not exist at: ${path}`);
                throw new Error(`crt/key Not Found at ${path}`);
            }
            return fs_1.readFileSync(path);
        };
        const clientCert = getCertOrKey(clientCertPath);
        const clientKey = getCertOrKey(clientKeyPath);
        const caCert = getCertOrKey(caCertPath);
        return { clientCert, clientKey, caCert };
    }
    sendMessage(destination, command, data) {
        return __awaiter(this, void 0, void 0, function* () {
            // parameter `destination` is not used because target rpc server is determined by url.
            logger_1.getLogger().debug(`Sending message. dest=${destination} command=${command}`);
            return this.post(command, data);
        });
    }
    post(path, data) {
        return new Promise((resolve, reject) => {
            const body = data ? JSON.stringify(data) : "{}";
            const pathname = `/${path.replace(/^\/+/, "")}`;
            const options = {
                protocol: this._protocol + ":",
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
                },
            };
            const transporter = this._protocol === "https" ? https_1.request : http_1.request;
            logger_1.getLogger().debug(`Requesting to ${options.protocol}//${options.hostname}:${options.port}${options.path}`);
            const req = transporter(options, (res) => {
                if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
                    logger_1.getLogger().error(`Status not ok: ${res.statusCode}`);
                    if (res.statusCode === 404) {
                        logger_1.getLogger().error(`Maybe the RPCAgent is connecting to different service against target rpc command.`);
                        logger_1.getLogger().error(`For example, this happens when invoking 'new_farming_info' rpc command to 'full_node' service, which 'farm' service is correct`);
                        logger_1.getLogger().error(`Check invoking command is correct and connecting service/host is right for the command`);
                    }
                    return reject(new Error(`Status not ok: ${res.statusCode}`));
                }
                const chunks = [];
                res.on("data", chunk => {
                    chunks.push(chunk);
                    if (chunks.length === 0) {
                        logger_1.getLogger().debug(`The first response chunk data arrived`);
                    }
                });
                res.on("end", () => {
                    try {
                        if (chunks.length > 0) {
                            const data = JSON.parse(Buffer.concat(chunks).toString());
                            return resolve(data);
                        }
                        // RPC Server should return response like
                        // {origin: string; destination: string; request_id: string; data: any; ...}
                        // If no such response is returned, reject it.
                        logger_1.getLogger().error(`RPC Server returned no data. This is not expected.`);
                        reject(new Error("Server responded without expected data"));
                    }
                    catch (e) {
                        logger_1.getLogger().error(`Failed to parse response data`);
                        try {
                            logger_1.getLogger().error(Buffer.concat(chunks).toString());
                        }
                        catch (_) { }
                        reject(new Error("Server responded without expected data"));
                    }
                });
            });
            req.on("error", error => {
                logger_1.getLogger().error(JSON.stringify(error));
                reject(error);
            });
            if (body) {
                req.write(body);
            }
            req.end();
        });
    }
}
exports.RPCAgent = RPCAgent;
