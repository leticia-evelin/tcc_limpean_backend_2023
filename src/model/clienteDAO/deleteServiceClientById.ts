import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbDeleteService = async function (idClient: number, email: string, idService: number) {

    try {
        
        const verifyServiceAndClient = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: idService
            }, select: {
                id_status: true,
                FK_Servico_StatusServico: {
                    select: {
                        FK_ResidenciaCliente_Servico: {
                            select: {
                                FK_Cliente_Residencia: {
                                    select: {
                                        id: true,
                                        email: true
                                    },
                                },
                            },
                        },
                    },
                },
            },
        })
        
        const test = await prisma.tbl_status_servico.findMany({
            where: {
                id_servico: idService
            }, select: {
                id_status: true,
            },
        })         

        if (verifyServiceAndClient.every((it) => {
            return(
                it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.id == idClient &&
                it.FK_Servico_StatusServico.FK_ResidenciaCliente_Servico.FK_Cliente_Residencia.email == email &&
                it.id_status !== 5 && it.id_status !== 4 && it.id_status !== 3
                )
        })) {            
                
            const createNewStatusService = await prisma.tbl_status_servico.create({
                data: {
                    id_servico: idService,
                    id_status: 5,
                    data_hora: new Date()
                }
            })

        } else {
            return false
        }

        return true
    } catch (error) {
        return false
    }
}

export {
    dbDeleteService
}