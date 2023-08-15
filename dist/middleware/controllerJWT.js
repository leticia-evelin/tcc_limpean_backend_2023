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

// src/middleware/controllerJWT.ts
var controllerJWT_exports = {};
__export(controllerJWT_exports, {
  createJWT: () => createJWT,
  validate: () => validate
});
module.exports = __toCommonJS(controllerJWT_exports);
var jwt = require("jsonwebtoken");
var SECRETE = "a1b2c3";
var EXPIRES = 60;
var createJWT = (payload) => {
  const token = jwt.sign({
    name: payload.nome,
    id: payload.id
  }, SECRETE, { expiresIn: EXPIRES });
  return token;
};
var validate = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRETE, (err, decoded) => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createJWT,
  validate
});
