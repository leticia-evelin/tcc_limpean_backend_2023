interface UpdateAddress {
    state: number | null;       // Estado
    city: string | null;        // Cidade
    cep: string | null;         // CEP
    publicPlace: string | null; // Logradouro
    complement: string | null;  // Complemento
    district: string | null;    // Bairro
    houseNumber: string | null; // Numero da casa
}

const createStructureSimpleDataAddress = (data: UpdateAddress) => {
    if (
        data.state === null &&
        data.city === null &&
        data.cep === null &&
        data.publicPlace === null &&
        data.complement === null &&
        data.district === null &&
        data.houseNumber === null
    ) {
        return false;
    } else {
        const addressData: { [key: string]: any } = {
            tbl_cidade: {},
            tbl_endereco: {},
        };

        if (data.state !== null) {
            addressData.tbl_cidade.id_estado = data.state;
        }

        if (data.city !== null) {
            addressData.tbl_cidade.nome = data.city;
        }

        if (data.cep !== null) {
            addressData.tbl_endereco.cep = data.cep;
        }

        if (data.publicPlace !== null) {
            addressData.tbl_endereco.logradouro = data.publicPlace;
        }

        if (data.complement !== null) {
            addressData.tbl_endereco.complemento = data.complement;
        }

        if (data.district !== null) {
            addressData.tbl_endereco.bairro = data.district;
        }

        if (data.houseNumber !== null) {
            addressData.tbl_endereco.numero_residencia = data.houseNumber;
        }

        return addressData;
    }
}

export {
    createStructureSimpleDataAddress
}
