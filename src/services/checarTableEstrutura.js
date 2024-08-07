const { Sequelize, DataTypes } = require('sequelize');

// Banco de dados pessoal do Vinicius
const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
  {
     host: 'viaduct.proxy.rlwy.net',
     port: 12970,
     dialect: 'mysql',
     logging: false
  })

sequelize.authenticate()
.then(() => {
   console.log('Conexão estabelecida com sucesso.');
})
.catch(err => {
   console.error('Não foi possível conectar ao banco de dados:', err);
});

async function getTableStructure() {
   try {
     const tableName = 'categories'; // Nome da tabela que você quer examinar
     const tableDescription = await sequelize.getQueryInterface().describeTable(tableName);
     console.log('Table structure:', tableDescription);
   } catch (error) {
     console.error('Error fetching table structure:', error);
   }
 }
 getTableStructure();