"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountUser = exports.registerUser = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async function (dataBody) {
    let sql = `insert into tbl_cadastro_doador(
            nome,
            email,
            senha
        )values(
            '${dataBody.name}',
            '${dataBody.email}',
            '${dataBody.password}'
             )`;
    let result = await prisma.$executeRawUnsafe(sql);
    if (result) {
        return true;
    }
    else {
        return false;
    }
};
exports.registerUser = registerUser;
const verifyAccountUser = async function (dataBody) {
    let sql = `SELECT id, nome FROM tbl_cadastro_doador WHERE email ='${dataBody.email}' AND senha ='${dataBody.password}'`;
    let result = await prisma.$queryRawUnsafe(sql);
    if (result.lenght === 0) {
        return false;
    }
    else {
        return result;
    }
};
exports.verifyAccountUser = verifyAccountUser;
