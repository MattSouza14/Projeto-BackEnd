const { Op } = require('sequelize')
const { Product, Image, Category, productsCategories, Options } = require('../models/productAssociations.js')

const getProducts = async (req, res) => {
  try {
    const { limit, page, fields, match, category_ids, priceRange, 'option[45]': optionValues } = req.query

    const limitValue = limit === '-1' ? null : (limit ? parseInt(limit, 10) : 12)
    const pageValue = page && limitValue ? parseInt(page, 10) : 1
    const attributes = fields ? fields.split(',') : ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount']
    const offset = limitValue && pageValue ? limitValue * (pageValue - 1) : 0

    const filtro = {}
    if (match) {
      filtro[Op.or] = [
        { name: { [Op.like]: `%${match}%` } },
        { description: { [Op.like]: `%${match}%` } }
      ]
    }
    if (category_ids) {
      const categories = category_ids.split(',').map(Number)
      filtro['$categories.id$'] = { [Op.in]: categories }
    }
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(Number)
      filtro.price = { [Op.between]: [minPrice, maxPrice] }
    }
    if (optionValues) {
      filtro.options = { [Op.contains]: optionValues.split(',') }
    }

    const total = await Product.count({
      where: filtro,
      include: [{ model: Category, as: 'categories', attributes: [] }]
    })

    const products = await Product.findAll({
      where: filtro,
      limit: limitValue,
      offset: offset,
      attributes: attributes,
      include: [
        { model: Image, as: 'product_images', attributes: ['id', 'path'] },
        { model: Category, through: { attributes: [] }, as: 'categories', attributes: ['id'] },
        { model: Options, as: 'options', attributes: { exclude: ['product_id'] } }
      ]
    })

    const formattedProducts = products.map(product => {
      const formattedProduct = {}
      attributes.forEach(attr => {
        formattedProduct[attr] = product[attr]
      })
      if (!fields || fields.includes('category_ids')) {
        formattedProduct.category_ids = product.categories.map(category => category.id)
      }
      if (!fields || fields.includes('product_images')) {
        formattedProduct.product_images = product.product_images.map(image => ({ id: image.id, path: image.path }))
      }
      if (!fields || fields.includes('options')) {
        formattedProduct.options = product.options.map(option => ({
          id: option.id,
          title: option.title,
          shape: option.shape,
          radius: option.radius,
          type: option.type,
          values: option.values
        }))
      }
      return formattedProduct
    })

    res.status(200).json({ data: formattedProducts, total, limit: limitValue, page: pageValue })
  } catch (error) {
    console.error('Erro ao obter produtos:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const getProduct = async (req, res) => {

  const productId = req.params.id
  const attributes = ['id', 'enabled', 'name', 'slug', 'stock', 'description', 'price', 'price_with_discount']

  try {
    const produto = await Product.findByPk(productId, {
      attributes: attributes,
      include: [
        { model: Image, as: 'product_images', attributes: ['id', 'path'] },
        { model: Category, through: { attributes: [] }, as: 'categories', attributes: ['id'] }
      ]
    })

    if (produto) {
      res.status(200).json(produto)
    } else {
      res.status(404).json({ error: "O recurso solicitado não existe" })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

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
  } = req.body

  try {
    if (!name || !slug || !price) {
      return res.status(400).json({ error: 'Nome, slug e preço são obrigatórios' })
    }

    const newProduct = await Product.create({
      enabled,
      name,
      slug,
      stock,
      description,
      price,
      price_with_discount
    })

    if (category_ids && category_ids.length) {
      await newProduct.addCategories(category_ids)
    }

    if (images && images.length) {
      await Promise.all(images.map(async (img) => {
        await Image.create({
          type: img.type,
          content: img.content,
          productId: newProduct.id
        })
      }))
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
        })
      }))
    }

    res.status(201).json(newProduct)

  } catch (error) {
    console.error('Erro ao criar o produto:', error)
    res.status(500).json({ error: 'Erro interno do servidor' })
  }
}

const updateProduct = async (req, res) => {
  const { id } = req.params
  const { enabled, name, slug, stock, description, price, price_with_discount } = req.body

  if (Object.keys(req.body).length === 0) {
    return res.status(204).end()
  }

  if (!req.body.hasOwnProperty('enabled') ||
  !req.body.hasOwnProperty('name') ||
  !req.body.hasOwnProperty('slug') ||
  !req.body.hasOwnProperty('stock') ||
  !req.body.hasOwnProperty('description') ||
  !req.body.hasOwnProperty('price')||
  !req.body.hasOwnProperty('price_with_discount')) {
    return res.status(400).json({
    statusCode: 400,
    message: 'Dados da requisição incorretos',
  })
  }

  const product = await Product.findByPk(id)
  
  if (!product) {
    return res.status(404).json({
      statusCode: 404,
      message: 'Produto não encontrada'
    })
  }

  try {
    await product.update({ enabled, name, slug, stock, description, price, price_with_discount })

    return res.status(200).json({
      statusCode: 200,
      message: 'Produto atualizada com sucesso',
      data: product
    })

  } catch (erro) {
    return res.status(400).json({
      statusCode: 400,
      message: 'Erro ao atualizar produto',
      detalhes: erro.message
    })
  }
}

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
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
  }