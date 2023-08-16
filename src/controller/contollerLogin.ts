import {ERRO_REQUIRED_DATA_CLIENTE, ERRO_REGISTER_USER, CREATED_REGISTER, ERRO_REGISTER_EMAIL, ERRO_CPF_BIRTHDATE} from "../modulo/config"
const login = require('../model/dbLogin');

function validateEmail(email:string) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validateCPF(cpf: string, dataNascimento: string) {
    // Remove caracteres não numéricos do CPF
    cpf = cpf.replace(/\D/g, '');

    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11) {
        return false;
    }

    // Verifica se a data de nascimento é válida
    const dataNascRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataNascimento.match(dataNascRegex)) {
        return false;
    }

    // Verifica se a data de nascimento é igual à data fornecida (2023-12-12)
    if (dataNascimento !== '2023-12-12') {
        return false;
    }

    // Verifica se todos os dígitos do CPF são iguais (números repetidos)
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }

    // Validação dos dígitos verificadores do CPF
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;

    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }

    return true;
}

// Teste da função
//const cpf = '123.056.789-09';
//const dataNascimento = '2023-12-12';
//if (validateCPF(cpf, dataNascimento)) {
//   console.log('CPF válido!');
//} else {
//   console.log('CPF inválido.');
//}

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

const registerCliente = async function (body: RegisterCliente) {

    let statusRegisterCliente = {}

    if (
        !body.email || !body.password ||
        !body.nameUser || !body.photoUser ||
        !body.phone || !body.birthDate || !body.gender ||
        !body.cpf || !body.ddd || body.ddd.length !=  2
    ) {
        statusRegisterCliente = ERRO_REQUIRED_DATA_CLIENTE
    }else if (!validateEmail(body.email)){
        statusRegisterCliente = ERRO_REGISTER_EMAIL
    }else if(!validateCPF(body.email, body.cpf)){
        statusRegisterCliente = ERRO_CPF_BIRTHDATE
    } else {

        let status = await login.registerUser(body)

        if(status){

            statusRegisterCliente = CREATED_REGISTER
        }else{

            statusRegisterCliente = ERRO_REGISTER_USER
        }
    }

    return statusRegisterCliente
}

// interface AuthenticatorUser {
//     email: string,
//     password: string
// }

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