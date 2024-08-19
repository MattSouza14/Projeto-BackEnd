const { DataTypes } = require('sequelize')
const sequelize = require('../config/database')

const Categories = sequelize.define('categories', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
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
created_at: {
    type: DataTypes.BOOLEAN,
    timestamps: true
  },
  updated_at: {
    type: DataTypes.BOOLEAN,
    timestamps: true
  }
},
{
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
})


module.exports = Categories