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
  ERROR_INVALID_CONTENT_TYPE: () => ERROR_INVALID_CONTENT_TYPE,
  ERRO_REGISTER_USER: () => ERRO_REGISTER_USER,
  ERRO_REQUIRED_DATA_CLIENTE: () => ERRO_REQUIRED_DATA_CLIENTE
});
module.exports = __toCommonJS(config_exports);
var ERROR_INVALID_CONTENT_TYPE = { status: 201, message: "Erro somente sera aceito content-type" };
var ERRO_REQUIRED_DATA_CLIENTE = { status: 201, message: "Erro nos dados do clienrte!" };
var ERRO_REGISTER_USER = { status: 302, message: "Erro ao criar usuario!" };
var CREATED_REGISTER = { status: 300, message: "Criado Usuario!" };
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CREATED_REGISTER,
  ERROR_INVALID_CONTENT_TYPE,
  ERRO_REGISTER_USER,
  ERRO_REQUIRED_DATA_CLIENTE
});
