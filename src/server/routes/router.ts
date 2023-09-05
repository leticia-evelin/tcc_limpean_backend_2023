import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import {registerCliente} from "../../controller/controllerCliente/registerCliente/controllerRegister"
import {registerDiarista} from "../../controller/controllerDiarista/registerDiarista/controllerRegisterDiarista"
import { typeUser } from "../../controller/controllerUser/login/loginTypeUser"
import * as message from "../../modulo/config"
import * as jwt from 'jsonwebtoken'

const jsonParser = bodyParser.json()

const router = Router()

//********************CLIENTE**********************//

//EndPoint responsavel por cadastrar o cliente
router.post('/v1/cadastro/cliente', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await registerCliente(dataBody)
     
        response.status(status.status)
        response.json(status)
        
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


//EndPoint responsavel por deletar o cadastro do cliente
// router.delete('/v1/cadastro/cliente', jsonParser, async function (request: Request, response: Response) {
    
//     let contentType = request.headers['content-type']

//     if (contentType === 'application/json') {

//         let dataBody = request.body

//         let status = await controllerCliente.deleteRegisterCliente(dataBody)
    
//         response.status(status.status)
//         response.json(status)
        
        
//     } else {
//         return response.send(message.ERROR_INVALID_CONTENT_TYPE)
//     }
// })


//Função para verifica token
const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    //Pra uso no Postman
    const token = request.headers['x-api-key'];

    //Para uso Front-end 
    //const token = request.headers['x-access-token'];
    
    const SECRETE = 'a1b2c3';

    if (!token) {
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }

    try {
        //Discriptografa token 
        const decoded = jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE);
        next();
    } catch (error) {
        return response.status(401).json(message.ERRO_INVALID_TOKEN)
    }
}

//Endpoint responsavel por realizar a validação do login cliente e do diarista
router.post('/v1/limpean/login', jsonParser, async function (request, response) {

    let contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        let dataBody = request.body
        
        let status = await typeUser(dataBody)

        response.status(200)
        response.json(status)
        
    }
})



//*********************DIARISTA*********************//

//EndPoint responsavel por cadastrar o diarista
router.post('/v1/cadastro/diarista', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await registerDiarista(dataBody)
    
        response.status(status.status)
        response.json(status)
        
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


//EndPoint de teste, para verificar autenticidade do token
router.get('/v1/form-dados', verifyJWT, jsonParser, async function (request, response) {
    console.log("Acesso")
})

export { router }
