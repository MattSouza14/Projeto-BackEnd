const express = require('express')
const app = express()
const usuarioRoutes = require('./routes/usuarioRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes = require('./routes/productRoutes')

app.use(express.json())
app.get('/', (request, response) => {
    response.json({ message: 'olha minha api que legal'})
})

app.use('/v1', usuarioRoutes)
app.use('/v1/category', categoryRoutes)
app.use('/v1', productRoutes)

module.exports = app