import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateDataDiarist{
    name: string | null,
    biography: string | null,
    idGrender: number | null,
    phone: string | null,
    ddd: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const deleteDiarist = async function (token: TokenPayLoad, updateDiarist: UpdateDataDiarist) {

    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id )}
                  ]
            }
        })

        
        if(verifyDiarist) {
          
                const tbl_diarista = await prisma.tbl_diarista.update({
                    where: {
                        id: verifyDiarist.id
                    },
                    data: {
                        nome: updateDiarist.name ?? undefined,
                        biografia: updateDiarist.biography ?? undefined,
                        id_genero: updateDiarist.idGrender ?? undefined,
                        senha: updateDiarist.password ?? undefined,
                        foto_perfil: updateDiarist.photoUser ?? undefined
                    }
                })

                await prisma.tbl_telefone_diarista.update({
                    where: {
                        id_diarista: tbl_diarista.id
                    },
                    data: {
                        numero_telefone: updateDiarist.phone ?? undefined,
                        ddd: updateDiarist.ddd ?? undefined
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
    deleteDiarist
}