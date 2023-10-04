import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import * as jwt from "jsonwebtoken"

const deleteServiceClient = async function(token: string, idService: string){

    const SECRETE = message.REQUIRE_SECRETE

    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name} = decoded         
        

    } catch (error) {

        return message.ERRO_INTERNAL_SERVER
        
    }
}

export {
    deleteServiceClient
}