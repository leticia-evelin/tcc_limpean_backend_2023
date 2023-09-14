import * as message from "../../../modulo/config"
import { getDiaristById } from "../../../model/diaristaDAO/getDiaristById"
import * as jwt from "jsonwebtoken"

interface TokenPayload {
    id: string
}

const dataDiaristById = async function (token: string | string[]) {

    const SECRETE = message.REQUIRE_SECRETE
    
    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayload
        
        const {id} = decoded
        const diarist = await getDiaristById(Number(id))        

        const diaristJson = {
            status: 200,
            user: diarist
        }
        
        if(diarist){
            return diaristJson
        }else{
            return message.ERRO_INVALID_TOKEN
        }
        

    } catch (error) {                        
        return message.ERRO_INTERNAL_SERVER 
    }
    
}

export {
    dataDiaristById
}