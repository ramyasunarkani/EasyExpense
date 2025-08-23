require('dotenv').config({ quiet: true });
const Sequelize = require('sequelize');
console.log(process.env.DB_NAME,process.env.DB_USER,  process.env.DB_PASSWORD,process.env.DB_HOST,process.env.DB_DIALECT,'ggggggggggggggggggg')

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

module.exports = connection;
