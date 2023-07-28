"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("./server/server");
const app = (0, express_1.default)();
app.use((req, res, next) => {
    const allowedOrigin = ['https://api-rest-typescript-form2023.onrender.com'];
    if (allowedOrigin.includes(req.headers.origin || '')) {
        res.header('Access-Control-Allow-Origin', allowedOrigin);
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    }
    else {
        return res.status(403).json({ error: 'Acesso negado.' });
    }
});
app.use(server_1.server);
app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'));
