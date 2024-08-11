const productServices = require('../services/productServices')

const getProduct = async (req, res)=>{
    productServices.getProduct(req, res)
}   
const createProduct = async (req,res)=>{
    productServices.createProduct(req,res)
}
const updateProduct = async (req, res)=>{
    productServices.updateProduct(req,res)
}
const deleteProduct = async (req,res)=>{
    productServices.deleteProduct(req,res)
}

module.exports = {
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
}   
