const {DataTypes,Sequelize}= require('sequelize');
const sequelize = require('../conn/connection');



const User = sequelize.define('user',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type : DataTypes.STRING,
        allowNull:false,
    }

});


class UserMain  {
   

      async getuser(data){
        const {username,password}= data;


      }

}



module.exports = User,UserMain;