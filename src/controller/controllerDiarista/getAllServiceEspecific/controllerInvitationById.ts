import * as message from "../../../modulo/config"
import {Token} from "../../../interfaceGlobal/token"
import { dbGetInvitation } from "../../../model/diaristaDAO/getInvitationById"
import * as jwt from "jsonwebtoken"

const getInvitationById = async function (token: string) {

    const SECRETE = message.REQUIRE_SECRETE

    try {
        
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as Token
        const { id } = decoded
        
        let invitation
        const statusInvitation = await dbGetInvitation(Number(id))
        if(statusInvitation){
            invitation = {
                status: 200,
                data: statusInvitation
            }
        }else{

            invitation = {
                status: 404,
                data: {status: 404, message: "Nenhum convite encontrado"}
            }
        }

        return invitation

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export{
    getInvitationById
}