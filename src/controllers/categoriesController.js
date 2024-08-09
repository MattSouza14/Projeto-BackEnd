// arquivo usuarioController.js
const CategoriesServices = require('../services/categoriasServices');

// Função para obter todos os usuários
const getCategories = (req, res) => {
	CategoriesServices.getCategories(req, res)
};

const getCategory = (req, res) => {
  CategoriesServices.getCategory(req, res)
}

// Exportando as funções
module.exports = {
  getCategories,
  getCategory
};