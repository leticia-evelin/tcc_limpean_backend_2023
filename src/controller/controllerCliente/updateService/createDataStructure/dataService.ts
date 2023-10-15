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
    additionalTasks: string | null;
    date: string | null;
    startHour: string | null;
    value: string | null;
}


const createStructureService = (data: UpdateService) => {
    const serviceData: {
        tbl_residencia_cliente: { id_endereco?: number },
        tbl_diarista: { id?: number },
        tbl_servico: { quantidade?: number, observacao?: string, tarefas_adicionais?: string, data?: string, hora?: string },
        tbl_servico_comodo: { id_comodo?: number, quantidade?: number }[],
        tbl_servico_com_valor: { valor?: string },
        tbl_tipo_limpeza: { id?: number },
        tbl_formulario: { check?: boolean }[]
    } = {
        tbl_residencia_cliente: {},
        tbl_diarista: {},
        tbl_servico: {},
        tbl_servico_comodo: [],
        tbl_servico_com_valor: {},
        tbl_tipo_limpeza: {},
        tbl_formulario: []
    };

    if (data.addressId !== null) {
        serviceData.tbl_residencia_cliente.id_endereco = data.addressId;
    }

    if (data.diaristId !== null) {
        serviceData.tbl_diarista.id = data.diaristId;
    }

    if (data.bedroom !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 1, quantidade: data.bedroom });
    }

    if (data.livingRoom !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 2, quantidade: data.livingRoom });
    }

    if (data.kitchen !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 3, quantidade: data.kitchen });
    }

    if (data.bathroom !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 4, quantidade: data.bathroom });
    }

    if (data.office !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 5, quantidade: data.office });
    }

    if (data.laundry !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 6, quantidade: data.laundry });
    }

    if (data.garage !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 7, quantidade: data.garage });
    }

    if (data.yard !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 8, quantidade: data.yard });
    }

    if (data.recreationArea !== null) {
        serviceData.tbl_servico_comodo.push({ id_comodo: 9, quantidade: data.recreationArea });
    }

    if (data.observation !== null) {
        serviceData.tbl_servico.observacao = data.observation;
    }

    if (data.additionalTasks !== null) {
        serviceData.tbl_servico.tarefas_adicionais = data.additionalTasks;
    }

    if (data.date !== null) {
        serviceData.tbl_servico.data = data.date;
    }

    if (data.startHour !== null) {
        serviceData.tbl_servico.hora = data.startHour;
    }

    if (data.value !== null) {
        serviceData.tbl_servico_com_valor.valor = data.value;
    }

    return serviceData;
};

// const createStructureService = (data: UpdateService) => {
//     console.log(createStructureService);

//     const serviceData: {
//         tbl_residencia_cliente?: { id_endereco?: number };
//         tbl_diarista?: { id?: number };
//         tbl_servico?: { observacao?: string; tarefas_adicionais?: string; data?: string; hora?: string };
//         tbl_servico_comodo?: { id_comodo?: number; quantidade?: number }[];
//         tbl_servico_com_valor?: { valor?: string };
//         tbl_tipo_limpeza?: { id?: number };
//         tbl_formulario?: { check?: string }[];
//     } = {};

//     if (data.addressId !== null) {
//         serviceData.tbl_residencia_cliente = { id_endereco: data.addressId };
//     }

//     if (data.diaristId !== null) {
//         serviceData.tbl_diarista = { id: data.diaristId };
//     }

//     if (data.bedroom !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 1, quantidade: data.bedroom });
//     }

//     if (data.livingRoom !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 2, quantidade: data.livingRoom });
//     }

//     if (data.kitchen !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 3, quantidade: data.kitchen });
//     }

//     if (data.bathroom !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 4, quantidade: data.bathroom });
//     }

//     if (data.office !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 5, quantidade: data.office });
//     }

//     if (data.laundry !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 6, quantidade: data.laundry });
//     }

//     if (data.garage !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 7, quantidade: data.garage });
//     }

//     if (data.yard !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 8, quantidade: data.yard });
//     }

//     if (data.recreationArea !== null) {
//         serviceData.tbl_servico_comodo = serviceData.tbl_servico_comodo || [];
//         serviceData.tbl_servico_comodo.push({ id_comodo: 9, quantidade: data.recreationArea });
//     }

//     if (data.observation !== null) {
//         serviceData.tbl_servico = serviceData.tbl_servico || {};
//         serviceData.tbl_servico.observacao = data.observation;
//     }

//     if (data.additionalTasks !== null) {
//         serviceData.tbl_servico = serviceData.tbl_servico || {};
//         serviceData.tbl_servico.tarefas_adicionais = data.additionalTasks;
//     }

//     if (data.date !== null) {
//         serviceData.tbl_servico = serviceData.tbl_servico || {};
//         serviceData.tbl_servico.data = data.date;
//     }

//     if (data.startHour !== null) {
//         serviceData.tbl_servico = serviceData.tbl_servico || {};
//         serviceData.tbl_servico.hora = data.startHour;
//     }

//     if (data.value !== null) {
//         serviceData.tbl_servico_com_valor = serviceData.tbl_servico_com_valor || {};
//         serviceData.tbl_servico_com_valor.valor = data.value;
//     }

//     if (Object.keys(serviceData).length === 0) {
//         return false;
//     }

//    console.log(serviceData)
//     return serviceData;
// };

export {
    createStructureService
};
