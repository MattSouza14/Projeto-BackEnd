const sequelize = require('../config/database');
const { DataTypes } = require('sequelize');
const Product = require('./productModel');
const Categories = require('./categoriesModal');

const productsCategories = sequelize.define('categories_product',{
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id',
        },
        allowNull: false,
        primaryKey: true,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categories,
            key: 'id',
        },
        allowNull: false,
        primaryKey: true,
    },


}, 
{
    timestamps: true,
    tableName: 'categories_product',
})

// productsCategories.removeAttribute('id'); 
// productsCategories.belongsTo(Product, { foreignKey: 'product_id' });
// productsCategories.belongsTo(Categories, { foreignKey: 'category_id' });

module.exports = productsCategories;
