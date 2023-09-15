import * as message from "../../../modulo/config"
import * as jwt from "jsonwebtoken"

interface UpdateDataDiarist{
    name: string | null,
    biography: string | null,
    idGrender: number | null,
    phone: string | null,
    ddd: string | null,
    password: string | null,
    photoUser: string | null
}

interface TokenPayLoad {
    id: string,
    name: string
}

const updateDataDiarist = async function (token:string, dataDiarist: UpdateDataDiarist) {
    const SECRETE = message.REQUIRE_SECRETE

    try {
        
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE) as TokenPayLoad
        const { id, name} = decoded 

        
        // const statusDiarist = await deleteDiarist(Number(id), name)
        // if(statusDiarist){
        //     return message.DELETE_USER
        // }else{
        //     return message.ERRO_DELETE_USER
        // }

    } catch (error) {
        return message.ERRO_INVALID_TOKEN
    }
}