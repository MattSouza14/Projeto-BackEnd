const { Op } = require('sequelize');
const Product = require('../models/productModel.js');
const Categories = require('../models/productsCategories.js');
const Image = require('../models/ImgsProducts.js');
const Options = require ('../models/optionModel.js');
const productsCategories = require('../models/productsCategories.js');


const getProducts = async (req, res) => {
  try {
    const { limit, page, fields, match, category_ids, priceRange, 'option[45]': optionValues } = req.query;

    const limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12);
    const pageValue = page && limitValue ? parseInt(page, 10) : 1;
    const attributes = fields ? fields.split(',') : ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount', 'category_ids', 'product_images'];
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

    const total = await Product.count({ where: filtro });

    const products = await Product.findAll({
      where: filtro,
      limit: limitValue,
      offset: offset,
      attributes: attributes, // Define quais atributos buscar na tabela Product
      include: [
        {
          model: Image,
          as: 'product_images',
          attributes: ['id', 'path']
        },
        {
          model: productsCategories,
          as: 'categories_product',
          attributes: ['category_id']
        }
      ]
    });

    const formattedProducts = products.map(product => {
      let formattedProduct = {};

      // Inclua apenas os atributos desejados
      attributes.forEach(attr => {
        if (attr === 'category_ids') {
          formattedProduct.category_ids = product.categories_product.map(category => category.category_id);
        } else if (attr === 'product_images') {
          formattedProduct.product_images = product.product_images;
        } else {
          formattedProduct[attr] = product[attr];
        }
      });

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
}

    




const createProduct = async (req, res) => {
  const {enabled,name,slug,stock,description,price,price_with_discount,category_ids,images,options } = req.body;

  try {
  
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

    return newProduct;

  } catch (error) {
    throw new Error(`Erro ao criar o produto: ${error.message}`);
  }
};




  // const createProducts = async (req, res) => {

  //   const { enabled,name,slug,stock,description,price,price_with_discount} = req.body;
    
  //   try {
        
  //     const newProduct = await products.create({
  //       enabled:enabled,
  //       name: name,
  //       slug: slug,
  //       stock:stock,
  //       description:description,
  //       price:price,
  //       price_with_discount:price_with_discount
  //     });
  
  //     let createSucess = {
  //       statusCode: 201,
  //       name: newProduct.name,
  //       slug: newProduct.slug,
  //       stock:newProduct.stock,
  //       description:newProduct.description,
  //       price:newProduct.price,
  //       price_with_discount:newProduct.price_with_discount
        
  //     };
  
  //     res.status(201).json(createSucess);
  
  //   } catch (erro) {
  //     console.log(erro);
  //     res.status(400).json({
  //       statusCode: 400,
  //       message: 'dados da requisição incorretos'
  //     });
  //   }
  // }


 


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
    // createProducts,
    deleteProduct
  }