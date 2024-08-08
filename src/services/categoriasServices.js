const Categories = require('../models/categoriesModal')
  
// Função para obter todos os usuários
const getCategories = async (req, res) => {
  try {
    const { limit } = req.query;
    let limitValue = 12

    if (limit === '-1') {
      limitValue = null
    } else if (limit) {
      limitValue = parseInt(limit, 10)
    }

    const categories = await Categories.findAll({limit: limitValue});

    let total = categories.length
    res.status(200).json({
      data: 
      categories,
      "total": total,
      "limit": limit,
      "page": 1
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter categoria.' });
  }
};

module.exports = {
  getCategories
  
};