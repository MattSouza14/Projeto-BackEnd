# Projeto-BackEnd

### Introdução:
Esta API foi desenvolvida pelos alunos do programa Geração Tech e tem como objetivo demonstrar o uso das habilidades adquiridas em sala de aula. A API foi baseada na documentação disponibilizada pela [Digital College](https://github.com/digitalcollegebr). Com esta API, é possível realizar pesquisas de dados cadastrados nas tabelas criadas, bem como inserir, atualizar e deletar dados. Este trabalho é resultado do bom desempenho em equipe e da valiosa tutoria da professora [Káthia Rocha](https://github.com/techcomkathia) e de [Nayara Calenzo](#), que nos acompanhou e deu suporte nesta importante tarefa.



### Equipe:

- **Lucas Teles** - [GitHub](https://github.com/magicianLucas)
- **Paulo** - [GitHub](https://github.com/paulomtx)
- **Pedro Matias** - [GitHub](https://github.com/PedroMatias1998)
- **Vinicius Alves** - [GitHub](https://github.com/Vicore123)
- **Mateus Souza** - [GitHub](https://github.com/MattSouza14)


## Sobre a API:

###
<details>
 <summary><strong>Tecnologias Implementadas no Projeto</strong></summary><br>

- *Node.js* - possibilita a execução JS em um servidor
- *Express.js* - cria as rotas de API
- *Dotenv* - cria configurações com mais facilidade e segurança
- *Nodemon* - reinicia o servidor a cada alteração
- *MySQL* para persistência de dados
- *Sequelize* - manipular dados sql em JS
- *JWT* - adiciona segurança e limita o acesso nas rotas de API
- *JEST* - testar e manter a qualidade do código
</details>

<details>
 <summary><strong>End Points: Usuários</strong></summary><br>

- *End Point* - exemplo que faz
  
</details>

<details>
 <summary><strong>End Points: Categorias</strong></summary><br>

- *End Point* - exemplo que faz
  
</details>
<details>
 <summary><strong>End Points: Produtos</strong></summary><br>

- *End Point* - exemplo que faz
  
</details>

<details>
 <summary><strong>Instruções de aplicação e uso da API</strong></summary><br>

```

```
  
</details>


## Diagrama do Banco de Dados:

![diagrama do banco de dados](src/assets/diagrama.png)




# Estrutura de diretório:
```
project-root/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.js
│   └── server.js
├── tests/
├── .env
├── .gitignore
└── package.json
```
## Passo a passo:
### Caso faça o clone do projeto:
- Instale as dependencias:
- ```npm install express```: Express
- ```npm install dotenv```: Dotenv
- ```npm install express```: Nodemon
- ```npm install bcrypt```: Bcrypt
- ```npm install jsonwebtoken```: JWT

### Iniciando o servidor
- ```node --env-file=../.env server.js```: Iniciando o servidor
