const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');

const Options = sequelize.define('option_products', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    title: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    shape:{
        type:DataTypes.ENUM('square', 'circle')
    },
    type:{
        type:DataTypes.ENUM('text', 'color')

    },
    values:{
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, 
{
    tableName: 'option_products', 
    timestamps: false
});

Options.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Options;
