import {ERRO_REQUIRED_DATA_CLIENTE, ERRO_REGISTER_USER, CREATED_REGISTER, ERRO_REGISTER_EMAIL} from "../modulo/config"
const login = require('../model/dbLogin');

function validateEmail(email:string) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

interface RegisterCliente {
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: Date,
    gender: number,
    cpf: string
}

// interface AuthenticatorUser {
//     email: string,
//     password: string
// }

const registerCliente = async function (body: RegisterCliente) {

    if (
        !body.email || !body.password ||
        !body.nameUser || !body.photoUser ||
        !body.phone || !body.birthDate || !body.gender ||
        !body.cpf || !body.ddd || body.ddd.length !=  2
    ) {
        return ERRO_REQUIRED_DATA_CLIENTE
    }else if (!validateEmail(body.email)){
        return ERRO_REGISTER_EMAIL
    } else {

        let status = await login.registerUser(body)

        if(status){

            return CREATED_REGISTER
        }else{

            return ERRO_REGISTER_USER
        }
        
    }
}


// const autenticarUser = async function (dataBody: AuthenticatorUser) {

//     if (
//         dataBody.email == '' || dataBody.email == null ||
//         dataBody.password == '' || dataBody.password == null
//     ) {
//         return false
//     } else {
//         try {
//             // Import do arquivo de funções
//             const jwt = require('../middleware/controllerJWT');

//             const dataUser = await login.verifyAccountUser(dataBody);

//             if (dataUser) {
//                 const token = await jwt.createJWT(dataUser[0]);
//                 let statusJson = {
//                     id: dataUser[0].id,
//                     name: dataUser[0].nome,
//                     token: token
//                 }
//                 console.log(statusJson)
//                 return statusJson;
//             } else {
//                 return false;
//             }
//         } catch (error) {
//             console.error('Erro durante autenticação:', error);
//             return false;
//         }
//     }

// }


export {
    registerCliente
    //autenticarUser
}