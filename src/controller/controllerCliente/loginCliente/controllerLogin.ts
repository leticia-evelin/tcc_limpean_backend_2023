import * as db from "../../../model/clienteDAO/registerCliente"
import * as jwt from "../../../middleware/controllerJWT"

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

            const dataUser = await db.verifyAccountUser(body);

            if (dataUser) {
                const token = await jwt.createJWT(dataUser);
                let statusJson = {
                    id: dataUser.id,
                    email: dataUser.email,
                    token: token
                }
                console.log(statusJson)
                return statusJson;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro durante autenticação:', error);
            return false;
        }
    }
}

export {
    autenticarUser
}