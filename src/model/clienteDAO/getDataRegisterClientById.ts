import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

interface Payload {
    id: number, 
    email: string
}

const getDataRegisterClientById = async function (id: number, name: string){
    try {
        
        
    } catch (error) {
        return false;
    } finally {
        await prisma.$disconnect();
    }
}

export{
    getDataRegisterClientById
}