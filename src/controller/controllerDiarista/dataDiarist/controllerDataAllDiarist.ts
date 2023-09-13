import * as message from "../../../modulo/config"
import { getAllDiarist } from "../../../model/diaristaDAO/getAllDiarist"

const dataAllDiarist = async function () {

    try {

        const diarist = await getAllDiarist()
        
        const diaristJson = {
            status: 200,
            diarists: diarist
        }

        if(diarist){
            return diaristJson
        }else{
            return message.ERRO_INTERNAL_SERVER
        }
        
    } catch (error) {
        
        return message.ERRO_INTERNAL_SERVER
    }

}

export {
    dataAllDiarist
}