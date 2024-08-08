const Categories = require('../models/categoriesModal')
  
// Função para obter todos os usuários
const getCategories = async (req, res) => {
  try {
    const categories = await Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter categoria.' });
  }
};

module.exports = {
  getCategories
  
};