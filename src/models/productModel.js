const sequelize = require('../config/database')
const { DataTypes } = require('sequelize');



const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  productName: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  slug: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  use_in_menu: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  price_with_discount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
}, 
{
  tableName: 'products', 
  timestamps: false
});

module.exports = Product;
