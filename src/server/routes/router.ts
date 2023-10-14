//import { loginClient } from "../../controller/controllerCliente/loginCliente/controllerLogin"
//import { loginDiarist } from "../../controller/controllerDiarista/loginDiarista/controllerLogin"

import { Router, Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import { loginTypeUser } from "../../controller/controllerUser/login/loginTypeUser"
import { registerTypeUser } from "../../controller/controllerUser/register/registerTypeUser"
import { dataDiaristById } from "../../controller/controllerDiarista/dataDiarist/controllerDataDiaristById"
import { dataAllDiarist } from "../../controller/controllerDiarista/dataDiarist/controllerDataAllDiarist"
import { deleteRegisterDiarist } from "../../controller/controllerDiarista/deleteRegisterDiarist/controllerDeleteRegisterDiarist"
import { getInvitationById } from "../../controller/controllerDiarista/getAllServiceEspecific/controllerInvitationById"
import { deleteRegisterClient } from "../../controller/controllerCliente/deleteRegisterClient/controllerDeleteRegisterClient"
import { updateDataDiarist } from "../../controller/controllerDiarista/updateDataPersonalDiarist/controllerUpdateDataPersonalDiarist"
import { updateDataClient } from "../../controller/controllerCliente/updateDataPersonalClient/controllerUpdateDataPersonalClient"
import { updateDataService } from "../../controller/controllerCliente/updateService/controllerUpdateService"
import { updateDataAddressClient } from "../../controller/controllerCliente/updateDataPersonalClient/controllerUpdateAddressClient"
import { registerAddressCliente } from "../../controller/controllerCliente/registerAddresClient/controllerRegisterAddressClient"
import { getDataClient } from "../../controller/controllerCliente/getDataClient/controllerDataClientById"
import { getDataAllServiceOpen } from "../../controller/controllerCliente/getAllServiceOpen/controllerDataAllServiceOpenClients"
import { registerService } from "../../controller/controllerCliente/registerService/controllerRegisterServiceClient"
import { deleteServiceClient } from "../../controller/controllerCliente/deleteServiceClient/controllerDeleterServiceClient"
import * as message from "../../modulo/config"
import * as jwt  from "jsonwebtoken"

const jsonParser = bodyParser.json()

const router = Router()

const verifyJWT = async function(request: Request, response: Response, next: NextFunction) {
    //Pra uso no Postman
    const token = request.headers['x-api-key'];    

    //Para uso Front-end 
    //const token = request.headers['x-access-token'];
    
    const SECRETE = message.REQUIRE_SECRETE;

    if (!token) {                
        return response.status(401).json(message.ERRO_REQUIRED_TOKEN);
    }

    try {

        jwt.verify(Array.isArray(token) ? token[0] : token, SECRETE)

        next();
    } catch (error) {                
        return response.status(401).json(message.ERRO_INVALID_TOKEN)
    }
}

/***************************************** Cadastro Cliente e Diarista *********************************/
router.post('/v1/limpean/cadastro', jsonParser, async function (request: Request, response: Response) {
    
    let contentType = request.headers['content-type']

    if (contentType === 'application/json') {

        const dataBody = request.body

        const status = await registerTypeUser(dataBody)
     
        if(status){
            response.status(status.status)
            response.json(status)
        }
        else {
            response.send(message.ERRO_REGISTER_USER)
        }
    } else {
        return response.send(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

/***************************************** Login Cliente e Diarista ***********************************/
router.post('/v1/limpean/login', jsonParser, async function (request, response) {

    const contentType = request.headers['content-type']

    if(contentType === 'application/json'){
        
        const dataBody = request.body
        
        const statusLogin = await loginTypeUser(dataBody)

        if(statusLogin){
            response.status(statusLogin.status)
            response.json(statusLogin)
        }else{
            response.send(message.ERRO_INTERNAL_SERVER)
        }
    }
})

/***************************************** Cliente ***********************************************************/

//****************************************Cliente*****************************************************

//Endpoint responsavel por realizar a validação do login client
// router.post('/v1/limpean/client/login', jsonParser, async function (request, response) {

//     let contentType = request.headers['content-type']

//     if(contentType === 'application/json'){
        
//         let dataBody = request.body
        
//         let status = await loginClient(dataBody)

//         if(status){
//             response.status(status.status)
//             response.json(status)
//         }else{
//             response.send(message.ERRO_INTERNAL_SERVER)
//         }
//     }
// })

//EndPoint para excluir um cliente
router.delete('/v1/limpean/client', verifyJWT, async function (request, response){

    const token = request.headers['x-api-key']
    const statusClient = await deleteRegisterClient(token as string)
   
    response.status(statusClient.status)
    response.json(statusClient)

})

//EndPoint responsavel por pegar todos os serviços abertos dos clientes
router.get('/v1/limpean/client/service', verifyJWT, async function (request, response){
            
        const statusService = await getDataAllServiceOpen()
        
        response.status(statusService.status)
        response.json(statusService)
        
})

//EndPoint responsavel por pegar os dados do cliente pelo id
router.get('/v1/limpean/client', verifyJWT, async function(request, response){
    
    const token = request.headers['x-api-key']
    const statusClient = await getDataClient(token as string)

    response.status(statusClient.status)
    response.json(statusClient)
    
})

//EndPoint para atualizar os dados basicos de cadastro do client
router.put('/v1/limpean/client', verifyJWT, jsonParser, async function (request, response){

    const token = request.headers['x-api-key']

    const dataBody = request.body

    const statusClient = await updateDataClient(token as string, dataBody)

    response.status(statusClient.status)
    response.json(statusClient)

})

//EndPoint para cadastrar um novo endereço
router.post('/v1/limpean/client/new/register/address', verifyJWT, jsonParser, async function (request, response) {

    const contentType = request.headers['content-type']

    if (contentType === 'application/json') {
        const dataBody = request.body
        const token = request.headers['x-api-key']
      
        const statusClient = await registerAddressCliente(dataBody, token as string)

        if (statusClient) {
            response.status(statusClient.status)
            response.json(statusClient)
        } else {
            response.send(message.ERRO_INTERNAL_SERVER)
        }
    }
})

//EndPoint para atualizar um endereço específico da residencia do cliente
router.put('/v1/limpean/client/:residenciaId', verifyJWT, jsonParser, async function (request, response) {

        const token = request.params.token
        const residenciaId = parseInt(request.params.residenciaId)
        const dataBody = request.body

        const statusAddress = await updateDataAddressClient(token, residenciaId, dataBody)

        response.status(statusAddress.status)
        response.json(statusAddress)
   
})

//EndPoint para cadastrar um servico
router.post('/v1/limpean/client/cadastro/servico', verifyJWT, jsonParser, async function (request, response){

        const token = request.headers['x-api-key']
        const dataBody = request.body
        
        const statusService = await registerService(token as string, dataBody)
        response.status(statusService.status)
        response.json(statusService)

})

//EndPoint para deletar o servico de um cliente
router.delete('/v1/limpean/client/service/?id', verifyJWT, async function (request, response){

    const token = request.headers['x-api-key']
    const idService = request.query.service
    
    const statusService = await deleteServiceClient(token as string, idService as string)
    response.status(statusService.status)
    response.json(statusService)

})

//EndPoint para atualizar um serviço específico do cliente
router.put('/v1/limpean/client/update/:serviceId', verifyJWT, jsonParser, async function (request, response) {

    const token = request.headers['x-api-key']
    const serviceId = parseInt(request.params.serviceId)
    const dataBody = request.body

    const statusService = await updateDataService(token as string, serviceId, dataBody)

    console.log(statusService);

    response.status(statusService.status)
    response.json(statusService)

})

/*********************************************************************************************/


/******************** Diarist ****************************************************************/

//Endpoint responsavel por realizar a validação do diarista
// router.post('/v1/limpean/diarist/login', jsonParser, async function (request, response) {

//     let contentType = request.headers['content-type']

//     if(contentType === 'application/json'){
        
//         let dataBody = request.body
        
//         let status = await loginDiarist(dataBody)

//         if(status){
//             response.status(status.status)
//             response.json(status)
//         }
//         else{
//             response.send(message.ERRO_INTERNAL_SERVER)
//         }
//     }
// })

//EndPoint para listar todos os diaristas
router.get('/v1/limpean/diarists', verifyJWT, async function (request, response) {

    const statusDataDiarist = await dataAllDiarist()

    response.status(statusDataDiarist.status)
    response.json(statusDataDiarist)
    
})

//EndPoint Responsavel por deletar a conta do usuario
router.delete('/v1/limpean/diarist', verifyJWT, async function (request, response){

    const token = request.headers['x-api-key']

    const statusDiarist = await deleteRegisterDiarist(token as string)

    response.status(statusDiarist.status)
    response.json(statusDiarist)

})

//EndPoint para listar o diarista com base no id
router.get('/v1/limpean/diarist', verifyJWT, async function (request, response) {

    const token = request.headers['x-api-key']

    const statusDataDiarist = await dataDiaristById(token as string)

    response.status(statusDataDiarist.status)
    response.json(statusDataDiarist)
    
})

//EndPOint para listar todos os convites do diarista
router.get('/v1/limpean/diarist/service/all-invitation', verifyJWT, async function (request, response){
    
    const token = request.headers['x-api-key']

    const statusDiarist = await getInvitationById(token as string)

    response.status(statusDiarist.status)
    response.json(statusDiarist)
    
})

//EndPoint para atualizar os dados basicos de cadastro do diarista
router.put('/v1/limpean/diarist', verifyJWT, jsonParser, async function (request, response){

    const token = request.headers['x-api-key']

    const dataBody = request.body

    const statusDiarist = await updateDataDiarist(token as string, dataBody)

    response.status(statusDiarist.status)
    response.json(statusDiarist)

})

router.put('/v1/limpean/diarist/schedule-service', verifyJWT, jsonParser, async function (request, response){

    const token = request.headers['x-api-key']
    const idService = request.query.idService
    const idStatus = request.query.idStatus
    
})


export { router }
