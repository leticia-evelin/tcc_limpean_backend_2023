"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server/server");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    const allowedOrigins = ['http://localhost:8080'];
    const origin = req.headers.origin;
    if (typeof origin == 'string' && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(server_1.server);
app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'));
