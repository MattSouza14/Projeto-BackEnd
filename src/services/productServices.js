// src/services/productServices.js
const { Op } = require('sequelize');
const { Product, Image } = require('../models/conexaoProductImage');

const getProducts = async (req, res) => {
  try {
      const { limit, page, fields, match, category_ids, priceRange, 'option[45]': optionValues } = req.query;

      const limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
      const pageValue = page && limitValue ? parseInt(page, 10) : 1;
      const attributes = fields ? fields.split(',') : ['id', 'enabled', 'productName', 'slug', 'stock', 'description', 'price', 'price_with_discount'];
      const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0;

      let filtro = {};
      if (match) {
          filtro = {
              [Op.or]: [
                  { productName: { [Op.iLike]: `%${match}%` } },
                  { description: { [Op.iLike]: `%${match}%` } }
              ]
          };
      }

      if (category_ids) {
          const categories = category_ids.split(',').map(Number);
          filtro.category_ids = { [Op.overlap]: categories };
      }

      if (priceRange) {
          const [minPrice, maxPrice] = priceRange.split('-').map(Number);
          filtro.price = { [Op.between]: [minPrice, maxPrice] };
      }

      if (optionValues) {
          filtro.options = { [Op.contains]: optionValues.split(',') };
      }

      const total = await Product.count();

      const products = await Product.findAll({
          where: filtro,
          limit: limitValue,
          offset: offset,
          attributes: attributes,
          include: {
              model: Image,
              attributes: ['id', 'pathProduct']
          }
      });

      res.status(200).json({
          data: products,
          total: total,
          limit: limitValue,
          page: pageValue
      });

  } catch (error) {
      console.error('Erro ao obter produtos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

module.exports = {
  getProducts
};