const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
class Image extends Model {}

Image.init({
    content: DataTypes.STRING
}, { sequelize, modelName: 'Image' });

module.exports = Image;

