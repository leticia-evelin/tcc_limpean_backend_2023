const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface Cliente {
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    idGender: number,
    cpf: string,
    biography: string | null,
    address: {
        state: number,              // Estado
        city: string,               // Cidade
        cep: string,                // CEP
        publicPlace: string,        // Logradouro
        complement: string | null,  // Complemento
        district: string,           // Bairro
        houseNumber: string         // Numero da casa
    }
}

const registerUser = async function (dataBody: Cliente) {   
    

    return true

}


// const deleteRegisterCliente = async function (dataBody: Cliente) {

//    let statusRegister = false

//     let deleteCliente = `delete from tbl_contratante where id = ${dataBody.id} and email = '${dataBody.email}'`
//     let status = await prisma.$executeRawUnsafe(deleteCliente)

//     if(status){
//         statusRegister = true
//     }

//     return statusRegister
// }

// interface Payload {
//     id: number, 
//     email: string
// }

// const verifyAccountUser = async function (dataBody: Cliente): Promise<Payload | false> {
//     let sql = `SELECT id, email FROM tbl_contratante WHERE email ='${dataBody.email}' AND senha ='${dataBody.password}'`

//     let result = await prisma.$queryRawUnsafe(sql)

//     console.log(result);
    

//     if(result.lenght === 0){
//         return false
//     }else{
//         return result[0]
//     }
// }

export {
    registerUser
}