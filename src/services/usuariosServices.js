const express = require('express')
const app = express()
const Usuario = require('../models/usuariosModel')

app.get('/', (req, res)=>{
    res.send('HomePage')
})

app.get('/v1', (req, res)=>{
    res.send('mds que sofrimento')
})

app.get('/user', (req, res)=>{
    res.send('me ajuda Deus')
})
app.get('/v1/user/:id', (req, res)=>{
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
})



app.listen(8080, ()=> {
    console.log('Servidor rodando')
})

