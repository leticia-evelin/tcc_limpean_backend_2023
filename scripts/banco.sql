/**************************************************
 * Objetivo: Scripts para adicionar no banco mysql
 * Data: 26/09/2023
 * Versão: 1.0
 *************************************************/

CRIAÇÃO DA VIEW PARA SELECT DE DIARISTA COMPLETO
CREATE VIEW vw_dados_diarista AS
SELECT
tbl_diarista.id AS id_diarista,
tbl_diarista.nome AS nome_diarista,
tbl_diarista.cpf AS cpf_diarista,
tbl_diarista.data_nascimento,
tbl_diarista.biografia,
tbl_diarista.foto_perfil,
tbl_diarista.email AS email_diarista,
tbl_diarista.senha AS senha_diarista,
tbl_diarista.media_valor,
tbl_genero.nome AS genero,
tbl_telefone_diarista.ddd,
tbl_telefone_diarista.numero_telefone,
tbl_endereco.logradouro AS endereco_logradouro,
tbl_endereco.bairro AS endereco_bairro,
tbl_endereco.cep AS endereco_cep,
tbl_endereco.numero_residencia AS endereco_numero_residencia,
tbl_endereco.complemento AS endereco_complemento,
tbl_cidade.nome AS cidade,
tbl_estado.sigla AS estado,
tbl_avaliacao_diarista.quantidade_estrelas AS estrelas,
tbl_avaliacao_diarista.comentario,
tbl_status_conta.status AS status_conta,
tbl_status_conta_diarista.data_status AS data_status_diarista
FROM tbl_diarista
LEFT JOIN tbl_genero ON tbl_diarista.id_genero = tbl_genero.id
LEFT JOIN tbl_telefone_diarista ON tbl_diarista.id = tbl_telefone_diarista.id_diarista
LEFT JOIN tbl_endereco ON tbl_diarista.id_endereco = tbl_endereco.id
LEFT JOIN tbl_cidade ON tbl_endereco.id_cidade = tbl_cidade.id
LEFT JOIN tbl_estado ON tbl_cidade.id_estado = tbl_estado.id
LEFT JOIN tbl_status_conta_diarista ON tbl_diarista.id = tbl_status_conta_diarista.id_diarista
LEFT JOIN tbl_status_conta ON tbl_status_conta_diarista.id = tbl_status_conta.id
LEFT JOIN tbl_avaliacao_diarista ON tbl_diarista.id = tbl_avaliacao_diarista.id_diarista;

#final da view aqui

#select passar id do diarista para visualização
SELECT * FROM vw_dados_diarista WHERE id_diarista = 1;


##SELECIONAR TODOS OS DIARISTAS CADASTRADOS
#apenas um select na view
SELECT * FROM vw_dados_diarista;




#CRIAÇÃO DA VIEW PARA SELECT DE CLIENTE COMPLETO
CREATE VIEW vw_dados_cliente AS
SELECT
tbl_cliente.id AS id_cliente,
tbl_cliente.nome AS nome_cliente,
tbl_cliente.cpf,
tbl_cliente.data_nascimento,
tbl_cliente.biografia,
tbl_cliente.foto_perfil,
tbl_cliente.email AS email_cliente,
tbl_cliente.senha AS senha_cliente,
tbl_genero.nome AS genero,
tbl_telefone_cliente.ddd,
tbl_telefone_cliente.numero_telefone,
tbl_endereco.logradouro AS logradouro,
tbl_endereco.bairro AS bairro,
tbl_endereco.cep AS cep,
tbl_endereco.numero_residencia AS numero_residencia,
tbl_endereco.complemento AS complemento,
tbl_cidade.nome AS cidade,
tbl_estado.sigla AS estado,
tbl_tipo_residencia.nome AS tipo_residencia,
tbl_avaliacao_cliente.quantidade_estrelas AS estrelas,
tbl_avaliacao_cliente.comentario,
tbl_status_conta.status AS status_conta,
tbl_status_conta_cliente.data_status AS data_status_cliente
FROM tbl_cliente
LEFT JOIN tbl_genero ON tbl_cliente.id_genero = tbl_genero.id
LEFT JOIN tbl_telefone_cliente ON tbl_cliente.id = tbl_telefone_cliente.id_cliente
LEFT JOIN tbl_residencia_cliente ON tbl_cliente.id = tbl_residencia_cliente.id_cliente
LEFT JOIN tbl_endereco ON tbl_residencia_cliente.id_endereco = tbl_endereco.id
LEFT JOIN tbl_cidade ON tbl_endereco.id_cidade = tbl_cidade.id
LEFT JOIN tbl_estado ON tbl_cidade.id_estado = tbl_estado.id
LEFT JOIN tbl_tipo_residencia ON tbl_residencia_cliente.id_tipo_residencia = tbl_tipo_residencia.id
LEFT JOIN tbl_status_conta_cliente ON tbl_cliente.id = tbl_status_conta_cliente.id_cliente
LEFT JOIN tbl_status_conta ON tbl_status_conta_cliente.id = tbl_status_conta.id
LEFT JOIN tbl_avaliacao_cliente ON tbl_cliente.id = tbl_avaliacao_cliente.id_cliente;

#final da view aqui

#select passar id do cliente para visualização
SELECT * FROM vw_dados_cliente WHERE id_cliente = 1;


##SELECIONAR TODOS OS CLIENTES CADASTRADOS
#apenas um select na view
SELECT * FROM vw_dados_cliente;