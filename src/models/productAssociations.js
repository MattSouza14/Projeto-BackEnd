const productsCategories = require('./productsCategories');
const Category = require('./categoriesModel.js')
const Product = require('./productModel.js')
const Image = require('./ImgsProducts.js')

// Definindo as associações
Product.hasMany(Image, { as: 'product_images', foreignKey: 'product_id' });
Product.belongsToMany(Category, { through: productsCategories, as: 'categories', foreignKey: 'product_id' });

Image.belongsTo(Product, { foreignKey: 'product_id' });

Category.belongsToMany(Product, { through: productsCategories, as: 'products', foreignKey: 'category_id' });

module.exports = { Product, Image, Category, productsCategories };

