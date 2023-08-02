"use strict";
const jwt = require('jsonwebtoken');
const SECRETE = 'a1b2c3';
const EXPIRES = 60;
const createJWT = (payload) => {
    const token = jwt.sign({ userID: payload }, SECRETE, { expiresIn: EXPIRES });
    return token;
};
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
module.exports = {
    createJWT,
    validate
};
