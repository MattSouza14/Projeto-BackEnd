const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
{
  host: 'viaduct.proxy.rlwy.net',
  port: '12970',
  dialect: 'mysql'
  
}
);

sequelize.authenticate()
  .then(() => {
    console.log('Conexão estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });



const { DataTypes } = require('sequelize');

// Definindo o modelo Usuario
const Usuario = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
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
  }
});

// Sincronizando o modelo com o banco de dados
sequelize.sync()
  .then(() => {
    console.log('Tabelas sincronizadas.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

