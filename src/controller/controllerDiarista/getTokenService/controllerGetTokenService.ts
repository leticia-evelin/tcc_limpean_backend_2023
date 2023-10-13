import * as message from "../../../modulo/config"
import { dbGetTokenServiceDiarist } from "../../../model/diaristaDAO/getTokenServiceDiarist"
import { Token } from "../../../interfaceGlobal/token"
import * as jwt from "jsonwebtoken"

const getTokenService = async function (token: string, idServiceClient: any){

    const SECRETE = message.REQUIRE_SECRETE
    const idService = Number(idServiceClient)    

    if(isNaN(idService)){
        return {
            status: 500,
            message: {status: 500, message: "Atenção o id do serviço deve ser um número"}
        }
    }

    try {

        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id , name} = decoded

        const statusToken = await dbGetTokenServiceDiarist(Number(id), name, idService)
        if(statusToken === 404){
            return {
                status: 201,
                data: {
                    status: 404,
                    message: "Dados do serviço invalidos, verique se o diarista está vinculado ao serviço e tente novamente. Obs: Verique se o serviço não foi cancelado."
                }
            }
        }else if(statusToken){
            return {
                status: 201,
                token: statusToken
            }
        }else{
            return message.ERRO_INTERNAL_SERVER
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }

}

export {
    getTokenService
}