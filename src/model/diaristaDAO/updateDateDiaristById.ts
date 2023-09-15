import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface UpdateDataDiarist {
    name: string | null,
    biography: string | null,
    idGender: number | null,
    ddd: string | null,
    phone: string | null,
    newDDD: string | null,
    newPhone: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataDiarist = async function (token: TokenPayLoad, data: UpdateDataDiarist) {

    let transaction;

    try {
        const verifyDiarist = await prisma.tbl_diarista.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })

        if (verifyDiarist) {


            //Se data for diferente de null ou undefined eu atualizo senão mantenho as informações
            const updateData = {
                nome: data.name ?? verifyDiarist.nome,
                biografia: data.biography ?? verifyDiarist.biografia,
                id_genero: data.idGender ?? verifyDiarist.id_genero,
                senha: data.password ?? verifyDiarist.senha,
                foto_perfil: data.photoUser ?? verifyDiarist.foto_perfil,
            }

            let verifyPhone: any
            if(data.phone !== null && data.ddd !== null){
                 verifyPhone = await prisma.tbl_telefone_diarista.findFirst({
                    where: {
                        id_diarista: verifyDiarist.id,
                        numero_telefone: data.phone 
                    }
                })
            }

            console.log(verifyPhone);
            
                        
            const updatePhone = {
                numero_telefone: data.newPhone ?? (verifyPhone?.numero_telefone ?? ''), // Use um valor padrão vazio se verifyPhone for nulo
                ddd: data.newDDD ?? (verifyPhone?.ddd ?? ''), // Use um valor padrão vazio se verifyPhone for nulo
            }            
            
            transaction = await prisma.$transaction(async (prisma) => {

                // Atualize os dados do diarista
                const tbl_diarista = await prisma.tbl_diarista.update({
                    where: {
                        id: verifyDiarist.id
                    },
                    data: updateData
                })

                if(verifyPhone)
                await prisma.tbl_telefone_diarista.update({
                    where: {
                        id_diarista: tbl_diarista.id,
                        numero_telefone: verifyPhone.numero_telefone
                    },
                    data: updatePhone
                })
            })

            return true
        } else {
            return false
        }
    } catch (error) {        
        return false
    } finally {
        await prisma.$disconnect()
    }
}


export {
    updateDataDiarist
}