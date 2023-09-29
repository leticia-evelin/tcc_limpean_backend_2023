import * as message from "../../modulo/config"
import { getServiceOpen } from "../../model/clienteDAO/getServiceOpen"

const getDataAllServiceOpen = async function () {
    try {
        
        const statusService = await getServiceOpen()
        
        return statusService
    } catch (error) {
        
    }
}

export {
    getDataAllServiceOpen
}