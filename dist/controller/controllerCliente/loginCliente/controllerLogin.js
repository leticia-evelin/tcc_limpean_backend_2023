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

// src/controller/controllerCliente/loginCliente/controllerLogin.ts
var controllerLogin_exports = {};
__export(controllerLogin_exports, {
  autenticarUser: () => autenticarUser
});
module.exports = __toCommonJS(controllerLogin_exports);

// src/model/clienteDAO/registerCliente.ts
var { PrismaClient } = require("@prisma/client");
var prisma = new PrismaClient();

// src/middleware/controllerJWT.ts
var jwt = require("jsonwebtoken");
var SECRETE = "a1b2c3";
var EXPIRES = 60;
var createJWT = (payload) => {
  const token = jwt.sign({
    name: payload.email,
    id: payload.id
  }, SECRETE, { expiresIn: EXPIRES });
  return token;
};

// src/controller/controllerCliente/loginCliente/controllerLogin.ts
var autenticarUser = async function(body) {
  if (body.email === "" || body.email == null || body.password === "" || body.password == null) {
    return false;
  } else {
    try {
      const dataUser = await (void 0)(body);
      if (dataUser) {
        const token = await createJWT(dataUser);
        let statusJson = {
          id: dataUser.id,
          email: dataUser.email,
          token
        };
        console.log(statusJson);
        return statusJson;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Erro durante autentica\xE7\xE3o:", error);
      return false;
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  autenticarUser
});
