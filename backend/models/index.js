const expenses = require('./expenseModel');
const User = require('./userModel');
const payment = require('./payment');

User.hasMany(expenses);
expenses.belongsTo(User);
User.hasMany(payment);
payment.belongsTo(User);

module.exports = {
  User,
  expenses,
  payment
};
