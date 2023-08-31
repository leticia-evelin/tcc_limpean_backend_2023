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

    try {

        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                OR: [
                    { email: dataBody.email.toLowerCase() },
                    { cpf: dataBody.cpf }
                  ]
            }
        });
        

        if (!verifyClient) {
            const tbl_cidade = await prisma.tbl_cidade.create({
                data: {
                    nome: dataBody.address.city,
                    id_estado: dataBody.address.state
                }
            });

            const tbl_endereco = await prisma.tbl_endereco.create({
                data: {
                    logradouro: dataBody.address.publicPlace,
                    bairro: dataBody.address.district,
                    cep: dataBody.address.cep,
                    numero_residencia: dataBody.address.houseNumber,
                    complemento: dataBody.address.complement,
                    id_cidade: tbl_cidade.id
                }
            });

            const tbl_tipo_residencia = await prisma.tbl_tipo_residencia.create({
                data: {
                    nome: 'Casa'
                }
            });

            const tbl_cliente = await prisma.tbl_cliente.create({
                data: {
                    nome: dataBody.nameUser,
                    cpf: dataBody.cpf,
                    data_nascimento: new Date(dataBody.birthDate),
                    biografia: dataBody.biography,
                    foto_perfil: dataBody.photoUser,
                    email: dataBody.email.toLowerCase(),
                    senha: dataBody.password,
                    id_genero: dataBody.idGender
                }
            });

            const residencia = await prisma.tbl_residencia.create({
                data: {
                    id_cliente: tbl_cliente.id,
                    id_endereco: tbl_endereco.id,
                    id_tipo_residencia: tbl_tipo_residencia.id
                }
            });
        }else{
            return false
        }
        return true
    } catch (error) {
        return false
    } finally {
        await prisma.$disconnect();
    }

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