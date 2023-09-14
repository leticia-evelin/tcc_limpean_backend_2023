import * as message from "../../../modulo/config"
import { deleteDiarist } from "../../../model/diaristaDAO/deleteDiaristById"
import * as jwt from "jsonwebtoken"

interface TokenPayLoad {
    id: string,
    name: string
}

const deleteRegisterDiarist = async function (token: string) {
    
    const SECRETE = message.REQUIRE_SECRETE
    try {
        
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name} = decoded 

        const statusDiarist = await deleteDiarist(Number(id), name)
        if(statusDiarist){
            return message.DELETE_USER
        }else{
            return message.ERRO_DELETE_USER
        }

    } catch (error) {
        return message.ERRO_INVALID_TOKEN
    }
}


export {
    deleteRegisterDiarist
}


