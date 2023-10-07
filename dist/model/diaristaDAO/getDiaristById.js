"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiaristById = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDiaristById = async function (id) {
    const vw_dados_diarista = `SELECT * FROM vw_dados_diarista WHERE id_diarista = ${id}`;
    const result = await prisma.$queryRawUnsafe(vw_dados_diarista);
    if (result) {
        return result;
    }
    else {
        return false;
    }
};
exports.getDiaristById = getDiaristById;
