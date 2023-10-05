import * as message from "../../../modulo/config"
import { dbUpdateServiceDiarist } from "../../../model/diaristaDAO/updateStatusServiceDiaristWithClient"
import * as jwt from "jsonwebtoken"
import { Token } from "../../../interfaceGlobal/token"

interface UpdateStatusService {
    token: number,
    idService: number,
    idStatus: number
}

const updateStatusService = async function(data: UpdateStatusService){

    const SECRETE = message.REQUIRE_SECRETE

    const decoded = jwt.verify(Array.isArray(data.token) ? data.token[0] : data.token, SECRETE) as Token
    const {id, name} = decoded

    if(!Number(id) || !Number(data.idService) || !Number(data.idStatus)){
        return {
            status: 422,
            message: {status: 422, messsage: "Erro nos tipos de dados requeridos", obs: "O idService e o idstatus devem ser um número."}
        }
    }

    try {
        
        const statusSchedule = await dbUpdateServiceDiarist(data)



    } catch (error) {
        
    }
}