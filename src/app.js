//Definição da rotas principais
//exportar o app 

const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');


// Uso das rotas
app.get('/', (request, response) => {
    response.send('Mensagem de apresentação da api');
});

//usando as rotas definidas no arquivo usuarioRoutes
app.use('/usuario', usuarioRoutes);

module.exports = app;