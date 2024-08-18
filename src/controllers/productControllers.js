const productServices = require('../services/productServices')

const getProducts = (req, res)=>{
    productServices.getProducts(req, res)
}   
const getProduct = (req, res) => {
    productServices.getProduct(req, res)
}
const createProduct = (req, res) => {
    productServices.createProduct(req, res)
}
const deleteProduct = (req, res) => {
    productServices.deleteProduct(req, res)
}
  


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct
  
}   
