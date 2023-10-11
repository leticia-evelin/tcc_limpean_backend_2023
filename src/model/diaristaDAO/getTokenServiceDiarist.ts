import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbGetTokenServiceDiarist = async function(idDiarist: number, emailDiarist: string, idService: number){

    try {
        
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                id: idDiarist,
                email: emailDiarist
            }
        })

        const serviceDiarist = await prisma.tbl_diarista_servico.findFirst({
            where: {
                id_diarista: verifyDiarist?.id,
                id_servico: idService
            }, select: {
                FK_Servico_DiaristaServico: {
                    select: {
                        FK_TokenServico_Servico: {
                            select: {
                                codigo: true
                            }
                        }
                    }
                }
            }
        })

        if(verifyDiarist && serviceDiarist){
            let token = serviceDiarist.FK_Servico_DiaristaServico.FK_TokenServico_Servico.codigo
            return token
        }else{
            return 404
        }
        
    } catch (error) {
        return false
    } finally {
        await prisma.$disconnect()
    }
}

export {
    dbGetTokenServiceDiarist
}