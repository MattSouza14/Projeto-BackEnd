const Product = require('./productModel');
const Categories = require('./productsCategories');
const Image = require('./imgsProducts');
const Options = require('./optionModel');

Product.belongsToMany(Categories, { through: 'ProductCategories' });
Categories.belongsToMany(Product, { through: 'ProductCategories' });

Product.hasMany(Image);
Image.belongsTo(Product);

Product.hasMany(Options);
Options.belongsTo(Product);
