const app = require('../src/app')
const request = require('supertest')

test('deve retornar olha minha api que legal', async () => {
    const response = await request(app).get('/')

    expect(response.status).toBe(200)
    console.log(response.body)
    expect(response.body).toEqual({
        message: 'olha minha api que legal'
      
    })
})