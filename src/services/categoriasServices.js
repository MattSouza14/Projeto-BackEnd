const { Sequelize, DataTypes } = require('sequelize');
const Categories = require('../model/categoriesModal')

const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
{
   host: 'viaduct.proxy.rlwy.net',
   port: 12970,
   dialect: 'mysql',
   logging: false
   
}
);
  
sequelize.sync()
  .then(() => {
    console.log('Modelo sincronizado com sucesso.');
    return Categories.create({
      name: 'Cleitinho',
      slug: 'slug do Cleitinho',
      use_in_menu: 1
    });
  })
  .then(categoria => {
    console.log('Categoria criada:', categoria.toJSON());
  })
  .catch(err => {
    console.error('Erro:', err);
  });

//   const { Sequelize } = require('sequelize');

//   const sequelize = new Sequelize('railway', 'root', 'DdcFmollntQRrIVsPPmeNIvqasmEpMYt', 
//   {
//     host: 'viaduct.proxy.rlwy.net',
//     port: '12970',
//     dialect: 'mysql'
    
//   }
//   );