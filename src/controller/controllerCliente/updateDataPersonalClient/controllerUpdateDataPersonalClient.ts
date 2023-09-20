import * as message from "../../../modulo/config"
import * as db from "../../../model/clienteDAO/updateDateClientById"
import { createStructureSimpleDataPersonal } from "./createDataStructure/dataPersonalSimple"
import { createStructureSimpleDataPhone } from "./createDataStructure/dataPersonalPhone"

import { checkDataClient } from "./validate/validateDataUpdateClient"
import * as jwt from "jsonwebtoken"

interface UpdateDataClient {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
    phones: {
        ddd: string | null;
        phone: string | null;
        newDDD: string | null;
        newPhone: string | null;
    }[];
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataClient = async function (token: string, dataClient: UpdateDataClient) {
    const SECRETE = message.REQUIRE_SECRETE

    try {
    
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name } = decoded

        const tokenDecoded = { id, name }
        
        let stutusCheck = await checkDataClient(dataClient, tokenDecoded)
        
        if(!stutusCheck){            
            return message.ERRO_UPDATE_USER
        } else {
            
            const simpleData = createStructureSimpleDataPersonal(dataClient)
            if(simpleData){
                const updateDataSimple = await db.updateDataSimpleClient(tokenDecoded, simpleData)
                if(!updateDataSimple){
                    return message.ERRO_UPDATE_DATA_SIMPLE_DIARIST
                }
            }

            const dataPhone = createStructureSimpleDataPhone(dataClient.phones)
            if(dataPhone){
                const updateNumberPhone = await db.updateDataPhone(tokenDecoded, dataPhone)
                
                if(!updateNumberPhone){        
                    return message.ERRO_UPDATE_PHONE_USER
                }
            }
            

            return message.UPDATE_USER
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateDataClient
}