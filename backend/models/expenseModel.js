const { DataTypes } = require('sequelize');
const db=require('../util/db-connection');

const expenses=db.define('expenses',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    category:{
       type:DataTypes.STRING,
       allowNull:false,
   },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
     description:{
        type:DataTypes.STRING,
        allowNull:false,
    }


})

module.exports=expenses;