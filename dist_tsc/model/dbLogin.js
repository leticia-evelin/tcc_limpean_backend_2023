"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async function (dataBody) {
    let checkEmailExistsQuery = `SELECT COUNT(*) AS count FROM tbl_cadastro_doador WHERE email ='${dataBody.email}'`;
    let emailExistsResult = await prisma.$queryRawUnsafe(checkEmailExistsQuery);
    if (emailExistsResult && emailExistsResult[0].count > 0) {
        return {
            error: true
        };
    }
    else {
        let sql = `insert into tbl_cadastro_doador(
        nome,
        email,
        senha,
    )values(
        '${dataBody.name}',
        '${dataBody.email}',
        '${dataBody.password}'
    )`;
        let result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            console.log(result);
            return true;
        }
        else {
            return false;
        }
    }
};
exports.registerUser = registerUser;
