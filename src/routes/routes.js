const express = require('express')
const app = express()
let Usuarios =[
    {
    id: 1,
    fristName:'Mateus',
    surName:'Souza',
    email:'emailteste@gmail.com'   
    },
    {
    id: 2,
    fristName:'cleitinho',
    surName:'gato',
    email:'emailteste2@gmail.com'   

    },
    {
    id: 3,
    fristName:'jorge',
    surName:'bem',
    email:'emailteste3@gmail.com'   

    }

]
app.get('/', (req,res)=>{
    res.send('HomePage')
})
app.get('/Produtos', (req, res)=>{
    res.send('Lista produtos')
})
app.get('/DetalhesProduto', (req,res)=>{
    res.send('Detalhe Produto')
})

app.get('/Usuarios/:id', (req,res)=>{
    const id = req.params.id
    const usuario = Usuarios.find(usuario => usuario.id == id)
    if(usuario){
        res.status(200).json(usuario)
    }else{
        res.status(404).send('Usuario não encontrado')
    }
})


app.listen(8080, ()=> {
    console.log('Servidor rodando')
})