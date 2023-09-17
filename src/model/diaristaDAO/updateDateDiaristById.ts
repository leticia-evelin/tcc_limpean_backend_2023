import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataSimpleDiarist = async function (token: TokenPayLoad, data: any) {

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
            // const updateData = {
            //     nome: data.name ?? verifyDiarist.nome,
            //     biografia: data.biography ?? verifyDiarist.biografia,
            //     id_genero: data.idGender ?? verifyDiarist.id_genero,
            //     senha: data.password ?? verifyDiarist.senha,
            //     foto_perfil: data.photoUser ?? verifyDiarist.foto_perfil,
            // }    
                        
                // Atualize os dados do diarista
                await prisma.tbl_diarista.update({
                    where: {
                        id: verifyDiarist.id
                    },
                    data: data
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

const updateDataPhone = async function (token: TokenPayLoad, data: any) {
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
            
           const tbl_telefone_diarista = await prisma.tbl_telefone_diarista.update({
                    where: {
                        id_diarista: verifyDiarist.id,
                        numero_telefone: data.oldPhone
                    },
                    data: {
                        numero_telefone: data.numero_telefone,
                        ddd: data.ddd
                    }
                })                
                    
                if(tbl_telefone_diarista){
                    return true
                }else{
                    return false
                }
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
    updateDataSimpleDiarist,
    updateDataPhone
}