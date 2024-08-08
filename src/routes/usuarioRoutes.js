//Rotas da api
// Modelo para rota do usuario quando for criado o controller
const express = require('express');
const router = express.Router();
// const {getUsuario, createUsuario} = require('../controllers/usuarioControler')

const usuarioControler = require('../controllers/usuarioControler')

router.get('/:id', usuarioControler.getUser)
router.post('/user', usuarioControler.createUser)
router.delete('/:id', usuarioControler.deleteUser)




module.exports = router
