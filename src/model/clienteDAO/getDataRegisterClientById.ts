import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Payload {
    id: number, 
    email: string
}

const getDataRegisterClientById = async function (id: number, name: string){
    try {

        const vw_dados_client = `SELECT * FROM vw_dados_cliente WHERE id_cliente = ${id}`
        const result = await prisma.$queryRawUnsafe(vw_dados_client)

        const statusClient = await prisma.tbl_cliente.findFirst({
            where: {
                id: id
            }, include: {
                FK_Genero_Cliente: true
            }
        })

        const addressClient= await prisma.tbl_residencia_cliente.findMany({
            where: {
                id_cliente: id
            }, include: {
                FK_Cliente_Residencia: true,
                FK_Endereco_Residencia: true,
                FK_TipoResidencia_Residencia: true
            }
        })

        if(result){
            return result
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
    getDataRegisterClientById
}