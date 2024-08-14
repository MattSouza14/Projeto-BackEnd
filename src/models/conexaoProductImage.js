// models/index.js
const Product = require('./productModel');
const Image = require('./imgsProducts');

// Define as associações
Product.hasMany(Image, { foreignKey: 'product_id' }); // Use o nome correto da coluna
Image.belongsTo(Product, { foreignKey: 'product_id' }); // Use o nome correto da coluna

module.exports = { Product, Image };
