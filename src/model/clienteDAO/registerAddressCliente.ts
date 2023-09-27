import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TokenPayLoad {
    id: string;
    name: string;
}

interface EnderecoCliente {
    address: {
        typeHouse: number;          // Tipo de casa
        state: number;              // Estado
        city: string;               // Cidade
        cep: string;                // CEP
        publicPlace: string;        // Logradouro
        complement: string | null;  // Complemento
        district: string;           // Bairro
        houseNumber: string;        // Numero da casa
    };
}

const registerAddressUser = async function (dataBody: EnderecoCliente, token: TokenPayLoad) {

    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })

        const verifyAdress = await prisma.tbl_endereco.findFirst({
            where: {
                AND: [
                    { numero_residencia: dataBody.address.houseNumber },
                    { cep: dataBody.address.cep}
                ]
            }
        })

        if (verifyClient && !verifyAdress) {
            const tbl_cidade = await prisma.tbl_cidade.create({
                data: {
                    nome: dataBody.address.city,
                    id_estado: dataBody.address.state
                }
            })

            const tbl_endereco = await prisma.tbl_endereco.create({
                data: {
                    logradouro: dataBody.address.publicPlace,
                    bairro: dataBody.address.district,
                    cep: dataBody.address.cep,
                    numero_residencia: dataBody.address.houseNumber,
                    complemento: dataBody.address.complement,
                    id_cidade: tbl_cidade.id
                }
            })

              // Converte token.id para número usando parseInt
              const idCliente = parseInt(token.id);

           
            await prisma.tbl_residencia_cliente.create({
                data: {
                    id_cliente: idCliente, 
                    id_endereco: tbl_endereco.id,
                    id_tipo_residencia: dataBody.address.typeHouse
                }
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

export { registerAddressUser }
