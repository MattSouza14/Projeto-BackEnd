const Product = require('../models/productModel.js');

const getProduct = async (req, res) => {
    try{const productId = req.params.id
    const product = await Product.findByPk(productId)
        if(product){
            let objSucess ={
                statusCode: 200,
                id: product.id,
                enabled: product.enabled,
                productName: product.productName,
                slug: product.slug,
                use_in_menu: product.use_in_menu,
                stock: product.stock,
                description: product.description,
                price: product.price,
                price_with_discount: product.price_with_discount,
            }
            res.status(200).json(objSucess)
        }else{ 
            res.status(404).send({ statusCode: 404, message: 'Produto não encontrado' });
        }
    }catch(error) {
        console.error('Erro ao buscar produto:', error);
        res.status(500).json({ statusCode: 500, message: 'Erro ao buscar produto', error: error.message });
    }
      
    
}

const createProduct = async (req, res) => {
  
  const {enabled, productName, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;

  try {
    
    const novoProduct = await Product.create({
      enabled: enabled,
      productName: productName,
      slug: slug,
      use_in_menu: use_in_menu,
      stock: stock,
      description: description,
      price: price,
      price_with_discount: price_with_discount,
    });

    let createSucess = {
        statusCode: 201,
        enabled: novoProduct.enabled,
        productName: novoProduct.productName,
        slug: novoProduct.slug,
        use_in_menu: novoProduct.use_in_menu,
        stock: novoProduct.stock,
        description: novoProduct.description,
        price: novoProduct.price,
        price_with_discount: novoProduct.price_with_discount,
    }
    res.status(201).json(createSucess);

  } catch (error) {
    console.log(error);
    res.status(400).json({ statusCode: 400, message: 'Erro ao criar produto', error: error.message });
  }
};

const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { enabled, productName, slug, use_in_menu, stock, description, price, price_with_discount } = req.body;
    try {
      const product = await Product.findByPk(id);
      if (product) {
        await product.update({ enabled, productName, slug, use_in_menu, stock, description, price, price_with_discount });
        res.status(200).json({
          statusCode: 200,
          message: 'Produto atualizado com sucesso',
          id: product.id,
          enabled: product.enabled,
          productName: product.productName,
          slug: product.slug,
          use_in_menu: product.use_in_menu,
          stock: product.stock,
          description: product.description,
          price: product.price,
          price_with_discount: product.price_with_discount
        });
      } else {
        res.status(404).json({ statusCode: 404, message: 'Produto não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      res.status(500).json({ statusCode: 500, message: 'Erro ao atualizar produto', error: error.message });
    }
  };
  

  const deleteProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const rowsDeleted = await Product.destroy({ where: { id: productId } });
      if (rowsDeleted > 0) {
        res.status(204).send(); 
      } else {
        res.status(404).json({ statusCode: 404, message: 'Produto não encontrado' });
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      res.status(500).json({ statusCode: 500, message: 'Erro ao deletar produto', error: error.message });
    }
  };
  

module.exports = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

