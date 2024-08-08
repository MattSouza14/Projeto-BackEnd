//Definição da rotas principais
//exportar o app 

const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoryRoutes = require('./routes/categoryRoutes')


// Uso das rotas
app.get('/', (request, response) => {
    response.send('olha minha api que legal');
});

//usando as rotas definidas no arquivo usuarioRoutes
app.use('/usuario', usuarioRoutes);

app.use('/categorias', categoryRoutes);


module.exports = app;