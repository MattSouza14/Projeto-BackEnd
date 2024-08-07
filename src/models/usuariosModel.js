
const sequelize = require('../server')//Sempre fazer o require quando criar um novo model

const { DataTypes } = require('sequelize');//Sempre fazer o require do datatype ao criar um novo model

const Usuario = sequelize.define('users', { //Lembra de colocar os nomes de acordo com o banco de dados
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    surName:{
      type: DataTypes.STRING,
      allowNull: false,
  
    },
    userAtivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    dataCadastro: {
      type: DataTypes.DATE,
      allowNull: false
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

    createdAt: {
      type: DataTypes.BOOLEAN,
      timestamps: true
    },
    updatedAt: {
      type: DataTypes.BOOLEAN,
      timestamps: true
    }
    
  });
  
  module.exports = Usuario