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

// src/model/diaristaDAO/registerDiarista.ts
var registerDiarista_exports = {};
__export(registerDiarista_exports, {
  registerUser: () => registerUser
});
module.exports = __toCommonJS(registerDiarista_exports);
var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();
var registerUser = async function(dataBody) {
  try {
    const verifyDiarist = await prisma.tbl_diarista.findFirst({
      where: {
        OR: [
          { email: dataBody.email.toLowerCase() },
          { cpf: dataBody.cpf }
        ]
      }
    });
    if (!verifyDiarist) {
      const tbl_cidade = await prisma.tbl_cidade.create({
        data: {
          nome: dataBody.address.city,
          id_estado: dataBody.address.state
        }
      });
      const tbl_endereco = await prisma.tbl_endereco.create({
        data: {
          logradouro: dataBody.address.publicPlace,
          bairro: dataBody.address.district,
          cep: dataBody.address.cep,
          numero_residencia: dataBody.address.houseNumber,
          complemento: dataBody.address.complement,
          id_cidade: tbl_cidade.id
        }
      });
      const tbl_diarista = await prisma.tbl_diarista.create({
        data: {
          nome: dataBody.nameUser,
          cpf: dataBody.cpf,
          data_nascimento: new Date(dataBody.birthDate),
          biografia: dataBody.biography,
          media_valor: dataBody.averagePrice,
          foto_perfil: dataBody.photoUser,
          email: dataBody.email.toLowerCase(),
          senha: dataBody.password,
          id_genero: dataBody.idGender,
          id_endereco: tbl_endereco.id
        }
      });
    } else {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  } finally {
    await prisma.$disconnect();
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerUser
});
