import { PrismaClient } from "@prisma/client";
import { Token } from "../../interfaceGlobal/token"


const prisma = new PrismaClient()


const updateDataService = async function (serviceId: number, data: any) {
    console.log(updateDataService);
    try {
      
        const verifyService = await prisma.tbl_servico.findFirst({
            where: {
                id: serviceId,
            },
           
        });
        
        if(verifyService){


            const updateData: any = {};

            if (data.observacao !== undefined && data.observacao !== null && data.observacao !== '') {
                updateData.observacao = data.observacao;
            }

            if (data.tarefas_adicionais !== undefined && data.tarefas_adicionais !== null && data.tarefas_adicionais !== '') {
                updateData.tarefas_adicionais = data.tarefas_adicionais;
            }

            if (data.data_hora !== undefined && data.data_hora !== null && data.data_hora !== '') {
                updateData.data_hora = data.data_hora;
            }


            
            await prisma.tbl_servico.update({
                where: {
                    id: verifyService.id
                },
                data: updateData
            })

            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    } finally {
        await prisma.$disconnect()
    }
}

const updateDataAddressService = async ( serviceId: number, data: any) => {
    
    try {
        const verifyService = await prisma.tbl_servico.findFirst({
            where: {
                id: serviceId,
            },
           
        });

        if(verifyService) {

            const updateService = await prisma.tbl_servico.update({
                where: {
                    id: serviceId,
                },
                data: {
                    id_residencia_cliente: data.addressId
                }
            });
    
            if(updateService){
                return true
            } else{
                return false
            }
        } else {            
            return false
        }

    } catch (error) {
        console.log(error)
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
                valor: data,
            },
        });

        return updatedServiceValue;
    } catch (error) {
     
        return false 
    } finally {
        await prisma.$disconnect()
    }
};


const updateStatusForm = async (serviceId: number, data: any) => {
   
    try {
        const verifyService = await prisma.tbl_servico.findFirst({
            where: {
                AND: [
                    { id: serviceId },
                    { id_residencia_cliente: data.addressId },
                ]
            }
        });

        if (verifyService) {
            const updateData: any = {};
            if (data.hasChildren !== null) {
                updateData.check_crianca = data.hasChildren;
            }
            if (data.hasPet !== null) {
                updateData.check_pet = data.hasPet;
            }

            const tbl_formulario = await prisma.tbl_formulario.updateMany({
                where: {
                    id_servico: serviceId,
                },
                data: updateData,
            });

            if (tbl_formulario) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        await prisma.$disconnect();
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
        console.log(error);
        
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
