//arquivo de comunicação do banco de dados
const { Sequelize } = require('sequelize');

require('dotenv').config();




const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, 
	{
	  host: process.env.DB_HOST,
    port: process.env.DB_PORT,
	  dialect: 'mysql',
	}
);
console.log(process.env.DB_HOST)

// const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
// {
//   host: 'viaduct.proxy.rlwy.net',
//   port: '12970',
//   dialect: 'mysql',
  
// }
// );

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

  module.exports = sequelize