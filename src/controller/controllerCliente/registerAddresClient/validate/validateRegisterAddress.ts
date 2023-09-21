interface EnderecoCliente {
    address: {
        typeHouse: number;
        state: number;
        city: string;
        cep: string;
        publicPlace: string | null;
        complement: string | null;
        district: string;
        houseNumber: string;
    }
}

function validateTypesJson(json: any): boolean {
    try {
        const endereco: EnderecoCliente = json;

        console.log('Endereco:', endereco);

        return (
            
            typeof endereco.address.typeHouse === 'number' &&
            typeof endereco.address.state === 'number' &&
            typeof endereco.address.city === 'string' &&
            typeof endereco.address.cep === 'string' &&
            (typeof endereco.address.publicPlace === 'string' || endereco.address.publicPlace === null) &&
            typeof endereco.address.district === 'string' &&
            (typeof endereco.address.complement === 'string' || endereco.address.complement === null) &&
            typeof endereco.address.houseNumber === 'string'

            
        );
       
    } catch (error) {
        return false;
    }
}

function validateAddress(endereco: EnderecoCliente): boolean {
    return (
        typeof endereco.address.typeHouse === 'number' &&
        typeof endereco.address.state === 'number' &&
        endereco.address.state > 0 &&
        !!endereco.address.city &&
        !!endereco.address.cep &&
        !!endereco.address.district &&
        typeof endereco.address.houseNumber === 'string' &&
        (typeof endereco.address.publicPlace === 'string' || endereco.address.publicPlace === null) &&
        (typeof endereco.address.complement === 'string' || endereco.address.complement === null)
    );
    
}

export { 
    validateAddress, 
    validateTypesJson 
};
