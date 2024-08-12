const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 

class Option extends Model {}

Option.init({
   
}, { sequelize, modelName: 'Option' });

module.exports = Option;
