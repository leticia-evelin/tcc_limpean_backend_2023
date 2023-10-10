import { PrismaClient } from "@prisma/client";
import { Token } from "../../interfaceGlobal/token"

const prisma = new PrismaClient()


const updateDataService = async function (token: Token, data: any) {
    
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        })
        
        if(verifyClient){
            await prisma.tbl_servico.update({
                where: {
                    id: verifyClient.id
                },
                data: data
            })

            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    } finally {
        await prisma.$disconnect()
    }
}

const updateDataAddressService = async (token: Token, addressId: number) => {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });

        if(verifyClient) {

            const tbl_residencia_cliente = await prisma.tbl_residencia_cliente.findFirst({
                where: {
                    id_cliente: verifyClient?.id,
                    id_endereco: addressId,
                },
            });
    
            if(tbl_residencia_cliente){
                return true
            } else{
                return false
            }
        } else {            
            return false
        }

    } catch (error) {
        return false
    } finally {
        await prisma.$disconnect()
    }
      
   
};

const updateServiceValue = async (serviceId: number, data: any, token: Token) => {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });

        if (!verifyClient) {
           return false
        }

        const existingServiceValue = await prisma.tbl_servico_com_valor.findFirst({
            where: {
                id_servico: serviceId,
            },
        });

        if (!existingServiceValue) {
           return false
        }

        const updatedServiceValue = await prisma.tbl_servico_com_valor.update({
            where: {
                id: serviceId, 
            },
            data: {
                valor: data.value,
            },
        });

        return updatedServiceValue;
    } catch (error) {
        return false 
    } finally {
        await prisma.$disconnect()
    }
};



const updateStatusForm = async (serviceId: number, data: any, token: Token) => {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });

        if(verifyClient) {
            const tbl_formulario = await prisma.tbl_formulario.updateMany({
                where: {
                    id_servico: serviceId,
                },
                data: [
                    {
                        check: data.hasChildren,
                    },
                    {
                        check: data.hasPet,
                    },
                ],
            });
    
    
            if(tbl_formulario){
                return true
            }else{
                return false
            }
        } else {            
            return false
        }
        
    } catch (error) {
            return false
        } finally {
            await prisma.$disconnect()
        }
};


const updateServiceRooms = async (serviceId: number, data: any, token: Token) => {
    try {
        const verifyClient = await prisma.tbl_cliente.findFirst({
            where: {
                AND: [
                    { email: token.name.toLowerCase() },
                    { id: Number(token.id) }
                ]
            }
        });

        if (verifyClient) {

            const existingRooms = await prisma.tbl_servico_comodo.findMany({
                where: {
                    id_servico: serviceId,
                },
            });
    
            const updatedRooms = await Promise.all(existingRooms.map(async (room) => {
                switch (room.id_comodo) {
                    case 1:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.bedroom }
                        });
                    case 2:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.livingRoom }
                        });
                    case 3:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.kitchen }
                        });
                    case 4:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.bathroom }
                        });    
                    case 5:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.office} 
                        }); 
                    case 6:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.laundry} 
                        });  
                    case 7:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.garage}  
                        });  
                    case 8:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.yard}  
                        }); 
                    case 9:
                        return prisma.tbl_servico_comodo.update({
                            where: { id: room.id },
                            data: { quantidade: data.recreationArea}  
                        });     
                                  
                         
                    default:
                        return room;
                }
            }));
    
            return updatedRooms;
        }

       
    } catch (error) {
       return false
    }   finally {
        await prisma.$disconnect()
    }
};



export {
    updateDataService,
    updateDataAddressService,
    updateServiceValue,
    updateStatusForm,
    updateServiceRooms
};
