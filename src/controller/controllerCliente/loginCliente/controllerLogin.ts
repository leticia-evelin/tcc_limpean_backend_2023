import * as db from "../../../model/clienteDAO/loginCliente"
import * as jwt from "../../../middleware/controllerJWT"
import * as message from "../../../modulo/config"

interface Cliente {
    id: number,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    dataResidence: {
        numberRooms: number,
        haveChildren: boolean,
        haveAnimal: boolean,
        typeResidence: string,
        extraInformation: string | null
        address: {
            state: string,              // Estado
            stateAcronym: string,       // Sigla estado
            city: string,               // Cidade
            cep: string,                // CEP
            publicPlace: string,        // Logradouro
            complement: string | null,  // Complemento
            district: string,           // Bairro
            houseNumber: number         // Numero da casa
        }
    }
}

const autenticarUser = async function (body: Cliente) {

    if (
        body.email === ""    || body.email == null    ||
        body.password === "" || body.password == null
    ) {
        return false
    } else {
        try {

            const dataUser = await db.loginCliente(body);

            if (dataUser) {
                const token = await jwt.createJWT(dataUser);
                let statusJson = {
                    id: dataUser.id,
                    email: dataUser.email,
                    token: token
                }
                return statusJson;
            } else {
                return message.ERRO_INVALID_USER;
            }
        } catch (error) {
            return message.ERRO_INTERNAL_SERVER;
        }
    }
}

export {
    autenticarUser
}