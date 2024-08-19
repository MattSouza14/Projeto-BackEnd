const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Product = sequelize.define('products', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
name: {
    type: DataTypes.STRING,
    allowNull: false,
},
slug: {
    type: DataTypes.STRING,
    allowNull: false,
},
use_in_menu: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
},
description: {
    type: DataTypes.STRING,
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
})

module.exports = Product
