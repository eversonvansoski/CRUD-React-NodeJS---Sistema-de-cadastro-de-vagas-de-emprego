--cria o banco
-------------------------------------------------------------------
CREATE SCHEMA 'teste_dev_everson';




--cria as tabelas
-------------------------------------------------------------------
--vagas
CREATE TABLE 'teste_dev_everson'.'vagas' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'titulo' VARCHAR(50) NULL,
  'empresa' VARCHAR(50) NULL,
  'descricao' TEXT NULL,
  'status_vaga_id' INT NOT NULL,
  'regime_contratacao_id' INT NOT NULL,
  PRIMARY KEY ('id'));
  
--regimes de contratação
CREATE TABLE 'teste_dev_everson'.'regimes_contratacao' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'descricao' VARCHAR(20) NOT NULL,
  PRIMARY KEY ('id'));
  
--status das vagas 
CREATE TABLE 'teste_dev_everson'.'status_vaga' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'descricao' VARCHAR(30) NOT NULL,
  PRIMARY KEY ('id'));

--candidatos MODIFICAR
CREATE TABLE 'teste_dev_everson'.'candidatos' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'telefone' VARCHAR(11) NOT NULL,
  'cpf' VARCHAR(11) NOT NULL,
  'linkedin' VARCHAR(200) NULL,
  'usuario_id' INT NOT NULL AFTER 'linkedin',
  PRIMARY KEY ('id'));

--usuarios
CREATE TABLE 'teste_dev_everson'.'usuarios' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'nome' VARCHAR(60) NOT NULL,
  'email' VARCHAR(100) NOT NULL,
  'senha' VARCHAR(500) NOT NULL,
  'tipo_id' INT NOT NULL,
  PRIMARY KEY ('id'));

--tipos de usuario
CREATE TABLE 'teste_dev_everson'.'tipos_usuario' (
  'id' INT NOT NULL AUTO_INCREMENT,
  'descricao' VARCHAR(45) NOT NULL,
  PRIMARY KEY ('id'));

--relação candidatos vagas
CREATE TABLE 'teste_dev_everson'.'candidatos_vagas' (
  'candidato_id' INT NOT NULL,
  'vaga_id' VARCHAR(45) NOT NULL);



--popula as tabelas
-------------------------------------------------------------------
--regimes de contratação
INSERT INTO 'teste_dev_everson'.'regimes_contratacao' ('descricao') VALUES ('CLT');
INSERT INTO 'teste_dev_everson'.'regimes_contratacao' ('descricao') VALUES ('Pessoa Jurídica');
INSERT INTO 'teste_dev_everson'.'regimes_contratacao' ('descricao') VALUES ('Freelancer');

--tipos de usuario
INSERT INTO 'teste_dev_everson'.'tipos_usuario' ('descricao') VALUES ('Candidato');
INSERT INTO 'teste_dev_everson'.'tipos_usuario' ('descricao') VALUES ('Contratante');

--status das vagas 
INSERT INTO 'teste_dev_everson'.'status_vaga' ('descricao') VALUES ('Ativa');
INSERT INTO 'teste_dev_everson'.'status_vaga' ('descricao') VALUES ('Pausada');
INSERT INTO 'teste_dev_everson'.'status_vaga' ('descricao') VALUES ('Finalizada');








  


