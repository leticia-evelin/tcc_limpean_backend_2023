/**************************************************
 * Objetivo: implementação do JWT no projeto
 * Data: 31/07/2023
 * Versão: 1.0
 *************************************************/

const jwt = require('jsonwebtoken');
const SECRETE = 'a1b2c3';
const EXPIRES = 60;

interface Payload {
    id: number, 
    email: string
}

const createJWT = (payload: Payload): string => {

    const token = jwt.sign({ 
        name: payload.email,
        id: payload.id
     }, SECRETE, { expiresIn: EXPIRES });
    return token;
};

const validate = (token: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRETE, (err: any, decoded: any) => {
            if (err) {
                resolve(false); // Token inválido ou expirado
            } else {
                resolve(true); // Token válido
            }
        });
    });
};

export {
    createJWT,
    validate
};

