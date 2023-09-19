import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface TokenPayLoad {
    id: string,
    name: string
}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}


const verifyPhoneClient = async function(token: TokenPayLoad, oldDDD: any, oldPhone: any, newDDD: any , newPhone: any){
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })        

        if (verifyClient) {             
           const tbl_telefone_cliente = await prisma.tbl_telefone_cliente.findFirst({
                    where: {
                        id_cliente: verifyClient.id,
                        ddd: oldDDD,
                        numero_telefone: oldPhone
                    }
                }) 
                
                const tbl_telefone_cliente_new = await prisma.tbl_telefone_cliente.findFirst({
                    where: {
                        id_cliente: verifyClient.id,
                        ddd: newDDD,
                        numero_telefone: newPhone
                    }
                })                
                if(tbl_telefone_cliente && tbl_telefone_cliente_new === null){                                                                                
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

const updateDataSimpleClient = async function (token: TokenPayLoad, data: any) {

    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })

        if (verifyClient) {

            //Se data for diferente de null ou undefined eu atualizo senão mantenho as informações
            // const updateData = {
            //     nome: data.name ?? verifyDiarist.nome,
            //     biografia: data.biography ?? verifyDiarist.biografia,
            //     id_genero: data.idGender ?? verifyDiarist.id_genero,
            //     senha: data.password ?? verifyDiarist.senha,
            //     foto_perfil: data.photoUser ?? verifyDiarist.foto_perfil,
            // }                            
                // Atualize os dados do diarista
                await prisma.tbl_cliente.update({
                    where: {
                        id: verifyClient.id
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
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })        
        
        if (verifyClient) { 
                        
           const tbl_telefone_cliente = await prisma.tbl_telefone_cliente.update({
                    where: {
                        id_cliente: verifyClient.id,
                        numero_telefone: data.oldPhone
                    },
                    data: {
                        numero_telefone: data.numero_telefone,
                        ddd: data.ddd
                    }
                })                                
                    
                if(tbl_telefone_cliente){
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
    updateDataSimpleClient,
    updateDataPhone,
    verifyPhoneClient
}