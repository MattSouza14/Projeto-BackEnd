const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categories = sequelize.define('categories', {
   id: {
     type: DataTypes.INTEGER,
     allowNull: false,
     primaryKey: true,
     autoIncrement: true,
   },
   name: {
     type: DataTypes.STRING(45),
     allowNull: false
   },
   slug: {
     type: DataTypes.STRING(120),
     allowNull: false
   },
   use_in_menu: {
     type: DataTypes.TINYINT,
     allowNull: true
   }
 }, 
 { timestamps: true,
  tableName: 'categories'}
 )


module.exports = Categories