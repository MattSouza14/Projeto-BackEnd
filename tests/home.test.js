const app = require('../src/app');
const request = require('supertest'); // para simular requisições HTTP

test('deve retornar olha minha api que legal', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200); // Verifica o status da resposta
    expect(response.body).toEqual({
        message: 'olha minha api que legal'
      
    }); // Verifica o corpo da resposta
});