//Definição da rotas principais
//exportar o app 
const express = require('express');
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes')

//middlewere de parse de obj para json
app.use(express.json())
// Uso das rotas
app.get('/', (request, response) => {

    response.json({ message: 'olha minha api que legal'});

});

//usando as rotas definidas no arquivo usuarioRoutes
app.use('/v1', usuarioRoutes);

app.use('/v1/category', categoryRoutes);

app.use('/v1', productRoutes);


module.exports = app;