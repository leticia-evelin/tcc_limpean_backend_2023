import { PrismaClient } from "@prisma/client"
import { server } from "../../server/server"

const prisma = new PrismaClient()

const getServiceOpen = async function () {
    
    try {
        
        const service = await prisma.tbl_diarista_servico.findMany({
            where: {
                id_servico: {
                    gt: 0 // Verifique se o id servico é maior que 0. GT é um  operador do prisma
                },
                id_diarista: {  
                    equals: null //Usado para filtrar um valor, ou seja ser iqual é null
                }
            }, include: {
                FK_Servico_DiaristaServico: {
                    select: {
                        id: true,
                        data_hora: true,
                        observacao: true,
                        tarefas_adicionais: true
                    }
                }
            }
        })

        const serviceIds = service.map((it) => it.FK_Servico_DiaristaServico.id)
        const serviceValue = await prisma.tbl_servico_com_valor.findMany({
            where: {
                id_servico: {
                    in: serviceIds
                }
            }
        })

        const serviceClient = service.map((it) => ({
            data: {
                serviceId: it.id,
                date_hour: it.FK_Servico_DiaristaServico.data_hora,
                obeservation: it.FK_Servico_DiaristaServico.observacao,
                tasks: it.FK_Servico_DiaristaServico.tarefas_adicionais,
                value: serviceIds
            }
        }))

        return serviceClient        

    } catch (error) {
        
    }
}

export {
    getServiceOpen
}