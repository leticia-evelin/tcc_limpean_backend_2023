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

const checkDataService =  async function (data: UpdateService){
   
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

    if(data.addressId !== null && (typeof data.addressId !== "number" || data.addressId < 1 )){
        status = false;
    }

    if(data.bedroom !== null && (typeof data.bedroom !== "number")){
        status = false;
    }

    if(data.livingRoom !== null && (typeof data.livingRoom !== "number")){
        status = false;
    }

    if(data.kitchen !== null && (typeof data.kitchen !== "number")){
        status = false;
    }

    if(data.bathroom !== null && (typeof data.bathroom !== "number")){
        status = false;
    }

    if(data.office !== null && (typeof data.office !== "number")){
        status = false;
    }

    if(data.laundry !== null && (typeof data.laundry !== "number")){
        status = false;
    }

    if(data.garage !== null && (typeof data.garage !== "number")){
        status = false;
    }

    if(data.yard !== null && (typeof data.yard !== "number")){
        status = false;
    }

    if(data.recreationArea !== null && (typeof data.recreationArea !== "number")){
        status = false;
    }

    if(data.typeCleaningId !== null && (typeof data.typeCleaningId !== "number" || data.typeCleaningId > 5 || data.typeCleaningId < 1)){
        status = false;
    }

    if(data.hasChildren !==  null && (typeof data.hasChildren !== 'boolean')){
        status = false;
    }

    if(data.hasPet !==  null && (typeof data.hasPet !== 'boolean')){
        status = false;
    }

    if(data.observation !== null && (typeof data.observation !== 'string')){
        status = false;
    }

    if(data.additionalTasks !== null && (typeof data.additionalTasks !== 'string')){
        status = false;
    }

    if(data.date !== null && (typeof data.date !== 'string')){
        status = false;
    }

    if(data.startHour !== null && (typeof data.startHour !== 'string')){
        status = false;
    }

    if(data.value !== null && (typeof data.value !== 'string')){
        status = false;
    }

  
    return status
    
}

export {
    checkDataService
}