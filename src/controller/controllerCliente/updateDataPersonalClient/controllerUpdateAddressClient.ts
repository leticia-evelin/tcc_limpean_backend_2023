import * as message from "../../../modulo/config";
import * as db from "../../../model/clienteDAO/updateDateClientById";
import { createStructureSimpleDataAddress } from "./createDataStructure/dataPersonalAddress";
import * as jwt from "jsonwebtoken";

interface UpdateDataAddress {
    state: number | null;
    city: string | null;
    cep: string | null;
    publicPlace: string | null;
    complement: string | null;
    district: string | null;
    houseNumber: string | null;
}

interface TokenPayLoad {
    id: string;
    name: string;
}

const updateDataAddressClient = async function (token: string, residenciaId: number, data: UpdateDataAddress) {
    const SECRETE = message.REQUIRE_SECRETE;

    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name } = decoded;

        const tokenDecoded = { id, name };

        const addressData = createStructureSimpleDataAddress(data);

        if (addressData) {
            const updateAddress = await db.updateDataAddressClient(tokenDecoded, residenciaId, addressData); // Ajuste para passar residenciaId.
            
            if (!updateAddress) {
                return message.ERRO_UPDATE_ADDRESS_CLIENT;
            }
        }

        return message.UPDATE_USER;

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER;
    }
}

export {
    updateDataAddressClient
}
