const express = require('express')
const router = express.Router()
const productController = require('../controllers/productControllers')
const tokenVerificado = require('../middleware/authMiddleware')

router.get('/product', productController.getProducts)
router.get('/product/:id', productController.getProduct)
router.post('/createproduct',tokenVerificado, productController.createProduct)
router.put('/product/:id', tokenVerificado, productController.updateProduct)
router.delete('/product/:id',tokenVerificado, productController.deleteProduct)

module.exports = router
