// //arquivo para usuarios
// funções para get usuario, create usuario, update usuario
// const express = require('express')
// const app = express()
const Usuario = require('../models/usuariosModel')


const getUsuario = (req, res) => {
    const userId = req.params.id
     Usuario.findByPk(userId)
    .then(usuario =>{
        if(usuario){
            let objSucess ={
                statusCode: 200,
                id: usuario.id,
                firstname: usuario.userName,
                surname:usuario.surName,
                email: usuario.email
            }
            res.status(200).json(objSucess)
            // console.log(usuario)
     
        }else{
            res.status(404).send('Usuario não encontrado ou não existe')
        }
    })
    .catch(err => {
        console.error('Erro ao buscar usuário:', err);
      });
  };
  module.exports = getUsuario

