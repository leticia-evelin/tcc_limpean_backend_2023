import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Login {

    email: string,
    password: string
}

interface Payload {
    id: number, 
    email: string
}

const loginCliente = async function (dataBody: Login): Promise<Payload | false | number> {
    try {
        const loginClient = await prisma.tbl_cliente.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password 
            }
        })

        if (loginClient) {
            const statusContaClient = await prisma.tbl_status_conta_diarista.findFirst({
                where: {
                    id_diarista: loginClient.id,
                    id_status_conta: 1
                }
        })
        
        if (statusContaClient) {
            return {
                id: loginClient.id,
                email: loginClient.email,
            }
        } else{
            return 401
        }
        
        }else{
            return false
        }
    } catch (error) {
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export{
    loginCliente
}