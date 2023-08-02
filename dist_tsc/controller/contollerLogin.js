"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticarUser = exports.registerUser = void 0;
const login = require('../model/dbLogin');
const registerUser = async function (body) {
    if (body.name == '' || body.name == null ||
        body.email == '' || body.email == null ||
        body.password == '' || body.password == null) {
        return { error: "Erro" };
    }
    else {
        let status = await login.registerUser(body);
    }
};
exports.registerUser = registerUser;
const autenticarUser = async function (dataBody) {
    if (dataBody.email == '' || dataBody.email == null ||
        dataBody.password == '' || dataBody.password == null) {
        return false;
    }
    else {
        try {
            const jwt = require('../middleware/controllerJWT');
            const dataUser = await login.verifyAccountUser(dataBody);
            if (dataUser) {
                const token = await jwt.createJWT(dataUser[0]);
                let statusJson = {
                    id: dataUser[0].id,
                    name: dataUser[0].nome,
                    token: token
                };
                console.log(statusJson);
                return statusJson;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.error('Erro durante autenticação:', error);
            return false;
        }
    }
};
exports.autenticarUser = autenticarUser;
