import { getDataRegisterClientById } from "../../../model/clienteDAO/getDataRegisterClientById"
import * as message from "../../../modulo/config"
import * as jwt from "jsonwebtoken"

interface TokenPayLoad {
    id: string,
    name: string
}

const getDataClient = async function (token: TokenPayLoad) {
    const SECRETE = message.REQUIRE_SECRETE
    
    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        
        const {id, name} = decoded
        const diarist = await getDataRegisterClientById(Number(id), name)        

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