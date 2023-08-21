/***************************************************
 * Objetivo: Responsavel pelas constantes globais
 * Data: 14/08/2023
 * Versão: 14/08/2023
 **************************************************/

const ERROR_INVALID_CONTENT_TYPE = { status: 415, message: 'O tipo de mídia (Content-Type) da solicitação não é compatível com o servidor. Esperado: application/json'}
const ERRO_INTERNAL_SERVER= {status: 500, message: 'Erro interno no servidor, tente novamente mais tarde.'}  
const ERRO_REQUIRED_DATA_CLIENTE = {status: 400, message: 'Nome, CPF, data de nascimento, ddd , telefone, gênero, email e senha são campos obrigatorios. A senha deve ter no mínimo 6 caracteres. E o nome 2 caracteres.'}
const ERRO_REGISTER_USER = {status: 500, message: "A inserção falhou verifique os dados e tente novamente."}
const ERRO_REGISTER_EMAIL = {status: 500, message: "Atenção email no formato inválido. Ele deve ter esse formato: exemplo@gmail.com"}
const ERRO_CPF_BIRTHDATE = {status: 500, message: "Atenção data de nascimento ou cpf está incorreta."}
const ERRO_NUMBER_PHONE = {status: 500, message: "Atenção o número de telefone esta errado. verique e tente novamente. exemplo: (11) 1111-11111"}
const ERRO_ADDRESS = {status: 500, message: "Atenção, verifique os dados referentes ao endereço e tente novamente"}
const ERRO_DELETE_USER = {status: 500, message: "Erro ao tentar deletar conta de usuario, verifique os dados e tente novamente."}

/***************************************   CONSTANTES DE SUCESSO  ************************************************************************************************/
const CREATED_REGISTER = {status: 201, message: "Registro criado com sucesso."}
const DELETE_CLIENTE = {status: 200, message: "Registro deletado com sucesso."}

export {
    ERROR_INVALID_CONTENT_TYPE,
    ERRO_INTERNAL_SERVER,
    ERRO_REQUIRED_DATA_CLIENTE,
    ERRO_REGISTER_USER,
    CREATED_REGISTER,
    ERRO_REGISTER_EMAIL,
    ERRO_CPF_BIRTHDATE,
    ERRO_NUMBER_PHONE,
    ERRO_ADDRESS,
    ERRO_DELETE_USER,
    DELETE_CLIENTE
}