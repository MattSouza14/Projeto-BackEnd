const express = require('express');
const router = express.Router();
const productController = require('../controllers/productControllers');


router.get('/product', productController.getProduct);
router.put('/v1/product/:id', productController.updateProduct);
// router.get()
//  router.post('/createProduct', productController.createProduct);
// // router.put('/products/:id', productController.updateProduct);
// router.delete('/products/:id', productController.deleteProduct);



module.exports = router;
