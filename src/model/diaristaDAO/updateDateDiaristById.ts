import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const updateDataDiarist = async function (id: number, email: string) {

    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: email.toLowerCase() },
                    { id: id }
                  ]
            }
        })

        
        if(verifyDiarist) {
          
                await prisma.tbl_status_conta_diarista.update({
                    where: {
                        id: verifyDiarist.id
                    },
                    data: {
                        data_status: new Date(),
                        id_status_conta: 2
                    }
                })

            return true
        }else{
            return false
        }
    } catch (error) {
        return false
    }
}

export {
    updateDataDiarist
}