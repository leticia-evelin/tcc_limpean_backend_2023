import { Service } from "../Interface/interfaceService"

const validateDataService = (data: Service) => {
    let status = true    

    if(
        typeof data.addressId  !== 'number' ||
        (typeof data.idDiarist  !== 'number' &&
        data.idDiarist !== null) ||
        typeof data.bedroom    !== 'number' ||
        typeof data.livingRoom !== 'number' ||
        typeof data.kitchen    !== 'number' ||
        typeof data.bathroom   !== 'number' ||
        typeof data.office     !== 'number' ||
        typeof data.laundry    !== 'number' ||
        typeof data.garage     !== 'number' ||
        typeof data.yard       !== 'number' ||
        typeof data.recreationArea   !== 'number'  ||
        typeof data.idTypeCleaning   !== 'number'  ||
        typeof data.hasChildren      !== 'boolean' ||
        typeof data.hasPet           !== 'boolean' ||
        (typeof data.observation     !== "string" && data.observation !== null)     ||
        (typeof data.additionalTasks !== "string" && data.additionalTasks !== null) ||
        typeof data.date      !== 'string'         ||
        typeof data.startHour !== 'string'         ||
        typeof data.value     !== 'string')
        {
        status = false
    } 

    return status
}

const validateIdTypeCleaning = (data: Service) => {
    let statusId = true
    if(
        data.idTypeCleaning < 0 || data.idTypeCleaning > 5
    ){
        statusId = false
    }

    return statusId
}

function validateHour(data: Service) {
    // Expressão regular para validar o formato "hh:mm"
    const regexHora = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  
    // Teste se a hora corresponde à expressão regular
    if (regexHora.test(data.startHour)) {
      return true
    } else {
      return false
    }
  }
  
  // Exemplos de uso:
  //console.log(validateHour("12:34")); // true
  //console.log(validateHour("24:00")); // false (hora maior que 23)
  //console.log(validateHour("abc"));   // false (formato inválido)

const validateDate = (data: Service) => {

    let status = true

    //Data no formato YYYY-MM-DD
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/    

    //Data no formato YYYY/MM/DD
    const dateRegexBar = /^\d{4}\/\d{2}\/\d{2}$/

    if (!data.date.match(dateRegex) && !data.date.match(dateRegexBar)) {
        return false
    }
    return status
}

const validateValueMonetary = (data: Service) => {
    // Expressão regular para validar um valor monetário no formato "x,xxx.xx" ou "xx.xx"
    const regexValor = /^(\d{1,3}(,\d{3})*(\.\d{2})?|\d{1,3}(\.\d{3})*(,\d{2})?)$/;
  
    // Teste se o valor corresponde à expressão regular
    if (regexValor.test(data.value)) {
      // Remove vírgulas e pontos para verificar o valor real
      const valorNumerico = parseFloat(data.value.replace(/,/g, '').replace(/\./, ''));
  
      // Verifique se o valor numérico é maior que zero
      if (valorNumerico > -1) {
        return true; // Valor monetário válido
      }
    }
  
    return false; // Valor monetário inválido
}
  
// Exemplos de uso:
//console.log(validarValorMonetario("1,234.56"));  // true
//console.log(validarValorMonetario("1.234,56"));  // true
//console.log(validarValorMonetario("100.00"));    // true
//console.log(validarValorMonetario("100,00"));    // true
//console.log(validarValorMonetario("1,234,567")); // false (formato inválido)
//console.log(validarValorMonetario("0.00"));      // false (valor menor ou igual a zero)
//console.log(validarValorMonetario("-100.00"));   // false (valor negativo)
//console.log(validarValorMonetario("abc"));       // false (formato inválido)

export {
    validateDataService,
    validateIdTypeCleaning,
    validateHour,
    validateDate,
    validateValueMonetary          
}
