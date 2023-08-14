import { Router, Request, Response, NextFunction } from "express";
import bodyParser from 'body-parser';
import * as controllerLogin from "../../controller/contollerLogin"
import * as jwt from 'jsonwebtoken'

const jsonParser = bodyParser.json()

const router = Router()

//Função para verifica token
const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    const token = request.headers['x-access-token'];

    const SECRETE = 'a1b2c3';

    if (!token) {
        console.log('token')
        return response.status(401).json({ message: 'Token não fornecido.' });
    }

    try {
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        console.log('Token válido:', decoded);
        next();
    } catch (error) {
        return response.json("{'erro': 'Seu token é inválido'}")
    }
};

router.post('/v1/cadastro/cliente', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await controllerLogin.registerCliente(dataBody)

        if(status){
            response.status(200)
            response.json(status)
        }else{
            response.status(415)
            response.json("{'erro': 'erro no servidor'}")
        }
        
    } else {
        return response.send("Back-end não aceita arquivos sem o formato: Json")
    }
})

router.post('/v1/authenticator-login/cliente', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){

        let dataBody = request.body
        
        let status = await controllerLogin.autenticarUser(dataBody)

        if(status){
            response.status(200)
            response.json(status)
        }else{
            response.status(415)
            response.json("{'erro': 'erro no servidor'}")
        }
    }
})

router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso")
})

export { router }
