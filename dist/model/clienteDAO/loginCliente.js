"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCliente = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginCliente = async function (dataBody) {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password
            }
        });
        if (verifyClient) {
            return {
                id: verifyClient.id,
                email: verifyClient.email,
            };
        }
        else {
            return false;
        }
    }
    catch (error) {
        return false;
    }
    finally {
        await prisma.$disconnect();
    }
};
exports.loginCliente = loginCliente;
