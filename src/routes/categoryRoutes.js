const express = require('express');
const tokenVerificado = require('../middleware/authMiddleware')
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Rota para obter todos os categories
router.get('/search', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory)
router.post('/',tokenVerificado, categoriesController.createCategory)
router.put('/:id',tokenVerificado, categoriesController.updateCategory)
router.delete('/:id',tokenVerificado, categoriesController.deleteCategory)

module.exports = router;
