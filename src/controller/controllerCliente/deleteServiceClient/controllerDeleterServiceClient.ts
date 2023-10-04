import * as message from "../../../modulo/config"
import { Token } from "../../../interfaceGlobal/token"
import { dbDeleteService } from "../../../model/clienteDAO/deleteServiceClientById"
import * as jwt from "jsonwebtoken"

const deleteServiceClient = async function(token: string, idService: string){

    const SECRETE = message.REQUIRE_SECRETE

    if(!Number(idService)){
        return message.ERRO_REQUIRED_DATA_CLIENTE
    }

    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id, name} = decoded         
                
        const statusService = await dbDeleteService(Number(id), name, Number(idService))
        if(statusService){
            return message.DELETE_USER
        }else{
            return message.ERRO_DELETE_USER
        }
        
    } catch (error) {

        return message.ERRO_INTERNAL_SERVER
        
    }
}

export {
    deleteServiceClient
}