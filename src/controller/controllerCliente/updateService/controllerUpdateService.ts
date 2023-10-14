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

const updateDataService = async (token: string, serviceId: number, dataService: UpdateService) => {
    const SECRET = message.REQUIRE_SECRETE; 

    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRET) as Token;
        const { id, name } = decoded;
        const tokenDecoded = { id, name };

        // Verificar se o serviço pode ser atualizado com base nos dados fornecidos
        const statusCheck = await checkDataService(dataService);

         if (!statusCheck) {
             return message.ERRO_UPDATE_DATA_SERVICE;
         } else {
          
            const serviceData = createStructureService(dataService);

                if(serviceData){
                    const updateData = await db.updateDataService(serviceId, serviceData)
                    if(!updateData){
                        return message.ERRO_UPDATE_DATA_SERVICE
                    } 

                } 
            const addressData = createStructureService(dataService);
            
                if(addressData){
                    const updateAddress = await db.updateDataAddressService(serviceId, serviceData)
                    if(!updateAddress){
                        return message.ERRO_UPDATE_DATA_SERVICE
                    }
                  
                }

            const serviceValue = createStructureService(dataService);

            if(serviceValue){
                const updateValue = await db.updateServiceValue(serviceId, serviceData, tokenDecoded)
                if(!updateValue){
                    return message.ERRO_UPDATE_DATA_SERVICE
                }
               
            }
            

            const statusForm = createStructureService(dataService);

            if(statusForm){
                const updateStatusForm = await db.updateStatusForm(serviceId, serviceData)
                if(!updateStatusForm){
                    return message.ERRO_UPDATE_DATA_SERVICE
                }
               
               
            }

            const serviceRooms = createStructureService(dataService);

            if(serviceRooms){
                const updateRooms = await db.updateServiceRooms(serviceId, serviceData, tokenDecoded)
                if(!updateRooms){
                    return message.ERRO_UPDATE_DATA_SERVICE
                }
            
               
            }
        
            return message.UPDATE_SERVICE
        }

        
    } catch (error) {
       console.log(error)
        return message.ERRO_INTERNAL_SERVER
        
    }
};


export { 
    updateDataService 
};