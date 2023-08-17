"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCPF = exports.validateEmail = void 0;
function validateEmail(email) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
exports.validateEmail = validateEmail;
function validateCPF(cpf, dataNascimento) {
    cpf = cpf.replace(/\D/g, '');
    if (cpf.length !== 11) {
        return false;
    }
    const dataNascRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dataNascimento.match(dataNascRegex)) {
        return false;
    }
    if (/^(\d)\1+$/.test(cpf)) {
        return false;
    }
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = soma % 11;
    let digito1 = resto < 2 ? 0 : 11 - resto;
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = soma % 11;
    let digito2 = resto < 2 ? 0 : 11 - resto;
    if (parseInt(cpf.charAt(9)) !== digito1 || parseInt(cpf.charAt(10)) !== digito2) {
        return false;
    }
    return true;
}
exports.validateCPF = validateCPF;
