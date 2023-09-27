import * as message from "../../../modulo/config"
import * as validate from "./validate/validateRegisterAddress"
import * as db from "../../../model/clienteDAO/registerAddressCliente"
import * as jwt from "jsonwebtoken";

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


interface TokenPayLoad {
    id: string;
    name: string;
}

const registerAddressCliente = async function (body: EnderecoCliente, token: string) {

    let statusRegisterAddress

    const SECRETE = message.REQUIRE_SECRETE;

    try {
        // const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const decoded = jwt.verify(token, SECRETE) as TokenPayLoad
        const { id, name } = decoded

        const tokenDecoded = { id, name }

    if (
        !validate.validateTypesJson(body)
    ) {
        statusRegisterAddress = message.ERRO_REQUIRED_DATA_CLIENTE
    } else if (!validate.validateAddress(body)) {
        statusRegisterAddress = message.ERRO_ADDRESS
    } else {

        let status = await db.registerAddressUser(body, tokenDecoded)

        if (status) {

            statusRegisterAddress = message.CREATED_REGISTER
        } else {

            statusRegisterAddress = message.ERRO_REGISTER_USER
        }
    }

    return statusRegisterAddress

   
    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER;
    }
}



export {
    registerAddressCliente
}