const { DataTypes } = require('sequelize');
const db=require('../util/db-connection');

const expenses=db.define('expenses',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    },
    expense:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
     description:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
     category:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },


})

module.exports=expenses;