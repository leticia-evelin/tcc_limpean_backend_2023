"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const server_1 = require("./server/server");
const app = (0, express_1.default)();
const allowedOrigin = 'http://testdecorsgustavo';
const corsOptions = {
    origin: allowedOrigin,
    methods: 'GET, POST, PUT, DELETE, OPTION'
};
app.use((0, cors_1.default)(corsOptions));
app.use(server_1.server);
app.listen(8080, () => console.log('Servidor Aguardando requisições na porta 8080'));
