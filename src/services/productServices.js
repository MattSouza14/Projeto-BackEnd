const Product = require('../models/productModel.js');
const Categories = require('../models/productsCategories.js');
const Image = require('../models/imgsProducts.js');
const Options = require ('../models/optionModel.js');

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


  // const deleteProducts = async (req, res) => {
  //   const { id } = req.params
  //   const produtos = await products.destroy({ where: { id: id } })
    
  //   if (produtos) {
  //     return res.status(200).json({
  //     statusCode: 200,
  //     message: 'Deleção bem sucedida'
  //     })
  //   } else {
  //     res.status(404).json({
  //     statusCode: 404,
  //     message: 'recurso solicitado não existe'
  //     })
  //   }
  // }

  module.exports ={
    getProducts,
    createProduct
    // createProducts,
    // deleteProducts
  }


