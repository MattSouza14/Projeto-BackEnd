//Lembra de fazer a substuição para receber o app e botar a configução do banco de dados na pasta config, arquivo database.js!!!!!!!!!!!!!
//ATENÇÃO:=====================================================================
//node --env-file=../.env server.js   <- nova maneira de iniciar o server.js!!!!!!!!
//=============================================================================

const app = require('./app');
const sequelize = require('./config/database')

sequelize.sync()
.then(() => {
  app.listen(8080, () => {
    console.log('Servidor rodando na porta 8080')
  })
})
.catch(err => {
  console.error('Erro ao conectar com o banco de dados:', err)
});