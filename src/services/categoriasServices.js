// falta a autenticação do token (401)

const Categories = require('../models/categoriesModal');

const getCategories = async (req, res) => {
  try {
    const { limit, page, fields, use_in_menu } = req.query;
    
    let limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
    const pageValue = page && limitValue ? parseInt(page, 10) : 1;
    const attributes = fields ? fields.split(',') : ['id', 'name', 'slug', 'use_in_menu'];

    const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0;

    let filtro = {}
    if (use_in_menu === 'true') {
      filtro = {use_in_menu: 1}
    } else if (use_in_menu === 'false') {
      filtro = {use_in_menu: 0}
    }

    const total = await Categories.count();

    const categories = await Categories.findAll({
      where: filtro,
      limit: limitValue,
      offset: offset,
      attributes: attributes
    });

    res.status(200).json({
      data: categories,
      total: total,
      limit: limitValue,
      page: pageValue
    });

  } catch (error) {
    console.error('Erro ao obter categorias:', error);
    res.status(400).json({ error: 'dados da requisição incorretos' });
  }
};

const getCategory = async (req, res) =>{
  try {
    const categoryId = req.params.id
    const attributes = ['id', 'name', 'slug', 'use_in_menu']
    const categoria = await Categories.findByPk(categoryId, {attributes: attributes})
  
    if (categoria) {
      res.status(200).json(categoria)
    } else {
      res.status(404).json({ error: "o recurso solicitado não existe" })
    }

  } catch{
    res.status(500).json({ error: "Erro de conexão" })
  }
}

const createCategory = async (req, res) => {

  const { name, slug, use_in_menu } = req.body;
  
  try {
      
    const newCategory = await Categories.create({
      name: name,
      slug: slug,
      use_in_menu: use_in_menu
    });

    let createSucess = {
      statusCode: 201,
      name: newCategory.name,
      slug: newCategory.slug,
      use_in_menu: newCategory.use_in_menu
    };

    res.status(201).json(createSucess);

  } catch (erro) {
    console.log(erro);
    res.status(400).json({
      statusCode: 400,
      message: 'dados da requisição incorretos'
    });
  }
}

module.exports = {
  getCategories,
  getCategory,
  createCategory
};