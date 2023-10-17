const {DataTypes,Sequelize}= require('sequelize');

require('dotenv').config(); 

const sequelize = new Sequelize({
    dialect:'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,  
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE
})
sequelize.authenticate().then(() => {
    console.log('Database synced successfully');
  }).catch((error) => {
    console.error('Error syncing database:', error);
  });
  module.exports=sequelize;

