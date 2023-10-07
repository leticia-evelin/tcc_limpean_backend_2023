"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllDiarist = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllDiarist = async function () {
    const vw_dados_diarista = `SELECT * FROM vw_dados_diarista;`;
    const result = await prisma.$queryRawUnsafe(vw_dados_diarista);
    if (result) {
        return result;
    }
    else {
        return false;
    }
};
exports.getAllDiarist = getAllDiarist;
