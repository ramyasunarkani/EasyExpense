const { DataTypes } = require('sequelize');
const db = require('../util/db-connection');

const Payment = db.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  paymentSessionId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  orderAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  orderCurrency: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  paymentStatus: {
    type: DataTypes.ENUM('pending', 'successful', 'failed'),
    allowNull: false,
    defaultValue: 'pending',
  },
}, {
  timestamps: true,
});

module.exports = Payment;
