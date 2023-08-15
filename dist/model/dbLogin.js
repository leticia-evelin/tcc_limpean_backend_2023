"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/model/dbLogin.ts
var dbLogin_exports = {};
__export(dbLogin_exports, {
  registerUser: () => registerUser
});
module.exports = __toCommonJS(dbLogin_exports);
var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();
var registerUser = async function(dataBody) {
  let statusRegister = false;
  try {
    const duplicateCheckEmail = `SELECT tbl_contratante.email
        FROM tbl_contratante
        where tbl_contratante.email = '${dataBody.email}';
        `;
    const statusEmail = await prisma.$queryRawUnsafe(duplicateCheckEmail);
    console.log(statusEmail);
    const duplicateCheckCPF = `SELECT tbl_dados_pessoais_contratante.cpf
        FROM tbl_dados_pessoais_contratante
        where tbl_dados_pessoais_contratante.cpf = '${dataBody.cpf}';
        `;
    const statusCPF = await prisma.$queryRawUnsafe(duplicateCheckCPF);
    if (statusEmail.length === 0 || statusCPF.length === 0) {
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
  } catch (error) {
    return false;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerUser
});
