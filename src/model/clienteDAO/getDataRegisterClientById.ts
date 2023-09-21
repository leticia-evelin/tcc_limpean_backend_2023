import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getDataRegisterClientById = async function (id: number, name: string){
    try {

        const vw_dados_client = `SELECT * FROM vw_dados_cliente WHERE id_cliente = ${id}`
        const result = await prisma.$queryRawUnsafe(vw_dados_client)

        // const result = await prisma.tbl_residencia_cliente.findMany({
        //     where: {
        //         id_cliente: id
        //     }, include: {
        //         FK_Cliente_Residencia: {
        //             select: {
        //                 nome: true,
        //                 biografia: false,
        //                 foto_perfil: true,
        //                 FK_Genero_Cliente: {
        //                     select:{
        //                         nome: true
        //                     }
        //                 }
        //             }
        //         },
        //         FK_Endereco_Residencia: {
        //             select: {
        //                 id: true,
        //                 logradouro: true,
        //                 bairro: true,
        //                 cep: true,
        //                 numero_residencia: true,
        //                 complemento: true,
        //                 FK_Cidade_Endereco: {
        //                     select: {
        //                         nome: true
        //                     }
        //                 }
        //             }
        //         },
        //         FK_TipoResidencia_Residencia: {
        //             select: {
        //                 nome: true
        //             }
        //         }
        //     }
        // })

        // Mapear e renomear campos na resposta JSON
        // const renamedAddressClient = addressClient.map((client) => {
        //     return {
        //         cliente: client.FK_Cliente_Residencia,
        //         endereco: client.FK_Endereco_Residencia,
        //         tipo_residencia: client.FK_TipoResidencia_Residencia
        //     };
        // });

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