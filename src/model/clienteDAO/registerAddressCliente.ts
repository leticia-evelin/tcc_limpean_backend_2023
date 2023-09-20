import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface TokenPayLoad {
    id: string,
    name: string
}

interface EnderecoCliente {
    address: {
        typeHouse: number,          // Tipo de casa
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

const registerAddressUser = async function (dataBody: EnderecoCliente) {

  
   
}


export {
    registerAddressUser
}