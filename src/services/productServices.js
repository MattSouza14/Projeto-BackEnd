const Product = require('../models/productModel.js');

const getProducts = async (req, res) => {
    try {
      const { limit, page, fields, match, category_ids,  priceRange, 'option[45]': optionValues } = req.query;
  
      const limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
      const pageValue = page && limitValue ? parseInt(page, 10) : 1;
      const attributes = fields ? fields.split(',') : ['id','enabled','productName', 'slug','stock', 
        'description', 'price', 'price_with_discount','category_ids', 'images', 'options'];
      const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0;
  
    
      let filtro = {};
      if (match) {
        filtro = {
          [Op.or]: [
            { name: { [Op.iLike]: `%${match}%` } },
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
        attributes: attributes

        
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

  const updateProduct = async (req, res) => {
    const id = req.params.id; 

    const {
        enabled,
        productName,
        slug,
        stock,
        description,
        price,
        price_with_discount
    } = req.body;

    
    if (Object.keys(req.body).length === 0) {
        return res.status(204).end();
    }

    
    if (!productName || stock === undefined || !description) {
        return res.status(400).json({
            statusCode: 400,
            message: 'Dados da requisição incorretos: productName, stock, e description são obrigatórios.',
        });
    }

    try {
        
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                statusCode: 404,
                message: 'Produto não encontrado.'
            });
        }

        await product.update({
            enabled,
            productName,
            slug,
            stock,
            description,
            price,
            price_with_discount
        });

        return res.status(200).json({
            statusCode: 200,
            message: 'Produto atualizado com sucesso!',
            data: product
        });

    } catch (error) {
      
        return res.status(500).json({
            statusCode: 500,
            message: 'Erro ao atualizar o produto!',
            detalhes: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
  const {id} = req.params.id
  const product = await Product.destroy({where: {id:id}})
  if (categoria){
    return res.status(200).json({
      statusCode: 200,
      message: 'Produto Excluido com sucesso!'
    })
  }else {
    res.status(404).json({
    statusCode: 404,
    message: 'Não foi possível realizar a operação no momento!'

    })
  }
}

  module.exports ={
    getProducts,
    updateProduct,
    deleteProduct
  }