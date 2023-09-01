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

// src/controller/controllerDiarista/registerDiarista/controllerRegisterDiarista.ts
var controllerRegisterDiarista_exports = {};
__export(controllerRegisterDiarista_exports, {
  registerDiarista: () => registerDiarista
});
module.exports = __toCommonJS(controllerRegisterDiarista_exports);

// src/modulo/config.ts
var ERRO_NAME_PHOTO_PASSWORD = { status: 500, message: "Aten\xE7\xE3o o nome, senha e foto s\xE3o campos obrigatorios. Verifique e tente novamente." };
var ERRO_REQUIRED_DATA_CLIENTE = { status: 400, message: "Aten\xE7\xE3o, verifique a documenta\xE7\xE3o para enviar a requisi\xE7\xE3o com o formato e tipos corretos." };
var ERRO_REGISTER_USER = { status: 500, message: "A inser\xE7\xE3o falhou verifique os dados e tente novamente." };
var ERRO_REGISTER_EMAIL = { status: 500, message: "Aten\xE7\xE3o email no formato inv\xE1lido. Ele deve ter esse formato: exemplo@gmail.com" };
var ERRO_REQUIRE_CPF = { status: 500, message: "Aten\xE7\xE3o o cpf informado est\xE1 incorreto." };
var ERRO_REQUIRE_BIRTH_DATE = { status: 500, message: "Aten\xE7\xE3o a data informada est\xE1 no formato incorreto. Envie nesse formato: YYYY-MM-DD" };
var ERRO_NUMBER_PHONE = { status: 500, message: "Aten\xE7\xE3o o n\xFAmero de telefone esta errado. verique e tente novamente. exemplo: (11) 1111-11111" };
var ERRO_ADDRESS = { status: 500, message: "Aten\xE7\xE3o, verifique os dados referentes ao endere\xE7o e tente novamente" };
var CREATED_REGISTER = { status: 201, message: "Registro criado com sucesso." };

// src/controller/controllerDiarista/registerDiarista/validate/validateRegister.ts
function validateTypesJson(json) {
  try {
    const diarista = json;
    console.log(json);
    if (typeof diarista.email !== "string" || typeof diarista.password !== "string" || typeof diarista.nameUser !== "string" || typeof diarista.photoUser !== "string" || typeof diarista.phone !== "string" || typeof diarista.ddd !== "string" || typeof diarista.birthDate !== "string" || typeof diarista.idGender !== "number" || typeof diarista.cpf !== "string" || typeof diarista.biography !== "string" && diarista.biography !== null || typeof diarista.averagePrice !== "string" || typeof diarista.address !== "object" || typeof diarista.address.state !== "number" || typeof diarista.address.city !== "string" || typeof diarista.address.cep !== "string" || typeof diarista.address.publicPlace !== "string" && diarista.address.publicPlace !== null || typeof diarista.address.district !== "string" || typeof diarista.address.complement !== "string" && diarista.address.complement !== null || typeof diarista.address.houseNumber !== "string") {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}
function validatePhoneWithDDD(ddd, phone) {
  let numberPhone = `${ddd} ${phone}`;
  let telefone = numberPhone.replace(/\D/g, "");
  if (!(telefone.length >= 10 && telefone.length <= 11))
    return false;
  if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9)
    return false;
  for (var n = 0; n < 10; n++) {
    if (telefone == new Array(11).join() || telefone == new Array(12).join())
      return false;
  }
  var codigosDDD = [
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    21,
    22,
    24,
    27,
    28,
    31,
    32,
    33,
    34,
    35,
    37,
    38,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    51,
    53,
    54,
    55,
    61,
    62,
    64,
    63,
    65,
    66,
    67,
    68,
    69,
    71,
    73,
    74,
    75,
    77,
    79,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
    91,
    92,
    93,
    94,
    95,
    96,
    97,
    98,
    99
  ];
  if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1)
    return false;
  if (telefone.length == 10 && [2, 3, 4, 5, 7].indexOf(parseInt(telefone.substring(2, 3))) == -1)
    return false;
  return true;
}
function validateEmail(email) {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
function validateDateBirth(dataNascimento) {
  let status = true;
  const dataNascRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dataNascimento.match(dataNascRegex)) {
    return false;
  }
  return status;
}
function validateCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11) {
    return false;
  }
  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let resto = soma % 11;
  let digito1 = resto < 2 ? 0 : 11 - resto;
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpf.charAt(i)) * (11 - i);
  }
  resto = soma % 11;
  let digito2 = resto < 2 ? 0 : 11 - resto;
  if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
    return false;
  }
  return true;
}
function validadeAddress(address) {
  let statusAddress = true;
  if (typeof address.state !== "number" || address.state <= 0 || !address.city || address.city === "" || !address.cep || address.cep === "" || !address.district || address.district === "" || typeof address.houseNumber !== "string" || typeof address.publicPlace !== "string" || address.publicPlace === "" || address.complement !== null && typeof address.complement !== "string") {
    statusAddress = false;
  }
  return statusAddress;
}

// src/model/diaristaDAO/registerDiarista.ts
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

// src/controller/controllerDiarista/registerDiarista/controllerRegisterDiarista.ts
var registerDiarista = async function(body) {
  let statusRegisterDiarista;
  if (!validateTypesJson(body)) {
    statusRegisterDiarista = ERRO_REQUIRED_DATA_CLIENTE;
  } else if (body.password.length < 6 || body.nameUser === "" || body.photoUser === "") {
    statusRegisterDiarista = ERRO_NAME_PHOTO_PASSWORD;
  } else if (body.ddd.length != 2 || !validatePhoneWithDDD(body.ddd, body.phone)) {
    statusRegisterDiarista = ERRO_NUMBER_PHONE;
  } else if (!validateEmail(body.email)) {
    statusRegisterDiarista = ERRO_REGISTER_EMAIL;
  } else if (!validateDateBirth(body.birthDate)) {
    statusRegisterDiarista = ERRO_REQUIRE_BIRTH_DATE;
  } else if (!validateCPF(body.cpf)) {
    statusRegisterDiarista = ERRO_REQUIRE_CPF;
  } else if (!validadeAddress(body.address)) {
    statusRegisterDiarista = ERRO_ADDRESS;
  } else if (body.averagePrice === "") {
    statusRegisterDiarista = ERRO_REQUIRED_DATA_CLIENTE;
  } else {
    let status = await registerUser(body);
    if (status) {
      statusRegisterDiarista = CREATED_REGISTER;
    } else {
      statusRegisterDiarista = ERRO_REGISTER_USER;
    }
  }
  return statusRegisterDiarista;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerDiarista
});
