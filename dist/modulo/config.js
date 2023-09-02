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

// src/modulo/config.ts
var config_exports = {};
__export(config_exports, {
  CREATED_REGISTER: () => CREATED_REGISTER,
  DELETE_CLIENTE: () => DELETE_CLIENTE,
  ERROR_INVALID_CONTENT_TYPE: () => ERROR_INVALID_CONTENT_TYPE,
  ERRO_ADDRESS: () => ERRO_ADDRESS,
  ERRO_DELETE_USER: () => ERRO_DELETE_USER,
  ERRO_INTERNAL_SERVER: () => ERRO_INTERNAL_SERVER,
  ERRO_NAME_PHOTO_PASSWORD: () => ERRO_NAME_PHOTO_PASSWORD,
  ERRO_NUMBER_PHONE: () => ERRO_NUMBER_PHONE,
  ERRO_REGISTER_EMAIL: () => ERRO_REGISTER_EMAIL,
  ERRO_REGISTER_USER: () => ERRO_REGISTER_USER,
  ERRO_REQUIRED_DATA_CLIENTE: () => ERRO_REQUIRED_DATA_CLIENTE,
  ERRO_REQUIRED_DATA_HOUSE_CLIENTE: () => ERRO_REQUIRED_DATA_HOUSE_CLIENTE,
  ERRO_REQUIRE_BIRTH_DATE: () => ERRO_REQUIRE_BIRTH_DATE,
  ERRO_REQUIRE_CPF: () => ERRO_REQUIRE_CPF
});
module.exports = __toCommonJS(config_exports);
var ERROR_INVALID_CONTENT_TYPE = { status: 415, message: "O tipo de m\xEDdia (Content-Type) da solicita\xE7\xE3o n\xE3o \xE9 compat\xEDvel com o servidor. Esperado: application/json" };
var ERRO_INTERNAL_SERVER = { status: 500, message: "Erro interno no servidor, tente novamente mais tarde." };
var ERRO_NAME_PHOTO_PASSWORD = { status: 500, message: "Aten\xE7\xE3o o nome, senha e foto s\xE3o campos obrigatorios. Verifique e tente novamente." };
var ERRO_REQUIRED_DATA_CLIENTE = { status: 400, message: "Aten\xE7\xE3o, verifique a documenta\xE7\xE3o para enviar a requisi\xE7\xE3o com o formato e tipos corretos." };
var ERRO_REQUIRED_DATA_HOUSE_CLIENTE = { status: 400, message: "Aten\xE7\xE3o, preencha os dados referentes a casa e tente novamnete. No m\xEDnimo 1 comodo." };
var ERRO_REGISTER_USER = { status: 500, message: "A inser\xE7\xE3o falhou verifique os dados e tente novamente." };
var ERRO_REGISTER_EMAIL = { status: 500, message: "Aten\xE7\xE3o email no formato inv\xE1lido. Ele deve ter esse formato: exemplo@gmail.com" };
var ERRO_REQUIRE_CPF = { status: 500, message: "Aten\xE7\xE3o o cpf informado est\xE1 incorreto." };
var ERRO_REQUIRE_BIRTH_DATE = { status: 500, message: "Aten\xE7\xE3o a data informada est\xE1 no formato incorreto. Envie nesse formato: YYYY-MM-DD" };
var ERRO_NUMBER_PHONE = { status: 500, message: "Aten\xE7\xE3o o n\xFAmero de telefone esta errado. verique e tente novamente. exemplo: (11) 1111-11111" };
var ERRO_ADDRESS = { status: 500, message: "Aten\xE7\xE3o, verifique os dados referentes ao endere\xE7o e tente novamente" };
var ERRO_DELETE_USER = { status: 500, message: "Erro ao tentar deletar conta de usuario, verifique os dados e tente novamente." };
var CREATED_REGISTER = { status: 201, message: "Registro criado com sucesso." };
var DELETE_CLIENTE = { status: 200, message: "Registro deletado com sucesso." };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CREATED_REGISTER,
  DELETE_CLIENTE,
  ERROR_INVALID_CONTENT_TYPE,
  ERRO_ADDRESS,
  ERRO_DELETE_USER,
  ERRO_INTERNAL_SERVER,
  ERRO_NAME_PHOTO_PASSWORD,
  ERRO_NUMBER_PHONE,
  ERRO_REGISTER_EMAIL,
  ERRO_REGISTER_USER,
  ERRO_REQUIRED_DATA_CLIENTE,
  ERRO_REQUIRED_DATA_HOUSE_CLIENTE,
  ERRO_REQUIRE_BIRTH_DATE,
  ERRO_REQUIRE_CPF
});
