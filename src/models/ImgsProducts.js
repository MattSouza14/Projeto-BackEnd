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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        }
    },
    pathProduct: {
        type: DataTypes.STRING(150),
        allowNull: false
    }
}, 
{
    tableName: 'imagesProducts',  
    timestamps: false
});

Image.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Image;
