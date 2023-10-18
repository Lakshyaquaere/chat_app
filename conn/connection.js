const {DataTypes,Sequelize}= require('sequelize');

require('dotenv').config(); 

const sequelize = new Sequelize({
    dialect:'postgres',
    host:process.env.DB_HOST,
    username:process.env.DB_USERNAME,  
    password: "Pl1QsQ0osYzxmvw7jHpuUBWypuAtIWTY",
    database:process.env.DB_DATABASE,
    dialectOptions:{
      ssl:true,
    }
    
    
})
sequelize.authenticate().then(() => {
    console.log('Database synced successfully');
  }).catch((error) => {
    console.error('Error syncing database:', error);
  });
  
  module.exports=sequelize;

