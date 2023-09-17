interface UpdateDataSimple {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
    averagePrice: string | null;
}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}

const createStructureSimpleDataPersonal = (data: UpdateDataSimple) =>{

    const diaristJson: { [key: string]: any } = {};    

    if(data.name !== null){
        diaristJson.nome = data.name
    }
    
    if(data.biography !== null){
        diaristJson.biografia = data.biography
    }

    if(data.idGender !== null){
        diaristJson.id_genero = data.idGender
    }

    if(data.password !== null){
        diaristJson.senha = data.password
    }

    if(data.photoUser !== null){
        diaristJson.foto_perfil = data.photoUser
    }

    if(data.averagePrice !== null){
        diaristJson.media_valor = data.averagePrice
    }
    
    //Se nao estiver vazio
    if(!isObjectEmpty(diaristJson)){
        return diaristJson
    }else{
        return false
    }
}

export{
    createStructureSimpleDataPersonal
}