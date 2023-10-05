import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateStatusService {
    token: number,
    idService: number,
    idStatus: number
}

const dbUpdateServiceDiarist = async function(data: UpdateStatusService){
    try {

        const verifyDiaristAndService = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_diarista: data.token,
                id_servico: data.idService
            }
        })


    } catch (error) {
        
    }
}


export {
    dbUpdateServiceDiarist
}