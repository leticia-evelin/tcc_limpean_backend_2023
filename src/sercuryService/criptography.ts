import * as crypto from "crypto";

const keyPrivateHex = "b5664aa242b3d57b145aff18314bba4514b4893632aba0f7f1fa5088bc640b31";
const keyPrivate = Buffer.from(keyPrivateHex, 'hex')

// Gerar um vetor de inicialização IV aleatório de 96 bits (12 bytes)
const iv = crypto.randomBytes(12)

const criptographyAllData = (data: any) => {
  const dataService = JSON.stringify(data)

  // Criptografar os dados usando AES-256-GCM
  const cipher = crypto.createCipheriv("aes-256-gcm", keyPrivate, iv);
  let dataCriptography = cipher.update(dataService, 'utf-8', 'hex');
  dataCriptography += cipher.final('hex')

  // Obtém a etiqueta de autenticação (auth tag)
  const authTag = cipher.getAuthTag();

  let dataCriptographyJson = {
    data: dataCriptography,
    authTag: authTag
  }
  
  // Retorna a mensagem criptografada e a etiqueta de autenticação
  return dataCriptographyJson
}

const decripyAllData = (dataCriptography: string, authTag: Buffer) => {

  // Descriptografar a mensagem
  const decipher = crypto.createDecipheriv('aes-256-gcm', keyPrivate, iv);
  decipher.setAuthTag(authTag); // Define a etiqueta de autenticação
  let mensagemDescriptografada = decipher.update(dataCriptography, 'hex', 'utf8');
  mensagemDescriptografada += decipher.final('utf8');

  // Converter a string decodificada de volta para um objeto JSON
  const objetoDecodificado = JSON.parse(mensagemDescriptografada);

  return objetoDecodificado
}


export{
  criptographyAllData,
  decripyAllData
}