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
exports.getDaemon = void 0;
const crypto_1 = require("crypto");
const logger_1 = require("../logger");
const connection_1 = require("./connection");
const index_1 = require("../config/index");
const agentServiceName = "chia_agent";
let socket = null;
function getDaemon() {
    if (socket) {
        return socket;
    }
    return socket = new Daemon();
}
exports.getDaemon = getDaemon;
class Daemon {
    constructor() {
        this._socket = null;
        this._connected = false;
        this._responseQueue = {};
        this._openEventListeners = [];
        this._messageEventListeners = [];
        this._errorEventListeners = [];
        this._closeEventListeners = [];
        this._messageListeners = {};
        this.onOpen = this.onOpen.bind(this);
        this.onError = this.onError.bind(this);
        this.onMessage = this.onMessage.bind(this);
        this.onClose = this.onClose.bind(this);
    }
    get connected() {
        return this._connected;
    }
    /**
     * Connect to local daemon via websocket.
     * @param url
     */
    connect(url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!url) {
                const config = index_1.getConfig();
                const daemonHost = config["/ui/daemon_host"];
                const daemonPort = config["/ui/daemon_port"];
                url = `wss://${daemonHost}:${daemonPort}`;
            }
            const result = yield connection_1.open(url);
            this._socket = result.ws;
            this._socket.onerror = this.onError;
            this._socket.onmessage = this.onMessage;
            this._socket.onclose = this.onClose;
            this.onOpen(result.openEvent);
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._socket) {
                return;
            }
            this._socket.close();
            this._socket = null;
        });
    }
    sendMessage(command, destination, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (!this._connected || !this._socket) {
                    logger_1.getLogger().error("Tried to send message without active connection");
                    reject("Not connected");
                    return;
                }
                let timer = null;
                const message = this.createMessageTemplate(command, destination, data || {});
                const reqId = message.request_id;
                this._responseQueue[reqId] = resolve;
                this._socket.send(JSON.stringify(message));
            });
        });
    }
    createMessageTemplate(command, destination, data) {
        return {
            command,
            data,
            ack: false,
            origin: agentServiceName,
            destination,
            request_id: crypto_1.randomBytes(32).toString("hex"),
        };
    }
    subscribe(service) {
        return __awaiter(this, void 0, void 0, function* () {
            let error;
            const result = yield this.sendMessage("register_service", "daemon", { service }).catch(e => {
                error = e;
                return null;
            });
            if (error) {
                logger_1.getLogger().error("Failed to register agent service to daemon");
                throw new Error("Subscribe failed");
            }
            return result;
        });
    }
    addEventListener(type, listener) {
        if (type === "open") {
            this._openEventListeners.push(listener);
        }
        else if (type === "message") {
            this._messageEventListeners.push(listener);
        }
        else if (type === "error") {
            this._errorEventListeners.push(listener);
        }
        else if (type === "close") {
            this._closeEventListeners.push(listener);
        }
    }
    removeEventListener(type, listener) {
        let listeners;
        if (type === "open") {
            listeners = this._openEventListeners;
        }
        else if (type === "message") {
            listeners = this._messageEventListeners;
        }
        else if (type === "error") {
            listeners = this._errorEventListeners;
        }
        else if (type === "close") {
            listeners = this._closeEventListeners;
        }
        else {
            return;
        }
        const index = listeners.findIndex((l) => l === listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    clearAllEventListeners() {
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
    addMessageListener(origin, listener) {
        const o = origin || "all";
        if (!this._messageListeners[o]) {
            this._messageListeners[o] = [];
        }
        this._messageListeners[o].push(listener);
    }
    removeMessageListener(origin, listener) {
        const listeners = this._messageListeners[origin];
        if (!listeners) {
            return;
        }
        const index = listeners.findIndex(l => l === listener);
        if (index > -1) {
            listeners.splice(index, 1);
        }
    }
    clearAllMessageListeners() {
        this._messageListeners = {};
    }
    onOpen(event) {
        logger_1.getLogger().info("ws connection opened");
        this._connected = true;
        this._openEventListeners.forEach(l => l(event));
    }
    onError(error) {
        logger_1.getLogger().error(`ws connection error: ${error.message}`);
        this._errorEventListeners.forEach(l => l(error));
    }
    onMessage(event) {
        const payload = JSON.parse(event.data);
        const { request_id, origin, command } = payload;
        logger_1.getLogger().debug(`ws message arrived. origin=${origin} command=${command}`);
        const resolver = this._responseQueue[request_id];
        if (resolver) {
            delete this._responseQueue[request_id];
            resolver(payload);
        }
        this._messageEventListeners.forEach(l => l(event));
        for (const o in this._messageListeners) {
            if (!this._messageListeners.hasOwnProperty(o)) {
                continue;
            }
            const listeners = this._messageListeners[o];
            if (origin === o || o === "all") {
                listeners.forEach(l => l(payload));
            }
        }
    }
    onClose(event) {
        logger_1.getLogger().info(`Closing ws connection`);
        this._connected = false;
        this._closeEventListeners.forEach(l => l(event));
    }
}
