"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.createJWT = void 0;
const jwt = require('jsonwebtoken');
const SECRETE = 'a1b2c3';
const EXPIRES = 60;
const createJWT = (payload) => {
    const token = jwt.sign({
        name: payload.nome,
        id: payload.id
    }, SECRETE, { expiresIn: EXPIRES });
    return token;
};
exports.createJWT = createJWT;
const validate = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETE, (err, decoded) => {
            if (err) {
                resolve(false);
            }
            else {
                resolve(true);
            }
        });
    });
};
exports.validate = validate;
