import * as message from "../../../modulo/config"
import * as jwt from "jsonwebtoken"
import { dbVerifyTokenService } from "../../../model/clienteDAO/getStatusTokenClient"
import { Token } from "../../../interfaceGlobal/token"

const getStatusTokenClient = async function(tokenClient: string, idService: string, tokenService: string) {

    const SECRETE = message.REQUIRE_SECRETE    

    if(!Number(idService)){
        return {
            status: 422,
            message: "O token do serviço deve ser um número"
        }
    }else if(tokenClient === null || tokenClient.length < 6){
        return {
            status: 422,
            message: "Informe o token do serviço"
        }
    }
    
    try {
        const decoded = jwt.verify(tokenClient, SECRETE) as Token
        const { id, name } = decoded

        const statusTokenService = await dbVerifyTokenService(Number(id), Number(idService), tokenService)
        if(typeof statusTokenService === "number" && statusTokenService === 500){
            return message.ERRO_INTERNAL_SERVER
        }else if(statusTokenService){
            return {
                status: 201,
                message: "Token verificado com sucesso."
            }
        }else{
            return {
                status: 401,
                message: "Dados incorretos, verifique as informações do cliente e do diarista e tente novamente."
            }
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    getStatusTokenClient
}