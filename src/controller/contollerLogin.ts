const login = require('../model/dbLogin');

interface RegisterUser {
    name: string
    email: string,
    password: string
}

interface AuthenticatorUser {
    email: string,
    password: string
}

const registerUser = async function (body: RegisterUser) {
    if (
        body.name == '' || body.name == null ||
        body.email == '' || body.email == null ||
        body.password == '' || body.password == null
    ) {
        return { error: "Erro" }
    } else {

        let status = await login.registerUser(body)
    }
}

const autenticarUser = async function (dataBody: AuthenticatorUser) {

    if (
        dataBody.email == '' || dataBody.email == null ||
        dataBody.password == '' || dataBody.password == null
    ) {
        return false
    } else {
        try {
            // Import do arquivo de funções
            const jwt = require('../middleware/controllerJWT');

            const dataUser = await login.verifyAccountUser(dataBody);

            if (dataUser) {
                const token = await jwt.createJWT(dataUser[0]);
                let statusJson = {
                    id: dataUser[0].id,
                    name: dataUser[0].nome,
                    token: token
                }
                console.log(statusJson)
                return statusJson;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Erro durante autenticação:', error);
            return false;
        }
    }

}


export {
    registerUser,
    autenticarUser
}