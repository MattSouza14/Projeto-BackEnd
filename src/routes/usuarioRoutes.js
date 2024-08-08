//Rotas da api
// Modelo para rota do usuario quando for criado o controller
const express = require('express');
const router = express.Router();
const getUsuario = require('../controllers/usuarioControler')
const usuarioControler = require('../controllers/usuarioControler')

router.get('/:id', usuarioControler, getUsuario)




module.exports = router
