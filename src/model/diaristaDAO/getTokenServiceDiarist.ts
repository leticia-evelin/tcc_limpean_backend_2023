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

        
        const statusServico = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: idService
            },select: {
                id_status: true
            }
        })
                
        if(verifyDiarist && serviceDiarist && statusServico.some(it => it.id_status === 2) && !statusServico.some(it => it.id_status === 5)){
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