const { DataTypes } = require('sequelize');
const db = require('../util/db-connection');  

const User = db.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,        
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,            
    validate: {
      isEmail: true,         
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
