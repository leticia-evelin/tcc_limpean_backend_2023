"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const registerUser = async function (dataBody) {
    let statusRegister = false;
    console.log(dataBody);
    try {
        const duplicateCheckEmail = `SELECT tbl_contratante.email
        FROM tbl_contratante
        where tbl_contratante.email = '${dataBody.email}';
        `;
        const statusEmail = await prisma.$queryRawUnsafe(duplicateCheckEmail);
        const duplicateCheckCPF = `SELECT tbl_dados_pessoais_contratante.cpf
        FROM tbl_dados_pessoais_contratante
        where tbl_dados_pessoais_contratante.cpf = '${dataBody.cpf}';
        `;
        const statusCPF = await prisma.$queryRawUnsafe(duplicateCheckCPF);
        if (statusEmail.length === 0 && statusCPF.length === 0) {
            const sqlContratante = `
                INSERT INTO tbl_contratante (email, senha)
                VALUES ('${dataBody.email}', '${dataBody.password}');
            `;
            const sqlDadosPessoais = `
                INSERT INTO tbl_dados_pessoais_contratante (nome, cpf, data_nascimento, foto_perfil, id_contratante, id_genero)
                VALUES ('${dataBody.nameUser}', '${dataBody.cpf}', '${dataBody.birthDate}', '${dataBody.photoUser}', LAST_INSERT_ID(), ${dataBody.gender});
            `;
            const sqlTelefone = `
                INSERT INTO tbl_telefone (numero_telefone, ddd, id_dados_pessoais_contratante)
                VALUES ('${dataBody.phone}', '${dataBody.ddd}', LAST_INSERT_ID());
            `;
            await prisma.$executeRawUnsafe(sqlContratante);
            await prisma.$executeRawUnsafe(sqlDadosPessoais);
            await prisma.$executeRawUnsafe(sqlTelefone);
            statusRegister = true;
        }
        return statusRegister;
    }
    catch (error) {
        return false;
    }
};
exports.registerUser = registerUser;
