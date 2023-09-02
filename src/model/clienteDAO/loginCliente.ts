const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

interface Login {

    email: string,
    password: string
}

interface Payload {
    id: number, 
    email: string
}

const loginCliente = async function (dataBody: Login): Promise<Payload | false> {
    let sql = `SELECT id, email FROM tbl_contratante WHERE email ='${dataBody.email}' AND senha ='${dataBody.password}'`

    let result = await prisma.$queryRawUnsafe(sql)

    console.log(result);
    

    if(result.lenght === 0){
        return false
    }else{
        return result[0]
    }
}

export{
    loginCliente
}