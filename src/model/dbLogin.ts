const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

interface DataBody {
    name: string;
    email: string;
    password: string;
}

interface User {
    id: number;
    nome: string;
}

const registerUser = async function (dataBody: DataBody) {
    
        //Script SQL para cadastrar o usuario no banco
        let sql = `insert into tbl_cadastro_doador(
            nome,
            email,
            senha
        )values(
            '${dataBody.name}',
            '${dataBody.email}',
            '${dataBody.password}'
             )`

        // Insert, update ou delet se utiliza o $Execute se for esperar retorno de dados $Query
        //Excuta o script no banco de dados e retorna se deu certo ou nao o insert aluno

        let result = await prisma.$executeRawUnsafe(sql)
        if (result) {
            return true
        } else {
            return false
        }
}

const verifyAccountUser = async function (dataBody: DataBody): Promise<User | false> {
    let sql = `SELECT id, nome FROM tbl_cadastro_doador WHERE email ='${dataBody.email}' AND senha ='${dataBody.password}'`

    let result = await prisma.$queryRawUnsafe(sql)
    
    if(result.lenght === 0){
        return false
    }else{
        return result
    }
};

export {
    registerUser,
    verifyAccountUser
};
