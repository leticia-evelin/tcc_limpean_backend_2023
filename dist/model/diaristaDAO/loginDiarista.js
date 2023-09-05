"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginDiarista = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const loginDiarista = async function (dataBody) {
    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password
            }
        });
        if (verifyDiarist) {
            return {
                id: verifyDiarist.id,
                email: verifyDiarist.email,
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
exports.loginDiarista = loginDiarista;
