const sequelize = require('../config/database')//Sempre fazer o require quando criar um novo model
const { DataTypes } = require('sequelize');//Sempre fazer o require do datatype ao criar um novo model
const Usuario = sequelize.define('users', { 
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surname:{
      type: DataTypes.STRING,
      allowNull: false,
  
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
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

  
  module.exports = Usuario