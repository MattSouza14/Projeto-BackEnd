//Lembra de fazer a substuição para receber o app e botar a configução do banco de dados na pasta config, arquivo database.js!!!!!!!!!!!!!
const sequelize = require('./config/database');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
{
  host: 'viaduct.proxy.rlwy.net',
  port: '12970',
  dialect: 'mysql',
  
}
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });
// Sincronizando o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
  });


module.exports = sequelize
