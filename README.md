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
[Link da API(Deploy via Render)]((https://projeto-backend-vz1b.onrender.com/))

# Dependências do Projeto

- **Node.js**: Plataforma que permite a execução de JavaScript fora do navegador, comumente usada para criar servidores backend.

- **Express.js**: Framework minimalista para Node.js que facilita a criação de rotas e a construção de APIs RESTful.
  - Instalação: 
    ```bash
    npm install express
    ```

- **Dotenv**: Utilitário que carrega variáveis de ambiente a partir de um arquivo `.env` para a aplicação, proporcionando segurança e facilidade na configuração.
  - Instalação: 
    ```bash
    npm install dotenv
    ```

- **Nodemon**: Ferramenta que monitora as mudanças no código-fonte e reinicia automaticamente o servidor durante o desenvolvimento, aumentando a produtividade.
  - Instalação: 
    ```bash
    npm install nodemon --save-dev
    ```

- **MySQL**: Sistema de gerenciamento de banco de dados relacional usado para persistir dados na aplicação.
  - Instalação:
    ```bash
    npm install mysql2
    ```

- **Sequelize**: ORM (Object-Relational Mapping) para Node.js que facilita a interação com o banco de dados, proporcionando maior produtividade e abstração ao lidar com consultas SQL.
  - Instalação:
    ```bash
    npm install sequelize
    ```

- **JWT (JSON Web Token)**: Método de autenticação utilizado para criar tokens seguros, permitindo o controle de acesso e a autenticação de usuários em rotas de API.
  - Instalação: 
    ```bash
    npm install jsonwebtoken
    ```

- **Jest**: Framework de testes em JavaScript que permite a criação e execução de testes unitários, assegurando a qualidade e estabilidade do código.
  - Instalação:
    ```bash
    npm install jest
    ```


