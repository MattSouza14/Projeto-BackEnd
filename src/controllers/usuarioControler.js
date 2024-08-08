// const Usuario = require('../models/usuariosModel')
const userServices = require('../services/usuariosServices')

const getUser = async (req, res)=>{
    userServices.getUsuario(req, res)
}   
const createUser = async (req,res)=>{
    userServices.createUsuario(req,res)
}
// const updateUser = async (req, res)=>{
//     userServices.updateUsuario(req,res)
// }
const deleteUser = async (req,res)=>{
    userServices.deleteUsuario(req,res)
}

module.exports = {
    getUser,
    createUser,
    deleteUser
    // updateUser
}

