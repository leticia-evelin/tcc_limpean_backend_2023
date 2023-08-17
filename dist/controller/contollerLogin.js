"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCliente = void 0;
const config_1 = require("../modulo/config");
const validateRegisterUser_1 = require("./validate/validateRegisterUser");
const dbLogin_1 = require("../model/dbLogin");
const registerCliente = async function (body) {
    let statusRegisterCliente = {};
    if (!body.email || !body.password ||
        !body.nameUser || !body.photoUser ||
        !body.phone || !body.birthDate || !body.gender ||
        !body.cpf || !body.ddd || body.ddd.length != 2) {
        statusRegisterCliente = config_1.ERRO_REQUIRED_DATA_CLIENTE;
    }
    else if (!(0, validateRegisterUser_1.validateEmail)(body.email)) {
        statusRegisterCliente = config_1.ERRO_REGISTER_EMAIL;
    }
    else if (!(0, validateRegisterUser_1.validateCPF)(body.email, body.cpf)) {
        statusRegisterCliente = config_1.ERRO_CPF_BIRTHDATE;
    }
    else {
        let status = await (0, dbLogin_1.registerUser)(body);
        if (status) {
            statusRegisterCliente = config_1.CREATED_REGISTER;
        }
        else {
            statusRegisterCliente = config_1.ERRO_REGISTER_USER;
        }
    }
    return statusRegisterCliente;
};
exports.registerCliente = registerCliente;
