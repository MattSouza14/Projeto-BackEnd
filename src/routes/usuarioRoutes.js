//Rotas da api
// Modelo para rota do usuario quando for criado o controller
const express = require('express');
const router = express.Router();

const usuarioControler = require('../controllers/usuarioControler')

router.get('/:id', usuarioControler.getUser)
router.get('/Users/listar', usuarioControler.getUsers)
router.post('/createUser', usuarioControler.createUser)
router.put('/:id', usuarioControler.updateUser);
router.delete('/:id', usuarioControler.deleteUser)
router.post('/v1/user/token/:email', usuarioControler.loginUser)




module.exports = router
