const productServices = require('../services/productServices')

const getProducts = async (req, res)=>{
    productServices.getProducts(req, res)
}   
const createProduct = (req, res) => {
    productServices.createProduct(req, res)
}
const deleteProduct = (req, res) => {
    productServices.deleteProduct(req, res)
}
  



module.exports = {
    getProducts,
    createProduct,
    deleteProduct
  
}   
