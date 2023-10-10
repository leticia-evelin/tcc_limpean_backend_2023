import * as message from "../../../modulo/config"
import * as db from "../../../model/clienteDAO/updateServiceClientById"
import { createStructureService } from "./createDataStructure/dataService"
import { Token } from "../../../interfaceGlobal/token"
import { checkDataService } from "./validate/validateServiceUpdateClient"

import * as jwt from "jsonwebtoken"

interface UpdateService {
    addressId: number | null;
    diaristId: number | null;
    bedroom: number | null;
    livingRoom: number | null;
    kitchen: number | null;
    bathroom: number | null;
    office: number | null;
    laundry: number | null;
    garage: number | null;
    yard: number | null;
    recreationArea: number | null;
    typeCleaningId: number | null;
    hasChildren: boolean | null;
    hasPet: boolean | null;
    observation: string | null;
    additionalTasks: string| null;
    date: string | null;
    startHour: string | null;
    value: string | null;
}

const updateDataService = async (token: string, dataService: UpdateService) => {
    const SECRET = message.REQUIRE_SECRETE; 

    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRET) as Token;
        const { id, name } = decoded;
        const tokenDecoded = { id, name };

        // Verificar se o serviço pode ser atualizado com base nos dados fornecidos
        const statusCheck = await checkDataService(dataService, tokenDecoded);

        if (!statusCheck) {
            return message.ERRO_UPDATE_DATA_SERVICE;
        } else {
            // Criar estrutura de dados para atualização (se necessário)
            const serviceData = createStructureService(dataService);

                if(serviceData){
                    const updateData = await db.updateDataService(tokenDecoded, serviceData)
                    if(!updateData){
                        return message.ERRO_UPDATE_DATA_SERVICE
                    } 
                } 
            

            return message.UPDATE_SERVICE
        } 
    } catch (error) {
        return message.ERRO_INTERNAL_SERVER
    }
};

export { 
    updateDataService 
};