const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');

router.get('/:id', productController.getProducts)
router.get('/product', productController.getProducts);
router.post('/createproduct', productController.createProduct);
router.delete('/product/:id', productController.deleteProduct)



module.exports = router;
