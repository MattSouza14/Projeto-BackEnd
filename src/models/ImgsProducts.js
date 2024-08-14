// models/imgsProducts.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./productModel');

const Image = sequelize.define('Image', {
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
  product_id: { // Nome correto da coluna
    type: DataTypes.INTEGER,
    allowNull: true, // Permitindo NULL como na estrutura fornecida
    references: {
      model: Product,
      key: 'id'
    }
  },
  pathProduct: {
    type: DataTypes.STRING(150),
    allowNull: false
  }
}, {
  tableName: 'imagesProducts', // Certifique-se de que o nome da tabela está correto
  timestamps: false
});

module.exports = Image;
