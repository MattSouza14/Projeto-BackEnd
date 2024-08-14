const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');


router.get('/product', productController.getProduct);
router.post('/product', productController.createProduct)




module.exports = router;
