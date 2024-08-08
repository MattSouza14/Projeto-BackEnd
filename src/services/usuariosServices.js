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

  // const createUsuario1 = async (req, res) => {
  //   const { userName, surName, email, password, userAtivo, dataCadastro } = Usuario.req.body
  //   try {
  //     const salt = await bcrypt.genSalt(10)
  //     const hashedSenha = await bcrypt.hash(password, salt)
  //     const novoUsuario = await Usuario.create({ 
  //       userName: userName, 
  //       surName: surName, 
  //       userAtivo: userAtivo,
  //       email: email, 
  //       password: hashedSenha,
  //       dataCadastro:dataCadastro

  //      })
  //     const usuarioExistente = await novoUsuario.findOne({ where: { email } })
  //     if (usuarioExistente) {
  //       return res.status(400).json({ 
  //         statusCode: 400,
  //         error: 'Email já está em uso.' 
  //       })
        
  //     }
  //     let createSucess ={
  //       statusCode: 201,
  //       firstname: novoUsuario.userName,
  //       surname: novoUsuario.surName,
  //       email: novoUsuario.email,
  //       password: novoUsuario.password,
        
  //     }
  //     res.status(201).json(createSucess)
  //   } catch (error) {
  //     res.status(400).json({ 
  //       statusCode: 400,
  //       error: 'Erro ao criar usuário.'
  //      })
  //   }
  // }
  const createUsuario = async (req, res) => {
    const { userName, surName, userAtivo, email, password, dataCadastro} = Usuario;
    const saltRounds = 10;
      bcrypt.hash(password, saltRounds)
          .then(senhaCriptografada => {
              return Usuario.create({
                userName: userName, 
                surName: surName, 
                userAtivo: userAtivo,
                email: email, 
                password: senhaCriptografada,
                dataCadastro:dataCadastro,
                createAt: createdAt,
                updateAt: updatedAt
              });
          })
          .then(user => {
            let createSucess ={
              statusCode: 201,
              firstname: user.userName,
              surname: user.surName,
              email: user.email,
              password: user.password,
            }
             res.status(201).json(createSucess);
          })
          .catch(erro => {
              console.log(erro);
              res.status(400).json({
                  statusCode: 400,
                  message: 'Erro ao criar um novo usuario'
              });
          });
  }
    
// const uptadeUsuario = async (req, res)=>{
//     try{

//     }
// }
module.exports = {
    getUsuario,
    createUsuario
}
