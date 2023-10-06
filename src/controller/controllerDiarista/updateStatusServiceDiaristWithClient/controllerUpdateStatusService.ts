import * as message from "../../../modulo/config"
import { dbUpdateServiceDiarist } from "../../../model/diaristaDAO/updateStatusServiceDiaristWithClient"
import * as jwt from "jsonwebtoken"
import { Token } from "../../../interfaceGlobal/token"

interface UpdateStatusService {
    token: number,
    idService: number,
    idStatus: number
}

const updateStatusService = async function (data: UpdateStatusService | any) {

    const SECRETE = message.REQUIRE_SECRETE

    if (!Number(data.idService) || !Number(data.idStatus) || Number(data.idStatus) == 1) {
        return {
            status: 422,
            message: { status: 422, messsage: "Erro nos tipos de dados requeridos", obs: "O idService e o idstatus devem ser um número." }
        }
    }

    try {

        let statusService

        const decoded = jwt.verify(Array.isArray(data.token) ? data.token[0] : data.token, SECRETE) as Token
        const { id, name } = decoded

        const statusSchedule = await dbUpdateServiceDiarist(Number(id), Number(data.idService), Number(data.idStatus))

        if (statusSchedule) {
            statusService = {
                status: 201,
                message: { status: 201, message: "Status do serviço atualizado com sucesso." }
            }
        } else {
            statusService = {
                status: 500,
                message: { status: 500, message: "Erro ao tentar atualizar os status do serviço. Verifique os dados e tente novamente." }
            }
        }

        return statusService

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    updateStatusService
}