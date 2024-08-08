const bcrypt = require('bcrypt');
const Usuario = require('../models/usuariosModel')


const getUsuario = async (req, res) => {
    try {
        const userId = req.params.id
        const usuario = await Usuario.findByPk(userId)

            if(usuario){
                let objSucess ={
                    statusCode: 200,
                    id: usuario.id,
                    firstname: usuario.userName,
                    surname:usuario.surName,
                    email: usuario.email
                }
                res.status(200).json(objSucess)
            }else{
                res.status(404).send('Usuario não encontrado ou não existe')
            }
        
        
        }catch(erro) {
        console.error('Erro ao buscar usuário:', erro)
      }
  }

  const createUsuario1 = async (req, res) => {
    const { userName, surName, email, password, userAtivo, dataCadastro } = Usuario.req.body
    try {
      const salt = await bcrypt.genSalt(10)
      const hashedSenha = await bcrypt.hash(password, salt)
      const novoUsuario = await Usuario.create({ 
        userName: userName, 
        surName: surName, 
        userAtivo: userAtivo,
        email: email, 
        password: hashedSenha,
        dataCadastro:dataCadastro

       })
      const usuarioExistente = await novoUsuario.findOne({ where: { email } })
      if (usuarioExistente) {
        return res.status(400).json({ 
          statusCode: 400,
          error: 'Email já está em uso.' 
        })
        
      }
      let createSucess ={
        statusCode: 201,
        firstname: novoUsuario.userName,
        surname: novoUsuario.surName,
        email: novoUsuario.email,
        password: novoUsuario.password,
        
      }
      res.status(201).json(createSucess)
    } catch (error) {
      res.status(400).json({ 
        statusCode: 400,
        error: 'Erro ao criar usuário.'
       })
    }
  }
  const createUsuario = async (req, res) => {
  const { userName, surName, userAtivo, email, senha,dataCadastro } = req.body;
    const saltRounds = 10;
    bcrypt.hash(senha, saltRounds)
        .then(senhaCriptografada => {
            return Usuario.create({
              userName: userName, 
              surName: surName, 
              userAtivo: userAtivo,
              email: email, 
              password: senhaCriptografada,
              dataCadastro:dataCadastro
            });
        })
        .then(gato => {
            res.json({
                message: 'Gato criado com sucesso',
                gato: gato
            });
        })
        .catch(erro => {
            console.log(erro);
            res.json({
                message: 'Erro ao criar gato'
            });
        });
}
  

// const uptadeUsuario = async (req, res)=>{
//     try{

//     }
// }









const deleteUsuario = async (req, res) => {
    try {
        const userId = req.params.id
        const usuario = await Usuario.destroy({ where: { id: userId } });

            if(usuario){
                let objSucess ={
                    statusCode: 200,
                    id: usuario.id,
                    firstname: usuario.userName,
                    surname:usuario.surName,
                    email: usuario.email
                }
                res.status(200).json(objSucess)
            }else{
                res.status(404).send('Usuario não encontrado ou não existe')
            }
        
        
        }catch(erro) {
        console.error('Erro ao buscar usuário:', erro)
      }
  }


module.exports = {
    getUsuario,
    createUsuario,
    deleteUsuario
}
