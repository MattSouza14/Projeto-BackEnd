// const Usuario = require('../models/usuariosModel')
const userServices = require('../services/usuariosServices')


const getUsers = async(req, res)=>{
     return userServices.getAllUsuarios(req, res)
}
const getUser = async (req, res)=>{
   return  userServices.getUsuario(req, res)
}   
const createUser = async (req,res)=>{
    return userServices.createUsuario(req,res)
}
const updateUser = async (req, res)=>{
     return userServices.updateUsuario(req,res)
}
const deleteUser = async (req,res)=>{
    return userServices.deleteUsuario(req,res)
}
const loginUser = async (req, res)=>{
     return userServices.login(req, res)
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUsers,
    loginUser
}

