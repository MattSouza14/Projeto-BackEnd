//Rotas da api
// Modelo para rota do usuario quando for criado o controller
const express = require('express');
const router = express.Router();
const tokenVerificado = require('../middleware/authMiddleware')
const usuarioControler = require('../controllers/usuarioControler')

router.get('/user/:id', usuarioControler.getUser)
router.get('/users', usuarioControler.getUsers)
router.post('/users',tokenVerificado, usuarioControler.createUser)
router.put('/users/:id',tokenVerificado, usuarioControler.updateUser);
router.delete('/users/:id',tokenVerificado, usuarioControler.deleteUser)
router.post('/user/token', usuarioControler.loginUser)




module.exports = router
