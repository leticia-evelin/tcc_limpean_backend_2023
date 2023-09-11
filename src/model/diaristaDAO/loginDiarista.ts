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

const loginDiarista = async function (dataBody: Login): Promise<Payload | false | number> {
    try {
        const loginDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                email: dataBody.email.toLowerCase(),
                senha: dataBody.password 
            }
        })

        if (loginDiarist) {
            const statusContaDiarist = await prisma.tbl_status_conta_diarista.findFirst({
                where: {
                    id_diarista: loginDiarist.id,
                    id_status_conta: 1
                }
        })
        
        if (statusContaDiarist) {
            return {
                id: loginDiarist.id,
                email: loginDiarist.email,
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
// test

export{
    loginDiarista
}