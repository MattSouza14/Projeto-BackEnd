const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');


router.get('/product/:id', productController.getProduct);
// router.get()
router.post('/createProduct', productController.createProduct);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

module.exports = router;
