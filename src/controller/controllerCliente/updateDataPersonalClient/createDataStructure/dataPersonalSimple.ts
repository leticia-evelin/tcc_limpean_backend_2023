interface UpdateDataSimple {
    name: string | null;
    biography: string | null;
    idGender: number | null;
    password: string | null;
    photoUser: string | null;
}

function isObjectEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
}

const createStructureSimpleDataPersonal = (data: UpdateDataSimple) =>{

    const clientJson: { [key: string]: any } = {};    

    if(data.name !== null){
        clientJson.nome = data.name
    }
    
    if(data.biography !== null){
        clientJson.biografia = data.biography
    }

    if(data.idGender !== null){
        clientJson.id_genero = data.idGender
    }

    if(data.password !== null){
        clientJson.senha = data.password
    }

    if(data.photoUser !== null){
        clientJson.foto_perfil = data.photoUser
    }

    
    //Se nao estiver vazio
    if(!isObjectEmpty(clientJson)){
        return clientJson
    }else{
        return false
    }
}

export{
    createStructureSimpleDataPersonal
}