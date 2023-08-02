"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const body_parser_1 = __importDefault(require("body-parser"));
const controllerLogin = __importStar(require("../../controller/contollerLogin"));
const jwt = __importStar(require("jsonwebtoken"));
const jsonParser = body_parser_1.default.json();
const router = (0, express_1.Router)();
exports.router = router;
const verifyJWT = async function (request, response, next) {
    const token = request.headers['x-access-token'];
    const SECRETE = 'a1b2c3';
    if (!token) {
        console.log('token');
        return response.status(401).json({ message: 'Token não fornecido.' });
    }
    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        console.log('Token válido:', decoded);
        next();
    }
    catch (error) {
        return response.json("{'erro': 'Seu token é inválido'}");
    }
};
router.post('/v1/login-de-cadastro', jsonParser, async function (request, response) {
    let contentType = request.headers['content-type'];
    if (contentType === 'application/json') {
        let dataBody = request.body;
        let status = await controllerLogin.registerUser(dataBody);
        if (status) {
            response.status(200);
            response.json(status);
        }
        else {
            response.status(415);
            response.json("{'erro': 'erro no servidor'}");
        }
    }
    else {
        return response.send("Back-end não aceita arquivos sem o formato: Json");
    }
});
router.post('/v1/authenticator-login', jsonParser, async function (request, response) {
    let contentType = request.headers['content-type'];
    if (contentType === 'application/json') {
        let dataBody = request.body;
        let status = await controllerLogin.autenticarUser(dataBody);
        if (status) {
            response.status(200);
            response.json(status);
        }
        else {
            response.status(415);
            response.json("{'erro': 'erro no servidor'}");
        }
    }
});
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso Fernada");
});
