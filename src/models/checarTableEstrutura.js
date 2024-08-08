const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

sequelize.authenticate()
.then(() => {
   console.log('Conexão estabelecida com sucesso.');
})
.catch(err => {
   console.error('Não foi possível conectar ao banco de dados:', err);
});

async function getTableStructure() {
   try {
     const tableName = 'categories_product'; // Nome da tabela que você quer examinar
     const tableDescription = await sequelize.getQueryInterface().describeTable(tableName);
     console.log('Table structure:', tableDescription);
   } catch (error) {
     console.error('Error fetching table structure:', error);
   }
 }
 getTableStructure();