import { Service } from "../../controller/controllerCliente/registerService/Interface/interfaceService"
import { Token } from "../../interfaceGlobal/token"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const dbRegisterService = async (token: Token, data: Service) => {

    try {

        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        }) 

        if(verifyClient){
            let transaction = await prisma.$transaction(async (prisma) => {

                

            })
        }else {
            return false
        }
    } catch (error) {
        
    }
}

export { 
    dbRegisterService
}