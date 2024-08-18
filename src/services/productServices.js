const { Op } = require('sequelize');
const { Product, Image, Category, productsCategories } = require('../models/productAssociations.js');

const getProducts = async (req, res) => {
  try {
    const { limit, page, fields, match, category_ids, priceRange, 'option[45]': optionValues } = req.query;

    const limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
    const pageValue = page && limitValue ? parseInt(page, 10) : 1;
    const attributes = fields ? fields.split(',') : ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount'];
    const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0;

    let filtro = {};
    if (match) {
      filtro = {
        [Op.or]: [
          { name: { [Op.like]: `%${match}%` } },
          { description: { [Op.like]: `%${match}%` } }
        ]
      };
    }

    if (category_ids) {
      const categories = category_ids.split(',').map(Number);
      filtro['$categories.id$'] = { [Op.in]: categories };
    }

    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number);
      filtro.price = { [Op.between]: [minPrice, maxPrice] };
    }

    if (optionValues) {
      filtro.options = { [Op.contains]: optionValues.split(',') };
    }

    const total = await Product.count({
      where: filtro,
      include: [
        {
          model: Category,
          as: 'categories',
          attributes: []
        }
      ]
    });

    const products = await Product.findAll({
      where: filtro,
      limit: limitValue,
      offset: offset,
      attributes: attributes,
      include: [
        {
          model: Image,
          as: 'product_images',
          attributes: ['id', 'path']
        },
        {
          model: Category,
          through: { attributes: [] },  // Para não retornar atributos da tabela de junção
          as: 'categories',
          attributes: ['id']
        }
      ]
    });

    const formattedProducts = products.map(product => {
      let formattedProduct = {};

      // Inclua apenas os atributos desejados
      attributes.forEach(attr => {
        formattedProduct[attr] = product[attr];
      });

      // Adiciona category_ids e product_images se solicitado
      if (!fields || fields.includes('category_ids')) {
        formattedProduct.category_ids = product.categories.map(category => category.id);
      }

      if (!fields || fields.includes('product_images')) {
        formattedProduct.product_images = product.product_images.map(image => ({
          id: image.id,
          path: image.path
        }));
      }

      return formattedProduct;
    });

    res.status(200).json({
      data: formattedProducts,
      total: total,
      limit: limitValue,
      page: pageValue
    });

  } catch (error) {
    console.error('Erro ao obter produtos:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};



const createProduct = async (req, res) => {
  const { 
    enabled,
    name,
    slug,
    stock,
    description,
    price,
    price_with_discount,
    category_ids,
    images,
    options 
  } = req.body;

  try {
    if (!name || !slug || !price) {
      return res.status(400).json({ error: 'Nome, slug e preço são obrigatórios' });
    }

    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    });

 
    if (category_ids && category_ids.length) {
      await newProduct.addCategories(category_ids);
    }

    if (images && images.length) {
      await Promise.all(images.map(async (img) => {
        await Image.create({
          type: img.type,
          content: img.content,
          productId: newProduct.id
        });
      }));
    }

    if (options && options.length) {
      await Promise.all(options.map(async (opt) => {
        await Option.create({
          title: opt.title,
          shape: opt.shape,
          radius: opt.radius,
          type: opt.type,
          value: opt.value,
          values: opt.values,
          productId: newProduct.id
        });
      }));
    }

    res.status(201).json(newProduct);

  } catch (error) {
    console.error('Erro ao criar o produto:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

  const deleteProduct = async (req, res) => {
    try {

        const id = Number(req.params.id)

       await productsCategories.destroy ({ where: {product_id: id}})  
       await Options.destroy ({ where: {product_id: id}})  
       await Categories.destroy ({ where: {product_id: id}})  
       await Image.destroy ({ where: {product_id: id}})  
      const produto = await Product.destroy({ where: {id:id}})
      console.log('produto cheguei aq')
      console.log(produto)
            if(produto){
                res.status(204).json('Produto deletado :)')
            }else{
                res.status(401).send('Produto não encontrado ou não existe')
            }


        }catch(erro) {
        console.error('404 - Erro ao buscar produto:', erro)
      }
  }

  module.exports ={
    getProducts,
    createProduct,
    deleteProduct,
    // getProduct
  }