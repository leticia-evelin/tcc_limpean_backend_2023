import * as message from "../../../modulo/config"
import * as db from "../../../model/diaristaDAO/updateDateDiaristById"
import { checkDataDiarist } from "./validate/validateDataUpdateDiarist"
import * as jwt from "jsonwebtoken"

interface UpdateDataDiarist {
    name: string | null,
    biography: string | null,
    idGender: number | null,
    ddd: string | null,
    phone: string | null,
    newDDD: string | null,
    newPhone: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataDiarist = async function (token: string, dataDiarist: UpdateDataDiarist) {
    const SECRETE = message.REQUIRE_SECRETE

    try {
    
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name } = decoded

        const tokenDecoded = { id, name }
        
        if (!checkDataDiarist(dataDiarist)) {            
            return message.ERRO_UPDATE_USER
        } else {
            
            const statusDiarist = await db.updateDataDiarist(tokenDecoded, dataDiarist)
            if (statusDiarist) {
                return message.UPDATE_USER
            } else {
                return message.ERRO_UPDATE_USER
            }
        }

    } catch (error) {
                
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateDataDiarist
}
