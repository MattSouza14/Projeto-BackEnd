const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');


router.get('/product', productController.getProduct);
router.delete('/:id', productController.deleteProduct)



module.exports = router;
