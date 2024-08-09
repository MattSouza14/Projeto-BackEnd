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

  const createUsuario = async (req, res) => {
    const { userName, surName, userAtivo, email, password, dataCadastro } = req.body;
   
    const saltRounds = 10;
    try {
       let senhaCriptografada = await bcrypt.hash(password, saltRounds);
        
        const newUser = await Usuario.create({
            userName: userName, 
            surName: surName, 
            userAtivo: userAtivo,
            email: email, 
            password: senhaCriptografada,
            dataCadastro: dataCadastro,
        });

        let createSucess = {
            statusCode: 201,
            firstname: newUser.userName,
            surname: newUser.surName,
            email: newUser.email,
            password: newUser.password,
        };

        res.status(201).json(createSucess);

    } catch (erro) {
        console.log(erro);
        res.status(400).json({
            statusCode: 400,
            message: 'Erro ao criar um novo usuario'
        });
    }
}

const updateUsuario = async (req, res) => {
    const id  = req.params.id;
    const { userName, surName, userAtivo, email, password, dataCadastro } = req.body;

    try {
        const usuario = await Usuario.findByPk(id);
        
        if (usuario) {
        
            if (password) {
                const saltRounds = 10;
               senhaCriptografada = await bcrypt.hash(password, saltRounds);
            }
            await usuario.update({
                userName: userName,  
                surName: surName,
                userAtivo: userAtivo, 
                email: email,
                password: senhaCriptografada, 
                dataCadastro: dataCadastro  
            });
            let updateSuccess ={
                    statusCode: 200,
                    message: 'Usuário atualizado com sucesso',
                    firstname: usuario.userName,
                    surname: usuario.surName,
                    email: usuario.email,
            }
            res.status(200).json(updateSuccess);
        }
            res.status(404).json({
            statusCode: 404,
            message: 'Usuário não encontrado',
        });
    } catch (erro) {
        res.status(400).json({
            statusCode: 400,
            message: 'Erro ao atualizar o usuário',
            detalhes: erro
        });
    }

};

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
    updateUsuario,
    deleteUsuario
}
