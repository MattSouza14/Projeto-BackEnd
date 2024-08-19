const { Sequelize } = require('sequelize')
require('dotenv').config()

const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
 {
   host: 'viaduct.proxy.rlwy.net',
   port: '12970',
   dialect: 'mysql',
 }
)

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.')
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err)
  })

  module.exports = sequelize