import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getDiaristById = async function (id: number) {
    
    console.log(id)
    
}

export {
    getDiaristById
}