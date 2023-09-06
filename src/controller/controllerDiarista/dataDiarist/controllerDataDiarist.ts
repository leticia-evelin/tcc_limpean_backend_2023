import * as message from "../../../modulo/config"
import { getDiaristById } from "../../../model/diaristaDAO/getAllDiarist"
import * as jwt from "jsonwebtoken"

interface TokenPayload {
    id: string
}

const dataDiarist = async function (token: string | string[]) {

    const SECRETE = '3oFEe4PtHxJeXsa7hY8WBFtCt1AJ4GwgqF6WARF1NG0mUnc89W'
    
    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayload

        const {id} = decoded

        const diarist = await getDiaristById(Number(id))
        
        return message.CREATED_REGISTER
        
    } catch (error) {
                
        return message.ERRO_INVALID_TOKEN 
    }
    
}

export {
    dataDiarist
}