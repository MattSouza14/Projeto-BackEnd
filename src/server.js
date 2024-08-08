//Lembra de fazer a substuição para receber o app e botar a configução do banco de dados na pasta config, arquivo database.js!!!!!!!!!!!!!
const app = require('./app');
const sequelize = require('./config/database')

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync()
  .then(() => {
    app.listen(8080, () => {
      console.log('Servidor rodando na porta 8080');
    });
  })
  .catch(err => {
    console.error('Erro ao conectar com o banco de dados:', err);
  });
