const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')
const Product = require('./productModel')

const Image = sequelize.define('product_images', {

id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
},
product_id: {
    type: DataTypes.INTEGER,
    references: {
        model: Product,
        key: 'id',
    },
    allowNull: false,
},
enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
},
path: {
    type: DataTypes.STRING,
    allowNull: false,
},
}, {
  tableName: 'product_images',
  timestamps: false
})

module.exports = Image
