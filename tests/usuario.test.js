const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuario = require('../src/models/usuariosModel');
const { getUser, getUsers, createUser, updateUser, deleteUser, loginUser } = require('../src/controllers/usuarioControler');

// Crie uma instância do aplicativo Express para os testes
const app = express();
app.use(bodyParser.json());

// Defina as rotas para o aplicativo de teste
app.get('/user/:id', getUser);
app.get('/users', getUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);
app.post('/user/token', loginUser);

describe('Testes do controlador de usuários', () => {
    let testUserId;

    beforeAll(async () => {
        // Crie um usuário de teste para usar em alguns dos testes
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash('senha123', saltRounds);
        const user = await Usuario.create({ firstname: 'Teste', surname: 'User', email: 'teste@user.com', password: hashedPassword });
        testUserId = user.id;
    });

    afterAll(async () => {
        // Limpeza dos dados do banco de dados após os testes
        await Usuario.destroy({ where: {} });
    });

    test('Deve fazer login e retornar um token', async () => {
        const response = await request(app)
            .post('/user/token')
            .send({ email: "teste@user.com", password: "senha123" });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(typeof response.body.token).toBe('string');
    });

    test('Deve criar um novo usuário', async () => {
        const response = await request(app)
            .post('/users')
            .send({ firstname: 'Novo', surname: 'Usuario', email: 'novo@usuario.com', password: 'senha123' });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('firstname', 'Novo');
        expect(response.body).toHaveProperty('surname', 'Usuario');
    });

    test('Deve listar todos os usuários', async () => {
        const response = await request(app).get('/users');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    test('Deve retornar um usuário específico', async () => {
        const response = await request(app).get(`/user/${testUserId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('firstname');
        expect(response.body).toHaveProperty('surname');
    });

    test('Deve atualizar um usuário existente', async () => {
        const response = await request(app)
            .put(`/users/${testUserId}`)
            .send({ firstname: 'Atualizado', surname: 'Atualizado', email: 'atualizado@user.com', password: 'novaSenha' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('firstname', 'Atualizado');
        expect(response.body).toHaveProperty('surname', 'Atualizado');
    });

    test('Deve excluir um usuário existente', async () => {
        const response = await request(app).delete(`/users/${testUserId}`);
        expect(response.status).toBe(204);
        
        // Verifique se o usuário foi realmente excluído
        const user = await Usuario.findByPk(testUserId);
        expect(user).toBeNull();
    });
});
