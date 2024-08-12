const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');
const Categories = require('./categoriesModal');

const productsCategories = sequelize.define('productsCategories',{
    product_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Product,
            key: 'id'
        }

    }, 
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: Categories,
          key: 'id'
        }
    },


});

ProductsCategories.removeAttribute('id'); 
ProductsCategories.belongsTo(Product, { foreignKey: 'product_id' });
ProductsCategories.belongsTo(Categories, { foreignKey: 'category_id' });

module.exports = productsCategories;
