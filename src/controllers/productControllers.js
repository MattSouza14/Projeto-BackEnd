const productServices = require('../services/productServices')

const getProduct = async (req, res)=>{
    productServices.getProducts(req, res)
}   
const createProduct = (req, res) => {
    productServices.createProduct(req, res)
}
const deleteProduct = (req, res) => {
    productServices.deleteProduct(req, res)
}
  


module.exports = {
    getProduct,
    createProduct,
    deleteProduct
  
}   
