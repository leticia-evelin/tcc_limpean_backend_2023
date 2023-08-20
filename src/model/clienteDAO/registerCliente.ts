const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface Cliente {
    id: number,
    email: string,
    password: string,
    nameUser: string,
    photoUser: string,
    phone: string,
    ddd: string,
    birthDate: string,
    gender: number,
    cpf: string
}

const registerUser = async function (dataBody: Cliente) {

    let statusRegister = false

    //Script SQL para cadastrar o usuario no banco
    try {

        // Verifica se o email ou o cpf ja foram cadastrados
        const duplicateCheckEmail = `SELECT tbl_contratante.email
        FROM tbl_contratante
        where tbl_contratante.email = '${dataBody.email.toLowerCase()}';
        `
        const statusEmail = await prisma.$queryRawUnsafe(duplicateCheckEmail)

        // Verifica se o cpf ja foi cadastrado
        const duplicateCheckCPF = `SELECT tbl_dados_pessoais_contratante.cpf
        FROM tbl_dados_pessoais_contratante
        where tbl_dados_pessoais_contratante.cpf = '${dataBody.cpf}';
        `
        const statusCPF = await prisma.$queryRawUnsafe(duplicateCheckCPF)

        if (statusEmail.length === 0 && statusCPF.length === 0) {
            const sqlContratante = `
                INSERT INTO tbl_contratante (email, senha)
                VALUES ('${dataBody.email.toLowerCase()}', '${dataBody.password}');
            `;

            const sqlDadosPessoais = `
                INSERT INTO tbl_dados_pessoais_contratante (nome, cpf, data_nascimento, foto_perfil, id_contratante, id_genero)
                VALUES ('${dataBody.nameUser}', '${dataBody.cpf}', '${dataBody.birthDate}', '${dataBody.photoUser}', LAST_INSERT_ID(), ${dataBody.gender});
            `;

            const sqlTelefone = `
                INSERT INTO tbl_telefone (numero_telefone, ddd, id_dados_pessoais_contratante)
                VALUES ('${dataBody.phone}', '${dataBody.ddd}', LAST_INSERT_ID());
            `;


            await prisma.$executeRawUnsafe(sqlContratante);

            await prisma.$executeRawUnsafe(sqlDadosPessoais);

            await prisma.$executeRawUnsafe(sqlTelefone);

            statusRegister = true

        }
        return statusRegister
    } catch (error) {
        return false;
    }
}

const deleteRegisterCliente = async function (dataBody: Cliente) {

   let statusRegister = false

    let deleteCliente = `delete from tbl_contratante where id = ${dataBody.id} and email = '${dataBody.email}'`
    let status = await prisma.$executeRawUnsafe(deleteCliente)

    if(status){
        statusRegister = true
    }

    return statusRegister
}


// interface User {
//     id: number;
//     nome: string;
// }

// const verifyAccountUser = async function (dataBody: DataBody): Promise<User | false> {
//     let sql = `SELECT id, nome FROM tbl_cadastro_doador WHERE email ='${dataBody.email}' AND senha ='${dataBody.password}'`

//     let result = await prisma.$queryRawUnsafe(sql)

//     if(result.lenght === 0){
//         return false
//     }else{
//         return result
//     }
// };

export {
    registerUser,
    deleteRegisterCliente
}