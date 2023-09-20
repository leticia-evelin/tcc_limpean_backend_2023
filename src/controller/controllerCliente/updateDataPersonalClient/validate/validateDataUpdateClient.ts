import { validatePhoneWithDDD } from "../../registerCliente/validate/validateRegister"
import { verifyPhoneClient } from "../../../../model/clienteDAO/updateDateClientById";

interface UpdateDataClient {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
    phones: {
        ddd: string | null;
        phone: string | null;
        newDDD: string | null;
        newPhone: string | null;
    }[];
}

interface TokenPayLoad {
    id: string,
    name: string
}

function isURL(url: string) {
    // Expressão regular para verificar URLs
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    return urlRegex.test(url);
}

const checkDataClient =  async function (data: UpdateDataClient, token: TokenPayLoad){
    let status = true;    

    if (
        data.name === null && data.biography === null && data.idGender === null &&
        data.phones.every(phone => phone.ddd === null && phone.phone === null && phone.newDDD === null && phone.newPhone === null) &&
        data.password === null && data.photoUser === null) {
        status = false;        
    }

    if (data.name !== null && (typeof data.name !== "string" || data.name.length < 2)) {
        status = false;
    }

    if (data.idGender !== null && (typeof data.idGender !== "number" || data.idGender > 3 || data.idGender < 1)) {
        status = false;
    }

    if (data.phones.some(phone => typeof phone.phone === "string" || typeof phone.ddd === "string" || typeof phone.newPhone === "string" || typeof phone.newDDD === "string")) {

        if (data.phones.some(phone => !validatePhoneWithDDD(phone.ddd, phone.phone))) {                
            status = false
        }

        if (data.phones.some(phone => !validatePhoneWithDDD(phone.newDDD, phone.newPhone))) {
            status = false
        }

        for (const phone of data.phones) {
            if (!(await verifyPhoneClient(token, phone.ddd, phone.phone, phone.newDDD, phone.newPhone))) {
                status = false;                
                break; // Para a iteração se encontrar um erro
            }
        }        
        
    }

    if (data.password !== null && (typeof data.password !== "string" || data.password.length < 6)) {
        status = false;
    }

    if (data.photoUser !== null && !isURL(data.photoUser)) {
        status = false;
    }  
    
    
    return status
}

export {
    checkDataClient
}