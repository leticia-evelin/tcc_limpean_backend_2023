import { Router, Request, Response } from "express";
import bodyParser from 'body-parser';
import * as controllerLogin from "../../controller/contollerLogin"

const jsonParser = bodyParser.json()

const router = Router()

router.post('/v1/login-de-cadastro', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        let dataBody = request.body

        let status = await controllerLogin.registerUser(dataBody)

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

router.post('/v1/authenticator-login', jsonParser, async function (request, response) {

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

export { router }
