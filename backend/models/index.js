const expenses = require('./expenseModel');
const User = require('./userModel');
const payment = require('./payment');
const Forgotpassword=require('./forgotpassword');

User.hasMany(expenses);
expenses.belongsTo(User);
User.hasMany(payment);
payment.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);

module.exports = {
  User,
  expenses,
  payment,
  Forgotpassword
};
