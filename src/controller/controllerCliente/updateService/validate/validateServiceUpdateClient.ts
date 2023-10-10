import { Token } from "../../../../interfaceGlobal/token"

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

const checkDataService =  async function (data: UpdateService, token: Token){
    let status = true;    

    if (
        data.addressId === null && data.diaristId === null && data.bedroom === null &&
        data.livingRoom === null && data.kitchen === null && data.bathroom === null && 
        data.office === null && data.laundry === null && data.garage === null && data.yard === null &&
        data.recreationArea === null && data.typeCleaningId === null && data.hasChildren === null &&
        data.hasPet == null && data.observation === null && data.additionalTasks === null &&
        data.date === null && data.startHour === null && data.value === null ) {
        status = false;        
    }

    return status
}

export {
    checkDataService
}