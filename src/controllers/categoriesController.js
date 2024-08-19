const CategoriesServices = require('../services/categoriasServices')

const getCategories = (req, res) => {
	CategoriesServices.getCategories(req, res)
}

const getCategory = (req, res) => {
  CategoriesServices.getCategory(req, res)
}

const createCategory = (req, res) => {
  CategoriesServices.createCategory(req, res)
}

const updateCategory = (req, res) => {
  CategoriesServices.updateCategory(req, res)
}

const deleteCategory = (req, res) => {
  CategoriesServices.deleteCategory(req, res)
}

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
}