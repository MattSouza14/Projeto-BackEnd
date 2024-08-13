//Rotas da api
// Modelo para rota do usuario quando for criado o controller
const express = require('express');
const router = express.Router();
const tokenVerificado = require('../middleware/authMiddleware')
const usuarioControler = require('../controllers/usuarioControler')

router.get('/User/:id', usuarioControler.getUser)
router.get('/ListUsers', usuarioControler.getUsers)
router.post('/Users', usuarioControler.createUser)
router.put('/Users/:id', usuarioControler.updateUser);
router.delete('/Users/:id', usuarioControler.deleteUser)
router.post('/user/token', usuarioControler.loginUser)




module.exports = router
