const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');

// Rota para obter todos os categories
router.get('/search', categoriesController.getCategories);
router.get('/:id', categoriesController.getCategory)
router.post('/', categoriesController.createCategory)
router.put('/:id', categoriesController.updateCategory)

module.exports = router;
