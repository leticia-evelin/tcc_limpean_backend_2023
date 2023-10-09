interface UpdateService {
    addressId: number | null;
    diaristId: number | null;
    bedroom: number | null;
    livingRoom: number | null;
    kitchen: number | null;
    bathroom: number | null;
    office: number | null;
    laundry: number | null;
    garage: number | null;
    yard: number | null;
    recreationArea: number | null;
    typeCleaningId: number | null;
    hasChildren: boolean | null;
    hasPet: boolean | null;
    observation: string | null;
    additionalTasks: string| null;
    date: string | null;
    startHour: string | null;
    value: string | null;
}

const createStructureService = (data: UpdateService) => {
    if(
        data.addressId === null &&
        data.diaristId === null &&
        data.bedroom ===  null &&
        data.livingRoom === null &&
        data.kitchen === null &&
        data.bathroom === null &&
        data.office === null &&
        data.laundry === null &&
        data.garage === null &&
        data.yard === null &&
        data.recreationArea === null &&
        data.typeCleaningId === null &&
        data.hasChildren === null &&
        data.hasPet === null &&
        data.observation === null &&
        data.additionalTasks === null &&
        data.date === null &&
        data.startHour === null &&
        data.value === null
    ){
        return false;
    } else {
        const serviceData: { [key: string]: any} = {
            tbl_residencia_cliente: {},
            tbl_diarista: {},
            tbl_servico: {},
            tbl_servico_comodo: {},
            tbl_servico_com_valor: {},
            tbl_tipo_limpeza: {},
            tbl_formulario: {},
        };

        if(data.addressId !== null){
            serviceData.tbl_residencia_cliente.id_endereco = data.addressId;
        }

        if(data.diaristId !== null){
            serviceData.tbl_diarista.id = data.diaristId;
        }

        if(data.bedroom !== null){
            serviceData.tbl_servico_comodo.quantidade = data.bedroom;
        }

        if(data.livingRoom !== null){
            serviceData.tbl_servico.quantidade = data.livingRoom;
        }

        if(data.kitchen !== null){
            serviceData.tbl_servico.quantidade = data.kitchen;
        }

        if(data.bathroom !== null){
            serviceData.tbl_servico.quantidade = data.bathroom;
        }

        if(data.office !== null){
            serviceData.tbl_servico_comodo.quantidade = data.office;
        }

        if(data.laundry !== null){
            serviceData.tbl_servico_comodo.quantidade = data.laundry;
        }

        if(data.garage !== null){
            serviceData.tbl_servico_comodo.quantidade = data.garage;
        }

        if(data.yard !== null){
            serviceData.tbl_servico_comodo.quantidade = data.yard;
        }

        if(data.recreationArea !== null){
            serviceData.tbl_servico_comodo.quantidade = data.recreationArea;
        }

        if(data.typeCleaningId !== null){
            serviceData.tbl_tipo_limpeza.id = data.typeCleaningId
        }

        if(data.hasChildren !== null){
            serviceData.tbl_formulario.check = data.hasChildren;
        }

        if(data.hasPet !== null){
            serviceData.tbl_formulario.check = data.hasPet;
        }

        if(data.observation !== null){
            serviceData.tbl_servico .observacao= data.observation;
        }

        if(data.additionalTasks !== null){
            serviceData.tbl_servico.tarefas_adicionais = data.additionalTasks;
        }

        if(data.date !== null){
            serviceData.tbl_servico.data= data.date;
        }

        if(data.startHour !== null){
            serviceData.tbl_servico.hora = data.startHour;
        }

        if(data.value !== null){
            serviceData.tbl_servico_com_valor.valor = data.value;
        }

        return serviceData;
    }
}

export {
    createStructureService
}

