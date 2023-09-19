interface UpdatePhone {
    ddd: string | null;
    phone: string | null;
    newDDD: string | null;
    newPhone: string | null;
}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}

const createStructureSimpleDataPhone = (data: UpdatePhone[]) => {

    if (
        data.every(phone => phone.ddd !== null && phone.phone !== null &&
            phone.newDDD !== null && phone.newPhone !== null)
    ) {

        let clientJson
        for (const item of data) {
            clientJson = {
                oldDDD: item.ddd,
                oldPhone: item.phone,
                ddd: item.newDDD,
                numero_telefone: item.newPhone
            }
        }        
        return clientJson
    } else {
        return false
    }

}

export {
    createStructureSimpleDataPhone
}