
const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken')
const bcrypt = require('bcrypt');
const Usuario = require('../src/models/usuariosModel');
const { getUser, getUsers, createUser, updateUser, deleteUser, loginUser } = require('../src/controllers/usuarioControler');

// Crie uma instância do aplicativo Express para os testes
const app = express();
app.use(bodyParser.json());

// Defina as rotas para o aplicativo de teste
app.get('/user/:id', getUser)
app.get('/users', getUsers)
app.post('/users',createUser)
app.put('/users/:id',updateUser);
app.delete('/users/:id',deleteUser)
app.post('/user/token', loginUser)

describe('Testes do controlador de usuários', () => {
    let token;

    beforeAll(async () => {
        // Crie um usuário de teste para usar em alguns dos testes
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('senha123', saltRounds);
        await Usuario.create({ firstname: 'Teste', surname: 'User', email: 'teste@user.com', password: hashedPassword });
    });

    afterAll(async () => {
        // Limpeza dos dados do banco de dados após os testes
        await Usuario.destroy({ where: {} });
    });

    test('Deve fazer login e retornar um token', async () => {
        const response = await request(app)
            .post('/user/token')
            .send({ email: "tiakathia1@email.com", password: "cleitinho1" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        token = response.body.token;
    });

    test('Deve criar um novo usuário', async () => {
        const response = await request(app)
            .post('/users')
            .send({ firstname: 'Novo', surname: 'Usuario', email: 'novo@usuario.com', password: 'senha123' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('firstname', 'surname' );
    });

    test('Deve listar todos os usuários', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Deve retornar um usuário específico', async () => {
        const user = await Usuario.findOne({ where: { id: '1' } });
        const response = await request(app).get(`/user/:id/`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('firstname', 'surname');
    });

    test('Deve atualizar um usuário existente', async () => {
        const user = await Usuario.findOne({ where: { id: '1' } });
        const response = await request(app)
            .put(`/users/:id`)
            .send({ firstname: 'TiaKathia1', surname: 'tiaaaa', email: 'tiakathia1@email.com', password: 'cleitinho1' });

        expect(response.status).toEqual(200);
        expect(response.body).toHaveProperty('firstname', 'Atualizado');
    });

    test('Deve excluir um usuário existente', async () => {
        const user = await Usuario.findOne({ where: { id: '2' } });
        const response = await request(app).delete(`/users/:id`);
        expect(response.status).toBe(204);
    });
});