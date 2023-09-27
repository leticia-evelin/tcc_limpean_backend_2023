import * as message from "../../../modulo/config"
import * as validate from "./validate/validateService"
import { Service } from "./Interface/interfaceService"

const registerService = async function (token: string, data: Service) {

    let statusRegister

    if(!validate.validateDataService(data)){        
        statusRegister = message.ERRO_REQUIRED_DATA_CLIENTE
    }else if(!validate.validateDate(data)){
        statusRegister = {
            status: 422,
            message: "Data no formato inválido. Ex: YYYY-MM-DD ou YYYY/MM/DD"
        }
    }else if(!validate.validateHour(data)) {
        statusRegister = {
            status: 422,
            message: "Hora no formato inválido. Ex: 12:34"
        }
    }else if(!validate.validateValueMonetary(data)){
        statusRegister = {
            status: 422,
            message: "Valor monetario no formato inválido. Ex: 100.00 ou 100,00"
        }
    }   else{
        return message.UPDATE_USER
    } 

    return statusRegister
}

export {
    registerService
}