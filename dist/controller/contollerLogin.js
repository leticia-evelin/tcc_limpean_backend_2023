"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCliente = void 0;
const config_1 = require("../modulo/config");
const login = require('../model/dbLogin');
const registerCliente = async function (body) {
    if (!body.email || !body.password ||
        !body.nameUser || !body.photoUser ||
        !body.phone || !body.birthDate || !body.gender ||
        !body.cpf || !body.ddd || body.ddd.length != 2) {
        return config_1.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else {
        let status = await login.registerUser(body);
        if (status) {
            return config_1.CREATED_REGISTER;
        }
        else {
            return config_1.ERRO_REGISTER_USER;
        }
    }
};
exports.registerCliente = registerCliente;
