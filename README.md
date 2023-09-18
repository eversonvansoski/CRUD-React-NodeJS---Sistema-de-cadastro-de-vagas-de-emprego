# Teste-Desenvolvedor-Hower
Documentação da API:
https://documenter.getpostman.com/view/12904086/2s9YC5yCqe

Passo a passo para criação de ambiente local de desenvolvimento:
> Clonar este repositório
> 
> Instalar o node (https://nodejs.org/en/download)
> 
> Instalar e configurar o MySQL localmente;

Após os passos acima, seguir as instruções para cada camada da aplicação:

Banco de dados:
> Criar um usuário com permissão de CRUD (user: "newuser", password: "Teste@123458")
> 
> Executar o script na pasta Database. Esse script cria todas as tabelas e insere dados iniciais


Backend/API:
> Acessar a pasta Backend
> 
> Execuar o comando npm install no terminal
> 
> Executar o comando npm start no terminal
> 
> Importar a collection (Teste Everson.postman_collection.json) no Postman ou seguir a documentação linkada acima para testes


Frontend:
> Acessar a pasta Frontend
> 
> Execuar o comando npm install no terminal
> 
> Executar o comando npm start no terminal


_____________________________________________________________________________


Como utilizar o sistema:

> Ao acessar a url (http://localhost:4000/) a primeira tela apresentada é a de login, caso o usuário não tenha sido criado, é possível clicar em Criar Cadastro e se cadastrar como ADM/Recrutador.
>
> Após o cadastro, é possível fazer o login com o email e senha criados.
>
> No menu esquerdo, existem os links para administrar Vagas e Candidatos.
>
> Quando um candidato é criado, é gerada uma senha que deve ser informada ao candidado cadastrado. A senha e o email serão utilizados para login com o perfil tipo Candidato.


Algumas observações:

> O cadastro está funcionando, mas o login está sendo feito apenas para direcionamento das telas no frontend.
>
> A paginação está funcionando apenas na API. No frontend, tive alguns problemas com versão do Material UI.







