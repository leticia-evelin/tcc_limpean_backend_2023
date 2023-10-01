import * as message from "../../../modulo/config"
import { getServiceOpen } from "../../../model/clienteDAO/getServiceOpen"

const getDataAllServiceOpen = async function () {
    try {
        
        let statusServiceOPen
        const statusService = await getServiceOpen()
        if(statusService){

            statusServiceOPen = {
                status: 200,
                data: statusService
            }

        }else{

            statusServiceOPen = {
                status: 404,
                data: {status: 404, message: "Nenhum registro encontrado."}
            }
        }
                
        return statusServiceOPen
    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
}

export {
    getDataAllServiceOpen
}