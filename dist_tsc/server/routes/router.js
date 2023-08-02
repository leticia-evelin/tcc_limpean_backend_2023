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
const jsonParser = body_parser_1.default.json();
const router = (0, express_1.Router)();
exports.router = router;
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
